import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Writers from "./components/Writers";
import Writer from "./components/Writer";
import "./App.css";

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/writers' component={Writers} />
					<Route path='/writers/:writerId' component={Writer} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
