const mongoose = require("./connection.js");

const WriterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		lowercase: true
	},
	email: {
		type: String,
		lowercase: true
	},
	imageLink: String,
	bio: {
		type: String,
		lowercase: true
	}
});

const WriterCollection = mongoose.model("Writer", WriterSchema);

function getAllWriters() {
	return WriterCollection.find().sort({ name: "asc" });
}

function getSingleWriter(writerId) {
	return WriterCollection.findById(writerId);
}

function addNewWriter(writerObject) {
	return WriterCollection.create(writerObject);
}

function editWriter(writerId, writerObject) {
	return WriterCollection.findByIdAndUpdate(writerId, writerObject, {
		new: true
	});
}

function deleteWriter(writerId) {
	return WriterCollection.findByIdAndDelete(writerId);
}

module.exports = {
	getAllWriters,
	getSingleWriter,
	addNewWriter,
	editWriter,
	deleteWriter
};
