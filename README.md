## Arama (Search) Alanı

Bu çalışmamızda Smartedu projemizin search (arama) alanını oluşturacağız.



Kullanacağımız yöntem ise şu daha öncesinde kategori ile oluşturduğumuz filtrelemeyi query den gelen "search" parametresiyle de birleştireceğiz. Önce query parametresini göndereceğimiz formu oluşturalım.

`models\Courses.js`
```javascript
<form method="GET" id="site-searchform" action="/courses">
  <div>
    <input class="input-text form-control" name="search" id="search-k" placeholder="Search..." type="text">
    <button id="searchsubmit" value="Search" type="submit"></button>
  </div>
</form>
```

Şimdi oluşturduğumuz filtreyi query parametresiyle geliştirelim.

`controllers\courseController.js`

```javascript
   const query = req.query.search;

    if(query) {
      filter = {name:query}
    }

    if(!query && !categorySlug) {
      filter.name = "",
      filter.category = null
    }

    const courses = await Course.find({
      $or:[
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category: filter.category}
      ]
    }).sort('-createdAt').populate('user');

```

----------

## İletişim Sayfası ve Mail Göndermek


Bu çalışmamızda iletişim sayfamızı oluşturacağız ve aynı zamanda nodemailer eklentisini kullanarak iletişim sayfamızda oluşturulan mesajı kendi GMAIL hesabımıza yönlendireceğiz.



İlk aşamada yapılması gereken iletişim sayfamızı işaret eden fonksiyonu yazalım.

`controllers/pageController.js`
```javascript
exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};
```

İlgili template dosyasını oluşturduktan sonra _navigation.ejs dosyasında linki oluşturalım.

`views/contact.ejs`
```htm
<li class="nav-item <%= page_name ==='contact' && 'active' %>"><a class="nav-link" href="/contact">Contact</a></li>
```

Mail gönderimi için nodemailer paketini indirelim.

```console
npm i nodemailer
```

Aşağıda mail gönderimi için kullanacağımız fonksiyonu görebilirsiniz. Burada dikkat edilmesi gereken nokta GMAIL ayarlarını kullanırken GMAIL şifresi yerine uygulama şifresini dekullanabiliriz.

`controllers/pageController.js`
```javascript
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "gmailadresi", // gmail hesabı
      pass: "password", // gmail şifresi veya uygulama şifresi
    },
  });
```