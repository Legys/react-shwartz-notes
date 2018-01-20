import React, { Component } from 'react';

import Aux from "./Aux";
import Modal from "../components/ui/Modal/Modal";

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.reqIntercepter = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      })
      this.resIntercepter = axios.interceptors.response.use(res => res, error => {
        this.setState({ error })
      })
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntercepter)
      axios.interceptors.response.eject(this.resIntercepter)
    }
    confirmedHandler = () => {
      this.setState({ error: null })
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error}
            closed={this.confirmedHandler}>
            {this.state.error ? this.state.error.message : ''}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler