import React, { useState } from 'react'
import Homepage from './Homepage'
import ChatApp from './ChatApp'
import SessionsController from '../controllers/SessionsController';
import CurrentUserController from '../controllers/CurrentUserController';

interface IStates {
    isLoggedIn: boolean
}

class App extends React.Component<{}, IStates> {
    constructor(props: {})
    {
        super(props);
        
        this.state = {
            isLoggedIn: false
        }
        
        this.handleOnLogout = this.handleOnLogout.bind(this);
    }
    
    componentDidMount() {
        CurrentUserController.AddOnReadyListener(this, (component: React.Component) => component.setState({ isLoggedIn: true }));
        SessionsController.VerifySession().then(valid => {
            if (valid) {
                CurrentUserController.Update().catch(error => console.error(error));
            }
        });
    }
    
    handleOnLogout()
    {
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.isLoggedIn ?
                        <ChatApp onLogout={this.handleOnLogout}/> :
                        <Homepage />
                }
            </div>
        )
    }
}

export default App
