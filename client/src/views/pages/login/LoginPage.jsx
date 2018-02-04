import React, { Component } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''

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

                   <form className="login">
                       <h1 className="login-title">Log in</h1>
                       <p>Enter your information Here</p>

                       <div className="form-group">
                            <input
                                value={this.state.email}
                                onChange={this.onChange}
                                type="text"
                                name="email"
                                placeholder="Email"
                                />
                           <input
                               value={this.state.password}
                               onChange={this.onChange}
                               type="password"
                               name="password"
                               placeholder="Password"
                           />

                           <p>Don't have an account? Register <Link to="/signup">here</Link></p>

                       </div>


                       <div className="btn-group" id="button">
                        <button type="button" className="btn">
                            Login
                        </button>
                       </div>

                   </form>
               </div>
           </div>

        );
    }
}

export default LoginPage;
