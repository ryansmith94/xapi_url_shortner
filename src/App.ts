/// <reference path="./definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  render() {
    var navbar = dom.nav({className: 'navbar navbar-default navbar-fixed-top'}, [
      dom.div({className: 'container'}, [
        dom.div({className: 'navbar-header'}, [
          // dom.button({dataToggle: 'collapse', dataTarget: '#bs-nav', className: 'navbar-toggle collapsed'}, [
          //   dom.span({className: 'sr-only'}, ['Toggle navigation']),
          //   dom.span({className: 'icon-bar'}, []),
          //   dom.span({className: 'icon-bar'}, []),
          //   dom.span({className: 'icon-bar'}, [])
          // ]),
          dom.div({className: 'navbar-brand'}, ['xAPI URL Shortener'])
        ]),
        dom.div({id: 'bs-nav', className: 'collapse navbar-collapse'}, [])
      ])
    ]);

    return dom.div({}, [
      navbar,
      dom.div({className: 'container', style: {marginTop: '60px'}}, [
        this.props.link_create_controller,
        this.props.link_list_controller
      ])
    ]);
  }
}

export = react.createFactory(Component);