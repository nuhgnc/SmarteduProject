## Flash Bildirimleri

Bu çalışmamızda Smartedu projemizdeki flash bildirimleri üzerine konuşacağız. Flash bildirimler ne işe yarayacak? Projemizde herhangi bir şekilde bir değişiklik yaptığımızda, yeni bir kurs oluşturduğumuzda veya mail gönderimi gibi işlemler sonucunda kullanıcıya geri bildirimde bulunmak isteriz. Bunun için connect-flash paketini indireceğiz.


```javascript 
const flash = require('connect-flash');
```
Şimdi ise iki tane ara yazılım yazacağız. Öncelikle connect-flash paketini kullanacağız. Diğer ara yazılım ise ilgili template içerisinde bu mesajları kullanmamızı sağlayacak olan flashMessages değişkenini oluşturacağız.


`app.js`

```javascript
pp.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})
```
Email gönderimi ile ilgili oluşturmak istediğim bildirim mesajları:

```javascript
req.flash("success", "We Received your message succesfully");
----
req.flash("error", `Something happened!`);
```

Son olarak ise bu gönderdiğimiz mesajları ilgili template dosyasında yakalayalım.

`contact.ejs`
```javascript
<% if (flashMessages) { %>
  <% if (flashMessages.success) { %>
    <div class="alert alert-success">
  <%= flashMessages.success %>
  </div>
<% } else if (flashMessages.error) { %>
 <div class="alert alert-danger">
  <%= flashMessages.error %>
  </div>
  <% } %>
<% } %>
```
## [connect-flash](https://www.npmjs.com/package/connect-flash)
----------

## Kayıt ve Kullanıcı Doğrulama


Smartedu projemizin şu an en önemli eksiği kayıt ve kullanıcı işlemleri sırasında herhangi bir kontrol yapmaması. Kayıt yapılan şifre uygun mu, kullanıcı email adresi doğru mu şeklinde farklı senaryolar için gerekli kontroller yapmamız gereklidir. Bunun için express-validator paketini kullanacağız.



Kayıt işlemini yaptığımız yönlendirmede kontrolleri yapalım. userRoute.js dosyası içerisinde

`routes/userRoute.js.js`
```javascript
router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),


        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],

    authController.createUser); // http://localhost:3000/users/signup
```

Yukarıda dikkat ettiyseniz biz sadece kontrolleri yapıyoruz. Bu kontroller sonucunda oluşan hataları ise ilgili controller fonksiyonunda yakalayacağız.



`views/contact.ejs`
```javascript
  const errors = validationResult(req);
  console.log(errors);
  console.log(errors.array()[0].msg);

  for (let i = 0; i <errors.array().length; i++) {
    req.flash("error", `${errors.array()[i].msg}`);
  }

  res.status(400).redirect('/register');
```

Son olarak yapılması gereken ise bu hataları ilgili template dosyasında yakalamak.

```javascript
<div class="offset-1 col-lg-10 col-md-10 col-sm-10">
    <% if (flashMessages) { %>

        <% if (flashMessages.success) { %>
            <div class="alert alert-success">
                <%= flashMessages.success %>
            </div>

        <% } else if (flashMessages.error) { %>
            <div class="alert alert-danger">
                <%= flashMessages.error %>
            </div>
        <% } %>

    <% } %>
</div>
```
## [experss-validator](https://www.npmjs.com/package/express-validator)