import * as React from 'react';
import ReactCreateController from './ReactCreateController';
import ReactListController from './ReactListController';

var dom = React.DOM;
class Component extends React.Component<any, any> {
  public state = {
    long_url: ''
  };
  private handleLongUrlChange(long_url) {
    this.setState({long_url: long_url});
  }
  private handleDataChange() {}
  public componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
  }
  public componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  public render() {
    return dom.div({}, [
      ReactCreateController({
        service: this.props.service,
        long_url: this.state.long_url,
        onLongUrlChange: this.handleLongUrlChange.bind(this)
      }),
      ReactListController({
        service: this.props.service,
        long_url: this.state.long_url
      })
    ]);
  }
}

export default React.createFactory(Component);