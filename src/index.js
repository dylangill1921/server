import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieSession from "cookie-session";
import healthCheckRouter from "./routes/health-check.js";
import userRouter from "./routes/users.js";
import NotFoundError from "./errors/not-found-error.js";
import errorHandler from "./middlewares/error-handler.js";
import connectDB from "./config/connectDB.js";

// ==== Vars ====
const app = express();
const PORT = process.env.PORT || 4000;


// ==== Middlewares ====
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'myAppSession',
    secret: process.env.COOKIE_SESSION_SECRET,
    secure: process.env.NODE_ENV === 'production',
}));


// ==== Routes ====
app.use('/api/v1/health-check', healthCheckRouter);
app.use('/api/v1/users', userRouter);

/**
 * @method GET
 * @path /docs
 */
app.get('/docs', (req, res) => {
    res.send('docs...')
});


// ==== Catch All Routes ====
app.use((req, res) => {
    throw new NotFoundError();
});


// ==== Errors ====
app.use(errorHandler);


// ==== Server ====
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
