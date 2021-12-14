import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component = {LandingPage} />
                    <Route exact path="/login" component = {LoginPage} />
                    <Route exact path="/register" component = {RegisterPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;