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
	writerId: String
});

const SampleCollection = mongoose.model("Sample", SampleSchema);

function getAllSamplesByWriterId(writerId) {
	return SampleCollection.find();
}

module.exports = {
	getAllSamplesByWriterId
};
