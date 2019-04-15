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
    if (name === undefined) return null;
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
const request = new Request();
var id = getUrlParameter("id");
var url;
if (id > "0") {
    url = 'https://haberkinik.com/api/Mobil/GetEditorId?id=' + id;
} else {
    url = 'https://haberkinik.com/api/Mobil/GetEditorId';
}
request.get(url)
    .then(data => {
       var liste = "";
       $.each(data, function (key, val) {
           console.log(data);
            var dateStr = val.CreatedOn; 
            var date = new Date(dateStr).toLocaleDateString();
            if (key === 0){ 
                liste += `	<div class="item first-child">
						<a class="post-thumb" href="yazi_detay.html?id=${val.Id}">
							<img src="${val.EditorModel.AvatarUrl}" alt="">
						</a>
						<div class="post-content">
							<div class="category green-text text-lighten-2">
							${val.Title} 
							</div>
							<div class="meta">
								 ${date}
							</div>
							<div class="entry-title">
								<a href="yazi_detay.html?id=${val.Id}">${val.BodyOverview}</a>
							</div>
						</div>
					</div>`;
            } else {
                liste += `	<div class="item">
						<a class="post-thumb" href="yazi_detay.html?id=${val.Id}">
							<img src="${val.EditorModel.AvatarUrl}" alt="">
						</a>
						<div class="post-content">
							<div class="category green-text text-lighten-2">
							${val.Title} 
							</div>
							<div class="meta">
							 ${date}
							</div>
							<div class="entry-title">
								<a href="yazi_detay.html?id=${val.Id}">${val.BodyOverview}</a>
							</div>
						</div>
					</div>`;
            }
        });
        $('.small-listing').html('');
        $('.small-listing').append(liste);

    }).catch(err => console.log(err));

