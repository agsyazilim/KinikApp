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
const request = new Request();
request.get("https://haberkinik.com/api/Mobil/GetPhotoGaleri")
    .then(data => {
        var slider = "";
        var liste = "";
       $.each(data, function (key, value) {
           for (var i = 0; i < value.PhotoGaleri.length; i++) {
               slider += `<div class="item"><div class="thumb">
                          <img src="${value.PhotoGaleri[i].PictureModel.ThumbImageUrl}" alt="" height="205"></div>
                          <div class="caption">
                             <div class="entry-title">
                               <a href="#!">${value.Name}</a>
                            </div>
                        </div>                          
                        </div>
                    </div>`;
           }
        });
        $('.gallery-page-slider').html('');
        $('.gallery-page-slider').append(slider);
        $('.gallery-page-slider').slick({
            dots: true,
            arrows: false
        });
        
        $.each(data, function (key, val) {
            var photo = val.PhotoGaleri;
            $.each(photo,function (index, value) {
                    liste += `<li>
                        <a href="#!">
                            <div class="overlay"></div>
                            <div class="thumb">
                                <img src="${value.PictureModel.ThumbImageUrl}" alt="" width="335" height="225">
                            </div>
                            <div class="badge">
                                <i class="fa fa-camera"></i>
                            </div>
                            <div class="caption">
                                ${val.Name}
                            </div>
                        </a>
                    </li>`;
                });

        });
        $('.gallery-related-list').html('');
        $('.gallery-related-list').append(liste);

    }).catch(err => console.log(err));

$('#load-more').on('click',
    function(e) {
        e.preventDefault();
        request.get("https://haberkinik.com/api/Mobil/GetPhotoGaleriId?id=10")
            .then(data => {
                var liste = "";
               $.each(data, function (key, val) {
                    var photo = val.PhotoGaleri;
                    $.each(photo, function (index, value) {
                        liste += `<li>
                        <a href="#!">
                            <div class="overlay"></div>
                            <div class="thumb">
                                <img src="${value.PictureModel.ThumbImageUrl}" alt="" width="335" height="225">
                            </div>
                            <div class="badge">
                                <i class="fa fa-camera"></i>
                            </div>
                            <div class="caption">
                                ${val.Name}
                            </div>
                        </a>
                    </li>`;
                    });

                });
                $('.gallery-related-list').html('');
                $('.gallery-related-list').append(liste);

            }).catch(err => console.log(err));
    });
