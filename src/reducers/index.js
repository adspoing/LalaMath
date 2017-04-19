// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
// import submit from './submit' // 引入update这个reducer

// export default combineReducers({
//     submit,
//     routing: routerReducer
// })

import {handleActions} from 'redux-actions';
import {SUBMIT_QUESTION, PREV_QUESTION, NEXT_QUESTION, CHANGE_INDEX, RANDOM_PLAY,CHANGE_INDEX_BYID,SIDE_OPEN_CHANGE,SIDE_CLICK} from '../actions/constants.js';

// import Data from '../data.js'


// export default handleActions({
let question =  handleActions({
	[SUBMIT_QUESTION]: (state,action) => {
		return {
			index:state.index,
			questionData: state.questionData
		}
	},
	[PREV_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index == 0 ? 0 : state.index-1,
			questionData: state.questionData
		}
	},
	[NEXT_QUESTION]: (state,action) => {
		console.log(state.index);
		return {
			index: state.index+1,
			questionData: state.questionData
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
			questionData: state.questionData
		}
	},
	[CHANGE_INDEX_BYID]: (state,action) => {
		state.index=action.payload;
		return {
			index: state.index,
			questionData: state.questionData
		}
	},
	['FETCH_THING']:(state,action) => {
		console.log("fetc");
		console.log(action.payload);
		return {
			questionData:action.payload,
			index: state.index
		}
	},
	[SIDE_OPEN_CHANGE]: (state,action) => {
		return {
			index: state.index,
			questionData: state.questionData,
			openKeys:action.payload,
			current:state.current
		}
	},
	[SIDE_CLICK]: (state,action) => {
		return {
			openKeys:state.openKeys,
			current:action.payload,
			index: state.index,
			questionData: state.questionData
		}
	}
},{
	index:1,
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