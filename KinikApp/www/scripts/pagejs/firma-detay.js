class Request {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(function (response) {
                if (!response.ok) {
                    throw new Error("HTTP error, status = " + response.status);
                }
                return response.json();
            }).then(function (json) {
                resolve(json);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var id = getUrlParameter("id");
var url = 'https://haberkinik.com/api/Mobil/GetCompanyDetail?id=' + id;
const request = new Request();
request.get(url)
    .then(data => {
        console.log(data);
        var dateStr = data.StartDate;
        var date = new Date(dateStr).toLocaleDateString();
         var breadcrumb = `<div class="breadcrumbs mb-5">
                               <a href="index.html">Anasayfa</a>
                                <a href="firma.html">Köşe Yazıları</a>
                                <a href="firma.html">${data.Name}</a>
                            </div>
                            <div class="entry-title">
                                ${data.CategoryName}  
                            </div>
                            <div class="entry-meta mb-15">
                                ${date} 
                            </div>  
                           `;
        $('.entry-header').html('');
        $('.entry-header').append(breadcrumb);
        var picture = ` <img src="${data.PictureUrl}" alt="">
                            <div class="caption">
                            Adres: ${data.Address} <hr/> Şehir: ${data.City} <hr/> Tel: ${data.Phone}
                           <hr/> Gsm:${data.Gsm}<hr/> Url:${data.Url} <hr/> Web : ${data.Www}
                            </div>`;
        $('.entry-thumb').html('');
        $('.entry-thumb').append(picture);
        var content = `${data.Description}`;

        $('.entry-content').html('');
        $('.entry-content').append(content);
        if (data.VideoEmbedCode !== null) {
            var video = `<div class="thumb-video ext-src animated fadeInRight">${data.VideoEmbedCode}</div>`;
            $('#video').html('');
            $('#video').append(video);
        }
    }).catch(err => console.log(err));



