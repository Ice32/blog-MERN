/**
 * Created by Keno on 2/20/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

export default class PostView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode:false
        }
    }
    deletePost(){
        let data = {
            id:this.props.params.id
        };
        $.ajax({
            type:"DELETE",
            url:"/api/posts",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(data){
                this.context.router.replace("/");
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }

        })
    }
    loadData(){
        $.ajax({
            url:"/api/posts/" + this.props.params.id,
            contentType:"application/json",
            success:function(data){
                this.setState({title:data.title, text:data.text})
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        });
    }
    componentWillMount(){
        let loadData = this.loadData.bind(this);
        loadData();
    }
    titleEdit(e){
        this.setState({title:e.target.value})
    }
    textEdit(e){
        this.setState({text:e.target.value})
    }
    editSubmit(){
        let data = {
            title:this.state.title,
            text:this.state.text
        };
        $.ajax({
            url:"/api/posts/" + this.props.params.id,
            contentType:"application/json",
            data:JSON.stringify(data),
            type:"PUT",
            success:function(successData){
                this.setState({editMode:false, preEditTitle:this.state.title, preEditText:this.state.text})
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        })
    }
    editModeOn(){
        this.setState({editMode:true, preEditTitle:this.state.title, preEditText:this.state.text});
    }
    editModeOff(){
        this.setState({editMode:false, title:this.state.preEditTitle, text:this.state.preEditText});
    }
    render(){
        console.log("rendering PostView component");
        if(this.state.editMode){
            return(
                <div>
                    <input type="text" value={this.state.title} onChange={this.titleEdit.bind(this)}/><br />
                    <textarea value={this.state.text} onChange={this.textEdit.bind(this)}/><br />
                    <button onClick={this.editModeOff.bind(this)}>Cancel </button>
                    <button onClick={this.editSubmit.bind(this)}>Done</button>
                    <button onClick={this.deletePost.bind(this)}>Delete</button>
                    <Link to="/"><button>Home</button></Link>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h3>{this.state.title}</h3>
                    <p>{this.state.text}</p>
                    <button onClick={this.editModeOn.bind(this)}>Edit</button>
                    <button onClick={this.deletePost.bind(this)}>Delete</button>
                    <Link to="/"><button>Home</button></Link>
                </div>
            )
        }
    }
}

PostView.contextTypes  = {
    router: React.PropTypes.object.isRequired
};