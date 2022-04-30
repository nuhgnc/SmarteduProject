## Kurs Silmek

Bu çalışmamızda Smatedu projemizde bir kursu nasıl sileceğiz, onun üzerine konuşacağız. Bunun için PCAT projesinde de yapmış olduğumuz üzere method-override paketini kullanacağız. Öncelikle bu paketi indirelim.

```console 
npm i method-override
```
sonrasında ilgili ara yazılımı (middleware) ekleyeceğiz.


`app.js`

```javascript
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
```
Sırada ise bu silme işlemini yapacağımız fonksiyonu yazalım.

```javascript
exports.deleteCourse = async (req, res) => {
  try {    

    const course = await Course.findOneAndRemove({slug:req.params.slug})

    req.flash("error", `${course.name} has been removed successfully`);

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
```

courseRoute.js dosyasında ilgili yönlendirmeyi yapacağız.

`contact.ejs`
```javascript
router.route('/:slug').delete(courseController.deleteCourse);
```

İlgili template dosyasında bu silme işleminin gerçekleştirecek butonu yerleştiriyoruz. Aynı zamanda burada silme işlemi için onay da isteyeceğiz.

```htm
<div class="clearfix">
  <ul style="list-style-type: none;">
    <li style="float: left;"><button class="btn btn-primary rounded-0 text-white"><span>UPDATE</span></button></li>
    <li style="float: right;"><a href="/courses/<%= courses[i].slug %>?_method=DELETE" 
      onclick="return confirm('ARE YOU SURE')"
      class="btn btn-danger rounded-0 text-white"><span>DELETE</span></a></li>
  </ul>
</div>
```

## [method-override](https://www.npmjs.com/package/method-override)

----------


## Kurs Güncellemek


Bu çalışmamızda Smartedu projesindeki kursları nasıl güncelleyeceğimiz üzerine konuşacağız. Burada da silme işleminde olduğu gibi yine method-override metodunu kullanacağız.



Öncelikle ilgili fonksiyonları yazalım.



`course/courseController.js.js`
```javascript
exports.updateCourse = async (req, res) => {
  try {    

    const course = await Course.findOne({slug:req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;

    course.save();

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
```

Bu güncelleme fonksiyonunun yönlendirmesi de aşağıdadır.



`routes/courseRoutes.js`
```javascript
router.route('/:slug').put(courseController.updateCourse);
```

Güncelleme işleminde önemli olan nota ise, güncelleme modelini yakalamak için güncelenmek istenen kursun ID bilgisinden faydalanacağız. Butonda kullandığımız kurs ID ile modal tarafında kullanacağımız kurs ID birbirleriyle eşleşmelidir.

```htm
<button class="btn btn-primary rounded-0 text-white" data-toggle="modal" data-target="#updateCourse<%= courses[i]._id %>"><span>UPDATE</span></button>
-----
<div class="modal fade" id="updateCourse<%= courses[i]._id %>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
```