var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();
var moment = require('moment');

exports.handler = function(event, context, callback) {
  var method = event.method;

  switch (method) {
    case 'GET':
      console.log(event)
      getTodo(event, callback);
      break;
    case 'POST':
      postTodo(event, callback);
      break;
    case 'PUT':
      updateTodo(event, callback);
      break;
  }
};

function getTodo(event, callback) {
  console.log(event)
  var param = {
    TableName: "todo",
    Key: {
      "id" : event.id
    }
  };
  dynamo.get(param, callback);
}

function postTodo(event, callback) {
  const now = moment().format()
  var param = {
    TableName: 'todo',
    Item: {
      "id" : event.id,
      "updated_at" : now
    }
  }

  dynamo.put(param, (err, result) => {
    if (err) {
      console.log(err)
      callback(new Error("dynamo db put error"))
      return
    }

    console.log(result)
    const res = {
      statusCode: 200
    }
    callback(null, res)
  })
}

function updateTodo(event, callback) {
  const now = moment().format()
  var param = {
    TableName: 'todo',
    Key: {
      "id" : "hogehoge"
    },
    UpdateExpression: "set #a = :x",
    ExpressionAttributeNames: {
      "#a": "updated_at"
    },
    ExpressionAttributeValues: {
      ":x": now
    }
  }

  dynamo.update(param, (err, result) => {
    if (err) {
      console.log(err)
      callback(new Error("Update error"))
    }

    console.log(result)
    callback(null, result)
  })
}