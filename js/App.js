/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import {render} from "react-dom";
import {Router, hashHistory, Route} from "react-router";

import Front from "./Components/Front";

class App extends React.Component {
    render(){
        return(<div>
            <Front />
        </div>)
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
),
    document.getElementById("root"));