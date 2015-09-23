/// <reference path="../definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  state = {
    long_url: '',
    custom_url: ''
  };
  handleShorten(event) {
    var custom_url = this.state.custom_url.split(document.location.host+'/');
    this.props.service.createLink(
      this.state.long_url,
      custom_url[custom_url.length - 1] || undefined
    ).then(function () {
      this.setState({custom_url: ''})
    }, function (err) {
      alert(err);
    });
    event.preventDefault();
  }
  handleLongUrlChange(event) {
    this.setState({long_url: event.target.value});
  }
  handleCustomUrlChange(event) {
    this.setState({custom_url: event.target.value});
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
      dom.input({
        value: this.state.custom_url,
        onChange: this.handleCustomUrlChange.bind(this),
        type: 'text',
        placeholder: 'Custom URL',
        className: 'custom_url form-control'
      }),
      dom.button({
        type: 'submit',
        className: 'btn btn-success'
      }, ['Shorten'])
    ]);
  }
}

export = react.createFactory(Component);