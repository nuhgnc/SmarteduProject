const express = require('express')
const router = express.Router()

router.get('', )




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
