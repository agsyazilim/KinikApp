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
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var id = getUrlParameter("id");
var url = 'https://haberkinik.com/api/Mobil/GetBlogPost?id=' + id;
const request = new Request();
request.get(url)
    .then(data => {
        console.log(data);
        var dateStr = data.CreatedOn;
        var date = new Date(dateStr).toLocaleDateString();
         var breadcrumb = `<div class="breadcrumbs mb-5">
                               <a href="index.html">Anasayfa</a>
                                <a href="kose_liste.html">Köşe Yazıları</a>
                                <a href="kose_liste.html">${data.Title}</a>
                            </div>
                            <div class="entry-title">
                                ${data.BodyOverview}
                            </div>
                            <div class="entry-meta mb-15">
                                ${date} tarihinde ${data.EditorModel.FirstName} ${data.EditorModel.LastName} yazıldı.
                            </div>  
                            <div class="share">
                            <div class="sharethis-inline-share-buttons"></div>						
                            </div><div class="entry-content">${data.Body}</div>`;
        $('.entry-header').html('');
        $('.entry-header').append(breadcrumb);
        var comments="";
        $.each(data.Comments, function (index, val) {
            var dateStr = val.CreatedOn;
            var date = new Date(dateStr).toLocaleDateString();
            var avatar = val.CustomerAvatarUrl;
            if (avatar === null) {
                avatar = 'images/no-img.jpg';
            }
         comments+=`<li class="has_child">
                                    <div class="thumb">
                                        <img src="${avatar}" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="header">
                                            <h4 class="name">${val.CustomerName}</h4>
                                            <div class="meta">${date}</div>
                                        </div>
                                        <p>${val.CommentText}</p>
                                     </div>                                    
                                </li>`;
            });
        $('.comment-list').html('');
        $('.comment-list').append(comments);
    }).catch(err => console.log(err));

const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit',submitForm);

function submitForm(e) {
    e.preventDefault();
    var isim = $('#fullname').val();
    var email = $('#email').val();
    var mesaj = $('#textarea1').val();
    var customerName = email;
    if (isim !== '' && email !== '' && mesaj !== '') {
        postForm('https://haberkinik.com/api/Mobil/AddBlogComment', isim, email, mesaj,getUrlParameter('id'),customerName)
            .then(data => {
                console.log(data);
                    if (data.ok) {
                     request.get(url)
                         .then(data => {
                             var dateStr = data.CreatedOn;
                             var date = new Date(dateStr).toLocaleDateString();
     
        var breadcrumb = `<div class="breadcrumbs mb-5">
                                <a href="index.html">Anasayfa</a>
                                <a href="kose_liste.html">Köşe Yazıları</a>
                                <a href="kose_liste.html">${data.CategoryName}</a>
                            </div>
                            <div class="entry-title">
                                ${data.Short}
                            </div>
                            <div class="entry-meta mb-15">
                                ${date} tarihinde ${data.CustomerName} yazıldı.
                            </div>  
                            <div class="share">
                                 <div class="sharethis-inline-share-buttons"></div>		
                            </div><div class="entry-content">${data.Full.trim()}</div>`;
        $('.entry-header').html('');
        $('.entry-header').append(breadcrumb);
        var comments = "";
        $.each(data.Comments,function(index,val) {
            var avatar = val.CustomerAvatarUrl;
            var dateStr = val.CreatedOn;
            var date = new Date(dateStr).toLocaleDateString();
            if (avatar === null) {
                avatar = 'images/no-img.jpg';
            }
         comments+=`<li class="has_child">
                                    <div class="thumb">
                                        <img src="${avatar}" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="header">
                                            <h4 class="name">${val.CustomerName}</h4>
                                            <div class="meta">${date}</div>
                                        </div>                                        
                                        <p>${val.CommentText}</p>
                                     </div>                                    
                                </li>`;
            });
        $('.comment-list').html('');
        $('.comment-list').append(comments);
    }).catch(err => console.log(err));
                    }

            })
            .catch(error => console.error(error));

    } else {
        
        $('.alert').html('');
        $('.alert').html('Tüm Form alanlarını Doldurunuz');
        $('.alert').toggle();

    }
}

function postForm(url,isim,email,mesaj,id,customerName) {
    const formData = {
        name: isim,
        email: email,
        commentText: mesaj,
        id:id,
        customerName:customerName
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



