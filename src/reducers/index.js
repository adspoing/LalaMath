// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
// import submit from './submit' // 引入update这个reducer

// export default combineReducers({
//     submit,
//     routing: routerReducer
// })

import {handleActions} from 'redux-actions';
import {SUBMIT_QUESTION, PREV_QUESTION, NEXT_QUESTION, CHANGE_INDEX, RANDOM_PLAY,CHANGE_INDEX_BYID,SIDE_OPEN_CHANGE,SIDE_CLICK,PREV_EXAMPLE,NEXT_EXAMPLE,CHANGE_EXAMPLE,NEXT_EXERCISE,PREV_EXERCISE,CHANGE_EXERCISE
,NEXT_PROBLEM,PREV_PROBLEM,CHANGE_PROBLEM
,NEXT_DIY,PREV_DIY,CHANGE_DIY,
PREV_QUIZ,NEXT_QUIZ,CHANGE_QUIZ,
CHANGE_EXAMPLE_INDEX,
CHANGE_EXERCISE_INDEX,
CHANGE_PROBLEM_INDEX,
CHANGE_DIY_INDEX,
} from '../actions/constants.js';

// import Data from '../data.js'


// export default handleActions({
let question =  handleActions({
	[SUBMIT_QUESTION]: (state,action) => {
		return {
			index:state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[PREV_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index == 0 ? 0 : state.index-1,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[NEXT_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index+1,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
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
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			diyIndex:state.diyIndex,
			quizIndex:state.quizIndex,
			problemIndex: state.problemIndex,
		}
	},
	[CHANGE_INDEX_BYID]: (state,action) => {
		state.index=action.payload;
		return {
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[CHANGE_EXAMPLE]: (state,action) => {
		//console.log(action.payload);
		return {
			index: state.index,
			examplechapter:action.payload,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[CHANGE_EXERCISE]: (state,action) => {
		
		return {
			index: state.index,
			exercisechapter:action.payload,
			examplechapter:state.examplechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[CHANGE_PROBLEM]: (state,action) => {
		return {
			index: state.index,
			problemchapter:action.payload,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[CHANGE_DIY]: (state,action) => {
		return {
			index: state.index,
			diychapter:action.payload,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	['FETCH_THING']:(state,action) => {
		console.log("fetc");
		console.log(action.payload);
		return {
			questionData:action.payload,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[SIDE_OPEN_CHANGE]: (state,action) => {
		return {
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[SIDE_CLICK]: (state,action) => {
		return {
			current:action.payload,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			questionData: state.questionData,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[PREV_EXAMPLE]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex == 0 ? 0 : state.exampleIndex-1,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[NEXT_EXAMPLE]: (state,action) => {
		console.log(state.index);
		return {
			exampleIndex: state.exampleIndex == 36 ? 36:state.exampleIndex+1,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[PREV_EXERCISE]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex: state.problemIndex,
			exerciseIndex:state.exerciseIndex == 0 ? 0 : state.exerciseIndex-1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[NEXT_EXERCISE]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex: state.problemIndex,
			exerciseIndex:state.exerciseIndex == 32 ? 32:state.exerciseIndex+1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[PREV_PROBLEM]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex == 0 ? 0:state.problemIndex-1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex
		}
	},
	[NEXT_PROBLEM]: (state,action) => {
		console.log("next");
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex == 61 ? 61:state.problemIndex+1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex
		}
	},
	[PREV_DIY]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex == 0 ? 0:state.diyIndex-1
		}
	},
	[NEXT_DIY]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex == 52 ? 52:state.diyIndex+1
		}
	},
	[PREV_QUIZ]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex == 0 ? 0:state.quizIndex-1,
			diyIndex:state.diyIndex
		}
	},
	[NEXT_QUIZ]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex == 9 ? 9:state.quizIndex+1,
			diyIndex:state.diyIndex,
		}
	},
	[CHANGE_EXAMPLE_INDEX]:(state,action) => {
		return {
			exampleIndex: action.payload,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex 
		}
	},
	[CHANGE_EXERCISE_INDEX]:(state,action) => {
		return {
			exerciseIndex:action.payload,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex 
		}
	},
	[CHANGE_PROBLEM_INDEX]:(state,action) => {
		return {
			problemIndex:action.payload,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex 
		}
	},
	[CHANGE_DIY_INDEX]:(state,action) => {
		return {
			diyIndex:action.payload,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			exerciseIndex:state.exerciseIndex 
		}
	}
},{
	index:1,
	exampleIndex:0,
	exerciseIndex:0,
	problemIndex:0,
	diyIndex:0,
	quizIndex:0,
	questionData:[],
	current:'0',
	examplechapter:1,
	exercisechapter:1,
	problemchapter:1,
	diychapter:1,
})

export default combineReducers({
    question,
    routing: routerReducer
})