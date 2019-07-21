import React, { Component } from "react";

export default class ContactForm extends Component {
	render() {
		return (
			<div className='contact-form'>
				<h4>contact me</h4>
				<form>
					<div>
						<label htmlFor='contact-name'>name: </label>
						<input type='text' id='contact-name' name='name' />
					</div>
					<div>
						<label htmlFor='contact-email'>email: </label>
						<input type='text' id='contact-email' name='email' />
					</div>
					<div>
						<label htmlFor='contact-message'>message: </label>
						<textarea name='message' id='contact-message' cols='30' rows='10' />
					</div>
					<div>
						<input type='submit' value='send message' />
					</div>
				</form>
			</div>
		);
	}
}
