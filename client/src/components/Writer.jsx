import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import WriterForm from "./WriterForm";
import { Button, Box } from "rebass";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

export default class Writer extends Component {
	state = {
		loading: true,
		writer: {},
		showEditForm: false,
		redirectToAllWriters: false
	};

	componentDidMount() {
		this.getWriter();
	}

	getWriter = () => {
		axios
			.get(`/api/writers/${this.props.match.params.writerId}`)
			.then(res => {
				this.setState({ writer: res.data });
			})
			.then(() => {
				this.setState({ loading: false });
				// window.setTimeout(() => {
				// 	this.setState({ loading: false });
				// }, 3000);
			});
	};

	handleToggleEditForm = () => {
		this.getWriter();
		this.setState(state => {
			return { showEditForm: !state.showEditForm };
		});
	};

	handleInputChange = event => {
		const copiedWriter = { ...this.state.writer };
		copiedWriter[event.target.name] = event.target.value;
		this.setState({ writer: copiedWriter });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.put(
				`/api/writers/${this.props.match.params.writerId}`,
				this.state.writer
			)
			.then(() => {
				this.setState({ showEditForm: false });
			});
	};

	handleDelete = () => {
		if (window.confirm("Are you sure you want to delete?")) {
			axios
				.delete(`/api/writers/${this.props.match.params.writerId}`)
				.then(() => {
					this.setState({ redirectToAllWriters: true });
				});
		}
	};

	render() {
		if (this.state.redirectToAllWriters) {
			return <Redirect to='/writers' />;
		}
		return (
			<Box className='single-writer'>
				{this.state.showEditForm ? (
					<Box className='edit-writer-form'>
						<Button
							onClick={this.handleToggleEditForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							back to writer
						</Button>
						<WriterForm
							writer={this.state.writer}
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
					<Box className='single-writer'>
						<h2>{this.state.writer.name}</h2>
						<div>
							<Link to='/writers'>back to all writers</Link>
						</div>
						{this.state.writer.imageLink ? (
							<img
								src={this.state.writer.imageLink}
								alt={this.state.writer.name}
							/>
						) : null}
						<p>
							<strong>bio: </strong>
							{this.state.writer.bio}
						</p>
						<p>
							<strong>email: </strong>
							{this.state.writer.email}
						</p>
						<Box>
							<Link to={`/writers/${this.props.match.params.writerId}/samples`}>
								{" "}
								writing samples
							</Link>
						</Box>
						<Button
							onClick={this.handleToggleEditForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							edit writer
						</Button>
						<Button
							onClick={this.handleDelete}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							delete writer
						</Button>
					</Box>
				)}
			</Box>
		);
	}
}
