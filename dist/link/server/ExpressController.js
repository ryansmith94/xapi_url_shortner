var Controller = (function () {
    function Controller(app, service, token_service) {
        this.service = service;
        this.token_service = token_service;
        this.constructRoutes(app);
    }
    Controller.prototype.constructRoutes = function (app) {
        app.post('/api/link', this.createLink.bind(this));
        app.get('/api/link', this.getLinks.bind(this));
        app.delete('/api/link/:id', this.deleteLink.bind(this));
        app.put('/api/link/:id', this.changeLongUrl.bind(this));
        app.get('/:short_url(\\w+)', this.visitLink.bind(this));
    };
    Controller.prototype.createLink = function (req, res) {
        var _this = this;
        var token = req.get('Authorization').replace('Bearer ', '');
        this.token_service.getUserByValue(token).then(function (user_id) {
            return _this.service.createLinkWithToken(req.body.long_url, user_id, req.body.short_url);
        }).then(function (model) {
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
        var _this = this;
        var token = req.get('Authorization').replace('Bearer ', '');
        this.token_service.getUserByValue(token).then(function (user_id) {
            return _this.service.getLinks(user_id);
        }).then(function (models) {
            res.json(models);
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    Controller.prototype.deleteLink = function (req, res) {
        var _this = this;
        var token = req.get('Authorization').replace('Bearer ', '');
        var id = req.params.id;
        this.token_service.getUserByValue(token).then(function (user_id) {
            return _this.service.deleteLinkById(id, user_id);
        }).then(function () {
            res.json(true);
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    Controller.prototype.changeLongUrl = function (req, res) {
        var _this = this;
        var token = req.get('Authorization').replace('Bearer ', '');
        var id = req.params.id;
        this.token_service.getUserByValue(token).then(function (user_id) {
            console.log('log', user_id);
            return _this.service.changeLongUrl(id, req.body.long_url, user_id);
        }).then(function () {
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