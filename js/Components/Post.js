/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

export default class Post extends React.Component{
    constructor(props){
        super(props);
    }
    deletePost(){
        let data = {
            id:this.props.data._id
        };
        console.log("sending id" , data.id);
        $.ajax({
            type:"DELETE",
            url:"/api/posts",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(successData){
                console.log("delete success");
                console.log("delete is triggering data loading for post", data.id);
                this.props.loadData();

            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }

        })
    }
    render(){
        console.log("rendering Post component");
        return(
            <div>
                <h3>{this.props.index}. {this.props.data.title}</h3>
                <p>{this.props.data.text}</p>
                <button onClick={this.deletePost.bind(this)}>Delete</button>
                <Link to={"/posts/" + this.props.data._id}><button>View</button></Link>
            </div>
        )
    }
}