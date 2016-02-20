/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

import RaisedButton from 'material-ui/lib/raised-button';

export default class Post extends React.Component{
    constructor(props){
        super(props);
    }
    deletePost(){
        this.props.deletePost(this.props.data._id);
    }
    render(){
        console.log("rendering Post component");
        return(
            <div style={{paddingLeft:20, paddingRight:15}}>
                <h3>{this.props.index}. {this.props.data.title}</h3>
                <p>{this.props.data.text}</p>
                <RaisedButton onTouchTap={this.deletePost.bind(this)} secondary={true} className="listButton" style={{marginRight:3, height:"27px", width:"60px", minWidth:"5px"}} labelStyle={{fontSize:12, paddingLeft:1, paddingRight:1}} label="Delete"/>
                <Link to={"/posts/" + this.props.data._id}><RaisedButton primary={true} label="View"  style={{marginRight:3, height:"27px", width:"60px", minWidth:"5px"}} labelStyle={{fontSize:12, paddingLeft:1, paddingRight:1}}/></Link>
            </div>
        )
    }
}