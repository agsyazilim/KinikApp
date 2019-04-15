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
const registerForm = document.getElementById("register-form");
registerForm.addEventListener('submit', registerSubmit);

function registerSubmit(e) {
    e.preventDefault();
    var isim = $('input[name="fullname"]').val();
    var email = $('input[name="email"]').val();
    var pass = $('input[name="password"]').val();
    var pass1 = $('input[name="password2"]').val();

    if (isim !== '' && email !== '' && pass !== '' && pass1 !== '') {
        if (pass === pass1) {
            postForm('', isim, email, pass, pass1)
                .then(data => {
                    if (data.ok) {
                        localStorage.setItem('login', data.UserName);

                    }
                }).catch(err => console.log(err));
        } else {
            $('div.desc').html('');
            $('div.desc').html('Şifreler aynı değil');
            $('div.desc').toggle();
        }


    } else {
        $('div.desc').html('');
        $('div.desc').html('Tüm Form alanlarını Doldurunuz');
        $('div.desc').toggle();
    }

}
function postForm(url, isim, email, pass, pass1) {
    const formData = {
        name: isim,
        mail: email,
        pass: pass,
        pass1: pass1

    };
    return fetch(url,
            {
                method: 'POST', // or 'PUT'
                body: formData // a FormData will automatically set the 'Content-Type'
            })
        .then(response => response.json());
}