import express from "express";
import {configureExpress} from "./express/express-config";
import {registerControllers} from "./controllers/video-controller";

const app = express();

configureExpress(app);
registerControllers(app);

export default app;
