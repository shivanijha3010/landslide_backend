import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config'

import mongoose from "mongoose";
import SensorData from "./db/data.js";

let moisture = 0;
let vibration = 0;
let rain = 0;


const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.get('/',async (req,res,next)=>{
    res.json({
        moisture,vibration,rain
    });
    try {
        await SensorData.create({moisture, vibration,rain})
    } catch (error) {
        console.log(error)
    }
})

app.post('/data',async (req,res,_)=>{
    //console.log("hi")
    console.log(req.body);
    res.send("data reached")

    moisture = eval(req.body.moisture);
    vibration = eval(req.body.vibration);
    rain = eval(req.body.rain);

    try {
        await SensorData.create({moisture, vibration,rain})
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000,async ()=>{
    console.log("server started")
    await mongoose.connect(process.env.DATABASE_URL)
})