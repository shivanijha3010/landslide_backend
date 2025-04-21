import mongoose from "mongoose";

const schema = new mongoose.Schema({ moisture: Number, vibration: Number, rain: Number },{timestamps: true});
const SensorData = mongoose.model('SensorData', schema);

export default SensorData