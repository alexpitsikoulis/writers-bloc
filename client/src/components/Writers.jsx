import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Writers extends Component {
	state = {
		writers: [],
		showNewForm: false
	};

	componentDidMount() {
		axios.get("/api/writers").then(res => {
			this.setState({ writers: res.data });
		});
	}

	render() {
		let writersList = this.state.writers.map(writer => {
			return (
				<div key={writer._id}>
					<Link to={`/writers/${writer._id}`}>{writer.name}</Link>
				</div>
			);
		});
		return (
			<div className='writers-list'>
				<h1>All Writers</h1>
				{writersList}
			</div>
		);
	}
}
