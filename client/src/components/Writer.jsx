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
	render() {
		return (
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
			</div>
		);
	}
}
