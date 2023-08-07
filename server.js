import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { error as _error } from './api/middlewares/index.js';
import compression from "compression";
import pool from './api/db/connection.js'
import morgan from './api/config/morgan.js';
import { ApiError } from './api/utils/index.js';
import config from './api/config/config.js';
import router from './api/routes/index.js';
import methodOverride from "method-override";
// import io from "./api/db/socketconn.js";

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(cookieParser());
app.use(compression());
app.use(methodOverride());
// app.use(express.json())
app.use(cors());
app.use("/uploads", express.static("./uploads"));
app.use("/", router);

app.use(_error.errorConverter);

// handle error
app.use(_error.errorHandler);

// handle error
app.use(_error.errorHandler);

app.use((req, res, next) => {
    next(new ApiError(404, "Not found"));
});

const start = async () => {
    const result = await Promise.allSettled([pool.connect()]);

    if (result[0].status === 'fulfilled') {
        app.listen(config.port, () => {
            console.log(`App listening on port: ${config.port}`);
        });
    } else {
        console.log('Failed to connect to PostgreSQL.');
    }
};
start();