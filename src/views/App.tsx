import React, { useState } from 'react'
import Homepage from './Homepage'
import ChatApp from './ChatApp'
import SessionsController from '../controllers/SessionsController';

interface IState {
    isLoggedIn: boolean
}

class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        SessionsController.VerifySession().then(valid => {
            //this.setState({ isLoggedIn: valid });
        });
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.isLoggedIn ?
                        <Homepage /> :
                        <ChatApp />
                }
            </div>
        )
    }
}

export default App
