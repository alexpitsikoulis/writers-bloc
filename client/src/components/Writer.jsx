import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import WriterForm from "./WriterForm";
import { Button, Box, Flex, Card, Image, Text } from "rebass";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import Swal from "sweetalert2";

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
		Swal.fire({
			title: "Are you sure you want to delete this writer?",
			text: "You won't be able to revert this!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then(result => {
			if (result.value) {
				axios
					.delete(`/api/writers/${this.props.match.params.writerId}`)
					.then(() => {
						this.setState({ redirectToAllWriters: true });
					});
				Swal.fire("Deleted!", "Your file has been deleted.", "success");
			}
		});
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
						{this.state.writer.imageLink ? null : (
							<h2>{this.state.writer.name}</h2>
						)}
						<Box>
							<Link to='/writers'>back to all writers</Link>
						</Box>
						{this.state.writer.imageLink ? (
							<Flex marginTop='5vh'>
								<Card
									width='32vw'
									mx='auto'
									p={2}
									variant='basic'
									bg='white'
									borderRadius={5}>
									<Image
										src={this.state.writer.imageLink}
										borderRadius={2}
										alignSelf='center'
									/>
									<Text margin={2}>
										<h2>{this.state.writer.name}</h2>
										<p>
											<strong>email: </strong>
											{this.state.writer.email}
										</p>
									</Text>
									<Box className='bio'>
										<p>{this.state.writer.bio}</p>
									</Box>
								</Card>
							</Flex>
						) : null}
						<Box>
							<Link to={`/writers/${this.props.match.params.writerId}/samples`}>
								{" "}
								writing samples
							</Link>
						</Box>
						<Box marginTop='4vh'>
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
					</Box>
				)}
			</Box>
		);
	}
}
