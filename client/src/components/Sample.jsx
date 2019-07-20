import React, { Component } from "react";
import axios from "axios";

export default class Sample extends Component {
	state = {
		sample: {},
		showEditForm: false,
		redirectToHome: false
	};

	componentDidMount() {
		axios
			.get(
				`/api/writers/${this.props.match.params.writerId}/samples/${
					this.props.match.params.sampleId
				}`
			)
			.then(res => {
				this.setState({ sample: res.data });
			});
	}

	handleToggleEditForm = () => {
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

	render() {
		return (
			<div>
				{this.state.showEditForm ? (
					<div className='edit-sample-form'>
						<button onClick={this.handleToggleEditForm}>back to sample</button>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='sample-name'>name: </label>
								<input
									type='text'
									id='sample-name'
									name='name'
									value={this.state.sample.name}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='sample-type'>type of writing: </label>
								<input
									type='text'
									id='sample-type'
									name='typeOfWriting'
									value={this.state.sample.typeOfWriting}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor='sample-body'>body: </label>
								<textarea
									name='body'
									id='sample-body'
									cols='100'
									rows='40'
									value={this.state.sample.body}
									onChange={this.handleInputChange}
								/>
							</div>
							<div>
								<input type='submit' value='edit sample' />
							</div>
						</form>
					</div>
				) : (
					<div className='single-sample'>
						<div>
							<h2>{this.state.sample.name}</h2>
							<h4>{this.state.sample.typeOfWriting}</h4>
							<p>{this.state.sample.body}</p>
							<button onClick={this.handleToggleEditForm}>edit sample</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
