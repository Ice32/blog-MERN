/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import Post from "./Post";
import {Link} from "react-router";

//import Material UI components
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';

//import react bootstrap grid
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

//Front page component
export default class Front extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            justDeleted:false,
            dialogOpen:false,
            idToDelete:""
        }
    }
    componentDidMount(){
        let loadData = this.loadData.bind(this);
        loadData();
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
    openDialog(id){
        //this method is triggered by "Post" child component when user is attempting to delete a post
        //dialog is being opened, and if the user confirms deletion, deletePost method is called
        this.setState({dialogOpen:true, idToDelete:id});
    }
    deletePost(){
        this.setState({dialogOpen:false}); //close dialog asking for delete confirmation
        let data = {
            id:this.state.idToDelete
        };
        $.ajax({
            type:"DELETE",
            url:"/api/posts",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(successData){
                console.log("delete is triggering data loading for post", data.id);
                this.loadData();
                this.setState({justDeleted:true});
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        })
    }
    render(){
        let self = this;
        const dialogActions = [
            //if the user clicks confirm, we initialise the deletion method. Otherwise, we just remove the dialog
            <RaisedButton label="Confirm" onTouchTap={this.deletePost.bind(this)} secondary={true} style={{marginRight:3}}/> ,
            <RaisedButton label="Cancel" onTouchTap={() => {this.setState({dialogOpen:false})}} secondary={true} />
        ];
        //all of the posts
        let data = this.state.data.map(function(value, index, array){
            return (<Col lg={9} md={10} sm={12} xs={12} key={value._id}>
                        <Paper style={{padding:5, paddingBottom:15, marginBottom:10}}  zDepth={1}>
                            <Post openDialog={self.openDialog.bind(self)} index={index+1} data={value} />
                        </Paper>
                   </Col>)
        });
        console.log("rendering Front component");
        return(
            <div>
                <AppBar title="BLOG - MERN" showMenuIconButton={false}/>
                <Grid fluid={true}>
                    <Link to="/add">
                        <RaisedButton style={{marginTop:5, marginBottom:3}} label="ADD" primary={true} icon={<FontIcon className="fa fa-plus"/>}/>
                    </Link>
                    <Row>
                        {data}
                    </Row>
                </Grid>
                <Snackbar message="Post successfully deleted" onRequestClose={ () => {this.setState({justDeleted:false})} } open={this.state.justDeleted} autoHideDuration={3000} bodyStyle={{textAlign:"center"}}/>
                <Dialog title="Are you sure you want to delete this post?" modal={true} open={this.state.dialogOpen} actions={dialogActions}/>
            </div>
        )
    }
}

