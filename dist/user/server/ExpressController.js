"use strict";
var Controller = (function () {
    function Controller(app, service, token_service) {
        this.service = service;
        this.token_service = token_service;
        this.constructRoutes(app);
    }
    Controller.prototype.constructRoutes = function (app) {
        app.post('/api/user', this.createUser.bind(this));
    };
    Controller.prototype.createUser = function (req, res) {
        var _this = this;
        var token = req.get('Authorization').replace('Bearer ', '');
        this.token_service.getUserByValue(token).then(function (user_id) {
            return _this.service.createUserWithUser(req.body.email, req.body.password, user_id);
        }).then(function (model) {
            res.json(model);
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    return Controller;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Controller;

//# sourceMappingURL=ExpressController.js.map
