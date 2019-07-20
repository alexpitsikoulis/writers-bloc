import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
	render() {
		return (
			<div>
				<h2>welcome</h2>
				<Link to='/writers'>
					<h4>let's get started</h4>
				</Link>
			</div>
		);
	}
}
