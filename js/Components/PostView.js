/**
 * Created by Keno on 2/20/2016.
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
                <Card>
                    <CardHeader>
                        <TextField style={{fontSize:"30px"}} value={this.state.title} onChange={this.titleEdit.bind(this)}/><br />
                    </CardHeader>
                    <CardText>
                        <TextField multiLine={true} fullWidth={true} value={this.state.text} onChange={this.textEdit.bind(this)}/><br />
                    </CardText>
                    <CardActions>
                        <RaisedButton onTouchTap={this.editModeOff.bind(this)} secondary={true} label="Cancel" style={{marginRight:3}}/>
                        <RaisedButton onTouchTap={this.editSubmit.bind(this)} secondary={true} label="Done" style={{marginRight:3}}/>
                        <RaisedButton onTouchTap={this.deletePost.bind(this)} secondary={true} label="Delete" style={{marginRight:3}}/>
                        <Link to="/"><RaisedButton label="Home" secondary={true}/></Link>
                    </CardActions>
                </Card>
            )
        }
        else{
            return(
                <Card>
                    <CardHeader style={{marginTop:15}} title={this.state.title} titleStyle={{fontSize:"30px"}}/>
                    <CardText >
                        {this.state.text}
                    </CardText>
                    <CardActions>
                        <RaisedButton onTouchTap={this.editModeOn.bind(this)} label="Edit" secondary={true} style={{marginRight:3}}/>
                        <RaisedButton onTouchTap={this.deletePost.bind(this)} label="Delete" secondary={true} style={{marginRight:3}}/>
                        <Link to="/"><RaisedButton label="Home" secondary={true} style={{marginRight:3}}/></Link>
                    </CardActions>
                </Card>
            )
        }
    }
}

PostView.contextTypes  = {
    router: React.PropTypes.object.isRequired
};