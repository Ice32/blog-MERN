/**
 * Created by Keno on 2/19/2016.
 */
import React from "react";

export default class Post extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.text}</p>
            </div>
        )
    }
}