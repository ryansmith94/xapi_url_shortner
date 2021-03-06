import * as React from 'react';
import copy from '../../copyToClipboard';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

var dom = React.DOM;
class Component extends React.Component<any, any> {
  public state = {
    long_url: this.props.long_url,
    editing: false
  }
  private getFavicon(url): string {
    var match = (url || '').match(/:\/\/(.[^/]+)/);
    if (match && match.length > 0) {
      return 'http://'+match[1]+'/favicon.ico';
    } else {
      return '';
    }
  }
  private handleDelete(): void {
    if (!confirm('Are you sure you want to delete this link?')) return;
    this.props.onDelete(this.props.id);
  }
  private handleLongUrlChange(e: React.FormEvent): void {
    let input: any = event.target;
    this.setState({ long_url: input.value });
  }
  private handleSave(): void {
    this.props.onLongUrlChange(this.props.id, this.state.long_url);
    this.setState({ editing: false });
  }
  private handleCancel(): void {
    this.setState({ title: this.props.long_url, editing: false });
  }
  private handleKeyDown(event: React.KeyboardEvent): void {
    if (event.keyCode === ESCAPE_KEY) {
      this.handleCancel();
    } else if (event.keyCode === ENTER_KEY) {
      this.handleSave();
    }
  }
  private handleCopy(event): void {
    copy(this.getShortUrl());
    console.log(this.getShortUrl());
  }
  private handleToggleEdit(): void {
    this.setState({ editing: !this.state.editing });
  }
  private getShortUrl(): string {
    return location.protocol + '//' + location.host + '/' + this.props.short_url;
  }
  render() {
    let location = document.location;
    let short_url = this.getShortUrl();

    return dom.div({
      className: 'link_item clearfix',
      onDoubleClick: this.props.editable ? this.handleToggleEdit.bind(this) : null
    }, [
      dom.span({className: 'col col-xs-1 link_icon_col'}, [
        dom.img({className: 'link_icon', src: this.getFavicon(this.props.long_url)}),
      ]),
      dom.span({className: 'col col-xs-5 link_info_col'}, [
        dom.div({}, [dom.a({className: 'short_url text-primary', href: short_url}, [short_url])]),
        dom.div({}, [
          this.state.editing ? dom.input({
            value: this.state.long_url,
            onChange: this.handleLongUrlChange.bind(this),
            onBlur: this.handleSave.bind(this),
            onKeyDown: this.handleKeyDown.bind(this),
            autoFocus: true
          }) : dom.a({
            className: 'long_url small text-muted',
            href: this.props.long_url
          }, [this.props.long_url])
        ])
      ]),
      dom.span({className: 'col col-xs-5 link_action_col pull-right'}, [
        dom.span({className: 'copy btn', onClick: this.handleCopy.bind(this)}, [
          dom.span({className: 'glyphicon glyphicon-copy'})
        ]),
        ... (this.props.editable ? [
          dom.span({className: 'edit btn', onClick: this.handleToggleEdit.bind(this)}, [
            dom.span({className: 'glyphicon glyphicon-pencil'})
          ]),
          dom.span({className: 'delete btn', onClick: this.handleDelete.bind(this)}, [
            dom.span({className: 'glyphicon glyphicon-remove'})
          ])
        ] : [])
      ]) 
    ]);
  }
}

export default React.createFactory(Component);