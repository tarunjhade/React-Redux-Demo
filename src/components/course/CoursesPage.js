import React, { PropTypes } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";
import { browserHistory } from "react-router";
class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    render() {
        const { courses } = this.props;
        return (
            <div className="jumbotron">
                <h1>Courses</h1>
                <input
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}
                    value="Add Course" />
                <CourseList courses={courses} />
            </div>
        );
    }
}
// add propTypes validations
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

//const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
//export default connectedStateAndProps(CoursesPage);
// or use below shorthand for connecting to redux
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);