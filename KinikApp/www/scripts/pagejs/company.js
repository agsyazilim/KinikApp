class Request {
   
get(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(function(response) {
            if (!response.ok) {

                throw new Error("HTTP error,status = " + response.status);

            }
            return response.json();
        }).then(function(json) {
            resolve(json);
        }).catch(function(error) {
            reject(error);
        });
    });

  }
}

const request = new Request();
request.get("https://haberkinik.com/api/Mobil/GetCompanyList")
.then(data => {
var firma = "";
$.each(data,function(key, value) {
        var model = value.CompanyDetailModels;
        $.each(model,
            function(key, val) {
                if (key === 0) {
                    console.log(model);
                    firma += `<div class="item first-child">
                                <a class="post-thumb" href="firma_detay.html?id=${val.Id}">
                                    <img src="${val.PictureUrl}" alt="">
                                </a>
                                <div class="post-content">
                                    <div class="category light-green-text">
                                       ${value.Name} - ${val.Name}
                                    </div>
                                    <div class="meta">
                                       ${val.StartDate}
                                    </div>
                                    <div class="entry-title">
                                        <a href="firma_detay.html?id=${val.Id}">${val.Gsm}, ${val.City}, ${val.Www}</a>
                                    </div>
                                </div>
                            </div>`;
                } else {
                    firma += `<div class="item">
                                <a class="post-thumb" href="firma_detay.html?id=${val.Id}">
                                    <img src="${val.PictureUrl}" alt="">
                                </a>
                                <div class="post-content">
                                    <div class="category light-green-text">
                                        ${value.Name} - ${val.Name}
                                    </div>
                                    <div class="meta">
                                        ${val.StartDate}
                                    </div>
                                    <div class="entry-title">
                                         <a href="firma_detay.html?id=${val.Id}">${val.Gsm}, ${val.City}, ${val.Www}</a>
                                    </div>
                                </div>
                            </div>`;
                }


            });

    });
$('.small-listing').html('');
$('.small-listing').append(firma);

}).catch(err=>console.log(err));