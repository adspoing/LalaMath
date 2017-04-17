import {createAction} from 'redux-actions';
import {SUBMIT_QUESTION, NEXT_QUESTION, PREV_QUESTION, PLAY_MODULE, RANDOM_PLAY,CHANGE_INDEX,CHANGE_INDEX_BYID} from './constants';

export const submitquestion = createAction(SUBMIT_QUESTION);
export const nextquestion = createAction(NEXT_QUESTION);
export const prevquestion = createAction(PREV_QUESTION);
export const playmodule = createAction(PLAY_MODULE);
export const randomplay = createAction(RANDOM_PLAY);
export const changeindex = createAction(CHANGE_INDEX);
export const changeindexbyid = createAction(CHANGE_INDEX_BYID);
