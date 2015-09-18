/// <reference path="../definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  private getFavicon(url) {
    var match = (url || '').match(/:\/\/(.[^/]+)/);
    if (match && match.length > 0) {
      return 'http://'+match[1]+'/favicon.ico';
    } else {
      return '';
    }
  }
  render() {
    var location = document.location;
    var short_url = location.protocol + '//' + location.host + '/' + this.props.short_url;
    return dom.div({className: 'link_item clearfix'}, [
      dom.span({className: 'col col-xs-1 link_icon_col'}, [
        dom.img({className: 'link_icon', src: this.getFavicon(this.props.long_url)}),
      ]),
      dom.span({className: 'col col-xs-11 link_info_col'}, [
        dom.div({}, [dom.a({className: 'short_url text-primary', href: short_url}, [short_url])]),
        dom.div({}, [dom.a({className: 'long_url small text-muted', href: this.props.long_url}, [this.props.long_url])])
      ])
    ]);
  }
}

export = react.createFactory(Component);