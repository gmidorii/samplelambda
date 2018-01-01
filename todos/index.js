var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
  var method = event.method;

  switch (method) {
    case 'GET':
      getTodo();
      break;
    case 'POST':
      postTodo();
      break;
    case 'PUT':
      updateTodo();
      break;
  }
};

function getTodo(event, callback) {
  var param = {
    TableName: "todo",
    Key: {
      "id" : {
        S: event.id
      }
    }
  };
  dynamo.getItem(param, callback);
}

function postTodo(event, callback) {

}

function updateTodo(event, callback) {

}