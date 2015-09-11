var Repository = (function () {
    function Repository(connection) {
        this.connection = connection;
    }
    Repository.prototype.createLink = function (link) {
        return this.connection.insert(link, 'id').then(function (ids) {
            return {
                id: ids[0],
                long_url: link.long_url
            };
        });
    };
    return Repository;
})();
module.exports = Repository;
