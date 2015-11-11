/// <reference path="./definitions/references.d.ts" />
import react = require('react');
import docCookie = require('./docCookie');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    token: docCookie.getItem('token') || '',
    route: window.location.hash.replace('#', '')
  }
  handleTokenChange(token) {
    // Saves token in cookies.
    var current_date = new Date();
    var expiry_date = new Date();
    expiry_date.setMinutes(current_date.getMinutes() + 29);
    docCookie.setItem('token', token, expiry_date);

    // Updates state.
    this.setState({token: token});
  }
  handleLogout(e) {
    this.setState({token: ''});
    docCookie.removeItem('token');
    e.preventDefault();
  }
  componentDidMount() {
    window.onhashchange = function (event) {
      this.setState({route: event.newURL.split('#').slice(1).join('#')});
    }.bind(this);
  }
  render() {
    var navbar = dom.nav({className: 'navbar navbar-default navbar-fixed-top'}, [
      dom.div({className: 'container'}, [
        dom.div({className: 'navbar-header'}, [
          (!this.state.token) ? null : dom.button({
            'data-toggle': 'collapse',
            'data-target': '#bs-nav',
            className: 'navbar-toggle collapsed'
          }, [
            dom.span({className: 'sr-only'}, ['Toggle navigation']),
            dom.span({className: 'icon-bar'}, []),
            dom.span({className: 'icon-bar'}, []),
            dom.span({className: 'icon-bar'}, [])
          ]),
          dom.div({className: 'navbar-brand'}, ['xAPI URL Shortener'])
        ]),
        (!this.state.token) ? null : dom.div({id: 'bs-nav', className: 'collapse navbar-collapse'}, [
          dom.ul({className: 'nav navbar-nav navbar-right'}, [
            dom.li({}, [dom.a({href: '#'}, ['Links'])]),
            dom.li({}, [dom.a({href: '#invite'}, ['Invite'])]),
            dom.li({}, [dom.a({href: '#', onClick: this.handleLogout.bind(this)}, ['Logout'])])
          ])
        ])
      ])
    ]);
    var content = this.props.content_controller(
      this.state.token,
      this.handleTokenChange.bind(this),
      this.state.route
    );

    return dom.div({}, [
      navbar,
      dom.div({className: 'container', style: {marginTop: '60px'}}, content)
    ]);
  }
}

export = react.createFactory(Component);