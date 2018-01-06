import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const INITIAL_STATE = {
  email: '',
  username: '',
  password: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      username,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    Accounts.createUser({
      email,
      username,
      password
    }, error => {
      if (error) {
        this.setState(byPropKey('error', error));
      } else {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/todos');
      }
    });

    event.preventDefault();
  }

  render() {
    const {
      email,
      username,
      password,
      error,
    } = this.state;

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 ml-auto mr-auto">
            <form onSubmit={this.onSubmit}>
              <legend className="border border-top-0 border-left-0 border-right-0">Register</legend>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  value={username}
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={event => this.setState(byPropKey('username', event.target.value))}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="passsword">Password</label>
                <input
                  value={password}
                  type="password"
                  className="form-control"
                  id="passsword"
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">Submit</button>

              { error && <p>{error.reason}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
