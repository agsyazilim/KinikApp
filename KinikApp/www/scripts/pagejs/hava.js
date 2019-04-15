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
request.get("https://haberkinik.com/api/Mobil/GetCityList")
    .then(data => {
        var sehir = "";
        var city = data.StateList;
        $.each(city,function(key, value) {
            if (value.Value === "IZMIR") {
                sehir += `<option  value="${value.Value}" selected>${value.Text}</option>`;
            } else {
                sehir += `<option  value="${value.Value}">${value.Text}</option>`;
            }
                
            });
        $('#sehir').html('');
        $('#sehir').append(sehir);

    }).catch(err => console.log(err));
request.get("https://haberkinik.com/api/Mobil/MobilHavaDurumu?id=izmir")
    .then(data => {
        var main = data.main;
        console.log(main);
        var baslik = document.getElementsByClassName("widget-right__title");
        $(baslik).empty();
        $(baslik).append(data.name.toUpperCase() + ",TR");
        $(document.getElementsByClassName("weather-right__temperature")).empty();
        $(document.getElementsByClassName("weather-right__temperature")).append(Math.round(main.temp,0), "<span>°C</span>");
        $(document.getElementsByClassName("weather-right__feels")).empty();
        $(document.getElementsByClassName("weather-right__feels")).append(main.temp, "<span>°C</span>");
        $(document.getElementsByClassName("weather-right__pressure")).empty();
        $(document.getElementsByClassName("weather-right__pressure")).append(main.pressure);
        $(document.getElementsByClassName("weather-right__humidity")).empty();
        $(document.getElementsByClassName("weather-right__humidity")).append(main.humidity, "%");
        $(document.getElementsByClassName("weather-right__wind-low")).empty();
        $(document.getElementsByClassName("weather-right__wind-low")).append(main.temp_min);
        $(document.getElementsByClassName("weather-right__wind-speed")).empty();
        $(document.getElementsByClassName("weather-right__wind-speed")).append(main.temp_min);

    }).catch(err => console.log(err));

$('#sehir').on('change',function() {
    var city = $(this).val();
    var url = 'https://haberkinik.com/api/Mobil/MobilHavaDurumu?id=' + city;
    request.get(url)
        .then(data => {
           var main = data.main;
            var baslik = document.getElementsByClassName("widget-right__title");
            $(baslik).empty();
            $(baslik).append(data.name.toUpperCase() + ",TR");
            $(document.getElementsByClassName("weather-right__temperature")).empty();
            $(document.getElementsByClassName("weather-right__temperature")).append(Math.round(main.temp,0), "<span>°C</span>");
            $(document.getElementsByClassName("weather-right__feels")).empty();
            $(document.getElementsByClassName("weather-right__feels")).append(main.temp, "<span>°C</span>");
            $(document.getElementsByClassName("weather-right__pressure")).empty();
            $(document.getElementsByClassName("weather-right__pressure")).append(main.pressure);
            $(document.getElementsByClassName("weather-right__humidity")).empty();
            $(document.getElementsByClassName("weather-right__humidity")).append(main.humidity, "%");
            $(document.getElementsByClassName("weather-right__wind-low")).empty();
            $(document.getElementsByClassName("weather-right__wind-low")).append(main.temp_min);
            $(document.getElementsByClassName("weather-right__wind-speed")).empty();
            $(document.getElementsByClassName("weather-right__wind-speed")).append(main.temp_min);

        }).catch(err => console.log(err));

});