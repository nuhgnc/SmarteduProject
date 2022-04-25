const mongoose = require('mongoose')

const schema = mongoose.Schema;

const CourseSchema = new schema({
    title: { type: String, unique: true, required: true}, // string olacak , eşsiz olacak, boş geçilmeyecek
    description: { type: String, required: true, trim: true}, //string olacak, boş geçilmeyecek, başta ve sonda boşluk varsa silecek
    image: {type: String, default: 'https://smartlearnsolutions.com.au/images/upload/Online-courses-1000x600.jpg'},
    createdAt: { type: Date, default: Date.now}  // Oluşturulma tarıhini yazacak
})

const Course = mongoose.model('course', CourseSchema)

module.exports = Course