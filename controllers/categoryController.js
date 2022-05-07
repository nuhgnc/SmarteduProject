const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const category = await Category.create(req.body); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    req.flash("categoryAdded", `<div class="row mt-5">
    <table class="table table-sm  ">
    <div class="alert alert-primary float-center"><h3> Yeni kategori eklendi </h3></div>
    <tbody>
    <tr class=" table-sm ">
            <td class="bg-warning">${ category._id }</td>
            <td class="bg-warning">${ category.title } </td>
          </tr>
      </tbody>
      </table>
  </div><!-- end row -->`)
    res.status(201).redirect('/users/dashboard')

  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    req.flash("error", error)
    res.status(400).redirect('/users/dashboard')
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const category = await Category.findById(req.params.catID)
    req.flash("success", `<div class="row mt-5">
    <table class="table table-sm  ">
    <div class="alert alert-primary float-center"><h3> Silme işleminde başarılı. </h3></div>
    <tbody>
    <tr>
            <td class="bg-warning">${ category._id }</td>
            <td class="bg-warning">${ category.title } </td>
          </tr>
      </tbody>
      </table>
  </div><!-- end row -->`)
    await category.delete();
    console.log(category)

    res.status(201).redirect('/users/dashboard');
    } catch (error) {
    // hata var ise burayı cevap ile gönderir
    req.flash("error", error)
    console.log(err)
    res.status(400).redirect('/users/dashboard');
  }
};

exports.editCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate({_id:req.params.catID},{
      title: req.body.title
    })
    req.flash("success", `<div class="row mt-5">
    <table class="table table-sm  ">
    <div class="alert alert-primary float-center"><h3> Silme işleminde başarılı. </h3></div>
    <tbody>
    <tr>
            <td class="bg-warning">${ category.title } ------> ${req.body.title} </td> 
          </tr>
      </tbody>
      </table>
  </div><!-- end row -->`)
    res.status(201).redirect('/users/dashboard');
    } catch (error) {
    // hata var ise burayı cevap ile gönderir
    req.flash("error", error)
    console.log(err)
    res.status(400).redirect('/users/dashboard');
  }
};