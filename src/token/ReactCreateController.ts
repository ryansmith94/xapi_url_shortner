/// <reference path="../definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    email: '',
    password: ''
  };
  handleLogin(event) {
    this.props.service.createToken(
      this.state.email,
      this.state.password
    ).then(function (token) {
      this.props.onTokenChange(token);
    }.bind(this), function (err) {
      alert(err);
    });
    event.preventDefault();
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleDataChange() {}
  componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
  }
  componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  render() {
    return dom.form({className: 'token_create', onSubmit: this.handleLogin.bind(this), style: {textAlign: 'center'}}, [
      dom.input({
        value: this.state.email,
        onChange: this.handleEmailChange.bind(this),
        type: 'text',
        placeholder: 'Email',
        className: 'email form-control'
      }),
      dom.input({
        value: this.state.password,
        onChange: this.handlePasswordChange.bind(this),
        type: 'password',
        placeholder: 'Password',
        className: 'password form-control'
      }),
      dom.button({
        type: 'submit',
        className: 'btn btn-success'
      }, ['Login'])
    ]);
  }
}

export = react.createFactory(Component);