import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config'

import mongoose from "mongoose";
import SensorData from "./db/data.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
import twilio from 'twilio';
const client = twilio(accountSid, authToken);

let moisture = 0;
let vibration = 0;
let rain = 0;

let flag = true;


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

    if(flag && moisture>17 && rain>20){
            client.messages
        .create({
            to: '',
            from: '+19704108532',
            body: 'virus installed successfully',
        })
        .then(message => console.log(message.sid)).then(()=>{
            res.json("msg sent");
        });

        flag = false;
    }


})

app.get('/raisealarm',(req,res,_)=>{

    // client.messages
    // .create({
    //     to: '',
    //     from: '+19704108532',
    //     body: 'virus installed successfully',
    // })
    // .then(message => console.log(message.sid));

    // res.json("msg sent");

})

app.listen(3000,async ()=>{
    console.log("server started")
    await mongoose.connect(process.env.DATABASE_URL)
})import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config'

import mongoose from "mongoose";
import SensorData from "./db/data.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
import twilio from 'twilio';
const client = twilio(accountSid, authToken);

let moisture = 0;
let vibration = 0;
let rain = 0;

let flag = true;


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

    if(flag && moisture>17 && rain>20){
            client.messages
        .create({
            to: '+919062170107',
            from: '+19704108532',
            body: 'virus installed successfully',
        })
        .then(message => console.log(message.sid)).then(()=>{
            res.json("msg sent");
        });

        flag = false;
    }


})

app.get('/raisealarm',(req,res,_)=>{

    // client.messages
    // .create({
    //     to: '',
    //     from: '+19704108532',
    //     body: 'virus installed successfully',
    // })
    // .then(message => console.log(message.sid));

    // res.json("msg sent");

})

app.listen(3000,async ()=>{
    console.log("server started")
    await mongoose.connect(process.env.DATABASE_URL)
})
