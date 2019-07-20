const express = require("express");
const sampleApi = require("../models/samples.js");
const writerApi = require("../models/writers");
const sampleRouter = express.Router({ mergeParams: true });

sampleRouter.get("/", (req, res) => {
	writerApi
		.getSingleWriter(req.params.writerId)
		.then(writer => {
			sampleApi.getAllSamplesByWriterId(writer._id).then(samples => {
				res.json(samples);
			});
		})
		.catch(error => {
			res.send(error);
		});
});

module.exports = {
	sampleRouter
};
