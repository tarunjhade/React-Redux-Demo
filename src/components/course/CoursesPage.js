import React, { PropTypes } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: { title: "" }
        };
        // bind the functions
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({ course: course });
    }

    onClickSave() {
        this.props.actions.createCourse(this.state.course);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        return (
            <div className="jumbotron">
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
                <input type="submit" onClick={this.onClickSave} value="Save" />
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