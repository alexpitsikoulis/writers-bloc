const express = require("express");
const sampleApi = require("../models/samples.js");
const writerApi = require("../models/writers");
const sampleRouter = express.Router({ mergeParams: true });

sampleRouter.get("/", (req, res) => {
	sampleApi
		.getAllSamplesByWriterId(req.params.writerId)
		.then(samples => {
			res.json(samples);
		})
		.catch(error => {
			res.send(error);
		});
});

sampleRouter.get("/:sampleId", (req, res) => {
	sampleApi
		.getSingleSample(req.params.sampleId)
		.then(sample => {
			res.json(sample);
		})
		.catch(error => {
			res.send(error);
		});
});

sampleRouter.post("/", (req, res) => {
	req.body.writerId = req.params.writerId;
	sampleApi
		.addSampleForWriter(req.body)
		.then(sample => {
			res.json(sample);
		})
		.catch(error => {
			res.send(error);
		});
});

sampleRouter.put("/:sampleId", (req, res) => {
	req.body.writerId = req.params.writerId;
	sampleApi
		.editSample(req.params.sampleId, req.body)
		.then(sample => {
			res.json(sample);
		})
		.catch(error => {
			res.send(error);
		});
});

sampleRouter.delete("/:sampleId", (req, res) => {
	sampleApi
		.deleteSample(req.params.sampleId)
		.then(sample => {
			res.json(sample);
		})
		.catch(error => {
			res.send(error);
		});
});

module.exports = {
	sampleRouter
};
