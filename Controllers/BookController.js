const bookInfo = require("../Model/BookModel");
const { body, validationResult } = require("express-validator");

const validationForBooks = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Book Title is Required")
    .isLength({ min: 1 })
    .withMessage("Book Name must be Atleast  1 character"),
  body("author").not().isEmpty().withMessage("Author Name is Required"),
  body("rating")
    .not()
    .isEmpty()
    .withMessage("Rating is Required")
    .isInt()
    .withMessage("Rating must be Integer"),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Price is Required")
    .isInt()
    .withMessage("Price must be Number"),
  body("comments").not().isEmpty().withMessage("comments is Required"),
];



const createBook = async (req , res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({success : false , errors:errors.array()})
    }

    try {
        const {title , author , rating , price , comments} = req.body;

        const book = new bookInfo({
              title,
              author,
              price,
              rating,
              comments
        })

        await book.save()
        res.status(201).json({
            success:true,
            message:"Book Added successfuly",
            data:book
        });
    
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Error Occured while adding Book Information",
            error:error.message
        })
    }
}

const getBooks = async (req , res)=>{
    try {
        const books = await  bookInfo.find()
        res.status(201).json({
            success:true,
            message:"Books Fetched successfully",
            data:books
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"error while fetching books !!",
            error:error.message
        })
    }
}

const deleteBooks =async(req , res)=>{
    try {
        const deleteBook = await bookInfo.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Books DELETED successfully",
            deletedBook : deleteBook
        })
        
    } catch (error) {
        console.log(error, "There is an error");
        res.status(500).json({ message: "There is an error" });
    }
}

module.exports = {validationForBooks , createBook , getBooks ,deleteBooks}
