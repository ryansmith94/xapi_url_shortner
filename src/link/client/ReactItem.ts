/// <reference path="../../definitions/references.d.ts" />
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
  private handleDelete() {
    if (!confirm('Are you sure you want to delete this link?')) return;
    this.props.onDelete(this.props.id);
  }
  render() {
    var location = document.location;
    var short_url = location.protocol + '//' + location.host + '/' + this.props.short_url;
    return dom.div({className: 'link_item clearfix'}, [
      dom.span({className: 'col col-xs-1 link_icon_col'}, [
        dom.img({className: 'link_icon', src: this.getFavicon(this.props.long_url)}),
      ]),
      dom.span({className: 'col col-xs-9 link_info_col'}, [
        dom.div({}, [dom.a({className: 'short_url text-primary', href: short_url}, [short_url])]),
        dom.div({}, [dom.a({className: 'long_url small text-muted', href: this.props.long_url}, [this.props.long_url])])
      ]),
      this.props.owner ? dom.span({className: 'col col-xs-1 link_action_col pull-right'}, [
        dom.span({className: 'delete btn dtn-danger', onClick: this.handleDelete.bind(this)}, [
          dom.span({className: 'glyphicon glyphicon-remove'})
        ])
      ]) : null
    ]);
  }
}

export = react.createFactory(Component);