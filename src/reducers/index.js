// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
// import submit from './submit' // 引入update这个reducer

// export default combineReducers({
//     submit,
//     routing: routerReducer
// })

import {handleActions} from 'redux-actions';
import {SUBMIT_QUESTION, PREV_QUESTION, NEXT_QUESTION, CHANGE_INDEX, RANDOM_PLAY,CHANGE_INDEX_BYID,SIDE_OPEN_CHANGE,SIDE_CLICK,PREV_EXAMPLE,NEXT_EXAMPLE,CHANGE_EXAMPLE} from '../actions/constants.js';

// import Data from '../data.js'


// export default handleActions({
let question =  handleActions({
	[SUBMIT_QUESTION]: (state,action) => {
		return {
			index:state.index,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex
		}
	},
	[PREV_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index == 0 ? 0 : state.index-1,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex
		}
	},
	[NEXT_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index+1,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex
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
			exampleIndex:state.exampleIndex
		}
	},
	[CHANGE_INDEX_BYID]: (state,action) => {
		state.index=action.payload;
		return {
			index: state.index,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex
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
			exampleIndex:indexx
		}
	},
	['FETCH_THING']:(state,action) => {
		console.log("fetc");
		console.log(action.payload);
		return {
			questionData:action.payload,
			index: state.index,
			current:state.current,
			exampleIndex:state.exampleIndex
		}
	},
	[SIDE_OPEN_CHANGE]: (state,action) => {
		return {
			index: state.index,
			questionData: state.questionData,
			current:state.current,
			exampleIndex:state.exampleIndex
		}
	},
	[SIDE_CLICK]: (state,action) => {
		return {
			current:action.payload,
			index: state.index,
			questionData: state.questionData,
			exampleIndex:state.exampleIndex
		}
	},
	[PREV_EXAMPLE]: (state,action) => {
		return {
			exampleIndex: state.exampleIndex == 0 ? 0 : state.exampleIndex-1,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
		}
	},
	[NEXT_EXAMPLE]: (state,action) => {
		console.log(state.index);
		return {
			exampleIndex: state.exampleIndex == 15 ? 15:state.exampleIndex+1,
			questionData: state.questionData,
			current:state.current,
			index: state.index,
		}
	}
},{
	index:1,
	exampleIndex:1,
	questionData:[],
	current:'0',
	openKeys:[]
	// axios.get("http://lala.ust.hk:8000/get/questions/all")
 //                 .then(function(response) {
 //                 	console.log(response.data)
 //                return response.data;
 //    })
})

export default combineReducers({
    question,
    routing: routerReducer
})