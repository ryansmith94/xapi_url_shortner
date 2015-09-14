var Controller = (function () {
    function Controller(service) {
        this.service = service;
    }
    Controller.prototype.createLink = function (req, res) {
        this.service.createLink(req.body.long_url).then(function (model) {
            res.json(model);
        });
    };
    Controller.prototype.visitLink = function (req, res) {
        this.service.getLinkByShortUrl(req.params.short_url).then(function (model) {
            res.redirect(301, model.long_url);
        });
    };
    return Controller;
})();
module.exports = Controller;
