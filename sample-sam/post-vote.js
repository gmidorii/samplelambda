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
  var body = JSON.parse(event.body);
  console.log(body.id);
  console.log(process.env.TABLE_NAME);
  console.log(process.env.LOCALURL);

  var param = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: body.id
    }
  };

  dynamo.put(param, (err, result) => {
    if (err) {
      console.log(err);
      callback(new Error("dynamodb put error"));
      return;
    }

    console.log(result);
    callback(null, { statusCode: 200 });
  });
};
