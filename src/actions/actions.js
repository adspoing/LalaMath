import {createAction} from 'redux-actions';
import axios from 'axios';

import {SUBMIT_QUESTION, NEXT_QUESTION, PREV_QUESTION, PLAY_MODULE, RANDOM_PLAY,CHANGE_INDEX,CHANGE_INDEX_BYID,SIDE_OPEN_CHANGE,SIDE_CLICK} from './constants';

export const submitquestion = createAction(SUBMIT_QUESTION);
export const nextquestion = createAction(NEXT_QUESTION);
export const prevquestion = createAction(PREV_QUESTION);
export const playmodule = createAction(PLAY_MODULE);
export const randomplay = createAction(RANDOM_PLAY);
export const changeindex = createAction(CHANGE_INDEX);
export const changeindexbyid = createAction(CHANGE_INDEX_BYID);
export const sideopenchange = createAction(SIDE_OPEN_CHANGE);
export const sideclick = createAction(SIDE_CLICK);
export const fetchthing = function() {
	return dispatch => {
		axios.get("http://lala.ust.hk:8000/get/questions/all")
			.then(function(response) {
				dispatch({
					type: 'FETCH_THING',
					payload: response.data
				})
			})

	}
}