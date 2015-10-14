var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./definitions/references.d.ts" />
var react = require('react');
var docCookie = require('./docCookie');
var dom = react.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
        this.state = {
            token: docCookie.getItem('token') || '',
            route: window.location.hash.replace('#', '')
        };
    }
    Component.prototype.handleTokenChange = function (token) {
        // Saves token in cookies.
        var current_date = new Date();
        var expiry_date = new Date();
        expiry_date.setMinutes(current_date.getMinutes() + 30);
        docCookie.setItem('token', token, expiry_date);
        // Updates state.
        this.setState({ token: token });
    };
    Component.prototype.handleLogout = function (e) {
        this.setState({ token: '' });
        e.preventDefault();
    };
    Component.prototype.componentDidMount = function () {
        window.onhashchange = function (event) {
            this.setState({ route: event.newURL.split('#').slice(1).join('#') });
        }.bind(this);
    };
    Component.prototype.render = function () {
        var navbar = dom.nav({ className: 'navbar navbar-default navbar-fixed-top' }, [
            dom.div({ className: 'container' }, [
                dom.div({ className: 'navbar-header' }, [
                    dom.button({
                        'data-toggle': 'collapse',
                        'data-target': '#bs-nav',
                        className: 'navbar-toggle collapsed'
                    }, [
                        dom.span({ className: 'sr-only' }, ['Toggle navigation']),
                        dom.span({ className: 'icon-bar' }, []),
                        dom.span({ className: 'icon-bar' }, []),
                        dom.span({ className: 'icon-bar' }, [])
                    ]),
                    dom.div({ className: 'navbar-brand' }, ['xAPI URL Shortener'])
                ]),
                dom.div({ id: 'bs-nav', className: 'collapse navbar-collapse' }, [
                    dom.ul({ className: 'nav navbar-nav navbar-right' }, [
                        dom.li({}, [dom.a({ href: '#' }, ['Links'])]),
                        dom.li({}, [dom.a({ href: '#invite' }, ['Invite'])]),
                        dom.li({}, [dom.a({ href: '#', onClick: this.handleLogout.bind(this) }, ['Logout'])])
                    ])
                ])
            ])
        ]);
        var content = this.props.content_controller(this.state.token, this.handleTokenChange.bind(this), this.state.route);
        return dom.div({}, [
            navbar,
            dom.div({ className: 'container', style: { marginTop: '60px' } }, content)
        ]);
    };
    return Component;
})(react.Component);
module.exports = react.createFactory(Component);
//# sourceMappingURL=App.js.map