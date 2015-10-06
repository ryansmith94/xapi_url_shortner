var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../definitions/references.d.ts" />
var react = require('react');
var ReactCreateController = require('./ReactCreateController');
var ReactListController = require('./ReactListController');
var dom = react.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
        this.state = {
            long_url: ''
        };
    }
    Component.prototype.handleLongUrlChange = function (long_url) {
        this.setState({ long_url: long_url });
    };
    Component.prototype.handleDataChange = function () { };
    Component.prototype.componentDidMount = function () {
        this.props.service.addChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.componentWillUnmount = function () {
        this.props.service.removeChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.render = function () {
        return dom.div({}, [
            ReactCreateController({
                service: this.props.service,
                long_url: this.state.long_url,
                onLongUrlChange: this.handleLongUrlChange.bind(this)
            }),
            ReactListController({
                service: this.props.service,
                long_url: this.state.long_url
            })
        ]);
    };
    return Component;
})(react.Component);
module.exports = react.createFactory(Component);
//# sourceMappingURL=ReactController.js.map