import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import {corsOption} from "./cors-config";


export function configureExpress(app: express.Express) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors(corsOption));
}
