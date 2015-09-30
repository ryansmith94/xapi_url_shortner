class Controller {
  private service;

  public constructor(app, service) {
    this.service = service;
    this.constructRoutes(app);
  }

  public constructRoutes(app) {
    app.post('/api/token', this.createToken.bind(this));
  }

  public createToken(req, res) {
    this.service.createToken(req.body.email, req.body.password).then(function (model) {
      res.json(model);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }
}

export = Controller;