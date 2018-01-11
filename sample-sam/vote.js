
var aws = require('aws-sdk')
var dynamo = new aws.DynamoDB.DocumentClient({endpoint:'http://localhost:7777'})

exports.handler = (event, context, callback) => {
  console.log(event)
  console.log(process.env.TABLE_NAME)
  callback(null, "Hello Local SAM")

  var param = {
    TableName: process.env.TABLE_NAME,
    Key: {
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