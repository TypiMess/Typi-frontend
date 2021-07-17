import React, { useState } from 'react'
import Homepage from './Homepage'
import ChatApp from './ChatApp'
import SessionsController from '../controllers/SessionsController';
import CurrentUserController from '../controllers/CurrentUserController';

interface IStates {
    isLoggedIn: boolean,
    isLoading: boolean
}

class App extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isLoggedIn: false,
            isLoading: true
        }

        this.handleOnLogin = this.handleOnLogin.bind(this);
        this.handleOnLogout = this.handleOnLogout.bind(this);
    }

    componentDidMount() {
        CurrentUserController.AddOnReadyListener(this.handleOnLogin);

        SessionsController.Instance.VerifySession().then(valid => {
            if (valid) {
                CurrentUserController.Update()
                    .catch(error => console.error(error))
                    .finally(() => this.setState({ isLoading: false }));
            }
            else {
                this.setState({ isLoading: false });
            }
        });
    }
    
    handleOnLogin()
    {
        this.setState({ isLoggedIn: true });
    }

    handleOnLogout() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <>
                {
                    !this.state.isLoading &&
                    <div className="App">
                        {
                            this.state.isLoggedIn ?
                                <ChatApp onLogout={this.handleOnLogout} /> :
                                <Homepage />
                        }
                    </div>
                }
            </>
        )
    }
}

export default App
