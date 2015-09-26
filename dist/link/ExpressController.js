var Controller = (function () {
    function Controller(app, service) {
        this.service = service;
        this.constructRoutes(app);
    }
    Controller.prototype.constructRoutes = function (app) {
        app.post('/api/link', this.createLink.bind(this));
        app.get('/api/link', this.getLinks.bind(this));
        app.get('/:short_url(\\w+)', this.visitLink.bind(this));
    };
    Controller.prototype.createLink = function (req, res) {
        this.service.createLink(req.body.long_url, req.body.short_url).then(function (model) {
            res.json(model);
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    Controller.prototype.visitLink = function (req, res) {
        var options = req.query.options;
        this.service.trackLink(req.params.short_url, options && JSON.parse(options)).then(function (model) {
            res.redirect(301, model.long_url);
        });
    };
    Controller.prototype.getLinks = function (req, res) {
        this.service.getLinks().then(function (models) {
            res.json(models);
        });
    };
    return Controller;
})();
module.exports = Controller;
//# sourceMappingURL=ExpressController.js.map