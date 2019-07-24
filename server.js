const express = require("express");
const app = express();
const { writerRouter } = require("./controllers/writers");
const { sampleRouter } = require("./controllers/samples");
const nodemailer = require("nodemailer");
const creds = require("./config/nodemailerConfig");

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/client/build`));
app.use("/api/writers", writerRouter);
app.use("/api/writers/:writerId/samples", sampleRouter);
app.get("/*", (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`);
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

app.post("/send", (req, res, next) => {
	console.log(req);
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	var content = `name: ${name} \n email: ${email} \n message: ${message} `;

	var mail = {
		from: name,
		to: "writersblocsei22@gmail.com", //Change to email address that you want to receive messages on
		subject: "New Message from Contact Form",
		text: content
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				msg: "fail"
			});
		} else {
			res.json({
				msg: "success"
			});
		}
	});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`App is listening on PORT ${PORT}`);
});
