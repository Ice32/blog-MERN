/**
 * Created by Keno on 2/20/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

export default class PostView extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    deletePost(){
        let data = {
            id:this.props.params.id
        };
        console.log("sending id" , data.id);
        $.ajax({
            type:"DELETE",
            url:"/api/posts",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(data){
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
                console.log(data);
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
    render(){
        console.log("rendering PostView component");
        return(
            <div>
                <h3>{this.state.title}</h3>
                <p>{this.state.text}</p>
                <button onClick={this.deletePost.bind(this)}>Delete</button>
                <Link to="/"><button>Home</button></Link>
            </div>
        )
    }
}