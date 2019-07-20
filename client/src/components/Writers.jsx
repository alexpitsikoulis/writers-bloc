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
						<button onClick={this.handleToggleNewForm}>back to writers</button>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='new-writer-name'>name: </label>
								<input
									type='text'
									id='new-writer-name'
									name='name'
									value={this.state.newWriter.name}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='new-writer-email'>email: </label>
								<input
									type='email'
									id='new-writer-email'
									name='email'
									value={this.state.newWriter.email}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='new-writer-bio'>bio: </label>
								<input
									type='text'
									id='new-writer-bio'
									name='bio'
									value={this.state.newWriter.bio}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='new-writer-image-link'>image link: </label>
								<input
									type='text'
									id='new-writer-image-link'
									name='imageLink'
									value={this.state.newWriter.imageLink}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<input type='submit' value='create new writer' />
							</div>
						</form>
					</div>
				) : (
					<div className='writers-list'>
						<h2>all writers</h2>
						{writersList}
						<button onClick={this.handleToggleNewForm}>add new writer</button>
					</div>
				)}
			</div>
		);
	}
}
