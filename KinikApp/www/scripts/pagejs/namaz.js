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
request.get("https://haberkinik.com/api/Mobil/GetCity")
    .then(data => {
        var sehir = "";
        var city = data.StateList;
        $.each(city,function(key, value) {
            if (value.Value === "izmir") {
                sehir += `<option  value="${value.Value.toLocaleLowerCase()}" selected>${value.Text}</option>`;
            } else {
                sehir += `<option  value="${value.Value.toLocaleLowerCase()}">${value.Text}</option>`;
            }
                
            });
        $('#sehir').html('');
        $('#sehir').append(sehir);

    }).catch(err => console.log(err));
request.get("https://haberkinik.com/api/Mobil/NamazVakitleri?id=izmir")
    .then(data => {
        var model = data;
        $(document.getElementById("imsak")).empty();
        $(document.getElementById("imsak")).append(model.Imsak);
        $(document.getElementById("gunes")).empty();
        $(document.getElementById("gunes")).append(model.Gunes);
        $(document.getElementById("oglen")).empty();
        $(document.getElementById("oglen")).append(model.Oglen);
        $(document.getElementById("ikindi")).empty();
        $(document.getElementById("ikindi")).append(model.Ikindi);
        $(document.getElementById("aksam")).empty();
        $(document.getElementById("aksam")).append(model.Aksam);
        $(document.getElementById("yatsi")).empty();
        $(document.getElementById("yatsi")).append(model.Yatsi);

    }).catch(err => console.log(err));

$('#sehir').on('change',function() {
    var city = $(this).val();
    var url = 'https://haberkinik.com/api/Mobil/NamazVakitleri?id=' + city;
    request.get(url)
        .then(data => {
            var model = data;
            $(document.getElementById("imsak")).empty();
            $(document.getElementById("imsak")).append(model.Imsak);
            $(document.getElementById("gunes")).empty();
            $(document.getElementById("gunes")).append(model.Gunes);
            $(document.getElementById("oglen")).empty();
            $(document.getElementById("oglen")).append(model.Oglen);
            $(document.getElementById("ikindi")).empty();
            $(document.getElementById("ikindi")).append(model.Ikindi);
            $(document.getElementById("aksam")).empty();
            $(document.getElementById("aksam")).append(model.Aksam);
            $(document.getElementById("yatsi")).empty();
            $(document.getElementById("yatsi")).append(model.Yatsi);

        }).catch(err => console.log(err));

});