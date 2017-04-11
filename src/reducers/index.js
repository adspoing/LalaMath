// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
// import submit from './submit' // 引入update这个reducer

// export default combineReducers({
//     submit,
//     routing: routerReducer
// })

import {handleActions} from 'redux-actions';
import {SUBMIT_QUESTION, PREV_QUESTION, NEXT_QUESTION, CHANGE_INDEX, RANDOM_PLAY} from '../actions/constants.js';

import Data from '../data.js'

// export default handleActions({
let question =  handleActions({
	[SUBMIT_QUESTION]: (state,action) => {
		return {
			index:state.index,
		}
	},
	[PREV_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index == 0 ? 0 : state.index-1,
		}
	},
	[NEXT_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index+1,
		}
	},
	[CHANGE_INDEX]: (state,action) => {
		console.log(action.payload);
		console.log(Data);
		// console.log(Data[i].fields.code);
		for(var i=0;i<Data.length;i++){
			if(Data[i].fields.code==action.payload){
				state.index=i;
			}
		}
		console.log(state.index);
		return {
			index: state.index
		}
	}
},{
	index:1,
	questionData:Data
})

export default combineReducers({
    question,
    routing: routerReducer
})