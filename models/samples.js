const mongoose = require("./connection.js");

const SampleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	typeOfWriting: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	dateAdded: Date,
	writerId: mongoose.Types.ObjectId
});

const SampleCollection = mongoose.model("Sample", SampleSchema);

function getAllSamplesByWriterId(writerId) {
	return SampleCollection.find({ writerId: writerId });
}

function getSingleSample(sampleId) {
	return SampleCollection.findById(sampleId);
}

function addSampleForWriter(sampleObject) {
	return SampleCollection.create(sampleObject);
}

function editSample(sampleId, sampleObject) {
	return SampleCollection.findByIdAndUpdate(sampleId, sampleObject, {
		new: true
	});
}

function deleteSample(sampleId) {
	return SampleCollection.findByIdAndDelete(sampleId);
}

module.exports = {
	getAllSamplesByWriterId,
	getSingleSample,
	addSampleForWriter,
	editSample,
	deleteSample
};
