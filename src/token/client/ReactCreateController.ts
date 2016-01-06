import * as React from 'react';

var dom = React.DOM;
class Component extends React.Component<any, any> {
  public state = {
    email: '',
    password: ''
  };
  private handleLogin(event) {
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
  private handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  private handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  private handleDataChange() {}
  public componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
  }
  public componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  public render() {
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

export default React.createFactory(Component);