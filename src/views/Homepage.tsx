import React from "react";
import Info from "./homepage-components/Info";
import Login from "./homepage-components/Login";
import Register from "./homepage-components/Register";

interface IStates {
    showLoginForm: boolean
}

export default class Homepage extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            showLoginForm: true
        }
        
        this.handleFormSwitch = this.handleFormSwitch.bind(this);
    }
    
    handleFormSwitch()
    {
        this.setState({showLoginForm: !this.state.showLoginForm});
    }
    
    render() {
        return (
            <>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1><img src="/assets/typi-logo.png" style={{ height: "53px" }}/>ypi (WIP)</h1>
                    <button className="btn btn-secondary m-3" onClick={this.handleFormSwitch}>{ this.state.showLoginForm ? "Register" : "Login" }</button>
                </div>
                { this.state.showLoginForm ? <Login /> : <Register /> }
                <Info/>
            </>
        );
    }
}