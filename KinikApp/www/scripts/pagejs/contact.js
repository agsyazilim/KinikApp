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
request.get("https://haberkinik.com/api/Mobil/GetAboutUs?name=iletisim")
    .then(data => {
        var contact = "";
        contact += ` <li class="no-pt">
                            <h4 class="list-heading">${data.Title}</h4>
                            ${data.Body}
                        </li>`;
        $('.subcontent-list').html('');
        $('.subcontent-list').append(contact);

    }).catch(err => console.log(err));

const  contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', submitForm);
function submitForm(e) {
    e.preventDefault();
    var name = $('#name').val();
    var mail = $('#mail').val();
    var konu = $('#konu').val();
    var enquiry = $('#message').val();
   if (name !== undefined & mail !== undefined & enquiry !== undefined) {
        postForm('https://haberkinik.com/api/Mobil/ContactFormUsSend', name, mail,konu, enquiry)
            .then(data => {
              
                $('.alert').html('');
                $('.alert').html(data);
                $('.alert').toggle();
            })
            .catch(err => {
                $('.alert').html('');
                $('.alert').html(err);
                $('.alert').toggle();

            });
    } else {
        $('.alert').html('');
        $('.alert').html('Tüm Form alanlarını Doldurunuz');
        $('.alert').toggle();
    }

}
function postForm(url, name, email,konu, mesaj) {
    const formData = {
        FullName: name,
        Email: email,
        Subject:konu,
        enquiry: mesaj
        
    };
    return fetch(url,
            {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(formData), // a FormData will automatically set the 'Content-Type'
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
            })
        .then(response => response.json());
}
