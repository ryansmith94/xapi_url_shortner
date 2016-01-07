class Controller {
  private service;
  private token_service;

  public constructor(app, service, token_service) {
    this.service = service;
    this.token_service = token_service;
    this.constructRoutes(app);
  }

  private constructRoutes(app) {
    app.post('/api/user', this.createUser.bind(this));
  }

  public createUser(req, res) {
    var token = req.get('Authorization').replace('Bearer ', '');
    this.token_service.getUserByValue(token).then((user_id: number) => {
      return this.service.createUserWithUser(
        req.body.email,
        req.body.password,
        user_id
      );
    }).then(function (model) {
      res.json(model);
    }, function (err) {
      console.error(err.stack);
      res.status(400).send(String(err));
    });
  }
}

export default Controller;