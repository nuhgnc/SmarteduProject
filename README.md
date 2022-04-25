## Kursları Listelemek
SmartEdu projesinde nasıl kurs oluşturabileceğimizi konuştuk, şimdi ise oluşturduğumuz kursları sıralayalım. Öncelikli olarak yapmamız gereken ilgili controller fonksiyonunu oluşturmak. Bu şekilde ilgili verileri sıralamak için genelde kullanılan isim getAll<model_adi> şeklindedir. Bizim uygulamamızda tüm kursları sıralamak için fonksiyon ismi olarak getAllCourses ismini kullanacağız.
`courseRoute.js`
```javascript
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).render('courses', {
      courses,
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
Sonrasında ise bu ilgili controller fonksiyonunun bulunması için gerekli yönlendirmeyi yapalım.

```javascript
router.route('/').get(courseController.getAllCourses);
```

Bu şekilde aslında teorik olarak kursların sıralamasını tamamlamış olduk. Sadece yapmamız gereken kursları listelemek istediğimiz template dosyasını belirlemek. İlgili template dosyasının içerisinde for döngüsü yardımıyla ilgili verileri template içerisinde render edebiliriz.

```htm
        <!-- For döngüsü-->
			<% courses.forEach(course => { %>
			 
				<div class="col-lg-6 col-md-6 col-12">
                    <div class="course-item mb-5">
						<div class="image-blog">
							<img src="<%= course.image %> " alt="" class="img-fluid">
						</div>
						<div class="course-br">
							<div class="course-title">
								<h2><a href="/course-single" title=""><%= course.title %> </a></h2>
							</div>
							<div class="course-desc">
								<p><%= course.description %></p>
							</div>
						</div>
						<div class="course-meta-bot">
							<ul>
								<li><i class="fa fa-user" aria-hidden="true"></i>Teacher Name</li>
							</ul>
						</div>
					</div>
                </div><!-- end col -->

			<% }) %>
```

ayrıca bu ders için veri tabanına resim ekleme özelliği koydum. Artık yeni bir ders oluşturunca image ekleyebiliyoruz eğer resim koymazsak varsayılan olarak bir kendi koyuyor.

`models/Course.js`
```javascript
const CourseSchema = new schema({
    title: { type: String, unique: true, required: true}, // string olacak , eşsiz olacak, boş geçilmeyecek
    description: { type: String, required: true, trim: true}, //string olacak, boş geçilmeyecek, başta ve sonda boşluk varsa silecek
    image: {type: String, default: 'https://smartlearnsolutions.com.au/images/upload/Online-courses-1000x600.jpg'}, // eğer resim yüklenmez ise ototmatik olarak belirlediğim resim yükelenecek
    createdAt: { type: Date, default: Date.now}  // Oluşturulma tarıhini yazacak
})
```