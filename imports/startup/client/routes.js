import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import Navigation from '../../ui/components/Navigation';

import Home from '../../ui/pages/Home';
import SignUp from '../../ui/pages/SignUp';
import SignIn from '../../ui/pages/SignIn';
import NewTodo from '../../ui/pages/NewTodo';
import ListTodos from '../../ui/pages/ListTodos';

export const renderRoutes = () =>
  <Router>
    <div>
      <Navigation history={history} />

      <Route
        exact path="/"
        component={() => <Home />}
      />
      <Route
        exact path="/new-todo"
        component={() => <NewTodo history={history} />}
      />
      <Route
        exact path="/todos"
        component={() => <ListTodos />}
      />
      <Route
        exact path="/register"
        component={() => <SignUp history={history} />}
      />
      <Route
        exact path="/signin"
        component={() => <SignIn history={history} />}
      />
    </div>
  </Router>
