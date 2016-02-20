/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import {Colors} from 'material-ui/lib/styles';

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
            text:this.state.newText,
            dateCreated:new Date()
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
            <Card>
                <CardHeader title="Add a new post" titleStyle={{fontSize:"30px"}} avatar={
                    <Avatar backgroundColor={Colors.blueGrey500} icon={ <FontIcon className="fa fa-plus"/>}/>
                }/>
                <CardText>
                    <TextField value={this.state.newTitle} onChange={this.titleChange.bind(this)} placeholder="post title"/><br/>
                    <TextField multiLine={true} fullWidth={true} value={this.state.newText} onChange={this.textChange.bind(this)} placeholder="post text"/><br />
                </CardText>
                <CardActions>
                    <RaisedButton secondary={true} onTouchTap={this.submitNewPost.bind(this)} label="Submit post"/>
                    <Link to="/"><RaisedButton secondary={true} label="Home"/></Link>
                </CardActions>
            </Card>
        )
    }
}

AddPost.contextTypes  = {
    router: React.PropTypes.object.isRequired
};