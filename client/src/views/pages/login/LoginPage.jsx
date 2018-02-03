import React, { Component } from 'react';
import './LoginPage.css';
import Container from '../../common/components/containers/Container';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {
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
           <div className="row">
               <div className="col-md-4 col-md-offset-4">
                   <form>
                       <h1>Login</h1>


                        <div className="form-group">
                            <input
                                value={this.state.email}
                                onChange={this.onChange}
                                type="text"
                                name="email"
                                placeholder="Username"
                                />


                        </div>

                       <div className="form-group">
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
                        <button type="button" className="btn btn-primary">
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
