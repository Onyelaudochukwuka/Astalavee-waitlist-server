import express, { Application } from "express";
import { connect } from "mongoose";
require("dotenv").config();
const cors = require("cors");
interface Server {
    init?: () => void;
}
const server: Server = {};
type Options = {
    limit: string;
    extended: boolean;
};
const options: Options = { limit: "10mb", extended: true };

const app: Application = express();
app.use(cors());
app.use(express.json());
// Define routes
app.use("/user", require("./routes/message"));
app.all("*", function (req, res, next) {
    res.status(404).json({ errors: [{ message: "Route not found" }] });
});
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("uri missing");
}
const PORT = 3000 || process.env.PORT;
connect(uri).then(() =>
    app.listen(PORT, () => console.log(`port started on Port ${PORT}`))
);
