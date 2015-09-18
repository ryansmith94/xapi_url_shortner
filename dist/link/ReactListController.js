var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../definitions/references.d.ts" />
var react = require('react');
var item = require('./ReactItem');
var dom = react.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
        this.state = {
            links: []
        };
    }
    Component.prototype.getLinks = function () {
        this.props.service.getLinks().then(function (links) {
            this.setState({ links: links });
        }.bind(this));
    };
    Component.prototype.handleDataChange = function () {
        this.getLinks();
    };
    Component.prototype.componentDidMount = function () {
        this.props.service.addChangeListener(this.handleDataChange.bind(this));
        this.getLinks();
    };
    Component.prototype.componentWillUnmount = function () {
        this.props.service.removeChangeListener(this.handleDataChange.bind(this));
    };
    Component.prototype.render = function () {
        return dom.div({ className: 'link_list' }, this.state.links.reverse().map(item));
    };
    return Component;
})(react.Component);
module.exports = react.createFactory(Component);
