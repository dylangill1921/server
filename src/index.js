import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import healthCheckRouter from "./routes/health-check.js";
import NotFoundError from "./errors/not-found-error.js";
import errorHandler from "./middlewares/error-handler.js";

// ==== Vars ====
const app = express();
const PORT = process.env.PORT || 4000;


// ==== Middlewares ====
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ==== Routes ====
app.use('/api/v1/health-check', healthCheckRouter);

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
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
