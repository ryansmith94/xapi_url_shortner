/// <reference path="../definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    long_url: ''
  };
  handleShorten(event) {
    this.props.service.createLink(this.state.long_url);
    event.preventDefault();
  }
  handleLongUrlChange(event) {
    this.setState({long_url: event.target.value});
  }
  handleDataChange() {}
  componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
  }
  componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  render() {
    return dom.form({className: 'link_create', onSubmit: this.handleShorten.bind(this), style: {textAlign: 'center'}}, [
      dom.input({
        value: this.state.long_url,
        onChange: this.handleLongUrlChange.bind(this),
        type: 'text',
        placeholder: 'Long URL',
        className: 'long_url form-control'
      }),
      dom.button({
        type: 'submit',
        className: 'btn btn-success'
      }, ['Shorten'])
    ]);
  }
}

export = react.createFactory(Component);