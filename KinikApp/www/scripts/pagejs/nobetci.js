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
request.get("https://haberkinik.com/api/Mobil/GetAboutUs?name=nobetci")
    .then(data => {
        console.log(data);
        var category = "";
        category += `<li>${data.Body}</li>`;
        $('.card-list').html('');
        $('.card-list').append(category);

    }).catch(err => console.log(err));
