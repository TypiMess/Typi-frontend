import React, { ChangeEvent, FormEvent } from "react";
import CredentialsController from "../../controllers/CredentialsController";
import CurrentUserController from "../../controllers/CurrentUserController";
import { DuplicateError, InvalidError, UnauthorizedError } from "../../errors/Errors";
import Alert from "../Alert";

interface IStates {
    alertText: string,
    username: string,
    password: string
}

export default class Register extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            alertText: "",
            username: "",
            password: ""
        }

        this.onCloseAlert = this.onCloseAlert.bind(this);
        this.handleRegisterForm = this.handleRegisterForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onCloseAlert() {
        this.setState({ alertText: "" });
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        } as Pick<IStates, any>);
    }

    handleRegisterForm(event: FormEvent) {
        event.preventDefault();

        CredentialsController.Instance.Register(this.state.username, this.state.password)
            .then(() => {
                CurrentUserController.Update().catch(error => {
                    if (error instanceof UnauthorizedError) {
                        this.setState({ alertText: "Invalid session. Please enable cookies for this site." });
                    }
                    else {
                        this.setState({ alertText: "An unknown error has occured. Sorry about this! We will work harder to fix this issue. If you face this error again, please report it to us." });
                    }
                });
            })
            .catch(error => {
                if (error instanceof DuplicateError) {
                    this.setState({ alertText: "The username is already taken. Please choose another." });
                }
                else if (error instanceof InvalidError) {
                    this.setState({ alertText: "The username or password is invalid. Please check again." });
                }
                else {
                    this.setState({ alertText: "An unknown error has occured. Sorry about this! We will work harder to fix this issue. If you face this error again, please report it to us." });
                }
            })
    }
    
    render() {
        return (
            <div className="container rounded shadow p-3 bg-white">
                <h2 className="text-center">Register</h2>
                { this.state.alertText ? <Alert onClose={this.onCloseAlert}>{ this.state.alertText }</Alert> : <></> }
                
                <form onSubmit={this.handleRegisterForm}>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input className="form-control" placeholder="Enter your username" pattern="(\w|\d){3,32}" name="username" id="username" onChange={this.handleInputChange}></input>
                        <div className="form-text">Only letters, digits and underscore. Min 3 characters, max 32 characters.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" minLength={7} name="password" id="password" onChange={this.handleInputChange}/>
                        <div className="form-text">Min 7 characters</div>
                    </div>
                    <button className="btn btn-primary" type="submit">Register</button>
                </form>
            </div>
        )
    }
}