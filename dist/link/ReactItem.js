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
    }
    Component.prototype.getFavicon = function (url) {
        var match = (url || '').match(/:\/\/(.[^/]+)/);
        if (match && match.length > 0) {
            return 'http://' + match[1] + '/favicon.ico';
        }
        else {
            return '';
        }
    };
    Component.prototype.render = function () {
        var location = document.location;
        var short_url = location.protocol + '//' + location.host + '/' + this.props.short_url;
        return dom.div({ className: 'link_item clearfix' }, [
            dom.span({ className: 'col col-xs-1 link_icon_col' }, [
                dom.img({ className: 'link_icon', src: this.getFavicon(this.props.long_url) }),
            ]),
            dom.span({ className: 'col col-xs-11 link_info_col' }, [
                dom.div({}, [dom.a({ className: 'short_url text-primary', href: short_url }, [short_url])]),
                dom.div({}, [dom.a({ className: 'long_url small text-muted', href: this.props.long_url }, [this.props.long_url])])
            ])
        ]);
    };
    return Component;
})(react.Component);
module.exports = react.createFactory(Component);
