/**
 * Created by Keno on 2/20/2016.
 */
import React from "react";
import $ from "jquery";
import {Link} from "react-router";

//import Material UI components
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';

//import react bootstrap grid
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

//component to view a single post in a separate route
export default class PostView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode:false,
            justEdited:false,
            justDeleted:false,
            confirmDeletionDialog:false,
            lengthDialog:false,
            titleLengthDialog:false
        }
    }
    //using Front component's deletePost method is not feasible without global event system
    // like Flux, as these two components are not in a parent-child relationship
    deletePost(){
        this.setState({confirmDeletionDialog:false});   //close dialog asking for delete confirmation
        let data = {
            id:this.props.params.id
        };
        $.ajax({
            type:"DELETE",
            url:"/api/posts",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(){
                //make the notification Snackbar become visible
                this.setState({justDeleted:true});
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
        //with each title input change, check if the title length exceeds the max length
        if(e.target.value.length > 50){
            //if it does, then show the warning dialog and prevent the title from changing
            this.setState({titleLengthDialog:true});
            return false;
        }
        this.setState({title:e.target.value})
    }
    textEdit(e){
        //if text length exceeds the max length, show the warning dialog
        //and don't save the last text change in the state (just like titleEdit method above)
        if(e.target.value.length > 2000){
            this.setState({lengthDialog:true});
            return false;
        }
        this.setState({text:e.target.value})
    }
    editSubmit(){
        if(!this.state.title || !this.state.text) return false;
        let data = {
            title:this.state.title,
            text:this.state.text
        };
        $.ajax({
            url:"/api/posts/" + this.props.params.id,
            contentType:"application/json",
            data:JSON.stringify(data),
            type:"PUT",
            success:function(){
                this.setState({editMode:false, preEditTitle:this.state.title, preEditText:this.state.text, justEdited:true})
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
    closeDeleteSnackbar(){
        //close snackbar informing the user that the post has been successfuly deleted and
        //redirect user to home page
        this.setState({justEdited:false});
        this.context.router.replace("/");
    }
    render(){
        console.log("rendering PostView component");

        //buttons used for deletion confirmation dialog
        const dialogActions = [
            //either proceed with the deletion ("confirm") or just remove the dialog
            <RaisedButton label="Confirm" onTouchTap={this.deletePost.bind(this)} secondary={true} style={{marginRight:3}}/> ,
            <RaisedButton label="Cancel" onTouchTap={() => {this.setState({confirmDeletionDialog:false})}} secondary={true}/>
        ];

        //there are two different views, edit mode and regular view mode
        if(this.state.editMode){
            return(
                <Card>
                    <CardHeader>
                        <TextField value={this.state.title} onChange={this.titleEdit.bind(this)} style={{fontSize:"30px"}}/><br />
                    </CardHeader>
                    <CardText>
                        <TextField value={this.state.text} multiLine={true} onChange={this.textEdit.bind(this)} rowsMax={50} fullWidth={true}/><br />
                    </CardText>
                    <CardActions>
                        {/*user either cancels the edit or confirms it, in which case the edit gets submitted */}
                        <RaisedButton label="Cancel" onTouchTap={this.editModeOff.bind(this)} secondary={true} style={{marginRight:3}}/>
                        <RaisedButton label="Done" onTouchTap={this.editSubmit.bind(this)} secondary={true} style={{marginRight:3}}/>
                    </CardActions>
                    {/*Dialog in case post text length is exceeded*/}
                    <Dialog title="Your post has gotten too long " actions={<RaisedButton label="ok" primary={true} onTouchTap={ () => {this.setState({lengthDialog:false})} } />} open={this.state.lengthDialog} onRequestClose={() => { this.setState({lengthDialog:false})}} style={{textAlign:"center"}}>
                        Please make sure not to exceed post character limit of 2000
                    </Dialog>
                    {/*Dialog in case title length is exceeded*/}
                    <Dialog title="Your title has gotten too long " actions={<RaisedButton label="ok" primary={true} onTouchTap={ () => {this.setState({titleLengthDialog:false})} } />} open={this.state.titleLengthDialog} onRequestClose={() => { this.setState({titleLengthDialog:false})}} style={{textAlign:"center"}}>
                        Please make sure not to exceed title character limit of 50
                    </Dialog>
                </Card>
            )
        }
        else{
            return(
                <Grid fluid={true}>
                    <Row>
                        <Col lg={10} md={11} sm={12} xs={12}>
                            <Card style={{marginTop:"2%", "wordWrap": "break-word"}}>
                                <CardHeader title={this.state.title} titleStyle={{fontSize:"30px"}}/>
                                <CardText >
                                    {this.state.text}
                                </CardText>
                                <CardActions>
                                    <RaisedButton label="Edit" onTouchTap={this.editModeOn.bind(this)} secondary={true} style={{marginRight:3}}/>
                                    <RaisedButton label="Delete" onTouchTap={() => {this.setState({confirmDeletionDialog:true})} } secondary={true} style={{marginRight:3}}/>
                                    <Link to="/">
                                        <RaisedButton label="Home" secondary={true} style={{marginRight:3}}/>
                                    </Link>
                                </CardActions>
                                <Snackbar message="Post successfully edited" open={this.state.justEdited} onRequestClose={ () => {this.setState({justEdited:false})} } bodyStyle={{textAlign:"center"}} autoHideDuration={3000}/>
                                <Snackbar message="Post deleted, redirecting back to home..." open={this.state.justDeleted} onRequestClose={this.closeDeleteSnackbar.bind(this)} bodyStyle={{textAlign:"center"}} autoHideDuration={2000}/>
                                <Dialog title="Are you sure you want to delete this post?" modal={true} open={this.state.confirmDeletionDialog} actions={dialogActions}/>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            )
        }
    }
}

//add router object to component context
PostView.contextTypes  = {
    router: React.PropTypes.object.isRequired
};