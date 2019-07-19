const express = require("express");
const writerApi = require("../models/writers.js");
const writerRouter = express.Router();

writerRouter.get("/", (req, res) => {
	writerApi
		.getAllWriters()
		.then(writers => {
			res.json(writers);
		})
		.catch(error => {
			res.send(error);
		});
});

writerRouter.get("/:writerId", (req, res) => {
	writerApi
		.getSingleWriter(req.params.writerId)
		.then(writer => {
			res.json(writer);
		})
		.catch(error => {
			res.send(error);
		});
});

writerRouter.post("/", (req, res) => {
	writerApi
		.addNewWriter(req.body)
		.then(writer => {
			res.json(writer);
		})
		.catch(error => {
			res.send(error);
		});
});

writerRouter.put("/:writerId", (req, res) => {
	writerApi
		.editWriter(req.params.writerId, req.body)
		.then(writer => {
			res.json(writer);
		})
		.catch(error => {
			res.send(error);
		});
});

writerRouter.delete("/:writerId", (req, res) => {
	writerApi
		.deleteWriter(req.params.writerId)
		.then(writer => {
			res.json(writer);
		})
		.catch(error => {
			res.send(error);
		});
});

module.exports = {
	writerRouter
};
