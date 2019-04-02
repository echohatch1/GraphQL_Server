# GraphQL API

## Setup

### Run the following commnads on setup
```
cd into graphql_server
npm install
npm run dockerStart
npm run deploy
npm run start
```
## Queries

### Get all products
```
query {
  products {
    id
    name
  }
}
```
### Get one product by ID
```
query {
  products(where: {
    id: "cjtrxz0v201su0717e4uzhopq"
  }) {
	  id
    name
    price
  }
}
```
### Get one product by name
```
query {
  products(where: {
    name: "toothbrush"
  }) {
	  id
    name
    price
  }
}
```
## Mutations

### Create a new product
```
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
```
### Update a product
```
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
```
### Delete a product
```
mutation {
  deleteProduct(where: {
    id: "cjtrxz0v201su0717e4uzhopq"
  }) {
    name
    price
    desc
  }
}
```