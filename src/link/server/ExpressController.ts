class Controller {
  private service;
  private token_service;

  public constructor(app, service, token_service) {
    this.service = service;
    this.token_service = token_service;
    this.constructRoutes(app);
  }

  private constructRoutes(app) {
    app.post('/api/link', this.createLink.bind(this));
    app.get('/api/link', this.getLinks.bind(this));
    app.delete('/api/link/:id', this.deleteLink.bind(this));
    app.put('/api/link/:id', this.changeLongUrl.bind(this));
    app.get('/:short_url(\\w+)', this.visitLink.bind(this));
  }

  public createLink(req, res) {
    var token = req.get('Authorization').replace('Bearer ', '');
    this.token_service.getUserByValue(token).then((user_id: number) => {
      return this.service.createLinkWithToken(
        req.body.long_url,
        user_id,
        req.body.short_url
      );
    }).then(function (model) {
      res.json(model);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }

  public visitLink(req, res) {
    var options = req.query.options;
    this.service.trackLink(req.params.short_url, options && JSON.parse(options)).then(function (model) {
      res.redirect(307, model.long_url);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }

  public getLinks(req, res) {
    var token = req.get('Authorization').replace('Bearer ', '');
    this.token_service.getUserByValue(token).then((user_id: number) => {
      return this.service.getLinks(user_id);
    }).then(function (models) {
      res.json(models);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }

  public deleteLink(req, res) {
    var token = req.get('Authorization').replace('Bearer ', '');
    var id = req.params.id;
    this.token_service.getUserByValue(token).then((user_id: number) => {
      return this.service.deleteLinkById(id, user_id);
    }).then(function () {
      res.json(true);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }

  public changeLongUrl(req, res) {
    var token = req.get('Authorization').replace('Bearer ', '');
    var id = req.params.id;
    this.token_service.getUserByValue(token).then((user_id: number) => {
      console.log('log', user_id);
      return this.service.changeLongUrl(id, req.body.long_url, user_id);
    }).then(function() {
      res.json(true);
    }, function(err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }
}

export default Controller;