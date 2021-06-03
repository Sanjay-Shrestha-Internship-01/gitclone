import React, { Component } from "react";
import axios from'axios';
import { configure } from "@testing-library/dom";

export default class Repo extends Component{
    constructor() {
        super();
      }
    state={
        repos:[],
    };

    componentDidMount(){

        axios.get('https://api.github.com/users/sanjshres/repos').then(res => {
            console.log(res);
            this.setState({ repos: res.data});
            
        });
    }


    render(){
        return(
            <div class="repo-contain">
                <input type="text" placeholder="Find a repository..." />
                <select name="" id="">
                    <optgroup label="Select Type">
                        <option value="all">All</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="forks">Forks</option>
                    </optgroup>
                </select>
                
            <ul>
                {this.state.repos.map(data => 
                <form>
                    <div>{data.name}</div>
                    <div>
                        <div>{data.language}</div>
                        <div>
                        <relative-time datetime={data.updated_at} class="no-wrap" title="May 20, 2021, 3:56 PM GMT+5:45"></relative-time>
                            {data.updated_at}
                            </div>
                    </div>
                    </form>)}
            </ul>
            </div>
        );
    }
}