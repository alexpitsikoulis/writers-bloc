import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "rebass";
import SampleForm from "./SampleForm";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

export default class Sample extends Component {
	state = {
		loading: true,
		sample: {},
		showEditForm: false,
		redirectToWriterSamples: false
	};

	componentDidMount() {
		this.getSample();
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
			<div>
				{this.state.showEditForm ? (
					<div className='edit-sample-form'>
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
					</div>
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
					<div className='single-sample'>
						<div>
							<Link to={`/writers/${this.props.match.params.writerId}/samples`}>
								back to all samples
							</Link>
							<h2>{this.state.sample.name}</h2>
							<h4>{this.state.sample.typeOfWriting}</h4>
							<p>{this.state.sample.body}</p>
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
						</div>
					</div>
				)}
			</div>
		);
	}
}
