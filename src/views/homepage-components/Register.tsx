import React from "react";
import Alert from "../Alert";

interface IStates {
    alertText: string
}

export default class Register extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            alertText: ""
        }
    }
    
    render() {
        return (
            <div className="container rounded shadow p-3 bg-white">
                <h2 className="text-center">Register</h2>
                { this.state.alertText ? <Alert>{ this.state.alertText }</Alert> : <></> }
                <form>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input className="form-control" placeholder="Enter your username" pattern="(\w|\d){3,32}"></input>
                        <div className="form-text">Only letters, digits and underscore. Min 3 characters, max 32 characters.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" minLength={7} />
                        <div className="form-text">Min 7 characters</div>
                    </div>
                    <button className="btn btn-primary" type="submit">Register</button>
                </form>
            </div>
        )
    }
}