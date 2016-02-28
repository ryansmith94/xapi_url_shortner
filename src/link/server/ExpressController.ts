class Controller {
  private service;
  private token_service;

  /**
   * Constructs a new Controller.
   * @param {any} app
   * @param {any} service
   * @param {any} token_service
   */
  public constructor(app: any, service: any, token_service: any) {
    this.service = service;
    this.token_service = token_service;
    this.constructRoutes(app);
  }

  /**
   * Constructs routes on the Express App object.
   * @param {any} app Express app object.
   */
  private constructRoutes(app: any) {
    app.post('/api/link', this.createLink.bind(this));
    app.get('/api/link', this.getLinks.bind(this));
    app.delete('/api/link/:id', this.deleteLink.bind(this));
    app.put('/api/link/:id', this.changeLongUrl.bind(this));
    app.get('/:short_url(\\w+)', this.visitLink.bind(this));
  }

  /**
   * Creates a link.
   * @param {any} req
   * @param {any} res
   */
  public createLink(req: any, res: any) {
    var token = req.get('Authorization').replace('Bearer ', '');
    this.token_service.getUserByValue(token).then((user_id: number) => {
      return this.service.createLink(
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

  /**
   * Visits a link.
   * @param {any} req
   * @param {any} res
   */
  public visitLink(req: any, res: any) {
    var options = req.query.options;
    this.service.trackLink(req.params.short_url, options && JSON.parse(options)).then(function (model) {
      res.redirect(307, model.long_url);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }

  /**
   * Gets links.
   * @param {any} req
   * @param {any} res
   */
  public getLinks(req: any, res: any) {
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

  /**
   * Deletes a link.
   * @param {any} req
   * @param {any} res
   */
  public deleteLink(req: any, res: any) {
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

  /**
   * Changes a long URL.
   * @param {any} req
   * @param {any} res
   */
  public changeLongUrl(req: any, res: any) {
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