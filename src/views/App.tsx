import React, { useState } from 'react'
import Homepage from './Homepage'
import ChatApp from './ChatApp'
import SessionsController from '../controllers/SessionsController';
import CurrentUserController from '../controllers/CurrentUserController';

class App extends React.Component {
    componentDidMount() {
        SessionsController.VerifySession().then(valid => {
            if (valid) CurrentUserController.Update();
        });
    }

    render() {
        return (
            <div className="App">
                {
                    !CurrentUserController.IsReady ?
                        <Homepage /> :
                        <ChatApp />
                }
            </div>
        )
    }
}

export default App
