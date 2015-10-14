/// <reference path="../../definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  public state = {
    email: '',
    password: ''
  };
  private handleCreate(event) {
    this.props.service.createUser(
      this.state.email,
      this.state.password
    ).then(function () {
      this.setState({email: '', password: ''});
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
    return dom.form({
      className: 'user_create',
      onSubmit: this.handleCreate.bind(this),
      style: {textAlign: 'center'}
    }, [
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
      }, ['Invite'])
    ]);
  }
}

export = react.createFactory(Component);