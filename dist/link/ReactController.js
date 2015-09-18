var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../definitions/references.d.ts" />
var react = require('react');
var dom = react.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
        this.state = {
            long_url: '',
            short_url: ''
        };
    }
    Component.prototype.handleShorten = function (event) {
        this.props.service.createLink(this.state.long_url);
        event.preventDefault();
    };
    Component.prototype.handleLongUrlChange = function (event) {
        this.setState({ long_url: event.target.value });
    };
    Component.prototype.handleDataChange = function () {
        this.setState({ short_url: this.props.service.getLastCreatedLink().short_url });
    };
    Component.prototype.componentDidMount = function () {
        this.props.service.addChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.componentWillUnmount = function () {
        this.props.service.removeChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.render = function () {
        var short_url = this.state.short_url && document.location.host + '/' + this.state.short_url;
        return dom.form({ onSubmit: this.handleShorten.bind(this), style: { textAlign: 'center' } }, [
            dom.input({
                value: this.state.long_url,
                onChange: this.handleLongUrlChange.bind(this),
                type: 'text',
                placeholder: 'Long URL',
                className: 'form-control',
                style: { width: '80%', display: 'inline-block' }
            }),
            dom.button({
                type: 'submit',
                className: 'btn btn-default'
            }, ['Shorten']),
            dom.div({}, [' ' + short_url])
        ]);
    };
    return Component;
})(react.Component);
module.exports = react.createFactory(Component);
