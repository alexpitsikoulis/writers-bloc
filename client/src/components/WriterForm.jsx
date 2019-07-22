import React, { Component } from "react";
import { Button } from "rebass";

export default class WriterForm extends Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit}>
					<div>
						<label htmlFor='writer-name'>name: </label>
						<input
							type='text'
							id='writer-name'
							name='name'
							value={
								this.props.newWriter
									? this.props.newWriter.name
									: this.props.writer.name
							}
							onChange={this.props.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='writer-email'>email: </label>
						<input
							type='email'
							id='writer-email'
							name='email'
							value={
								this.props.newWriter
									? this.props.newWriter.email
									: this.props.writer.email
							}
							onChange={this.props.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='writer-bio'>bio: </label>
						<input
							type='text'
							id='writer-bio'
							name='bio'
							value={
								this.props.newWriter
									? this.props.newWriter.bio
									: this.props.writer.bio
							}
							onChange={this.props.handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='writer-image-link'>image link: </label>
						<input
							type='text'
							id='writer-image-link'
							name='imageLink'
							value={
								this.props.newWriter
									? this.props.newWriter.imageLink
									: this.props.writer.imageLink
							}
							onChange={this.props.handleInputChange}
						/>
					</div>
					<div>
						<Button
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='0.8vw;'>
							{this.props.newWriter ? "create new writer" : "edit writer"}
						</Button>
					</div>
				</form>
			</div>
		);
	}
}
