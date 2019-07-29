import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Box } from "rebass";

export default class Home extends Component {
	render() {
		return (
			<Box>
				<h2>welcome</h2>
				<Link to='/writers'>
					<h4>let's get started</h4>
				</Link>
				<Link to='/about'>
					<h4>about</h4>
				</Link>
				<Link to='/contact'>
					<h4>contact us</h4>
				</Link>
			</Box>
		);
	}
}
