import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Flex, Box } from "rebass";
import WriterForm from "./WriterForm";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

export default class Writers extends Component {
	state = {
		loading: true,
		writers: [],
		showNewForm: false,
		newWriter: {
			name: "",
			imageLink: "",
			bio: "",
			email: ""
		}
	};

	componentDidMount() {
		this.getWriters();
	}

	getWriters = () => {
		axios
			.get("/api/writers")
			.then(res => {
				this.setState({ writers: res.data });
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
		const copiedNewWriter = { ...this.state.newWriter };
		copiedNewWriter[event.target.name] = event.target.value;
		this.setState({ newWriter: copiedNewWriter });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post("/api/writers", this.state.newWriter).then(() => {
			this.getWriters();
			this.setState({
				showNewForm: false,
				newWriter: { name: "", imageLink: "", bio: "", email: "" }
			});
		});
	};

	render() {
		let letters = this.state.writers.map(writer => {
			return writer.name.charAt(0);
		});
		let lettersNoDuplicates = [...new Set(letters)];
		let alphList = lettersNoDuplicates.map(letter => {
			return (
				<Flex
					key={letter}
					className='alphList'
					flexDirection='column'
					alignItems='flex-start'
					m={2}>
					<h3 id={letter}>{letter}</h3> <hr />
					{this.state.writers.map(writer => {
						return writer.name.charAt(0) === letter ? (
							<Box key={writer._id} alignSelf='center'>
								<Link to={`/writers/${writer._id}`}>{writer.name}</Link>
							</Box>
						) : null;
					})}
				</Flex>
			);
		});

		return (
			<Flex className='all-writers'>
				{this.state.showNewForm ? (
					<Box className='new-writer-form'>
						<Button
							onClick={this.handleToggleNewForm}
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							back to writers
						</Button>
						<WriterForm
							newWriter={this.state.newWriter}
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
					<Box className='writers-list'>
						<h2>all writers</h2>
						<Box>
							<strong>jump to letter: </strong>
							{lettersNoDuplicates.map(letter => {
								return (
									<a key={letter} href={`#${letter}`}>
										{letter}{" "}
									</a>
								);
							})}
						</Box>
						{alphList}
						<Button
							onClick={this.handleToggleNewForm}
							bg='white'
							color='black'
							marginTop='5vh'
							width='10vw;'
							fontSize='1vw;'>
							add new writer
						</Button>
					</Box>
				)}
			</Flex>
		);
	}
}
