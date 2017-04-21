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
PREV_QUIZ,NEXT_QUIZ,CHANGE_QUIZ
} from '../actions/constants.js';

// import Data from '../data.js'


// export default handleActions({
let question =  handleActions({
	[SUBMIT_QUESTION]: (state,action) => {
		return {
			index:state.index,
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
		console.log(action.payload);
		var indexx;
		if(action.payload=="3")
			indexx=1;
		else if(action.payload=="4")
			indexx=12;
		else
			indexx=1;
		return {
			index: state.index,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:indexx,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[CHANGE_EXERCISE]: (state,action) => {
		var indexx;
		if(action.payload=="3")
			indexx=1;
		else if(action.payload=="4")
			indexx=22;
		else
			indexx=1;
		return {
			index: state.index,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:indexx,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[CHANGE_PROBLEM]: (state,action) => {
		console.log(action.payload);
		var indexx;
		if(action.payload=="3")
			indexx=1;
		else if(action.payload=="4")
			indexx=32;
		else if(action.payload=="7")
			indexx=48;
		else
			indexx=1;
		return {
			index: state.index,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex,
			exerciseIndex:state.exerciseIndex,
			problemIndex: indexx,
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
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
		}
	},
	[NEXT_EXAMPLE]: (state,action) => {
		console.log(state.index);
		return {
			exampleIndex: state.exampleIndex == 15 ? 15:state.exampleIndex+1,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
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
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex == 9 ? 9:state.quizIndex+1,
			diyIndex:state.diyIndex 
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
	openKeys:[]
})

export default combineReducers({
    question,
    routing: routerReducer
})