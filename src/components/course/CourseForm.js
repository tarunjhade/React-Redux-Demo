import React, { PropTypes } from 'react';
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const CourseFrom = ({ course, allAuthors, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Manage Course</h1>
            <TextInput name="title"
                label="Title"
                onChange={onChange}
                value={course.title}
                error={errors.title} />
            <SelectInput name="authorId"
                label="Author"
                onChange={onChange}
                value={course.authorId}
                defaultOption="Select Author"
                options={allAuthors}
                error={errors.authorId} />
            <TextInput name="category"
                label="Category"
                onChange={onChange}
                value={course.category}
                error={errors.category} />
            <TextInput name="length"
                label="Length"
                onChange={onChange}
                value={course.length}
                error={errors.length} />
            <input
                type="submit"
                disabled={saving}
                onClick={onSave}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary" />
        </form>
    );
};

CourseFrom.propTypes = {
    course: PropTypes.object.isRequired,
    allAuthors: PropTypes.array,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object
};

export default CourseFrom;