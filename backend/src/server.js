import express from 'express';
import cors from 'cors';
import connectDB from './db/DataBase.js';
import UserRoute from "./Router/user.route.js";
import ScholarRoute from "./Router/scholarShip.route.js"

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;


app.use("/api/user", UserRoute);
app.use("/api/scholarship", ScholarRoute)



app.get("/", (req, res) => res.send("Server is running"));

app.listen(port, () => {
    connectDB();
    console.log('Server running on port 3000');
});