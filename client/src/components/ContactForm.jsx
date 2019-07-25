import React, { Component } from "react";
import axios from "axios";
import { Button } from "rebass";
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
				alert("Message Sent.");
				this.setState({
					contact: {
						name: "",
						email: "",
						message: ""
					}
				});
			} else if (response.data.msg === "fail") {
				alert("Message failed to send.");
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
			<div className='contact-form'>
				<h4>contact us</h4>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div>
						<label htmlFor='contact-name'>name: </label>
						<input
							type='text'
							id='contact-name'
							name='name'
							value={this.state.contact.name}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='contact-email'>email: </label>
						<input
							type='text'
							id='contact-email'
							name='email'
							value={this.state.contact.email}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='contact-message'>message: </label>
						<textarea
							name='message'
							id='contact-message'
							cols='30'
							rows='10'
							value={this.state.contact.message}
							onChange={this.handleInputChange}
						/>
					</div>
					<div>
						<Button
							bg='#4682b4'
							color='white'
							margin='5px'
							width='10vw;'
							fontSize='1vw;'>
							send message
						</Button>
					</div>
				</form>
			</div>
		);
	}
}
