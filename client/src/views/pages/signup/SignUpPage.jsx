import React, { Component } from 'react';
import './SignUpPage.css';
import PrimaryButton from '../../common/components/buttons/PrimaryButton';
import TextInput from '../../common/components/inputs/TextInput';


class SignUpPage extends Component {

    constructor( props ) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirm: ''

        }

        this.onChange = this.onChange.bind(this)
    }

    onChange( e ) {
        this.setState({ [ e.target.name ]: e.target.value })
    }

    render() {
        return (
            <div id="signup-page">
                <div className="container-border col-md-6">
                    <div className="col-md-4 col-md-offset-4">

                        <form className="signup">
                            <h1 className="signup-title">Sign Up</h1>

                            <div className="form-group">
                                <TextInput
                                    value={ this.state.firstName }
                                    onChange={ this.onChange }
                                    name="firstName"
                                    placeholder="Enter Your First Name"
                                />

                                <TextInput
                                    value={ this.state.lastName }
                                    onChange={ this.onChange }
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                />

                                <TextInput
                                    value={ this.state.email }
                                    onChange={ this.onChange }
                                    name="email"
                                    placeholder="Enter Your Email"
                                />

                                <TextInput
                                    value={ this.state.phone }
                                    onChange={ this.onChange }
                                    type="number"
                                    name="phone"
                                    className="phone"
                                    placeholder="Enter Your Phone Number"
                                />

                                <TextInput
                                    value={ this.state.password }
                                    onChange={ this.onChange }
                                    type="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                />

                                <TextInput
                                    value={ this.state.confirm }
                                    onChange={ this.onChange }
                                    type="password"
                                    name="confirm"
                                    placeholder="Confirm Password"
                                />

                            </div>

                            <div className="btn-group" id="button">
                                <PrimaryButton text="Register"/>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;
