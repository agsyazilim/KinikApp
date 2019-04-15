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
request.get("https://haberkinik.com/api/Mobil/GetDoviz")
    .then(data => {
       console.log(data);
        var doviz = `<tr><td>Dolar</td>
                            <td>USD</td>
                            <td>${data.Dolar}</td>
                        </tr><tr><td>Euro</td>
                            <td>EUR</td>
                            <td>${data.Euro}</td>
                        </tr><tr><td>Altın</td>
                            <td>TL/GR</td>
                            <td>${data.Gold}</td>
                        </tr>`;
        
        $('table tbody').html('');
        $('table tbody').append(doviz);

    }).catch(err => console.log(err));
