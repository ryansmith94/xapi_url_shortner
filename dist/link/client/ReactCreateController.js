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
            custom_url: '',
            valid: false
        };
    }
    Component.prototype.getCustomUrl = function (custom_url) {
        if (custom_url === void 0) { custom_url = this.state.custom_url; }
        custom_url = custom_url.split(document.location.host + '/').pop();
        return custom_url || undefined;
    };
    Component.prototype.validateLink = function (long_url, custom_url) {
        var _this = this;
        var mod_custom_url = this.getCustomUrl(custom_url);
        if (long_url.indexOf('://') === -1) {
            long_url = 'http://' + long_url;
        }
        this.props.service.validateLink(long_url, mod_custom_url).then(function () {
            _this.setState({ valid: true });
        }, function () {
            _this.setState({ valid: false });
        });
    };
    Component.prototype.handleShorten = function (event) {
        var custom_url = this.getCustomUrl();
        this.props.service.createLink(this.props.long_url, custom_url).then(function () {
            this.setState({ custom_url: '' });
        }.bind(this), function (err) {
            alert(err);
        });
        event.preventDefault();
    };
    Component.prototype.handleLongUrlChange = function (event) {
        this.props.onLongUrlChange(event.target.value);
        this.validateLink(event.target.value, this.state.custom_url);
    };
    Component.prototype.handleCustomUrlChange = function (event) {
        this.setState({ custom_url: event.target.value });
        this.validateLink(this.props.long_url, event.target.value);
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
                className: 'btn btn-success',
                disabled: !this.state.valid
            }, ['Shorten'])
        ]);
    };
    return Component;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = React.createFactory(Component);
//# sourceMappingURL=ReactCreateController.js.map