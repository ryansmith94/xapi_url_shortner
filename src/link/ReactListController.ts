/// <reference path="../definitions/references.d.ts" />
import react = require('react');
import item = require('./ReactItem');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    links: []
  };
  handleDataChange() {
    this.setState({links: this.props.service.getLinks()});
  }
  componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
    this.props.service.fetchLinks();
  }
  componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  render() {
    return dom.div({className: 'link_list'}, this.state.links.reverse().map(item));
  }
}

export = react.createFactory(Component);