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
CHANGE_QUIZ_DATA,
CHANGE_EXAMPLE_DATA,
CHANGE_EXERCISE_DATA,
CHANGE_PROBLEM_DATA,
CHANGE_DIY_DATA,
LOAD_DATA,
SEARCH,
} from '../actions/constants.js';

// import Data from '../data.js'


// export default handleActions({
let question =  handleActions({
	[SUBMIT_QUESTION]: (state,action) => {
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[PREV_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[NEXT_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_INDEX]: (state,action) => {
		console.log(action.payload);
		//console.log(Data);
		// console.log(Data[i].fields.code);
		for(var i=0;i<Data.length;i++){
			if(Data[i].fields.code==action.payload){
				state.index=i;
			}
		}
		console.log(state.index);
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_INDEX_BYID]: (state,action) => {
		state.index=action.payload;
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_EXAMPLE]: (state,action) => {
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_EXERCISE]: (state,action) => {
		
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_PROBLEM]: (state,action) => {
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_DIY]: (state,action) => {
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	['FETCH_THING']:(state,action) => {
		console.log("fetc");
		console.log(action.payload);
		return {
			questionData:action.payload,
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[SIDE_OPEN_CHANGE]: (state,action) => {
		return {
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[SIDE_CLICK]: (state,action) => {
		return {
			current:action.payload,
			exerciseData:state.exerciseData,
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
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[PREV_EXAMPLE]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex == 0 ? 0 : state.exampleIndex-1,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[NEXT_EXAMPLE]: (state,action) => {
		// console.log(state.exampleData.length);
		return {
			exampleIndex: state.exampleIndex == state.exampleData.length-1 ? state.exampleData.length-1:state.exampleIndex+1,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex: state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[PREV_EXERCISE]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex: state.problemIndex,
			exerciseIndex:state.exerciseIndex == 0 ? 0 : state.exerciseIndex-1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[NEXT_EXERCISE]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex: state.problemIndex,
			exerciseIndex:state.exerciseIndex == 32 ? 32:state.exerciseIndex+1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[PREV_PROBLEM]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex == 0 ? 0:state.problemIndex-1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[NEXT_PROBLEM]: (state,action) => {
		console.log("next");
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex == 61 ? 61:state.problemIndex+1,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[PREV_DIY]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex == 0 ? 0:state.diyIndex-1,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[NEXT_DIY]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex == 52 ? 52:state.diyIndex+1,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[PREV_QUIZ]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex == 0 ? 0:state.quizIndex-1,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[NEXT_QUIZ]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex == 9 ? 9:state.quizIndex+1,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_EXAMPLE_INDEX]:(state,action) => ({
		// return {
			exampleIndex: action.payload,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex ,
			exampleData:state.exampleData,
			allData:state.allData,
		// }
	}),
	[CHANGE_EXERCISE_INDEX]:(state,action) => {
		console.log(action.payload);
		return {
			problemIndex: state.problemIndex,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:action.payload,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex ,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_PROBLEM_INDEX]:(state,action) => {
		return {
			problemIndex:action.payload,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			exerciseIndex:state.exerciseIndex,
			quizIndex:state.quizIndex,
			diyIndex:state.diyIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[CHANGE_DIY_INDEX]:(state,action) => {
		return {
			diyIndex:action.payload,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			exerciseIndex:state.exerciseIndex,
			exampleData:state.exampleData,
			allData:state.allData,
		}
	},
	[LOAD_DATA]:(state,action) => {
		return {
			exampleData:state.exampleData,
			allData:action.payload,
			diyIndex:state.diyIndex,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			exerciseIndex:state.exerciseIndex 
		}
	},
	[CHANGE_EXAMPLE_DATA]:(state,action) => {
		return {
			allData:state.allData,
			exampleData:action.payload,
			diyIndex:state.diyIndex,
			exampleIndex: state.exampleIndex,
			questionData: state.questionData,
			current:state.current,
			exerciseData:state.exerciseData,
			index: state.index,
			examplechapter:state.examplechapter,
			exercisechapter:state.exercisechapter,
			problemchapter:state.problemchapter,
			diychapter:state.diychapter,
			problemIndex:state.problemIndex,
			quizIndex:state.quizIndex,
			exerciseIndex:state.exerciseIndex 
		}
	},
	[CHANGE_EXERCISE_DATA]:(state,action) => {
		return {
			exerciseData:action.payload,
			allData:state.allData,
			exampleData:state.exampleData,
			diyIndex:state.diyIndex,
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
	allData:[],
	exampleData:[],
	exerciseData:[],
	current:'0',
	examplechapter:1,
	exercisechapter:1,
	problemchapter:1,
	diychapter:1,
})

let searchstate =  handleActions({

	[SEARCH]: (state,action) => {
		console.log("payload",action.payload);
		return{
			searchType:action.payload.type,
			searchResult:action.payload.result,
		}
	}
},
	{
		searchValue:'',
		searchResult:[],
	}
)

export default combineReducers({
    question,
    searchstate,
    routing: routerReducer
})