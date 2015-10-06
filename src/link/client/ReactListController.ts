/// <reference path="../../definitions/references.d.ts" />
import react = require('react');
import item = require('./ReactItem');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    links: []
  };
  getLinks() {
    this.props.service.getLinks().then(function (links) {
      this.setState({links: links});
    }.bind(this));
  }
  handleDataChange() {
    this.getLinks();
  }
  componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
    this.getLinks();
  }
  componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  render() {
    return dom.div({className: 'link_list'}, this.state.links.filter(function (link) {
      return link.long_url.indexOf(this.props.long_url) !== -1;
    }.bind(this)).reverse().map(item));
  }
}

export = react.createFactory(Component);