import React, { Component } from "react";
import { Button, Box } from "rebass";

export default class SampleForm extends Component {
	render() {
		return (
			<Box>
				<form onSubmit={this.props.handleSubmit}>
					<Box>
						<label htmlFor='sample-name'>name: </label>
						<input
							type='text'
							id='sample-name'
							name='name'
							value={
								this.props.newSample
									? this.props.newSample.name
									: this.props.sample.name
							}
							onChange={this.props.handleInputChange}
						/>
					</Box>
					<Box>
						<label htmlFor='sample-type'>type of writing: </label>
						<input
							type='text'
							id='sample-type'
							name='typeOfWriting'
							value={
								this.props.newSample
									? this.props.newSample.typeOfWriting
									: this.props.sample.typeOfWriting
							}
							onChange={this.props.handleInputChange}
						/>
					</Box>
					<Box>
						<label htmlFor='sample-body'>body: </label>
						<textarea
							name='body'
							id='sample-body'
							cols='100'
							rows='40'
							value={
								this.props.newSample
									? this.props.newSample.body
									: this.props.sample.body
							}
							onChange={this.props.handleInputChange}
						/>
					</Box>
					<Box>
						<Button
							bg='white'
							color='black'
							margin='5px'
							width='10vw;'
							fontSize='0.8vw;'>
							{this.props.newSample ? "create new sample" : "edit sample"}
						</Button>
					</Box>
				</form>
			</Box>
		);
	}
}
