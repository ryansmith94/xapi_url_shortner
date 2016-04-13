"use strict";
var Repository = (function () {
    function Repository(connection, collection) {
        this.connection = connection;
        this.collection = collection;
    }
    Repository.prototype.connect = function () {
        return this.connection(this.collection);
    };
    return Repository;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Repository;

//# sourceMappingURL=BaseKnexRepository.js.map
