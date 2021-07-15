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
    }
    
    componentDidMount() {
        SessionsController.VerifySession().then(valid => {
            if (valid) {
                CurrentUserController.AddOnReadyListener(this, function(component: React.Component) { component.setState({ isLoggedIn: true }) });
                CurrentUserController.Update().catch(error => console.error(error));
            }
        });
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.isLoggedIn ?
                        <ChatApp /> :
                        <Homepage />
                }
            </div>
        )
    }
}

export default App
