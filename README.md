# Session Nedir?

Session kavramı Türkçeye oturum olarak çevrilir ve kişiye özel içerik oluşturmak için kullanıcı bilgilerinin sunucu tarafında saklanmasını sağlayan araçlardır. Node.js tarafında express-session paketini kullanacağız. Bu paketi indirmek için:

```console
npm i express-session
```

Sonrasında "session"ı çağırıp ilgili middleware fonksiyonunu yazacağız.

`app.js`

```javascript
const session = require('express-session');
----
app.use(
  session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
  })
);
```

Peki oturumu açan kullanıcıyı nasıl belirleyeceğiz, giriş işlemi sırasında kullanıcı ID'sini session alanında userID değişkenini oluşturup ona atayacağız.

```javascript
router.route('/login').post(authController.loginUser);
```

Kullanıcıyı yakaladıktan sonra gerisi kolay bundan sonra projemizde yapacağımız herhangi bir işlemin o anda hangi kullanıcıyla ilşkili olduğunu anlayabileceğiz. Bunu pratikte nasıl kullanabiliriz? Örneğin kullanıcılar için giriş yaptıktan sonra "giriş" linkini görmelerine gerek yoktur. Aynı şekilde sadece giriş yapan kullanıcıların "dashboard" linkini görmelerini isteriz. Bunun için globalde userIN değişkeni oluşturacağız.

`app.js`

```javascript
global.userIN = null;
----
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
```

Artık `\_navigation.ejs` dosyasında bu global değişkene göre if koşulları oluşturabiliriz.

```htm
<% if(!userIN) { %>

<ul class="nav navbar-nav navbar-right">
  <li>
    <a
      class="hover-btn-new log <%= page_name ==='login' && 'orange' %> mr-2"
      href="/login"
      ><span><i class="fa fa-sign-in" aria-hidden="true"></i></span
    ></a>
  </li>
  <li>
    <a
      class="hover-btn-new log <%= page_name ==='register' && 'orange' %>"
      href="/register"
      ><span><i class="fa fa-user-plus" aria-hidden="true"></i></span
    ></a>
  </li>
</ul>

<% } %> <% if(userIN) { %>

<ul class="nav navbar-nav navbar-right">
  <li>
    <a class="hover-btn-new log mr-2" href="/users/logout"
      ><span><i class="fa fa-sign-out" aria-hidden="true"></i></span
    ></a>
  </li>
</ul>

<% } %>
```
### [Express Session](https://www.npmjs.com/package/express-session)

----------


## Çıkış İşlemi (Logout)

Session kavramı sayesinde kullanıcıya özel nasıl oturum açacağımız üzerine konuştuk. Şimdi ise bu oturumu nasıl kapatacağımızı yani çıkış işlemini nasıl yapacağımız üzerine konuşacağız. Bunun için destroy metodunu kullanacağız.

`controllers/authController.js`

```javascript
exports.logoutUser = (req, res) => {
  req.session.destroy(()=> {
    res.redirect('/');
  })
}
```

Bu fonsiyonu çalıştırmak için ilgili yönlendirmeyi de yapalım.

`routes/userRoute.js`
```javascript
router.route('/logout').get(authController.logoutUser);
```

Şimdi ise ilgili çıkış linkini oluşturalım.  
  


`views/_navbar.ejs`
```htm
<li><a class="hover-btn-new log mr-2" href="/users/logout"><span><i class="fa fa-sign-out" aria-hidden="true"></i></span></a></li>
```

Burada şöyle bir sorunumuz var, sunucuyu tekrar başlattığımızda ilgili session yani oturumu kaybediyoruz. Bunun engellemek için connect-mongo paketini indireceğiz. Sonrasında ise bu session bilgisini kaydedeceğimiz veritabanı bağlantısını yazacağız.

`app.js`
```javascript
const MongoStore = require('connect-mongo');
----
store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
```

### [express connect-mongo](https://www.npmjs.com/package/connect-mongo)