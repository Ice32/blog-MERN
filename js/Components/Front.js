/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";
import $ from "jquery";
import Post from "./Post";
import {Link} from "react-router";

import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Paper from 'material-ui/lib/paper';
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';

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
    deletePost(){
        this.setState({dialogOpen:false});
        let data = {
            id:this.state.idToDelete
        };
        $.ajax({
            type:"DELETE",
            url:"/api/posts",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(successData){
                console.log("delete success");
                console.log("delete is triggering data loading for post", data.id);
                this.loadData();
                this.setState({justDeleted:true});
            }.bind(this),
            error:function(xhr, status, error){
                console.error(status, error.toString());
            }
        })
    }
    openDialog(id){
        this.setState({dialogOpen:true, idToDelete:id});
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
    handleRequestClose(){
        this.setState({justDeleted:false});
    }
    componentDidMount(){
        let loadData = this.loadData.bind(this);
        loadData();
    }
    render(){
        let self = this;
        const dialogActions = [
            <RaisedButton label="Confirm" secondary={true} onTouchTap={this.deletePost.bind(this)} style={{marginRight:3}}/> ,
            <RaisedButton label="Cancel" secondary={true} onTouchTap={() => {this.setState({dialogOpen:false})}}/>
        ];
        let data = this.state.data.map(function(value, index, array){
            return <Paper style={{padding:5, marginBottom:5}} key={value._id} zDepth={1}>
                         <Post openDialog={self.openDialog.bind(self)} deletePost={self.deletePost.bind(self)} index={index+1} data={value} />
                    </Paper>
        });
        console.log("rendering Front component");
        return(
            <div>
                <AppBar title="BLOG - MERN" showMenuIconButton={false}/>
                <Link to="/add">
                    <RaisedButton style={{marginTop:5}} label="ADD" primary={true}linkButton={true} icon={<FontIcon className="fa fa-plus"/>}/>
                </Link>
                {data}
                <Snackbar bodyStyle={{textAlign:"center"}} open={this.state.justDeleted} message="Post successfully deleted" autoHideDuration={3000} onRequestClose={this.handleRequestClose.bind(this)}/>
                <Dialog modal={true} open={this.state.dialogOpen} title="Are you sure you want to delete this post?" actions={dialogActions}/>
            </div>
        )
    }
}

