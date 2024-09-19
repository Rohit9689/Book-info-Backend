const express = require('express')
const router =  express.Router();
const {validationForBooks , createBook , getBooks ,deleteBooks} = require('../Controllers/BookController')


router.post('/add-book' , validationForBooks , createBook)
router.get('/get-books', (req, res, next) => {
    console.log('GET /get-books route hit');
    next();
  }, getBooks);
 router.delete('/delete-books/:id', deleteBooks ) 
  



module.exports = router;