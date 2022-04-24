# mongodb bağlantısı
`app.js`
```javascript
mongoose
  .connect('mongodb://localhost/smartedu-DB')
  .then('DB CONNECTED')
  .catch('DB CONNECTİON ERROR');
```
mongoose scheması ve modeli oluşturalım. models adında bir kalsör oluşturup içine Course.js dosyayı oluşturdum. Course.js içriği ise şu şekilde  
```javascript
const mongoose = require('mongoose')

const schema = mongoose.Schema;

const CourseSchema = new schema({
    title: { type: String, unique: true, required: true}, // string olacak , eşsiz olacak, boş geçilmeyecek
    description: { type: String, required: true, trim: true}, //string olacak, boş geçilmeyecek, başta ve sonda boşluk varsa silecek
    createdAt: { type: Date, default: Date.now}  // Oluşturulma tarıhini yazacak
})

const Course = mongoose.model('course', CourseSchema)

module.exports = Course
```
# course model oluşturma
modelimizi oluşturduktan sonra controllers klasörü içerisine pageController.js dosyası oluştruduk. Daha sonra içerisine ise aşağıda ki kodları yazdım

```javascript
const Course = require('../models/Course')

exports.createCourse = async (req,res) => {
    const course =  await Course.create(req.body) // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    try {  /// eğre bi hata yok ise burayı 
        res.status(201).json({
            status: 'success',
            course
            
        })
    } catch (error) { // hata var ise burayı cevap ile gönderir
        res.status('400').json({
        status: 'fail',
        error
    })
    }
}
```
# course routing işlemleri
şimdi routes klasörü içerisine, courseRoute dosyası oluştrualım.  `routes/courseRoute.js` dosyasına gelelim

```javascript
const express = require("express")
const courseController = require('../controllers/courseController')

const router = express.Router();

router.route('/').post( courseController.createCourse)


module.exports = router
```  
