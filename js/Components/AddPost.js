/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

export default class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newTitle:"",
            newText:""
        }
    }
    titleChange(e){
        this.setState({newTitle:e.target.value});
    }
    textChange(e){
        this.setState({newText:e.target.value});
    }
    submitNewPost(){
        if(!this.state.newTitle || !this.state.newText){
            return false;
        }
        let submitObject = {
            title:this.state.newTitle,
            text:this.state.newText
        };
        console.log("data I'm sending is", submitObject);
        $.ajax({
            url:"/api/posts",
            data:JSON.stringify(submitObject),
            type:"POST",
            contentType:"application/json",
            success:function(){
                this.setState({newTitle:"", newText:""});
                this.context.router.replace("/");
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        })
    }
    render(){
        console.log("rendering AddPost component");
        return(
            <div>
                <input type="text" value={this.state.newTitle} onChange={this.titleChange.bind(this)} placeholder="post title"/><br/>
                <textarea type="text" value={this.state.newText} onChange={this.textChange.bind(this)} placeholder="post text"/><br />
                <button onClick={this.submitNewPost.bind(this)}>Submit post</button>
                <Link to="/"><button>Home</button></Link>
            </div>
        )
    }
}

AddPost.contextTypes  = {
    router: React.PropTypes.object.isRequired
};