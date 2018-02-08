import React, { Component } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../common/components/buttons/PrimaryButton';
import TextInput from '../../common/components/inputs/TextInput';

class LoginPage extends Component {
    constructor( props ) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''

        };

        this.onChange = this.onChange.bind(this)
    }

    onChange( e ) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    render() {
        return (
            <div id="login-page">
                <div className="container-border col-md-6">
                    <div className="col-sm-12 col-md-4 col-md-offset-4">

                        <form className="login">
                            <h1 className="login-title">Log in</h1>

                            <div id="login-form" className="form-group">
                                <TextInput
                                    value={ this.state.email }
                                    onChange={ this.onChange }
                                    name="email"
                                    placeholder="Email"
                                />
                                <TextInput
                                    value={ this.state.password }
                                    onChange={ this.onChange }
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />

                                <p>Don't have an account? Register <Link to="/signup">here</Link></p>

                            </div>


                            <div className="btn-group" id="button">
                                <PrimaryButton text="Login" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
