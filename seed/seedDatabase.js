const fs = require("fs")
const { GraphQLClient } = require("graphql-request")

const client = new GraphQLClient("http://localhost:5555")

const mutation = `mutation createProduct(
    $name: String,
    $price: Int,
    $desc: String,
    $weight: String,
    $manuf: String
) {
    createProduct(data: {
      name: $name
      price: $price
      desc: $desc
      weight: $weight
      manuf: $manuf
    })
    {
        name
        id
    }
  }
`

const sampleFiles = ['products.json']

async function main(inputFile) {
    const content = fs.readFileSync(`./seed/${inputFile}`)
    const allProducts = JSON.parse(content)
  
    allProducts.forEach(async item => {
      const variables = {
          name: item.name,
          price: item.price,
          desc: item.desc,
          weight: item.weight,
          manuf: item.manuf
        }
      
        await client
          .request(mutation, variables)
          .then(data => console.log(data))
          .catch(err => console.log(`${err}`))
    })
    
  }
  
  for (let fileName of sampleFiles) {
      main(fileName).catch(e => console.error(e))
  }