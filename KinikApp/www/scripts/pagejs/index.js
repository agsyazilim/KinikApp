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
request.get("https://haberkinik.com/api/Mobil/GetMainSlider")
    .then(data => {
        var slider = "";
        $.each(data, function (key, value) {
           slider += `<div class="item">
                                 <div class="thumb">
                                 <img src="${value.PictureUrl}" alt=""></div>
                                 <div class="caption">
                                 <div class="category orange-text text-lighten-2">
                                    ${value.CategoryName.toLocaleUpperCase()}
                                </div>
                               <div class="meta">
                              ${value.CreatedOn}
                            </div>
                            <div class="entry-title">
                                <a href="news_detail.html?id=${value.Id}">${value.Title}</a>
                            </div>
                        </div>
                    </div>`;
        });
        $('.home-slider2').html('');
        $('.home-slider2').append(slider);
        $('.home-slider2').slick({
            dots: true,
            arrows: false
        });
    }).catch(err => console.log(err));
request.get("https://haberkinik.com/api/Mobil/GetBreakingNews")
    .then(data => {
        var slider = "";
        $.each(data, function (key, value) {
          slider += ` <li>
                                <div class="card">
                                    <div class="card-image">
                                        <img src="${value.PictureUrl}" alt="" width="280" height="170">
                                        <div class="media-caption">
                                             <span class="icon"><i class="fa fa-camera"></i></span>
                                        </div>
                                    </div>
                                    <div class="card-content">
                                        <div class="category light-green-text">
                                            ${value.CategoryName.toLocaleUpperCase()}
                                        </div>
                                        <div class="meta">
                                            ${value.CreatedOn}
                                        </div>
                                        <div class="entry-title">
                                            <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}">${value.Title}</a>
                                        </div>
                                    </div>
                                </div>
                            </li>`;
        });
        $('.card-list').html('');
        $('.card-list').append(slider);

    }).catch(err => console.log(err));
request.get("https://haberkinik.com/api/Mobil/GetTopNews?id=4")
    .then(data => {
        var slider = "";
        $.each(data, function (key, value) {
          if (key === 0) {
                slider += `<div class="item first-child">
                            <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}" class="post-thumb">
                                <img src="${value.PictureUrl}" height="94" />
                            </a>
                            <div class="post-content">
                                <div class="category orange-text">
                                    ${value.CategoryName.toLocaleUpperCase()}
                                </div>
                                <div class="meta">
                                    ${value.CreatedOn}
                                </div>
                                <div class="entry-title">
                                    <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}">${value.Title}</a>
                                </div>
                            </div>
                        </div>`;
            } else {
                slider += `<div class="item">
                            <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}" class="post-thumb">
                                <img src="${value.PictureUrl}" height="94" />
                            </a>
                            <div class="post-content">
                                <div class="category orange-text">
                                    ${value.CategoryName.toLocaleUpperCase()}
                                </div>
                                <div class="meta">
                                    ${value.CreatedOn}
                                </div>
                                <div class="entry-title">
                                    <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}">${value.Title}</a>
                                </div>
                            </div>
                        </div>`;
            }

        });
        $('#endNews').html('');
        $('#endNews').append(slider);

    }).catch(err => console.log(err));
document.getElementById("load-more").addEventListener("click",
    function (e) {
        e.preventDefault();
        request.get("https://haberkinik.com/api/Mobil/GetTopNews?id=10")
            .then(data => {
                var slider = "";
                $.each(data, function (key, value) {
                    console.log(value);
                   if (key === 0) {
                        slider += `<div class="item first-child">
                            <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}" class="post-thumb">
                                <img src="${value.PictureUrl}" height="94" />
                            </a>
                            <div class="post-content">
                                <div class="category orange-text">
                                    ${value.CategoryName.toLocaleUpperCase()}
                                </div>
                                <div class="meta">
                                    ${value.CreatedOn}
                                </div>
                                <div class="entry-title">
                                    <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}">${value.Title}</a>
                                </div>
                            </div>
                        </div>`;
                    } else {
                        slider += `<div class="item">
                            <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}" class="post-thumb">
                                <img src="${value.PictureUrl}" height="94" />
                            </a>
                            <div class="post-content">
                                <div class="category orange-text">
                                    ${value.CategoryName.toLocaleUpperCase()}
                                </div>
                                <div class="meta">
                                    ${value.CreatedOn}
                                </div>
                                <div class="entry-title">
                                    <a href="news_detail.html?id=${value.Id}" data-pid="${value.Id}">${value.Title}</a>
                                </div>
                            </div>
                        </div>`;
                    }

                });
                $('#endNews').html('');
                $('#endNews').append(slider);

            }).catch(err => console.log(err));

    });
request.get("https://haberkinik.com/api/Mobil/GetCategoryTabModel")
    .then(data => {
        var tab = "";
        var content = "";
        $.each(data, function (index, val) {
            if (index === 0) {
                tab += `<li class="tab"><a class="active" href="#tab-${val.Name.toLowerCase()}">${val.Name.toLocaleUpperCase()}</a></li>`;
            } else {
                if (val.Name.toLowerCase() === "gündem") {
                    val.Name = 'gundem';
                    tab += `<li class="tab"><a href="#tab-${val.Name.toLowerCase()}">GÜNDEM</a></li>`;
                } else {
                    tab += `<li class="tab"><a href="#tab-${val.Name.toLowerCase()}">${val.Name.toLocaleUpperCase()}</a></li>`;
                }
               
            }
            
        });
       $('ul.tabs').html('');
       $('ul.tabs').append(tab);
        $.each(data, function (key, value) {
            var catModel = value.CategoryModel;
            if (value.Name.toLowerCase() === "gündem") {
                value.Name = 'gundem';
                content += `<div id="tab-${value.Name.toLowerCase()}"><div class="small-listing">`;
            } else {
                content += `<div id="tab-${value.Name.toLowerCase()}"><div class="small-listing">`;
            }
            
            $.each(catModel, function (index, val) {
               content += ` <div class="item">
                                        <a class="post-thumb" href="news_detail.html?id=${val.Id}" data-pid="${val.Id}">
                                            <img src="${val.PictureUrl}" alt="">
                                        </a>
                                        <div class="post-content">
                                            <div class="category blue-text">
                                               ${val.CategoryName.toLocaleUpperCase()}
                                            </div>
                                            <div class="meta">
                                                 ${val.CreatedOn}
                                            </div>
                                            <div class="entry-title">
                                                <a href="news_detail.html?id=${val.Id}" data-pid="${val.Id}">${val.Title}</a>
                                            </div>
                                        </div>
                                    </div>`;

            });
            content += "</div></div>";
        });
        $('div.tabs-content').html('');
        $('div.tabs-content').append(content);
        $('ul.tabs').tabs();
    }).catch(err => console.log(err));


