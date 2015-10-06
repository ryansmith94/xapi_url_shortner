/// <reference path="./definitions/references.d.ts" />
import react = require('react');
import docCookie = require('./docCookie');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    token: docCookie.getItem('token') || ''
  }
  handleTokenChange(token) {
    // Saves token in cookies.
    var current_date = new Date();
    var expiry_date = new Date();
    expiry_date.setMinutes(current_date.getMinutes() + 30);
    docCookie.setItem('token', token, expiry_date);

    // Updates state.
    this.setState({token: token});
  }
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
    var content = this.props.content_controller(
      this.state.token,
      this.handleTokenChange.bind(this)
    );

    return dom.div({}, [
      navbar,
      dom.div({className: 'container', style: {marginTop: '60px'}}, content)
    ]);
  }
}

export = react.createFactory(Component);