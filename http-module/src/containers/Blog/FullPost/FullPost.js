import React, { Component } from 'react';
import axios from '../../../axios'
import './FullPost.css';

class FullPost extends Component {
  state = {
    post: {}
  }
  componentDidMount() {
    console.log(this.props)
    this.loadData()
  }
  componentDidUpdate(prevProps, prevState) {
    this.loadData()
  }
  async loadData() {
    try {
      const id = Number(this.props.match.params.id)
      if (id) {
        if (!this.state.post || (this.state.post && this.state.post.id !== id)) {
          const response = await axios.get(`/posts/${id}`)
          this.setState({ post: response.data })
        }
      }
    } catch (error) {
      throw error
    }
  }
  deletePostHandler = async () => {
    try {
      const response = await axios.delete(`/posts/${this.props.match.params.id}`)
      console.log(response)
    } catch (error) {
      throw error
    }
  }
  render() {
    // let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    let post
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.post.id) {
      post = (
        <div className="FullPost">
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>

      );
    }
    return post;
  }
}

export default FullPost;