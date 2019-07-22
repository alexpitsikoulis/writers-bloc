import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import ContactForm from "./ContactForm";
import { Button } from "rebass";

export default class Writer extends Component {
	state = {
		writer: {},
		showEditForm: false,
		redirectToAllWriters: false
	};

	componentDidMount() {
		this.getWriter();
	}

	getWriter = () => {
		axios.get(`/api/writers/${this.props.match.params.writerId}`).then(res => {
			this.setState({ writer: res.data });
		});
	};

	handleToggleEditForm = () => {
		this.getWriter();
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
						<Button
							onClick={this.handleToggleEditForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							back to writer
						</Button>
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
								<Button
									bg='white'
									color='black'
									margin='5px'
									width='10vw;'
									fontSize='1vw;'>
									edit writer
								</Button>
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
						<Button
							onClick={this.handleToggleEditForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							edit writer
						</Button>
						<Button
							onClick={this.handleDelete}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							delete writer
						</Button>
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
