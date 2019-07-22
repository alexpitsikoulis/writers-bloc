import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import ContactForm from "./ContactForm";

export default class Writer extends Component {
	state = {
		writer: {},
		showEditForm: false,
		redirectToAllWriters: false
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

	handleDelete = () => {
		if (window.confirm("Are you sure you want to delete?")) {
			axios
				.delete(`/api/writers/${this.props.match.params.writerId}`)
				.then(() => {
					this.setState({ redirectToAllWriters: true });
				});
		}
	};

	render() {
		if (this.state.redirectToAllWriters) {
			return <Redirect to='/writers' />;
		}
		return (
			<div className='single-writer'>
				{this.state.showEditForm ? (
					<div className='edit-writer-form'>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='writer-name'>name: </label>
								<input
									type='text'
									id='writer-name'
									name='name'
									value={this.state.writer.name}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='writer-email'>email: </label>
								<input
									type='email'
									id='writer-email'
									name='email'
									value={this.state.writer.email}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='writer-bio'>bio: </label>
								<input
									type='text'
									id='writer-bio'
									name='bio'
									value={this.state.writer.bio}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor="'writer-image-link">image link: </label>
								<input
									type='text'
									id='writer-image-link'
									name='imageLink'
									value={this.state.writer.imageLink}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<input type='submit' value='edit writer' />
								<button onClick={this.handleToggleEditForm}>
									back to writer
								</button>
							</div>
						</form>
					</div>
				) : (
					<div className='single-writer'>
						<h2>{this.state.writer.name}</h2>
						<div>
							<Link to='/writers'>back to all writers</Link>
						</div>
						{this.state.writer.imageLink ? (
							<img
								src={this.state.writer.imageLink}
								alt={this.state.writer.name}
							/>
						) : null}
						<p>
							<strong>bio: </strong>
							{this.state.writer.bio}
						</p>
						<p>
							<strong>email: </strong>
							{this.state.writer.email}
						</p>
						<div>
							<Link to={`/writers/${this.props.match.params.writerId}/samples`}>
								{" "}
								writing samples
							</Link>
						</div>
						<button onClick={this.handleToggleEditForm}>edit writer</button>
						<button onClick={this.handleDelete}>delete writer</button>
						<ContactForm
							name={this.state.writer.name}
							email={this.state.writer.email}
						/>
					</div>
				)}
			</div>
		);
	}
}
