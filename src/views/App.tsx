import React from 'react'
import Homepage from './Homepage'
import ChatApp from './ChatApp'
import SessionsController from '../controllers/SessionsController';
import CurrentUserController from '../controllers/CurrentUserController';
import NotificationContainer from './notification-components/NotificationContainer';
import '../styles/app.scss'
import ReceiverController from '../controllers/ReceiverController';

interface IStates {
    isLoggedIn: boolean,
    isLoading: boolean
}

class App extends React.Component<{}, IStates> {
    private static _instance: App;
    private _checkingSession = false;

    constructor(props: {}) {
        super(props);

        App._instance = this;

        this.state = {
            isLoggedIn: false,
            isLoading: true
        }

        this.verifySession = this.verifySession.bind(this);
        this.handleOnLogin = this.handleOnLogin.bind(this);
        this.handleOnLogout = this.handleOnLogout.bind(this);
    }

    componentDidMount() {
        CurrentUserController.AddOnReadyListener(this.handleOnLogin);

        this.verifySession();
    }

    verifySession() {
        this.setState({
            isLoggedIn: false,
            isLoading: true
        });

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

    static CheckSession() {
        if (!this._instance.state.isLoading)
            this._instance.verifySession();
    }

    handleOnLogin() {
        this.setState({ isLoggedIn: true });
    }

    handleOnLogout() {
        CurrentUserController.DestroyInstance();
        ReceiverController.DestroyInstance();
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
                        <NotificationContainer />
                    </div>
                }
            </>
        )
    }
}

export default App
