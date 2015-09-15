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

  public visitLink(req, res) {
    var options = req.query.options;
    this.service.getLinkByShortUrl(req.params.short_url, JSON.parse(options)).then(function (model) {
      res.redirect(301, model.long_url);
    });
  }
}

export = Controller;