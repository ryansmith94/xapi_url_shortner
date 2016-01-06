class Controller {
  private service;

  public constructor(app, service) {
    this.service = service;
    this.constructRoutes(app);
  }

  private constructRoutes(app) {
    app.post('/api/user', this.createUser.bind(this));
  }

  public createUser(req, res) {
    var token = req.get('Authorization').replace('Bearer ', '');
    this.service.createUserWithToken(
      req.body.email,
      req.body.password,
      token
    ).then(function (model) {
      res.json(model);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }
}

export default Controller;