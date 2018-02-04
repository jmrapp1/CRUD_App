import React, { Component } from 'react';
import './SignUpPage.css';


class SignUpPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirm: ''

        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value})
    }




    render() {
        return (

            <div className="container">
                <div className="col-md-4 col-md-offset-4">

                    <form className="signup">
                        <h1 className="signup-title">Sign Up</h1>

                        <p>Enter your information Here</p>

                        <div className="form-group">
                            <input
                                value={this.state.firstname}
                                onChange={this.onChange}
                                type="text"
                                name="firstname"
                                placeholder="Enter Your First Name"
                            />

                            <input
                                value={this.state.lastname}
                                onChange={this.onChange}
                                type="text"
                                name="lastname"
                                placeholder="Enter Last Name"
                            />

                            <input
                                value={this.state.email}
                                onChange={this.onChange}
                                type="text"
                                name="email"
                                placeholder="Enter Your Email"
                            />

                            <input
                                value={this.state.phone}
                                onChange={this.onChange}
                                type="text"
                                name="phone"
                                className="phone"
                                placeholder="Enter Your Phone Number"
                            />

                            <input
                                value={this.state.password}
                                onChange={this.onChange}
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                            />

                            <input
                                value={this.state.confirm}
                                onChange={this.onChange}
                                type="password"
                                name="confirm"
                                placeholder="Confirm Password"
                            />

                        </div>


                        <div className="btn-group" id="button">
                            <button type="button" className="btn">Register</button>
                        </div>

                    </form>
                </div>
            </div>

        );
    }
}

export default SignUpPage;
