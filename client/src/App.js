import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Writers from "./components/Writers";
import Writer from "./components/Writer";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Samples from "./components/Samples";
import Sample from "./components/Sample";
import Home from "./components/Home";
import ContactForm from "./components/ContactForm";

function App() {
	return (
		<div className='App'>
			<Router>
				<Route path='/' component={Header} />
				<Switch>
					<Route
						path='/writers/:writerId/samples/:sampleId'
						component={Sample}
					/>
					<Route path='/writers/:writerId/samples' component={Samples} />
					<Route path='/writers/:writerId' component={Writer} />
					<Route path='/writers' component={Writers} />
					<Route path='/contact' component={ContactForm} />
					<Route exact path='/' component={Home} />
				</Switch>
				<Route path='/' component={Footer} />
			</Router>
		</div>
	);
}

export default App;
