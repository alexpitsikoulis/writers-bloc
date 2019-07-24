import React, { Component } from "react";
import axios from "axios";
import { Button } from "rebass";

export default class ContactForm extends Component {
	state = {
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
		const name = document.getElementById("contact-name").value;
		const email = document.getElementById("contact-email").value;
		const message = document.getElementById("contact-message").value;

		axios.post("/send", { name, email, message }).then(response => {
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
		return (
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
