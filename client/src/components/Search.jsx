import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Article extends Component {
  constructor(){
    super()
    this.state = {
      query: ''
    }
  }
  
  queryOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  render() {
    return (
      <div className="search-content">
        <div className="form-group search-box">
          <input placeholder="Search here..." name="query" type="text" className="form-control col-lg-10 input-search" onChange={this.queryOnChange}/>
          <Link to={`/search/${this.state.query}`} className="col-lg-2"><button type="button" onClick={() => this.props.search(this.state.query)} className="btn btn-outline-primary">Submit</button></Link>
        </div>
      </div>
    )
  }
};
