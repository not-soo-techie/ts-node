import express from "express";
import bookRouter from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());

app.use("/books", bookRouter)

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})