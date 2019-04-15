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
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit',submitForm);
function submitForm(e) {
    e.preventDefault();
    var email = $('#email').val();
    var pass = $('#password').val();
    if (email !== '' && pass !== '') {
        var url = 'https://haberkinik.com/api/Mobil/GetUser?email=' + email +'&password=' + pass;
        request.get(url)
            .then(data => {
                localStorage.setItem('login',data.UserName);
                var html = ` <div class="thumb">
                        <img src="images/no-img.jpg" alt="">
                    </div>
                    <div class="caption">
                        <span>Merhaba,</span>
                        <h4 class="name">${data.UserName}</h4>
                    </div>
                    <div class="btn-nav">
                        <a href="#!" class="btn" id="singout">Çıkış</a>
                    </div>`;
                $('.top-left-nav').html('');
                $('.top-left-nav').append(html);
                window.location.href = 'index.html';
            }).catch(err => console.log(err));


    } else {
        $('.alert').html('');
        $('.alert').html('Tüm Form alanlarını Doldurunuz');
        $('.alert').toggle();
    }
}

