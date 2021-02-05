import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import {corsOption} from "./cors-config";

// const router = express.Router();

export function configureExpress(app: express.Express) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors(corsOption));

    // app.use("/api", require("./routes/api"));
}

// router.use(cors(corsOption));
// router.options('*', cors(corsOption));
