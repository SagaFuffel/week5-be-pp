 const mongoose = require('mongoose');

 const tourSchema = new mongoose.Schema({
 name: {
     type: String,
     required: true,
 },
 info: {
     type: String,
     required: true,
 },
 image: {
     type: String,
     required: true,
 },
 price: {
     type: String, // kept as string since data uses "1,450"
     required: true,
 },
 duration: {
     type: String, // e.g. "5 days"
     required: true,
 },
 rating: {
     type: Number,
     required: true,
     min: 0,
     max: 5,
 },
 season: {
     type: String,
     required: true,
 },
 specialOffer: {
     type: String,
     required: true,
 },
 }, {
 timestamps: true
 });

 const Tour = mongoose.model('Tour', tourSchema);
 module.exports = Tour;