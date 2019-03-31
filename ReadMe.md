#GraphQL API

##Queries
### Get all products
query {
  products {
    id
    name
  }
}

### Get one product
query {
  products(where: {
    id: "cjtrxz0v201su0717e4uzhopq"
  }) {
	  id
    name
    price
  }
}

### Count all products
query {
  productsConnection {
    aggregate {
      count
    }
  }
}

##Mutations
### Create a new product
mutation {
  createProduct(
    data: {
      price: 42
      desc: "Here is some product"
      name: "Some product"
    }
  ) {
    id
    name
    price
    desc
  }
}

### Update a product
mutation {
  updateProduct(
    data: {
      price: 9
    }
    where: {
      id: "cjtrxz0v201su0717e4uzhopq"
    }
  ) {
    id
    name
    price
  }
}

### Delete a product
mutation {
  deleteProduct(where: {
    id: "cjtrxz0v201su0717e4uzhopq"
  }) {
    name
    price
    desc
  }
}