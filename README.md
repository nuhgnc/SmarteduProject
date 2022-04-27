## Kurs Oluşturmak

Artık Smartedu projemizde nasıl bir kurs oluşturabileceğimizi konuşabiliriz. Öğrenci olarak değil öğretmen yetkileri ile kurs oluşturabiliriz. Kursları oluştururken öncelikli olarak yapmamız gereken dashboard sayfasında kullanıcı rolü öğretmen olduğunuda içeriği farklılaştırmamız gerekir.


`views\dashboard.ejs`
```htm
<% if(user.role ==='teacher') { %>
```

ve dashboard sayfasında kurs oluşturma formu sadece kullanıcı rolü öğretmen olduğunuda görünür olacak. Kurs oluşturduğumuzda bize gerekli olan bilgilerden diğeri ise kategori bilgisi ve bunu da dashboard sayfasına göndermemiz gerekiyor.



`controllers\courseController.js`

```javascript
const categories = await Category.find();
```

Burada dikkat etmemiz gereken başka önemli nokta ise kategori bilgisini form içerisinde gönderdiğimizde bunun isminin değil form tarafından ID bilgisinin yakalanmasını isteriz, görünür olarak isminin görünmesini isteriz.



```htm
<option value="<%= categories[i]._id %>"><%= categories[i].name %></option>

```

Kurs oluşturduktan sonra ise courses kurslar sayfasına yönlendirilecek.

`controllers/coursController.js`
```javascript
const course = await Course.create(req.body);
----
res.status(201).redirect('/courses');
```
NOT: Burada özellikle template dosyasında olan değişimleri ilgili GitHUB sayfasında bulabileceğiniz için ayrıca buraya yazma gereğini duymadık.

