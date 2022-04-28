const mongoose = require('mongoose')
const slugify = require('slugify')

const schema = mongoose.Schema;

const CourseSchema = new schema({
    title: { type: String, unique: true, required: true}, // string olacak , eşsiz olacak, boş geçilmeyecek
    description: { type: String, required: true, trim: true}, //string olacak, boş geçilmeyecek, başta ve sonda boşluk varsa silecek
    image: {type: String, default: 'https://smartlearnsolutions.com.au/images/upload/Online-courses-1000x600.jpg'},
    createdAt: { type: Date, default: Date.now},  // Oluşturulma tarıhini yazacak
    slug: { type: String, unique: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    user: { type: schema.Types.ObjectId, ref: 'user'}
})

CourseSchema.pre('validate', function(next){
    this.slug = slugify(this.title, {
      lower:true,
      strict:true
    })
    next();
  })

const Course = mongoose.model('course', CourseSchema)

module.exports = Course