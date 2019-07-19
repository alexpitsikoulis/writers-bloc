import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Writers from "./components/Writers";
import Writer from "./components/Writer";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<div className='App'>
			<Router>
				<Route path='/' component={Header} />
				<Switch>
					<Route exact path='/writers' component={Writers} />
					<Route path='/writers/:writerId' component={Writer} />
				</Switch>
				<Route path='/' component={Footer} />
			</Router>
		</div>
	);
}

export default App;
