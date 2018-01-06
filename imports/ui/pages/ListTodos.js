import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/Tasks';
import { Link } from 'react-router-dom';

const ListTodos = ({ tasks }) => {
  remove = (id) => {
    if (confirm('Are you sure?')) {
      Meteor.call('removeTask', id);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          <Link className="btn btn-outline-success" to="/new-todo">New Task</Link>
          <ul className="list-group mt-5">
          {
            tasks.map(task =>
              <li className="list-group-item" key={task._id}>{task.title}: <em>{task.description}</em> <span onClick={() => this.remove(task._id)} style={{cursor: 'pointer'}} className="float-right">X</span></li>
            )
          }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({ userId: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
  };
})(ListTodos);
