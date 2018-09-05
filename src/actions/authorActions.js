import * as types from './actionTypes';
import authorApi from "../api/mockAuthorApi";
import { beginAjaxCall } from "./ajaxstatusActions";

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return authorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw (error);
        });
    };
}