
var AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-west-2',
  endpoint: process.env.LOCALURL
})

var dynamo = new AWS.DynamoDB.DocumentClient()

exports.handler = (event, context, callback) => {
  console.log(event)
  console.log(process.env.TABLE_NAME)
  console.log(process.env.LOCALURL)

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
