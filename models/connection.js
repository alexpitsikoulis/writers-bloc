const mongoose = require("mongoose");
var nodemailer = require("nodemailer");
const creds = require("../config/nodemailerConfig");

const connectionString =
	process.env.MONGODB_URI || "mongodb://localhost/writers-bloc";

mongoose.connect(connectionString, { useNewUrlParser: true }).then(() => {
	console.log("connected to mongo at: " + connectionString);
});

var transport = {
	host: "smtp.gmail.com",
	auth: {
		user: creds.USER,
		pass: creds.PASS
	}
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take messages");
	}
});

module.exports = mongoose;
