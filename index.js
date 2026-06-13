import express from "express";
import morgan from "morgan";
import connectDB from "./db.js";
import User from "./user.model.js";
import authRoutes from "./authRoutes.js";
import passport from "passport";
import expressSession from "express-session";
import './passport.js';

const app = express();

connectDB()

app.use(expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

app.get("/health", (req, res) => {
    return res.json({ status: "Ok", message: "Server is running" })
})

app.use("/api/auth", authRoutes);

// global error handler 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({ status: "error", message: err.message })
})

app.listen(3000, () => {
    console.log("Server is running on the port 3000");
});