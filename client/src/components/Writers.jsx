import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Writers extends Component {
	state = {
		writers: [],
		showNewForm: false,
		newWriter: {
			name: "",
			imageLink: "",
			bio: "",
			email: ""
		}
	};

	componentDidMount() {
		this.getWriters();
	}

	getWriters = () => {
		axios.get("/api/writers").then(res => {
			this.setState({ writers: res.data });
		});
	};

	handleToggleNewForm = () => {
		this.setState(state => {
			return { showNewForm: !state.showNewForm };
		});
	};

	handleInputChange = event => {
		const copiedNewWriter = { ...this.state.newWriter };
		copiedNewWriter[event.target.name] = event.target.value;
		this.setState({ newWriter: copiedNewWriter });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post("/api/writers", this.state.newWriter).then(() => {
			this.getWriters();
			this.setState({ showNewForm: false });
		});
	};

	render() {
		let writersList = this.state.writers.map(writer => {
			return (
				<div key={writer._id}>
					<Link to={`/writers/${writer._id}`}>{writer.name}</Link>
				</div>
			);
		});
		return (
			<div className='all-writers'>
				{this.state.showNewForm ? (
					<div className='new-writer-form'>
						<button onClick={this.handleToggleNewForm}>Back to Writers</button>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='new-writer-name'>Name: </label>
								<input
									type='text'
									id='new-writer-name'
									name='name'
									value={this.state.newWriter.name}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='new-writer-email'>Email: </label>
								<input
									type='email'
									id='new-writer-email'
									name='email'
									value={this.state.newWriter.email}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='new-writer-bio'>Bio: </label>
								<input
									type='text'
									id='new-writer-bio'
									name='bio'
									value={this.state.newWriter.bio}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='new-writer-image-link'>Image Link: </label>
								<input
									type='text'
									id='new-writer-image-link'
									name='imageLink'
									value={this.state.newWriter.imageLink}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<input type='submit' value='Create New Writer' />
							</div>
						</form>
					</div>
				) : (
					<div className='writers-list'>
						<h2>All Writers</h2>
						{writersList}
						<button onClick={this.handleToggleNewForm}>Add New Writer</button>
					</div>
				)}
			</div>
		);
	}
}
