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
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

export default class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newTitle:"",
            newText:"",
            justAdded:false,
            lengthDialog:false,
            titleLengthDialog:false
        }
    }
    titleChange(e){
        if(e.target.value.length > 50){
            this.setState({titleLengthDialog:true});
            console.log("too loong");
            return false;
        }
        this.setState({newTitle:e.target.value});
    }
    textChange(e){
        if(e.target.value.length > 2000){
            this.setState({lengthDialog:true});
            console.log("too loong");
            return false;
        }
        this.setState({newText:e.target.value});
    }
    submitNewPost(){
        if(!this.state.newTitle || !this.state.newText ){
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
                this.setState({newTitle:"", newText:"", justAdded:true});
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        })
    }
    closeSnackbar(){
        this.setState({justAdded:false});
        this.context.router.replace("/");
    }

    render(){
        console.log("rendering AddPost component");
        return(
            <Grid fluid={true}>
                    <Col xs={12} sm={12} md={10} lg={9}>
                        <Card style={{marginTop:"3%", padding:10}}>
                            <CardHeader title="Add a new post" titleStyle={{fontSize:"30px"}} avatar={
                    <Avatar backgroundColor={Colors.blueGrey500} icon={ <FontIcon className="fa fa-plus"/>}/>
                }/>
                            <CardText>
                                <TextField value={this.state.newTitle} onChange={this.titleChange.bind(this)} placeholder="post title"/><br/>
                                <TextField rowsMax={50} multiLine={true} fullWidth={true} value={this.state.newText} onChange={this.textChange.bind(this)} placeholder="post text"/><br />
                            </CardText>
                            <CardActions>
                                <Link to="/"><RaisedButton secondary={true} label="Home"/></Link>
                                <RaisedButton secondary={true} onTouchTap={this.submitNewPost.bind(this)} label="Submit post"/>
                            </CardActions>
                            <Snackbar open={this.state.justAdded} message="Post successfully added, redirecting back to home..." onRequestClose={this.closeSnackbar.bind(this)} bodyStyle={{textAlign:"center"}} autoHideDuration={1300}/>
                            {/*Dialog in case post text length is exceeded*/}
                            <Dialog actions={<RaisedButton primary={true} label="ok" onTouchTap={  () => {this.setState({lengthDialog:false})}          } />} open={this.state.lengthDialog} style={{textAlign:"center"}} onRequestClose={() => { this.setState({lengthDialog:false})}} title="Your post has gotten too long ">
                                Please make sure not to exceed post character limit of 2000
                            </Dialog>
                            {/*Dialog in case title length is exceeded*/}
                            <Dialog actions={<RaisedButton primary={true} label="ok" onTouchTap={  () => {this.setState({titleLengthDialog:false});}      } />} open={this.state.titleLengthDialog} style={{textAlign:"center"}} onRequestClose={() => { this.setState({titleLengthDialog:false})}} title="Your title has gotten too long ">
                                Please make sure not to exceed title character limit of 50
                            </Dialog>
                        </Card>
                    </Col>
            </Grid>
        )
    }
}

AddPost.contextTypes  = {
    router: React.PropTypes.object.isRequired
};