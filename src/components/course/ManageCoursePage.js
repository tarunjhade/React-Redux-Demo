import React, { PropTypes } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseFrom from "./CourseForm";
import { authorsFormattedForDropdown } from "../../selectors/selectors";
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            // necessary  to populate form when  existing course is loaded directly
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    saveCourse(event) {
        event.preventDefault();
        if (!this.courseFormIsValid()) {
            return;
        }
        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Course saved');
        this.context.router.push('/courses');
    }

    render() {
        return (
            <div className="jumbotron">
                <CourseFrom
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    course={this.state.course}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}
// add propTypes validations
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// pull in the react router context sorouter is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};


function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course.length) return course[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const couseId = ownProps.params.id; // from path 'couse/:id'

    let course = { id: "", title: "", watchHref: "", authorId: "", length: "", category: "" };

    if (couseId && state.courses.length > 0) {
        course = getCourseById(state.courses, couseId);
    }

    return {
        course: course,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);