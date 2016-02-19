/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
export default class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newTitle:"",
            newText:""
        }
    }
    titleChange(e){
        console.log(e.target.value);
    }
    textChange(e){
        console.log(e.target.value);
    }
    render(){
        return(
            <div>
                <input type="text" value={this.state.newTitle} onChange={this.titleChange.bind(this)} placeholder="post title"/>
                <textarea type="text" value={this.state.newText} onChange={this.textChange.bind(this)} placeholder="post text"/>
            </div>
        )
    }
}