import React, { Component } from 'react';
import axios from '../../axios'
import './FullPost.css';

class FullPost extends Component {
  state = {
    post: {}
  }
  async componentDidUpdate() {
    if (this.props.id) {
      if (!this.state.post || (this.state.post && this.state.post.id !== this.props.id)) {
        const response = await axios.get(`/posts/${this.props.id}`)
        this.setState({ post: response.data })
      }
    }
  }
  deletePostHandler = async () => {
    try {
      const response = await axios.delete(`/posts/${this.props.id}`)
      console.log(response)
    } catch (error) {
      throw error
    }
  }
  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.props.id) {
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