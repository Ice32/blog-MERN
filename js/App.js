/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import {render} from "react-dom";
import {Router, hashHistory, Route} from "react-router";

import Front from "./Components/Front";
import AddPost from "./Components/AddPost";

class App extends React.Component {
    render(){
        console.log("rendering app component");
        return(<div>
            <Front />
        </div>)
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="add" component={AddPost} />
    </Router>
),
    document.getElementById("root"));