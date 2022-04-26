## Kişiye Özel İçerik

Bu çalışmamızda projemize giriş yapan kullanıcıya göre sayfa içeriğini nasıl özelleştireceğimiz üzerine konuşacağız. Geçen çalışmamızdan bildiğimiz üzere ilgili kullanıcıyı nasıl yakalıyorduk? Session'a kaydettiğimiz userID yardımıyla.



Burada kişiye özel içeriği oluşturacağımız dashboard sayfasını authController içerisinde oluşturacağız. Sebebi ise bu sayfanın sadece giriş yapan kullanıcılara özel olması. Burası şart değil, benim bakış açım. İlgili getDashboardPage fonksiyonu:


`controllers/authController.js`
```javascript
exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id:req.session.userID})
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user
  });
}; 
```

userRoute.js dosyası içerisinde ilgili yönlendirmeyi yapalım:

`routes/userRoute.js.js`

```javascript
router.route('/dashboard').get(authController.getDashboardPage);
```

son olarak ise _navigation.ejs dosyası içerisinde link düzenlemesini yapalım.

```htm
<li class="nav-item <%= page_name ==='dashboard' && 'active' %>" ><a class="nav-link" href="users/dashboard">Dashboard</a></li>

```

----------


## Özel (Custom) Middleware

Artık Middleware kavramına aşinayız. Özetle istek - cevap (request - response) döngüsü bir ara yazılımlar(middleware) bütünüdür. Bazı durumlarda projemize özel kendi ara yazılımlarımızı oluşturmak isteriz.



Burada ilk sorunumuz nedir? Biz bazı sayfaların örneğin dashboard sayfasına ait olan adrese yalnızca giriş yapan kullanıcılarımızın ulaşmasını isteriz. Bununla ilgili ara yazılımı yazalım.



`middlewares\authMiddleware.js`

```javascript
module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect('/login');
    next();
  });
};
```
Artık dashboard sayfasına ulaşmak için kullanıcının giriş yapıp yapmadığını kontrol edebiliriz.

`routes/userRoute.js`
```javascript
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
```

Bir başka sorunumuz nedir? Biz kullanıcı olarak giriş yaptık. Giriş yapan bir kullanıcının tekrar kayıt veya giriş sayfasına ulaşmasının anlamı yok değil mi? Hemen ilgili ara yazılımı oluşturalım.


`middlewares\redirectMiddleware.js`
```htm
module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect('/');
  }
  next();
};

```

Artık zaten giriş yapmıl bir kullanıcı giriş sayfası veya kayıt sayfası linkine ulaşmaya çalışılırsa anasayfaya yönlenecek.

`controllers\pageController.js`
```javascript
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
```
