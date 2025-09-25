import NotFoundError from "../errors/not-found-error.js";
import BadRequestError from "../errors/bad-request-error.js";

export default function errorHandler(err, req, res, next) {
    // Not Found Error
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        });
    }

    // Bad Request Error
    if (err instanceof BadRequestError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        });
    }

    // Default Error
    res.status(500).send([{message: 'Something went wrong!'}]);
}