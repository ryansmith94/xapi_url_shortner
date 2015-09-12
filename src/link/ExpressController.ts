class Controller {
  private service;

  public constructor(service) {
    this.service = service;
  }

  public createLink(req, res) {
    this.service.createLink(req.body.long_url).then(function (model) {
      res.json(model);
    });
  }
}

export = Controller;