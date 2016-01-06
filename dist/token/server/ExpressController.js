var Controller = (function () {
    function Controller(app, service) {
        this.service = service;
        this.constructRoutes(app);
    }
    Controller.prototype.constructRoutes = function (app) {
        app.post('/api/token', this.createToken.bind(this));
    };
    Controller.prototype.createToken = function (req, res) {
        this.service.createToken(req.body.email, req.body.password).then(function (model) {
            res.json(model);
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