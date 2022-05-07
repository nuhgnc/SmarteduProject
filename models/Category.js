const mongoose = require('mongoose');
const slugify = require('slugify');

const schema = mongoose.Schema;

const CategorySchema = new schema({
  title: { type: String, unique: true, required: true },
  slug: { type: String, unique: true },
  totalCourse: [{ type: schema.Types.ObjectId, ref: 'course'}]
});

CategorySchema.pre('validate', function (next) {
  this.slug = slugify( this.title, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
