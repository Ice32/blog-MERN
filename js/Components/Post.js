/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";

export default class Post extends React.Component{
    constructor(props){
        super(props);
    }
    deletePost(){
        let id = {
            id:this.props.data._id
        };
        console.log("sending id" , id);
        $.ajax({
            type:"DELETE",
            url:"/api/posts",
            contentType:"application/json",
            data:JSON.stringify(id),
            success:function(data){
                console.log("delete success");
                if(this.props.loadData){
                    console.log("delete is triggering data loading");
                    this.props.loadData();
                }
                else{
                    console.log("delete is not triggering data loading");
                }
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
                <h3>{this.props.data.title}</h3>
                <p>{this.props.data.text}</p>
                <button onClick={this.deletePost.bind(this)}>Delete</button>
            </div>
        )
    }
}