import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Samples extends Component {
	state = {
		samples: [],
		showNewForm: false
	};

	componentDidMount() {
		this.getSamples();
	}

	getSamples = () => {
		axios
			.get(`/api/writers/${this.props.match.params.writerId}/samples`)
			.then(res => {
				this.setState({ samples: res.data });
			});
	};

	render() {
		let samplesList = this.state.samples.map(sample => {
			return (
				<div key={sample._id}>
					<Link
						to={`/writers/${this.props.match.params.writerId}/samples/${
							sample._id
						}`}>
						{sample.name}
					</Link>
				</div>
			);
		});
		return (
			<div className='all-samples'>
				<h2>writing samples</h2>
				{samplesList}
			</div>
		);
	}
}
