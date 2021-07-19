import React from "react";

export default class Info extends React.Component {
    render() {
        return (
            <div className="container bg-white shadow rounded mt-3 p-3">
                <div className="accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#instructions" aria-expanded="false" aria-controls="instructions">What is this?</button>
                        </h2>
                        <div className="collapse" id="instructions">
                            <div className="accordion-body">
                                <strong>Typi</strong> 💬 is a simple web chat project features End-to-End Encryption (using hybrid encryption).<br/><br/>
                                <s>When you register,</s> a <strong className="text-danger">private key</strong> 🔑 and a <strong className="text-success">public key</strong> 🔑 will be generated using your browser (RSA-1024). Only your <strong className="text-success">public key</strong> 🔑 will be uploaded to our server for encryption and your <strong className="text-danger">private key</strong> 🔑 will be stored in <strong>local storage</strong> in your browser.<br/>
                                Whenever you receive a message, your browser will decrypt an <strong className="text-info">AES key</strong> using your <strong className="text-danger">private key</strong> 🔑, decrypt the message with that <strong className="text-info">AES key</strong> and then display it to you.<br/>
                                And vice versa, the message you sent will be encrypted using a randomly generated <strong className="text-info">AES key</strong>, that key will be encrypted using the receiver's <strong className="text-success">public key</strong>🔑 and the encrypted message with encrypted key will be saved on our server.<br/><br/>
                                This way, neither us or your ISP can see the messages you send or receive.<br/><br/>
                                We also use a cookie 🍪 to store your session ID. It expires after you close your browser or inactive for more than 15 minutes.<br/>
                                You can clear your cookies 🍪 and <strong className="text-danger">private key</strong> 🔑 using the buttons above.
                                <hr/>
                                Project source code: <a href="https://github.com/TypiMess" target="_blank" className="text-body"><i className="bi-github"></i></a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#disclaimer" aria-expanded="false" aria-controls="disclaimer">Disclaimer</button>
                        </h2>
                        <div className="accordion-collapse collapse" id="disclaimer">
                            <div className="accordion-body">
                                It is <strong>your responsibility</strong> to keep your <strong className="text-danger">password/cookies 🍪/private key 🔑/browser/computer</strong> safe from other people or organisations.<br/>
                                We <strong>do not</strong> provide support if they have been compromised, stolen or lost.
                            </div>
                        </div>
                    </div>
                    
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#about_us" aria-expanded="false" aria-controls="about_us">About me</button>
                        </h2>
                        <div className="accordion-collapse collapse" id="about_us">
                            <div className="accordion-body">
                                My name is Duc, a graduate in New Zealand 🇳🇿 (I am currently looking for a job 💼).<hr/>
                                My contacts:<br/>
                                <div className="mt-1">
                                    <a href="https://www.linkedin.com/in/ducng99/" target="_blank"><i className="bi-linkedin me-2"></i></a>
                                    <a href="https://github.com/ducng99/" target="_blank"><i className="bi-github me-2"></i></a>
                                    <a href="mailto:tom@ducng.dev" target="_blank"><i className="bi-envelope-fill"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}