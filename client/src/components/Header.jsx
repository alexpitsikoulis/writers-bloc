import React, { Component } from "react";
import { Text } from "rebass";

export default class Header extends Component {
	render() {
		return (
			<div class='header-div'>
				<header>
					<h1>
						<a href='/'>
							<Text letterSpacing='3px'>writer's bloc</Text>
						</a>
					</h1>
				</header>
				<nav>
					<a href='/writers'>writers</a>
					<a href='/contact'>contact us</a>
				</nav>
			</div>
		);
	}
}
