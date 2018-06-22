import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// adding a second argument to the component.  we need to get the imfo from the wrapped component.  to get that info, we add a second argument so we can set up a glonal error handler.
const ErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,

    }
    componentDidMount () {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }
    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message :  null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default ErrorHandler;
