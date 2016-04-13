class Repository {
  private connection;
  private collection;

  public constructor(connection, collection) {
    this.connection = connection;
    this.collection = collection;
  }

  protected connect() {
    return this.connection(this.collection);
  }
}

export default Repository;
