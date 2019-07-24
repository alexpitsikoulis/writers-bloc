const mongoose = require("mongoose");
const express = require("express");
var nodemailer = require("nodemailer");
const creds = require("../config/nodemailerConfig");
const router = express.Router();

const connectionString =
	process.env.MONGODB_URI || "mongodb://localhost/writers-bloc";


mongoose.connect(connectionString, { useNewUrlParser: true }).then(() => {
	console.log("connected to mongo at: " + connectionString);
});

module.exports = mongoose;
