/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import Post from "./Post";

export default class Front extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    loadData(){
        $.ajax({
            url:"/api/posts",
            contentType:"application/json",
            success:function(data){
                console.log(data);
                this.setState({data:data});
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        })
    }
    componentDidMount(){
        let loadData = this.loadData.bind(this);
        loadData();
    }
    render(){
        let data = this.state.data.map(function(value, index, array){
            return <Post title={value.title} text={value.text}/>
        });
        return(
            <div>
                <h1>BLOG - MERN</h1>
                <button>+ ADD</button>
                {data}
            </div>
        )
    }
}

