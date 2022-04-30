const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const UserSchema = new schema({
  name: { type: String, unique: false, required: true }, // string olacak , eşsiz olacak, boş geçilmeyecek
  email: { type: String, required: true, unique: true }, //string olacak, boş geçilmeyecek, başta ve sonda boşluk varsa silecek
  password: { type: String, required: true },
  image: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/1157/1157085.png'},
  createdAt: { type: Date, default: Date.now }, // Oluşturulma tarıhini yazacak
  role: { type: String, enum: ["admin", "student", "teacher"], default: "student"},
  courses: [{ type: schema.Types.ObjectId, ref: 'course'}]
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
