
var AWS = require('aws-sdk')
var dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:7777'
})

exports.handler = (event, context, callback) => {
  console.log(event)
  console.log(process.env.TABLE_NAME)

  var param = {
    TableName: process.env.TABLE_NAME,
    Item: {
      "id": event.id
    }
  }
  
  dynamo.put(param, (err, result) => {
    if (err) {
      console.log(err)
      callback(new Error("dynamodb put error"))
      return
    }

    console.log(result)
    callback(null, {status: 200})
  })
}