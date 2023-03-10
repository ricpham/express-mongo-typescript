import express from "express";
import controller from "../controllers/AuthorController";
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.get("/", controller.getAllAuthor);
router.get("/:authorId", controller.getAuthor);
router.post("/", ValidateSchema(Schemas.author.create), controller.createAuthor);
router.patch("/:authorId", ValidateSchema(Schemas.author.update), controller.updateAuthor);
router.delete("/:authorId", controller.deleteAuthor);

export = router;