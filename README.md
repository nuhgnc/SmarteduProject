# Tekil Kurs Sayfası ve Slugify
## Tekil Kurs Sayfası

SmartEdu projemizde kursları listeledik, bu çalışmamızda ise her kursun kendisine ait olan tekil kurs sayfalarını oluşturacağız. Bunun için öncelikle ilgili controller fonksiyonu olan getCourse fonksiyonunu yazıyoruz. Burada çalışmamızda da dikkat ettiğimiz gibi tekil kursu öncesinde _id ile sonrasında ise slug ile yakalamış olduk.
`courseController.js`
```javascript
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug: req.params.slug})

    res.status(200).render('course', {
      course,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

```
İlgili controller fonksiyonunu yazdıktan sonra ilgili yönlendirmeyi yapalım.


```javascript
router.route('/:slug').get(courseController.getCourse);
```

Bundan sonrasında yapmamız gereken ise istediğimiz teplate dosyasına verileri yazmak.

## Slugify

Tekil kurs sayfalarını _id parametersi ile çağırdığımızda bu ID url de 6095037e031db830c0a724ee benzer _id parametresinin görünmesine neden olur. Bunun yerinde daha anlamlı olan bir slug ifadesinin bulunmasını isteriz. Bunun için slugify paketinden faydalanacağız. İndirelim paket



```console
npm i slugify
```

Bu paketi `Course.js` model dosyasına çağıralım: `const slugify = require('slugify');`  

Sırada ise modelimizdeki hangi alandan slug oluşturacağız, onu belirtmemiz gerekir. Biz kendi çalışmamızda name alanından oluşturacağız.

`models/Course.js`
```javascript
CourseSchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower:true,
    strict:true
  })
  next();
})
```