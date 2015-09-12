class Repository {
  private connection;

  public constructor(connection) {
    this.connection = connection;
  }

  public createLink(link) {
    return this.connection.insert(link, 'id').then(function (ids) {
      return {
        id: ids[0],
        long_url: link.long_url
      };
    });
  }
}

export = Repository;