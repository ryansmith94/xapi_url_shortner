import * as React from 'react';
import item from './ReactItem';

var dom = React.DOM;
class Component extends React.Component<any, any> {
  public state = {
    links: []
  };

  /**
   * Gets links.
   */
  private getLinks() {
    this.props.service.getLinks().then(function (links) {
      this.setState({links: links});
    }.bind(this), function (err) {
      alert(err);
    });
  }

  /**
   * Deletes the link.
   * @param {string} id
   */
  private handleDelete(id: string) {
    this.props.service.deleteLinkById(id).then(function () {
      // Deleted.
    }, function (err) {
      console.log(err.stack);
      alert(err);
    });
  }

  /**
   * Handles a data change in the service.
   */
  private handleDataChange() {
    this.getLinks();
  }

  /**
   * Changes the Long URL.
   * @param {string} id
   * @param {string} long_url
   */
  private handleLongUrlChange(id: string, long_url: string) {
    this.props.service.changeLongUrl(id, long_url);
  }
  
  /**
   * Handles the component mount (refernced in the DOM).
   */
  public componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
    this.getLinks();
  }

  /**
   * Handles the component unmount (derefernced from the DOM).
   */
  public componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }

  /**
   * Renders the controller.
   */
  public render() {
    return dom.div({className: 'link_list'}, this.state.links.filter(function (link) {
      link.onDelete = this.handleDelete.bind(this);
      link.onLongUrlChange = this.handleLongUrlChange.bind(this);
      link.key = link.id;
      return link.long_url.indexOf(this.props.long_url) !== -1;
    }.bind(this)).reverse().map(item));
  }
}

export default React.createFactory(Component);