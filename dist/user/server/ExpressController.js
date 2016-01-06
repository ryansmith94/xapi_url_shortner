var Controller = (function () {
    function Controller(app, service) {
        this.service = service;
        this.constructRoutes(app);
    }
    Controller.prototype.constructRoutes = function (app) {
        app.post('/api/user', this.createUser.bind(this));
    };
    Controller.prototype.createUser = function (req, res) {
        var token = req.get('Authorization').replace('Bearer ', '');
        this.service.createUserWithToken(req.body.email, req.body.password, token).then(function (model) {
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