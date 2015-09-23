var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./definitions/references.d.ts" />
var react = require('react');
var dom = react.DOM;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        _super.apply(this, arguments);
    }
    Component.prototype.render = function () {
        var navbar = dom.nav({ className: 'navbar navbar-default navbar-fixed-top' }, [
            dom.div({ className: 'container' }, [
                dom.div({ className: 'navbar-header' }, [
                    // dom.button({dataToggle: 'collapse', dataTarget: '#bs-nav', className: 'navbar-toggle collapsed'}, [
                    //   dom.span({className: 'sr-only'}, ['Toggle navigation']),
                    //   dom.span({className: 'icon-bar'}, []),
                    //   dom.span({className: 'icon-bar'}, []),
                    //   dom.span({className: 'icon-bar'}, [])
                    // ]),
                    dom.div({ className: 'navbar-brand' }, ['xAPI URL Shortener'])
                ]),
                dom.div({ id: 'bs-nav', className: 'collapse navbar-collapse' }, [])
            ])
        ]);
        return dom.div({}, [
            navbar,
            dom.div({ className: 'container', style: { marginTop: '60px' } }, [
                this.props.link_create_controller,
                this.props.link_list_controller
            ])
        ]);
    };
    return Component;
})(react.Component);
module.exports = react.createFactory(Component);
//# sourceMappingURL=App.js.map