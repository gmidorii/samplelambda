var AWS = require("aws-sdk");
if (process.env.AWS_SAM_LOCAL) {
  AWS.config.update({
    region: "us-west-2",
    endpoint: process.env.LOCALURL
  });
}

var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  console.log(event);
  console.log(event.body);
  console.log(process.env.TABLE_NAME);
  console.log(process.env.LOCALURL);

  var body = JSON.parse(event.body);

  var param = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: body.id
    }
  };

  dynamo.get(param, (err, result) => {
    if (err) {
      console.log(err);
      callback(new Error("dynamodb get error"));
      return;
    }
    console.log(result);
    const response = {
      response: result,
      statusCode: 200
    };
    callback(null, response);
  });
};
