import React, { Component } from 'react';

class Course extends Component {
  state = {
    id: null,
    title: null
  }
  componentDidMount() {
    this.setId()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.props.match.params.id) {
      this.setId()
    }
  }
  setId() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      if (param[0] === 'title') {
        this.setState({ title: param[1] })
      }
    }
    this.setState({ id: this.props.match.params.id })
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>You selected the Course with ID: {this.state.id}</p>
      </div>
    );
  }
}

export default Course;