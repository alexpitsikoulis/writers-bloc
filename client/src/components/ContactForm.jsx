import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Flex, Box } from "rebass";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

export default class ContactForm extends Component {
	state = {
		loading: false,
		contact: {
			name: "",
			email: "",
			message: ""
		}
	};

	handleInputChange = event => {
		const copiedContact = { ...this.state.contact };
		copiedContact[event.target.name] = event.target.value;
		this.setState({ contact: copiedContact });
	};

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ loading: true });
		const name = document.getElementById("contact-name").value;
		const email = document.getElementById("contact-email").value;
		const message = document.getElementById("contact-message").value;

		axios.post("/send", { name, email, message }).then(response => {
			this.setState({ loading: false });
			if (response.data.msg === "success") {
				Swal.fire("Message Sent.");
				this.setState({
					contact: {
						name: "",
						email: "",
						message: ""
					}
				});
			} else if (response.data.msg === "fail") {
				Swal.fire("Message failed to send.");
			}
		});
	}

	render() {
		return this.state.loading ? (
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
			<Box className='contact-form'>
				<h4>contact us</h4>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<Flex flexDirection='column' alignItems='center'>
						<Flex>
							<Box width='50%'>
								<label htmlFor='contact-name'>name: </label>
							</Box>
							<Box width='50%'>
								<input
									type='text'
									id='contact-name'
									name='name'
									value={this.state.contact.name}
									onChange={this.handleInputChange}
								/>
							</Box>
						</Flex>
						<Flex>
							<Box width='50%'>
								<label htmlFor='contact-email'>email: </label>
							</Box>
							<Box width='50%'>
								<input
									type='text'
									id='contact-email'
									name='email'
									value={this.state.contact.email}
									onChange={this.handleInputChange}
								/>
							</Box>
						</Flex>
						<Box m={2}>
							<textarea
								name='message'
								id='contact-message'
								cols='40'
								rows='10'
								placeholder='type your message here'
								value={this.state.contact.message}
								onChange={this.handleInputChange}
							/>
						</Box>
					</Flex>
					<Box>
						<Button
							bg='#4682b4'
							color='white'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							send message
						</Button>
					</Box>
				</form>
			</Box>
		);
	}
}
