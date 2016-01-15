import * as React from 'react';

var dom = React.DOM;
class Component extends React.Component<any, any> {
  public state = {
    custom_url: '',
    valid: false
  };
  private getCustomUrl(custom_url = this.state.custom_url) {
    custom_url = custom_url.split(document.location.host + '/').pop();
    return custom_url || undefined;
  }
  private validateLink(long_url, custom_url) {
    let mod_custom_url = this.getCustomUrl(custom_url);
    if (long_url.indexOf('://') === -1) {
      long_url = 'http://' + long_url;
    }
    this.props.service.validateLink(long_url, mod_custom_url).then(() => {
      this.setState({ valid: true });
    }, () => {
      this.setState({ valid: false });
    });
  }
  private handleShorten(event) {
    let custom_url = this.getCustomUrl();
    this.props.service.createLink(
      this.props.long_url,
      custom_url
    ).then(function () {
      this.setState({custom_url: ''});
    }.bind(this), function (err) {
      alert(err);
    });
    event.preventDefault();
  }
  private handleLongUrlChange(event) {
    this.props.onLongUrlChange(event.target.value);
    this.validateLink(event.target.value, this.state.custom_url);
  }
  private handleCustomUrlChange(event) {
    this.setState({custom_url: event.target.value});
    this.validateLink(this.props.long_url, event.target.value);
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
        value: this.props.long_url,
        onChange: this.handleLongUrlChange.bind(this),
        type: 'text',
        placeholder: 'Long URL',
        className: 'long_url form-control'
      }),
      dom.input({
        value: this.state.custom_url,
        onChange: this.handleCustomUrlChange.bind(this),
        type: 'text',
        placeholder: 'Custom URL (Optional)',
        className: 'custom_url form-control'
      }),
      dom.button({
        type: 'submit',
        className: 'btn btn-success',
        disabled: !this.state.valid
      }, ['Shorten'])
    ]);
  }
}

export default React.createFactory(Component);