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

//react-bootstrap grid system
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

//component to add a post
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
        //check if the title exceeds the 50 character limit
        //if it does, do not save the change to the state
        if(e.target.value.length > 50){
            this.setState({titleLengthDialog:true});
            return false;
        }
        this.setState({newTitle:e.target.value});
    }
    textChange(e){
        //same as the method above, check if the input exceeds the length limit
        if(e.target.value.length > 2000){
            this.setState({lengthDialog:true});
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
                //on success, clean up and show the notification Snackbar
                this.setState({newTitle:"", newText:"", justAdded:true});
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        })
    }
    closeSnackbar(){
        //close the Snackbar notifying user of success and redirect user to the home page
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
                            <Avatar backgroundColor={Colors.blueGrey500} icon={
                                <FontIcon className="fa fa-plus"/>}
                            />
                        }/>
                        <CardText>
                            <TextField value={this.state.newTitle} onChange={this.titleChange.bind(this)} placeholder="Post title"/><br/>
                            <TextField value={this.state.newText} onChange={this.textChange.bind(this)} placeholder="Post text" rowsMax={50} multiLine={true} fullWidth={true}/><br />
                        </CardText>
                        <CardActions>
                            <Link to="/">
                                <RaisedButton label="Home" secondary={true}/>
                            </Link>
                            <RaisedButton label="Submit post" onTouchTap={this.submitNewPost.bind(this)} secondary={true}/>
                        </CardActions>
                        <Snackbar  message="Post successfully added, redirecting back to home..." open={this.state.justAdded} onRequestClose={this.closeSnackbar.bind(this)} autoHideDuration={1300} bodyStyle={{textAlign:"center"}}/>
                        {/*Dialog in case title length is exceeded*/}
                        <Dialog title="Your title has gotten too long" actions={<RaisedButton label="ok" primary={true} onTouchTap={ () => {this.setState({titleLengthDialog:false});}  } />} open={this.state.titleLengthDialog} onRequestClose={() => { this.setState({titleLengthDialog:false})}} style={{textAlign:"center"}}>
                            Please make sure not to exceed title character limit of 50
                        </Dialog>
                        {/*Dialog in case post text length is exceeded*/}
                        <Dialog title="Your post has gotten too long" actions={<RaisedButton label="ok" primary={true} onTouchTap={ () => {this.setState({lengthDialog:false})}  } />} open={this.state.lengthDialog} onRequestClose={() => { this.setState({lengthDialog:false})}} style={{textAlign:"center"}}>
                            Please make sure not to exceed post character limit of 2000
                        </Dialog>
                    </Card>
                </Col>
            </Grid>
        )
    }
}

//add router object to the component's context
AddPost.contextTypes  = {
    router: React.PropTypes.object.isRequired
};