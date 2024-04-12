import { Router } from "express";
import { 
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/books.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


  

router.get("/libros", getBooks);
router.get("/libros/:id", getBookById);
router.post("/libros", upload.single('image_name'), createBook);
router.patch("/libros/:id", upload.single('image_name'), updateBook);
router.delete("/libros/:id", deleteBook);

export default router;
