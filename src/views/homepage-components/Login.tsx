import React, { ChangeEvent, FormEvent, ReactElement } from "react";
import CredentialsController from "../../controllers/CredentialsController";
import CurrentUserController from "../../controllers/CurrentUserController";
import InvalidError from "../../errors/InvalidError";
import NotFoundError from "../../errors/NotFoundError";
import UnauthorizedError from "../../errors/UnauthorizedError";
import Alert from "../Alert";

interface IStates {
    alert: ReactElement,
    username: string,
    password: string
}

export default class Login extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            alert: <></>,
            username: "",
            password: ""
        }
        
        this.handleLoginForm = this.handleLoginForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event: ChangeEvent<HTMLInputElement>)
    {
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
        .then(result => {
            CurrentUserController.Update().catch(error => {
                if (error instanceof UnauthorizedError)
                {
                    this.setState({ alert: <Alert>Invalid session. Please enable cookies for this site.</Alert> });
                }
                else
                {
                    this.setState({ alert: <Alert>An unknown error has occured. Sorry about this! We will work harder to fix this issue. If you face this error again, please report it to us.</Alert> });
                }
            });
        })
        .catch(error => {            
            if (error instanceof NotFoundError)
            {
                this.setState({ alert: <Alert>The username and password combination does not match. Please check again.</Alert> });
            }
            else if (error instanceof InvalidError)
            {
                this.setState({ alert: <Alert>The username or password is invalid. Please check again.</Alert> });
            }
            else
            {
                this.setState({ alert: <Alert>An unknown error has occured. Sorry about this! We will work harder to fix this issue. If you face this error again, please report it to us.</Alert> });
            }
        })
    }
    
    render() {
        return (
            <div className="container rounded shadow p-3 bg-white">
                <h2 className="text-center">Login</h2>
                { this.state.alert }
                <form onSubmit={this.handleLoginForm}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username:</label>
                        <input className="form-control" placeholder="Enter your username" pattern="(\w|\d){3,32}" name="username" id="username" onChange={this.handleInputChange}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input className="form-control" type="password" minLength={7} name="password" id="password" onChange={this.handleInputChange}/>
                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
            </div>
        )
    }
}