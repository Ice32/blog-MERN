/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import {render} from "react-dom";
import {Router, hashHistory, Route} from "react-router";

import Front from "./Components/Front";
import AddPost from "./Components/AddPost";
import Post from "./Components/Post";
import PostView from "./Components/PostView";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

class App extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log("rendering app component");
        return(<div>
            <Front/>
        </div>)
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="add" component={AddPost} />
        <Route path="/posts/:id" component={PostView} />
    </Router>
),
    document.getElementById("root"));