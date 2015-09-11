var Controller = (function () {
    function Controller(service) {
        this.service = service;
    }
    Controller.prototype.createLink = function (req, res) {
        this.service.createLink(req.body.long_url).then(function (model) {
            res.json(model);
        });
    };
    return Controller;
})();
module.exports = Controller;
