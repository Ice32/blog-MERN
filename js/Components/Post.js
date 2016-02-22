/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

import RaisedButton from 'material-ui/lib/raised-button';

//component for each individual post
export default class Post extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        //if the data didn't change, component (single post) should not re-render
        return nextProps.data !== this.props.data;
    }
    deletePost(){
        //trigger post deletion procedure in the "Front" component
        this.props.openDialog(this.props.data._id);
    }
    render(){
        //button styles
        const buttonMainStyle = {marginRight:3, height:"27px", width:"60px", minWidth:"5px"};
        const buttonLabelStyle = {fontSize:12, paddingLeft:1, paddingRight:1};

        console.log("rendering Post component");
        return(
            <div style={{paddingLeft:20, paddingRight:15, "wordWrap": "break-word"}}>
                <h3>{this.props.index}. {this.props.data.title}</h3>
                <p>{this.props.data.text}</p>
                <RaisedButton label="Delete" onTouchTap={this.deletePost.bind(this)} secondary={true} style={buttonMainStyle} labelStyle={buttonLabelStyle}/>
                <Link to={"/posts/" + this.props.data._id}>
                    <RaisedButton label="View" primary={true} style={buttonMainStyle} labelStyle={buttonLabelStyle}/>
                </Link>
            </div>
        )
    }
}