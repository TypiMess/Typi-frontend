import React, { ChangeEvent, FormEvent } from "react";
import CredentialsController from "../../controllers/CredentialsController";
import CurrentUserController from "../../controllers/CurrentUserController";
import { InvalidError, NotFoundError, UnauthorizedError } from "../../errors/Errors";
import Alert from "../Alert";

interface IStates {
    alertText: string,
    username: string,
    password: string
}

export default class Login extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            alertText: "",
            username: "",
            password: ""
        }

        this.onCloseAlert = this.onCloseAlert.bind(this);
        this.handleLoginForm = this.handleLoginForm.bind(this);
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

    handleLoginForm(event: FormEvent) {
        event.preventDefault();

        CredentialsController.Instance.Login(this.state.username, this.state.password)
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
                if (error instanceof NotFoundError) {
                    this.setState({ alertText: "The username and password combination does not match. Please check again." });
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
                <h2 className="text-center">Login</h2>
                { this.state.alertText ? <Alert onClose={this.onCloseAlert}>{this.state.alertText}</Alert> : <></> }
                
                <form onSubmit={this.handleLoginForm}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username:</label>
                        <input className="form-control" placeholder="Enter your username" pattern="(\w|\d){3,32}" name="username" id="username" onChange={this.handleInputChange}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input className="form-control" type="password" minLength={7} name="password" id="password" onChange={this.handleInputChange} />
                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
            </div>
        )
    }
}