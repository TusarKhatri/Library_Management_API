import express from "express";
import morgan from "morgan";
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import borrowRoutes from './routes/borrowRoutes.js';
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import handler404 from './middleware/404handler.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.get("/",(req,res)=>{
    res.json({message:"Library Management API"});
});

app.use("/api/user", userRoutes);
app.use("/api/book",bookRoutes);
app.use("/api/borrow",borrowRoutes);


app.use(handler404);
app.use(errorHandler);

export default app;
