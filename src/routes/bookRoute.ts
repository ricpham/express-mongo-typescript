import express from "express";
import controller from "../controllers/BookController";
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.get("/", controller.getAllBook);
router.get("/:bookId", controller.getBook);
router.post("/" , ValidateSchema(Schemas.book.create), controller.createBook);
router.patch("/:bookId" , ValidateSchema(Schemas.book.update), controller.updateBook);
router.delete("/:bookId", controller.deleteBook);

export = router;