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
request.get("https://haberkinik.com/api/Mobil/TopMenu")
    .then(data => {
        var category = "";
        $.each(data, function (key, value) {
            category += `<li>
                            <a href="category_detay.html?id=${value.Id}">
                                <div class="icon no-top">
                                    <i class="fa fa-th-list"></i>
                                </div>
                                <div class="caption no-pt">
                                    <h4 class="title">${value.Name}</h4>
                                </div>
                            </a>
                        </li>`;
        });
        $('ul.collection').html('');
        $('ul.collection').append(category);
        
    }).catch(err => console.log(err));






