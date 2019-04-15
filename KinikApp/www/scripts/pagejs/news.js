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

var name = getUrlParameter("name");
var url = 'https://haberkinik.com/api/Mobil/GetCategoryName?name=' + name;
const request = new Request();
request.get(url)
    .then(data => {
        var response = data.CategoryModel;
        $('.page-title').html('');
        $('.page-title').html(data.Name.toLocaleUpperCase());
        var category = "";
        $.each(response, function (key, val) {
           if (key === 0) {
                category += `<div class="item first-child">
                            <a class="post-thumb" href="news_detail.html?id=${val.Id}">
                                <img src="${val.PictureUrl}" alt="">
                            </a>
                            <div class="post-content">
                                <div class="category orange-text">
                                    ${val.CategoryName.toLocaleUpperCase()}
                                </div>
                                <div class="meta">
                                     ${val.CreatedOn}
                                </div>
                                <div class="entry-title">
                                    <a href="news_detail.html?id=${val.Id}">${val.Title}</a>
                                </div>
                            </div>
                        </div>`;
            } else {
                category += `   <div class="item">
                            <a class="post-thumb" href="news_detail.html?id=${val.Id}">
                                <img src="${val.PictureUrl}" alt="">
                            </a>
                            <div class="post-content">
                                <div class="category orange-text">
                                     ${val.CategoryName.toLocaleUpperCase()}
                                </div>
                                <div class="meta">
                                       ${val.CreatedOn}
                                </div>
                                <div class="entry-title">
                                    <a href="news_detail.html?id=${val.Id}">${val.Title}</a>
                                </div>
                            </div>
                        </div>`;
            }
            
        });
        $('.small-listing').html('');
        $('.small-listing').append(category);

        
    }).catch(err => console.log(err));






