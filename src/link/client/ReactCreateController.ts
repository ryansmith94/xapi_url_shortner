/// <reference path="../../definitions/references.d.ts" />
import react = require('react');

var dom = react.DOM;
class Component extends react.Component<any, any> {
  public state = {
    long_url: '',
    custom_url: ''
  };
  private handleShorten(event) {
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
  private handleLongUrlChange(event) {
    this.setState({long_url: event.target.value});
  }
  private handleCustomUrlChange(event) {
    this.setState({custom_url: event.target.value});
  }
  private handleDataChange() {}
  public componentDidMount() {
    this.props.service.addChangeListener(this.handleDataChange.bind(this));
  }
  public componentWillUnmount() {
    this.props.service.removeChangeListener(this.handleDataChange.bind(this));
  }
  public render() {
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