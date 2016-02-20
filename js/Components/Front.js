/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import Post from "./Post";
import {Link} from "react-router";

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
        let self = this;
        let data = this.state.data.map(function(value, index, array){
            return <Post index={index+1} key={value._id} data={value} loadData={self.loadData.bind(self)}/>
        });
        console.log("rendering Front component");
        return(
            <div>
                <h1>BLOG - MERN</h1>
                <Link to="/add"><button>+ ADD</button></Link>
                {data}
            </div>
        )
    }
}

