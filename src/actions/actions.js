import {createAction} from 'redux-actions';
import axios from 'axios';

import {SUBMIT_QUESTION, NEXT_QUESTION, PREV_QUESTION, PLAY_MODULE, RANDOM_PLAY,CHANGE_INDEX,CHANGE_INDEX_BYID,SIDE_OPEN_CHANGE,SIDE_CLICK,PREV_EXAMPLE,NEXT_EXAMPLE,CHANGE_EXAMPLE,PREV_EXERCISE,NEXT_EXERCISE,CHANGE_EXERCISE
,PREV_PROBLEM,NEXT_PROBLEM,CHANGE_PROBLEM,
PREV_DIY,NEXT_DIY,CHANGE_DIY,
PREV_QUIZ,NEXT_QUIZ,CHANGE_QUIZ,
CHANGE_EXAMPLE_INDEX,
CHANGE_EXERCISE_INDEX,
CHANGE_PROBLEM_INDEX,
CHANGE_DIY_INDEX,
CHANGE_QUIZ_DATA,
CHANGE_EXAMPLE_DATA,
CHANGE_EXERCISE_DATA,
CHANGE_PROBLEM_DATA,
CHANGE_DIY_DATA,
LOAD_DATA
} from './constants';

export const submitquestion = createAction(SUBMIT_QUESTION);
export const nextquestion = createAction(NEXT_QUESTION);
export const prevquestion = createAction(PREV_QUESTION);
export const playmodule = createAction(PLAY_MODULE);
export const randomplay = createAction(RANDOM_PLAY);
export const changeindex = createAction(CHANGE_INDEX);
export const changeindexbyid = createAction(CHANGE_INDEX_BYID);
export const sideopenchange = createAction(SIDE_OPEN_CHANGE);
export const sideclick = createAction(SIDE_CLICK);
export const prevexample = createAction(PREV_EXAMPLE);
export const nextexample = createAction(NEXT_EXAMPLE);
export const changeexample = createAction(CHANGE_EXAMPLE);
export const prevexercise = createAction(PREV_EXERCISE);
export const nextexercise = createAction(NEXT_EXERCISE);
export const changeexercise = createAction(CHANGE_EXERCISE);
export const prevproblem = createAction(PREV_PROBLEM);
export const nextproblem = createAction(NEXT_PROBLEM);
export const changeproblem = createAction(CHANGE_PROBLEM);
export const prevdiy = createAction(PREV_DIY);
export const nextdiy = createAction(NEXT_DIY);
export const changediy = createAction(CHANGE_DIY);
export const prevquiz = createAction(PREV_QUIZ);
export const nextquiz = createAction(NEXT_QUIZ);
export const changequiz = createAction(CHANGE_QUIZ);
export const changeexampleindex = createAction(CHANGE_EXAMPLE_INDEX);
export const changeexerciseindex = createAction(CHANGE_EXERCISE_INDEX);
export const changeproblemindex = createAction(CHANGE_PROBLEM_INDEX);
export const changediyindex = createAction(CHANGE_DIY_INDEX);

export const changequizdata = createAction(CHANGE_QUIZ_DATA);
export const changeexampledata = createAction(CHANGE_EXAMPLE_DATA);
export const changeexercisedata = createAction(CHANGE_EXERCISE_DATA);
export const changeproblemdata = createAction(CHANGE_PROBLEM_DATA);
export const changediydata = createAction(CHANGE_DIY_DATA);

export const loaddata = createAction(LOAD_DATA);
// export const fetchthing = function() {
// 	return dispatch => {
// 		axios.get("http://lala.ust.hk:8000/get/questions/all")
// 			.then(function(response) {
// 				dispatch({
// 					type: 'FETCH_THING',
// 					payload: response.data
// 				})
// 			})

// 	}
// }