import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "rebass";

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
						<Button
							onClick={this.handleToggleNewForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							back to writers
						</Button>
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
								<Button
									bg='white'
									color='black'
									margin='5px'
									width='10vw;'
									fontSize='0.8vw;'>
									create new writer
								</Button>
							</div>
						</form>
					</div>
				) : (
					<div className='writers-list'>
						<h2>all writers</h2>
						{writersList}
						<Button
							onClick={this.handleToggleNewForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							add new writer
						</Button>
					</div>
				)}
			</div>
		);
	}
}
