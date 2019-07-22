import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "rebass";
import WriterForm from "./WriterForm";

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
			this.setState({
				showNewForm: false,
				newWriter: { name: "", imageLink: "", bio: "", email: "" }
			});
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
						<WriterForm
							newWriter={this.state.newWriter}
							handleInputChange={this.handleInputChange}
							handleSubmit={this.handleSubmit}
						/>
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
