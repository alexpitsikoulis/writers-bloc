import React, { Component } from "react";
import axios from "axios";

export default class Writer extends Component {
	state = {
		writer: {},
		showEditForm: false,
		redirectToHome: false
	};

	componentDidMount() {
		axios.get(`/api/writers/${this.props.match.params.writerId}`).then(res => {
			this.setState({ writer: res.data });
		});
	}

	handleToggleEditForm = () => {
		this.setState(state => {
			return { showEditForm: !state.showEditForm };
		});
	};

	handleInputChange = event => {
		const copiedWriter = { ...this.state.writer };
		copiedWriter[event.target.name] = event.target.value;
		this.setState({ writer: copiedWriter });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.put(
				`/api/writers/${this.props.match.params.writerId}`,
				this.state.writer
			)
			.then(() => {
				this.setState({ showEditForm: false });
			});
	};

	render() {
		return this.state.showEditForm ? (
			<div className='edit-writer-form'>
				<button onClick={this.handleToggleEditForm}>Back to Writer</button>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='writer-name'>Name: </label>
						<input
							type='text'
							id='writer-name'
							name='name'
							value={this.state.writer.name}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="'writer-image-link">Image Link: </label>
						<input
							type='text'
							id='writer-image-link'
							name='imageLink'
							value={this.state.writer.imageLink}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='writer-bio'>Bio: </label>
						<input
							type='text'
							id='writer-bio'
							name='bio'
							value={this.state.writer.bio}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<input type='submit' value='Edit Writer' />
					</div>
				</form>
			</div>
		) : (
			<div className='single-writer'>
				<h2>{this.state.writer.name}</h2>
				<img
					src={this.state.writer.imageLink ? this.state.writer.imageLink : null}
					alt={this.state.writer.name}
				/>
				<p>
					<strong>Bio: </strong>
					{this.state.writer.bio}
				</p>
				<button onClick={this.handleToggleEditForm}>Edit Writer</button>
			</div>
		);
	}
}
