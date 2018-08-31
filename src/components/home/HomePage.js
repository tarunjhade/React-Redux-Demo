import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>React Demo</h1>
                <p>React, Redux and React Router in ES6</p>
                <Link to="about" className="btn btn-primary">Learn More</Link>
            </div>
        );
    }
}

export default HomePage;