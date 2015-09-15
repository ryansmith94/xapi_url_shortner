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
        var options = req.query.options;
        this.service.getLinkByShortUrl(req.params.short_url, JSON.parse(options)).then(function (model) {
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
