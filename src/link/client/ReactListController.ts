import * as React from 'react';
import item from './ReactItem';

var dom = React.DOM;
class Component extends React.Component<any, any> {
  state = {
    links: []
  };
  getLinks() {
    this.props.service.getLinks().then(function (links) {
      this.setState({links: links});
    }.bind(this), function (err) {
      alert(err);
    });
  }
  handleDelete(id) {
    this.props.service.deleteLinkById(id).then(function () {
      // Deleted.
    }, function (err) {
      console.log(err.stack);
      alert(err);
    });
  }
  handleDataChange() {
    console.log('Data Changed');
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
      link.onDelete = this.handleDelete.bind(this);
      return link.long_url.indexOf(this.props.long_url) !== -1;
    }.bind(this)).reverse().map(item));
  }
}

export default React.createFactory(Component);