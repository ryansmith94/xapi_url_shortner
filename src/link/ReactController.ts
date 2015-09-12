/// <reference path="../definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    long_url: '',
    short_url: ''
  };
  handleShorten(event) {
    this.props.service.createLink(this.state.long_url);
    event.preventDefault();
  }
  handleLongUrlChange(event) {
    this.setState({long_url: event.target.value});
  }
  handleDataChange() {
    this.setState({short_url: this.props.service.getLastCreatedLink().short_url});
  }
  componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
  }
  componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  render() {
    var short_url = this.state.short_url && document.location.host + '/' + this.state.short_url;
    return dom.form({onSubmit: this.handleShorten.bind(this)}, [
      dom.input({
        value: this.state.long_url,
        onChange: this.handleLongUrlChange.bind(this),
        type: 'text',
        placeholder: 'Long URL',
        className: 'form-control'
      }),
      dom.button({
        type: 'submit',
        className: 'btn btn-default'
      }, ['Shorten']),
      dom.span({}, [' ' + short_url])
    ]);
  }
}

export = react.createFactory(Component);