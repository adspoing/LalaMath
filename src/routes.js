import React from 'react' // 引入react
import { Route, IndexRoute } from 'react-router' // 引入react路由
import { Home, App, Player, Question, QuestionList, Select, SideBar,Header,rightAns,Chart,Dashboard,ViewQuestion} from './containers' // 引入各容器组件

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="index" component={Home}/>
        <Route path="QuestionList" component={QuestionList}/>
        <Route path="Home" component={Home}/>
        <Route path="rightAns" component={rightAns}/>
        <Route path="Questions" component={Player}/>
        <Route path="Chart" component={Chart}/>
        <Route path="Dashboard" component={Dashboard}/>
        <Route path="ViewQuestion" component={ViewQuestion}/>
    </Route>
)