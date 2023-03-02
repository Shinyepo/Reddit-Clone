import express, {Express} from "express"

const app: Express = express();

app.get("/", (req,res) => {
    res.status(200).send("hellowordzica");
});

export {app};