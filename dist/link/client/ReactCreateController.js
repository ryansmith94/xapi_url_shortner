var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var dom = React.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
        this.state = {
            custom_url: ''
        };
    }
    Component.prototype.handleShorten = function (event) {
        var custom_url = this.state.custom_url.split(document.location.host + '/');
        this.props.service.createLink(this.props.long_url, custom_url[custom_url.length - 1] || undefined).then(function () {
            this.setState({ custom_url: '' });
        }.bind(this), function (err) {
            alert(err);
        });
        event.preventDefault();
    };
    Component.prototype.handleLongUrlChange = function (event) {
        this.props.onLongUrlChange(event.target.value);
    };
    Component.prototype.handleCustomUrlChange = function (event) {
        this.setState({ custom_url: event.target.value });
    };
    Component.prototype.handleDataChange = function () { };
    Component.prototype.componentDidMount = function () {
        this.props.service.addChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.componentWillUnmount = function () {
        this.props.service.removeChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.render = function () {
        return dom.form({ className: 'link_create', onSubmit: this.handleShorten.bind(this), style: { textAlign: 'center' } }, [
            dom.input({
                value: this.props.long_url,
                onChange: this.handleLongUrlChange.bind(this),
                type: 'text',
                placeholder: 'Long URL',
                className: 'long_url form-control'
            }),
            dom.input({
                value: this.state.custom_url,
                onChange: this.handleCustomUrlChange.bind(this),
                type: 'text',
                placeholder: 'Custom URL (Optional)',
                className: 'custom_url form-control'
            }),
            dom.button({
                type: 'submit',
                className: 'btn btn-success'
            }, ['Shorten'])
        ]);
    };
    return Component;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = React.createFactory(Component);
//# sourceMappingURL=ReactCreateController.js.map