var Controller = (function () {
    function Controller(app, service) {
        this.service = service;
        this.constructRoutes(app);
    }
    Controller.prototype.constructRoutes = function (app) {
        app.post('/api/link', this.createLink.bind(this));
        app.get('/api/link', this.getLinks.bind(this));
        app.delete('/api/link/:id', this.deleteLink.bind(this));
        app.get('/:short_url(\\w+)', this.visitLink.bind(this));
    };
    Controller.prototype.createLink = function (req, res) {
        var token = req.get('Authorization').replace('Bearer ', '');
        this.service.createLinkWithToken(req.body.long_url, token, req.body.short_url).then(function (model) {
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
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    Controller.prototype.getLinks = function (req, res) {
        var token = req.get('Authorization').replace('Bearer ', '');
        this.service.getLinksByToken(token).then(function (models) {
            res.json(models);
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    Controller.prototype.deleteLink = function (req, res) {
        var token = req.get('Authorization').replace('Bearer ', '');
        var id = req.params.id;
        this.service.deleteLinkByIdWithToken(id, token).then(function () {
            res.json(true);
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    return Controller;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Controller;
//# sourceMappingURL=ExpressController.js.map