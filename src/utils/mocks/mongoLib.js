const sinon = require('sinon');

const { productsMock } = require('./products');

const getAllStub = sinon.stub();
getAllStub.withArgs('products').resolves(productsMock);

const tagQuery = {tags: {$in: []}};
getAllStub.withArgs('products',tagQuery).resolves(productsMock);

const createStub = sinon.stub().resolves(productsMock[0].id);

class MongoLibMock {

  getAll(collection, query){
    return getAllStub(collection,query);
  }
  
  createStub(collection, query){
    return createStub(collection,query);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}