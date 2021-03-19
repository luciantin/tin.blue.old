import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Homepage from './view/homepage/homepage.view'
import Projects from "./view/projects/projects.view";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/projects" component={Projects} />
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

