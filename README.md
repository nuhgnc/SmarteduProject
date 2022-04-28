## Kurs - Öğretmen İlişkisi

Bu çalışmamızda öğretmen rolüne sahip kullanıcıyla oluşturduğu kurs ilişkisini oluşturacağız. Bunun için ilgili kursta user alanı oluşturacağız. Bu alanın referans yani ilişkili olduğu model iser User modelimiz.


`models\Course.js`
```javascript
user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
```
Bu şekilde kurs ile onu oluşturan kullanıcı arasında bir ilişki kurabildik. Artık yeni bir kurs oluşturulurken sadece kurs bilgilerini değil o kursu oluşturan kullanıcıyı da kullanabiliriz. O halde o kursu oluşturan kullanıcıyı nasıl bulacağız? Tabii ki sessionda bulunan userID ile.


`controllers\courseController.js`

```javascript
  const course = await Course.create({
      name: req.body.name,
      description: req.body.name,
      category: req.body.category,
      user: req.session.userID
    });
```

Artık Kurs modelinin içerisinde bulunan kullanıcı bilgisine populate ile ulaşabiliriz.

```javascript
const course = await Course.findOne({slug: req.params.slug}).populate('user')
```

İlgili template dosyasında kursu oluşturan kullanıcının örneğin isim bilgisine ulaşabiliriz.

```htm
<h3 class="author_name"><a href="#"><%= course.user.name %></a></h3>
```

## Kurs ve Öğrenci İlişkisi 

Smartedu projemizde bulunan kurslar ile öğrenciler arasında da ilişki bulunmasını isteriz. Öğrenci kullanıcıların kendilerini bir kursa kaydedebilmesini ve bu kayıt işlemini istediğinde sonlandırmasını da isteyebiliriz.



Bu işlemler için öncelikli olarak yapmamız gereken USER modeli içerisinde courses şeklinde bir alan oluşturacağız ve bu alanın referansı yani ilişkili olduğu mode ile Course modeli.

`models\User.js`
```javascript
 courses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'
  }]
```

Yukarıda da gördüğünüz üzere courses alanı bir array ve öğrenci her yeni kursa kaydolduğunda bu arrayimize yeni bir kurs bilgisi eklenecek. Bu işlemi yapacak enroll fonksiyonunu aşağıda görebilirsiniz.

`controllers/courseController.js`

```javascript
exports.enrollCourse = async (req, res) => {
  try {

    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id});
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
```


Sonrasında courseRoute.js dosyasında ilgili yönlendirmeyi yapalım:

`routes/courseRoute.js`
```javascript
router.route('/enroll').post(courseController.enrollCourse);
```

Enroll işlemini yaptığımızda bizim ihtiyacımız olan kurs bilgisini ilgili butona tıkladığımızda göndereceğiz. Bu butonu bir form alanında tanımlayacağız. course.ejs dosyası içerisine aşağıdaki formu ekleyeceğiz.

`course.ejs`

```javascript
<form method="POST" action="/courses/enroll">
  <input type="hidden" name="course_id" value="<%= course._id %>">
  <button class="btn btn-lg btn-warning text-white"><span>ENROLL</span></button>
</form>
```

şimdi ise sırada öğrenci kullanıcımızın kaydolduğu kursu nasıl bırakacağı üzerine konuşacağız. Bunun için ilgili releaseCourse fonksiyonu aşağıdadır.



```javascript
exports.releaseCourse = async (req, res) => {
  try {    
    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id:req.body.course_id});
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
```

courses alanı arraydi ve bir array içerisinden array elemenini kaldırmak için pull metodunu kullanıyoruz. İlgili yönlendirmeyi de aşağıda görebilirsiniz.

`routes/courseRoutes.js`
```javascript
router.route('/release').post(courseController.releaseCourse);
```


Aynen enroll fonksiyonunda olduğu gibi release fonksiyonunda da ilgili kursu ID yardımıyla yakalayacağız, form içerisinde.

`dashboard.ejs`
```javascript
<form method="POST" action="/courses/release">
  <input type="hidden" name="course_id" value="<%= user.courses[i]._id %>">
  <button class="btn btn-lg btn-danger text-white"><span>RELEASE</span></button>
</form>
```