import { Router } from "express"
import { addBook } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.post("/", addBook)

export default bookRouter