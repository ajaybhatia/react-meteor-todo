import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

const INITIAL_STATE = {
  title: '',
  description: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class NewTodo extends Component  {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      title,
      description,
    } = this.state;

    const {
      history,
    } = this.props;

    Meteor.call('addTask', title, description, error => {
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
      title,
      description,
      error,
    } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <Link className="btn btn-outline-success" to="/todos">List Tasks</Link>
            <form onSubmit={this.onSubmit} className="mt-5">
              <legend className="border border-top-0 border-left-0 border-right-0">New Task</legend>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  value={title}
                  type="text"
                  className="form-control"
                  onChange={event => this.setState(byPropKey('title', event.target.value))}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  type="text"
                  className="form-control"
                  onChange={event => this.setState(byPropKey('description', event.target.value))}
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-outline-primary">Save</button>
              </div>

              { error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewTodo);
