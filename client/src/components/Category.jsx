import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Category extends Component {

  render() {
    return (
      <div className="searchCategory">
        <Link to={`/category/business`} className="col-lg-2"><button className="btn btn-outline-success select-category" onClick={()=> this.props.selectCategory('business')}>Business</button></Link>
        <Link to={`/category/entertainment`} className="col-lg-2"><button className="btn btn-outline-success select-category" onClick={()=> this.props.selectCategory('entertainment')}>Entertainment</button></Link>
        <Link to={`/category/health`} className="col-lg-2"><button className="btn btn-outline-success select-category" onClick={()=> this.props.selectCategory('health')}>Health</button></Link>
        <Link to={`/category/science`} className="col-lg-2"><button className="btn btn-outline-success select-category" onClick={()=> this.props.selectCategory('science')}>Science</button></Link>
        <Link to={`/category/sports`} className="col-lg-2"><button className="btn btn-outline-success select-category" onClick={()=> this.props.selectCategory('sports')}>Sports</button></Link>
        <Link to={`/category/technology`} className="col-lg-2"><button className="btn btn-outline-success select-category" onClick={()=> this.props.selectCategory('technology')}>Technology</button></Link>
      </div>
    )
  }
};
