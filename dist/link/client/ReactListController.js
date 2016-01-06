var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactItem_1 = require('./ReactItem');
var dom = React.DOM;
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
        }.bind(this), function (err) {
            alert(err);
        });
    };
    Component.prototype.handleDelete = function (id) {
        this.props.service.deleteLinkById(id).then(function () {
        }, function (err) {
            console.log(err.stack);
            alert(err);
        });
    };
    Component.prototype.handleDataChange = function () {
        console.log('Data Changed');
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
        return dom.div({ className: 'link_list' }, this.state.links.filter(function (link) {
            link.onDelete = this.handleDelete.bind(this);
            return link.long_url.indexOf(this.props.long_url) !== -1;
        }.bind(this)).reverse().map(ReactItem_1.default));
    };
    return Component;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = React.createFactory(Component);
//# sourceMappingURL=ReactListController.js.map