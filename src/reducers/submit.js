// reducers/count.js
import { SUBMIT_QUESITON } from '../actions/constants' // 引入action类型常量名
import Data from '../data.js';
// 初始化state数据
const initialState = {
    index: 1,
    data: Data
}

// 通过dispatch action进入
export default function submit(state = initialState, action) {

    // 根据不同的action type进行state的更新
    switch(action.type) {
        case SUBMIT_QUESITON:
            return Object.assign({}, state, { index: state.index+1 })
            break
        default:
            return state
    }
}