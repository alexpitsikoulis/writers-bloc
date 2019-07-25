import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button, Box, Flex, Card, Text } from "rebass";
import SampleForm from "./SampleForm";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

export default class Sample extends Component {
	state = {
		loading: true,
		sample: {},
		writer: "",
		showEditForm: false,
		redirectToWriterSamples: false
	};

	componentDidMount() {
		this.getSample();
		this.getWriter();
	}

	getSample = () => {
		axios
			.get(
				`/api/writers/${this.props.match.params.writerId}/samples/${
					this.props.match.params.sampleId
				}`
			)
			.then(res => {
				this.setState({ sample: res.data });
			})
			.then(() => {
				this.setState({ loading: false });
				// window.setTimeout(() => {
				// 	this.setState({ loading: false });
				// }, 3000);
			});
	};

	getWriter = () => {
		axios.get(`/api/writers/${this.props.match.params.writerId}`).then(res => {
			this.setState({ writer: res.data.name });
		});
	};

	handleToggleEditForm = () => {
		this.getSample();
		this.setState(state => {
			return { showEditForm: !state.showEditForm };
		});
	};

	handleInputChange = event => {
		const copiedSample = { ...this.state.sample };
		copiedSample[event.target.name] = event.target.value;
		this.setState({ sample: copiedSample });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.put(
				`/api/writers/${this.props.match.params.writerId}/samples/${
					this.props.match.params.sampleId
				}`,
				this.state.sample
			)
			.then(() => {
				this.setState({ showEditForm: false });
			});
	};

	handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this sample?")) {
			axios
				.delete(
					`/api/writers/${this.props.match.params.writerId}/samples/${
						this.props.match.params.sampleId
					}`
				)
				.then(() => {
					this.setState({ redirectToWriterSamples: true });
				});
		}
	};

	render() {
		if (this.state.redirectToWriterSamples) {
			return (
				<Redirect to={`/writers/${this.props.match.params.writerId}/samples`} />
			);
		}
		return (
			<Box>
				{this.state.showEditForm ? (
					<Box className='edit-sample-form'>
						<Button
							onClick={this.handleToggleEditForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							back to sample
						</Button>
						<SampleForm
							sample={this.state.sample}
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
					<Box className='single-sample'>
						<Box>
							<Link to={`/writers/${this.props.match.params.writerId}/samples`}>
								back to all samples
							</Link>
							<h2>{this.state.sample.name}</h2>
							<h3>
								<strong>by: </strong>
								{this.state.writer}
							</h3>
							<h4>
								<strong>type of writing: </strong>
								{this.state.sample.typeOfWriting}
							</h4>
							<Flex justifyContent='center'>
								<Card bg='white' borderRadius={5} p={5} m={5}>
									<Text>
										<p>{this.state.sample.body}</p>
									</Text>
								</Card>
							</Flex>
							<Button
								onClick={this.handleToggleEditForm}
								bg='white'
								color='black'
								margin='5px'
								width='10vw;'
								fontSize='1vw;'>
								edit sample
							</Button>
							<Button
								onClick={this.handleDelete}
								bg='white'
								color='black'
								margin='5px'
								width='10vw;'
								fontSize='1vw;'>
								delete sample
							</Button>
						</Box>
					</Box>
				)}
			</Box>
		);
	}
}
