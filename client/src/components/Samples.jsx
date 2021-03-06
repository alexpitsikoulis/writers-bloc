import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Box } from "rebass";
import SampleForm from "./SampleForm";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

export default class Samples extends Component {
	state = {
		loading: true,
		writer: {},
		samples: [],
		showNewForm: false,
		newSample: {
			name: "",
			typeOfWriting: "",
			body: ""
		}
	};

	componentDidMount() {
		axios.get(`/api/writers/${this.props.match.params.writerId}`).then(res => {
			this.setState({ writer: res.data });
		});
		this.getSamples();
	}

	getSamples = () => {
		axios
			.get(`/api/writers/${this.props.match.params.writerId}/samples`)
			.then(res => {
				this.setState({ samples: res.data });
			})
			.then(() => {
				this.setState({ loading: false });
				// window.setTimeout(() => {
				// 	this.setState({ loading: false });
				// }, 3000);
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
				<Box key={sample._id}>
					<Link
						to={`/writers/${this.props.match.params.writerId}/samples/${
							sample._id
						}`}>
						{sample.name}
					</Link>
				</Box>
			);
		});
		return (
			<Box>
				{this.state.showNewForm ? (
					<Box className='new-sample-form'>
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
					</Box>
				) : this.state.loading ? (
					<RingLoader
						css={css`
							display: block;
							margin: 0 auto;
							border-color: red;
						`}
						sizeUnit={"px"}
						size={150}
						color={`white`}
						loading={this.state.loading}
					/>
				) : (
					<Box className='all-samples'>
						<Link to={`/writers/${this.props.match.params.writerId}`}>
							back to {this.state.writer.name}
						</Link>
						<h2>writing samples</h2>
						{samplesList}
						<Button
							onClick={this.handleToggleNewForm}
							bg='white'
							color='black'
							m={5}
							width='10vw;'
							fontSize='.9vw;'>
							add new sample
						</Button>
					</Box>
				)}
			</Box>
		);
	}
}
