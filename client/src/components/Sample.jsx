import React, { Component } from "react";
import axios from "axios";

export default class Sample extends Component {
	state = {
		sample: {},
		showEditForm: false,
		redirectToHome: false
	};

	componentDidMount() {
		axios
			.get(
				`/api/writers/${this.props.match.params.writerId}/samples/${
					this.props.match.params.sampleId
				}`
			)
			.then(res => {
				this.setState({ sample: res.data });
			});
	}

	render() {
		return (
			<div className='single-sample'>
				<div>
					<h2>{this.state.sample.name}</h2>
					<h4>{this.state.sample.typeOfWriting}</h4>
					<p>{this.state.sample.body}</p>
				</div>
			</div>
		);
	}
}
