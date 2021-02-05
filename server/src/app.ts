import {createServer} from 'http'
import app from "./main";

const server = createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
