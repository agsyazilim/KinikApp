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
request.get("https://haberkinik.com/api/Mobil/GetEditorList")
    .then(data => {
        var liste = "";
        $.each(data, function (key, val) {
            if (key === 0) {
                liste += `	<div class="item first-child">
						<a class="post-thumb" href="kose_liste.html?id=${val.EditorId}">
							<img src="${val.AvatarUrl}" alt="">
						</a>
						<div class="post-content">
							<div class="category green-text text-lighten-2">
							${val.FirstName} ${val.LastName}
							</div>
							<div class="meta">
								<a href="${val.FaceBookLink}"><i class="fa fa-facebook"></i></a>
                                <a href="${val.InstagramLink}"><i class="fa fa-instagram"></i></a> 
                                <a href="${val.TwitterLink}"><i class="fa fa-twitter"></i></a> 
                                <a href="${val.Email}"><i class="fa fa-envelope"></i></a> 
							</div>
							<div class="entry-title">
								<a href="kose_liste.html?id=${val.EditorId}">Tüm Yazıları</a>
							</div>
						</div>
					</div>`;
            } else {
                liste += `	<div class="item">
						<a class="post-thumb" href="kose_liste.html?id=${val.EditorId}">
							<img src="${val.AvatarUrl}" alt="">
						</a>
						<div class="post-content">
							<div class="category green-text text-lighten-2">
							${val.FirstName} ${val.LastName}
							</div>
							<div class="meta">
								<a href="${val.FaceBookLink}"><i class="fa fa-facebook"></i></a>
                                <a href="${val.InstagramLink}"><i class="fa fa-instagram"></i></a> 
                                <a href="${val.TwitterLink}"><i class="fa fa-twitter"></i></a> 
                                <a href="${val.Email}"><i class="fa fa-envelope"></i></a> 
							</div>
							<div class="entry-title">
								<a href="kose_liste.html?id=${val.EditorId}">Tüm Yazıları</a>
							</div>
						</div>
					</div>`;
            }
        });
        $('.small-listing').html('');
        $('.small-listing').append(liste);

    }).catch(err => console.log(err));

