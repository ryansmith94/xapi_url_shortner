var Controller = (function () {
    function Controller(service) {
        this.service = service;
    }
    Controller.prototype.createGroup = function (req, res) {
        this.service.createGroup(req.body.name).then(function (model) {
            res.json(model);
        }, function (err) {
            console.error(err.stack);
            res.status(400).send(String(err));
        });
    };
    return Controller;
})();
module.exports = Controller;
//# sourceMappingURL=ExpressController.js.map