var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var copyToClipboard_1 = require('../../copyToClipboard');
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var dom = React.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
        this.state = {
            long_url: this.props.long_url,
            editing: false
        };
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
    Component.prototype.handleDelete = function () {
        if (!confirm('Are you sure you want to delete this link?'))
            return;
        this.props.onDelete(this.props.id);
    };
    Component.prototype.handleLongUrlChange = function (e) {
        var input = event.target;
        this.setState({ long_url: input.value });
    };
    Component.prototype.handleSave = function () {
        this.props.onLongUrlChange(this.props.id, this.state.long_url);
        this.setState({ editing: false });
    };
    Component.prototype.handleCancel = function () {
        this.setState({ title: this.props.long_url, editing: false });
    };
    Component.prototype.handleKeyDown = function (event) {
        if (event.keyCode === ESCAPE_KEY) {
            this.handleCancel();
        }
        else if (event.keyCode === ENTER_KEY) {
            this.handleSave();
        }
    };
    Component.prototype.handleCopy = function (event) {
        copyToClipboard_1.default(this.getShortUrl());
        console.log(this.getShortUrl());
    };
    Component.prototype.handleToggleEdit = function () {
        this.setState({ editing: !this.state.editing });
    };
    Component.prototype.getShortUrl = function () {
        return location.protocol + '//' + location.host + '/' + this.props.short_url;
    };
    Component.prototype.render = function () {
        var location = document.location;
        var short_url = this.getShortUrl();
        return dom.div({
            className: 'link_item clearfix',
            onDoubleClick: this.props.owner ? this.handleToggleEdit.bind(this) : null
        }, [
            dom.span({ className: 'col col-xs-1 link_icon_col' }, [
                dom.img({ className: 'link_icon', src: this.getFavicon(this.props.long_url) }),
            ]),
            dom.span({ className: 'col col-xs-5 link_info_col' }, [
                dom.div({}, [dom.a({ className: 'short_url text-primary', href: short_url }, [short_url])]),
                dom.div({}, [
                    this.state.editing ? dom.input({
                        value: this.state.long_url,
                        onChange: this.handleLongUrlChange.bind(this),
                        onBlur: this.handleSave.bind(this),
                        onKeyDown: this.handleKeyDown.bind(this),
                        autoFocus: true
                    }) : dom.a({
                        className: 'long_url small text-muted',
                        href: this.props.long_url
                    }, [this.props.long_url])
                ])
            ]),
            dom.span({ className: 'col col-xs-5 link_action_col pull-right' }, [
                dom.span({ className: 'copy btn', onClick: this.handleCopy.bind(this) }, [
                    dom.span({ className: 'glyphicon glyphicon-copy' })
                ])
            ].concat((this.props.owner ? [
                dom.span({ className: 'edit btn', onClick: this.handleToggleEdit.bind(this) }, [
                    dom.span({ className: 'glyphicon glyphicon-pencil' })
                ]),
                dom.span({ className: 'delete btn', onClick: this.handleDelete.bind(this) }, [
                    dom.span({ className: 'glyphicon glyphicon-remove' })
                ])
            ] : [])))
        ]);
    };
    return Component;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = React.createFactory(Component);
//# sourceMappingURL=ReactItem.js.map