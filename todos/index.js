var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

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

}

function updateTodo(event, callback) {

}