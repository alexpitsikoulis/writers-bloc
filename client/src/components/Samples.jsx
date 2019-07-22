import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "rebass";
import SampleForm from "./SampleForm";
import Sample from "./Sample";

export default class Samples extends Component {
	state = {
		samples: [],
		showNewForm: false,
		newSample: {
			name: "",
			typeOfWriting: "",
			body: ""
		}
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

	handleToggleNewForm = () => {
		this.setState(state => {
			return { showNewForm: !state.showNewForm };
		});
	};

	handleInputChange = event => {
		const copiedNewSample = { ...this.state.newSample };
		copiedNewSample[event.target.name] = event.target.value;
		this.setState({ newSample: copiedNewSample });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.post(
				`/api/writers/${this.props.match.params.writerId}/samples`,
				this.state.newSample
			)
			.then(() => {
				this.getSamples();
				this.setState({
					showNewForm: false,
					newSample: { name: "", typeOfWriting: "", body: "" }
				});
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
			<div>
				{this.state.showNewForm ? (
					<div className='new-sample-form'>
						<Button
							onClick={this.handleToggleNewForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='0.9vw;'>
							back to samples
						</Button>
						<SampleForm
							newSample={this.state.newSample}
							handleInputChange={this.handleInputChange}
							handleSubmit={this.handleSubmit}
						/>
					</div>
				) : (
					<div className='all-samples'>
						<Link to={`/writers/${this.props.match.params.writerId}`}>
							back to writer
						</Link>
						<h2>writing samples</h2>
						{samplesList}
						<Button
							onClick={this.handleToggleNewForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='.9vw;'>
							add new sample
						</Button>
					</div>
				)}
			</div>
		);
	}
}
