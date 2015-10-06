var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../definitions/references.d.ts" />
var react = require('react');
var dom = react.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
        this.state = {
            email: '',
            password: ''
        };
    }
    Component.prototype.handleLogin = function (event) {
        this.props.service.createToken(this.state.email, this.state.password).then(function (token) {
            this.props.onTokenChange(token);
        }.bind(this), function (err) {
            alert(err);
        });
        event.preventDefault();
    };
    Component.prototype.handleEmailChange = function (event) {
        this.setState({ email: event.target.value });
    };
    Component.prototype.handlePasswordChange = function (event) {
        this.setState({ password: event.target.value });
    };
    Component.prototype.handleDataChange = function () { };
    Component.prototype.componentDidMount = function () {
        this.props.service.addChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.componentWillUnmount = function () {
        this.props.service.removeChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.render = function () {
        return dom.form({ className: 'token_create', onSubmit: this.handleLogin.bind(this), style: { textAlign: 'center' } }, [
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
    };
    return Component;
})(react.Component);
module.exports = react.createFactory(Component);
//# sourceMappingURL=ReactCreateController.js.map