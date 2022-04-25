const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const category = await Category.create(req.body); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      error,
    });
  }
};