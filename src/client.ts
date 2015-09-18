/// <reference path="./definitions/references.d.ts" />
import react = require('react');

// Link.
import LinkRepository = require('./link/HttpRepository');
import LinkService = require('./link/ClientService');
import LinkCreateController = require('./link/ReactCreateController');
import LinkListController = require('./link/ReactListController');
var link_repository = new LinkRepository('api/link');
var link_service = new LinkService(link_repository);
var link_create_controller = LinkCreateController({service: link_service});
var link_list_controller = LinkListController({service: link_service});

var dom = react.DOM;

var navbar = dom.nav({className: 'navbar navbar-default navbar-fixed-top'}, [
  dom.div({className: 'container'}, [
    dom.div({className: 'navbar-header'}, [
      // dom.button({dataToggle: 'collapse', dataTarget: '#bs-nav', className: 'navbar-toggle collapsed'}, [
      //   dom.span({className: 'sr-only'}, ['Toggle navigation']),
      //   dom.span({className: 'icon-bar'}, []),
      //   dom.span({className: 'icon-bar'}, []),
      //   dom.span({className: 'icon-bar'}, [])
      // ]),
      dom.div({className: 'navbar-brand'}, ['xAPI URL Shortener'])
    ]),
    dom.div({id: 'bs-nav', className: 'collapse navbar-collapse'}, [])
  ])
])

react.render(dom.div({}, [
  navbar,
  dom.div({className: 'container', style: {marginTop: '60px'}}, [
    link_create_controller,
    link_list_controller
  ])
]), document.getElementById('app'))