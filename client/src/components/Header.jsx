import React, { Component } from "react";
import { Text, Flex, Box } from "rebass";

export default class Header extends Component {
	render() {
		return (
			<Flex
				className='header-div'
				justifyContent='center'
				alignItems='center'
				flexDirection='column'>
				<Box marginBottom='2vh'>
					<header>
						<h1>
							<a href='/'>
								<Text letterSpacing='3px'>writer's bloc</Text>
							</a>
						</h1>
					</header>
				</Box>
				<Box>
					<nav>
						<Flex justifyContent='space-around' alignItems='center'>
							<a href='/writers'>writers</a>
							<a href='/contact'>contact us</a>
						</Flex>
					</nav>
				</Box>
			</Flex>
		);
	}
}
