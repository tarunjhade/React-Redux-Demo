import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import CouresesPage from './components/course/CoursesPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}></IndexRoute>
        <Route path="courses" component={CouresesPage}></Route>
        <Route path="about" component={AboutPage}></Route>
    </Route>
);