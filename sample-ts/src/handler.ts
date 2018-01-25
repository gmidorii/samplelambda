"use strict";

import { DynamoDB } from "aws-sdk";
import { int } from "aws-sdk/clients/datapipeline";
import * as uuid from "uuid";

console.log(process.env.DYNAMO_ENV);
const dynamoDb = new DynamoDB.DocumentClient({
  endpoint: process.env.DYNAMO_ENV
});

declare class Sample {
  public title: string;
  public text: string;
  public hoge: Hoge;
}

declare class Hoge {
  public id: string;
  public code: number;
}

export function hello(event: Sample, context: any, callback: Function) {
  console.log(event);
  // dynamoDBGet(callback)
  // dynamoDBPut(event, callback)
  // dynamoDBUpdate(callback)
  // dynamoDBDelete(callback)
  dynamoDBScan(callback);
}

function dynamoDBGet(callback: Function) {
  // Get
  const param = {
    TableName: "sample",
    Key: {
      id: "352345e0-e337-11e7-be4c-f7cf2d1f989a"
    }
  };

  dynamoDb.get(param, (err, result) => {
    if (err) {
      console.log(err);
      callback(new Error("dynamodb get error"));
      return;
    }
    console.log(result);
    const response = {
      statusCode: 200
    };
    callback(null, response);
  });
}

function dynamoDBUpdate(callback: Function) {
  const param = {
    TableName: "sample",
    Key: {
      id: "d4b46f90-e70f-11e7-8dd8-c5e92e1cb649"
    },
    ExpressionAttributeNames: {
      "#T": "text",
      "#H": "hoge_id",
      "#C": "hoge_code"
    },
    ExpressionAttributeValues: {
      ":newText": "no event.json",
      ":newHogeId": "hogehoge",
      ":newHogeCode": 100
    },
    UpdateExpression: "SET #T = :newText, #H = :newHogeId, #C = :newHogeCode"
  };
  dynamoDb.update(param, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(result);
    const response = {
      statusCode: 200
    };
    callback(null, response);
  });
}

function dynamoDBPut(event: Sample, callback: Function) {
  const timestamp = new Date().getTime();
  // Post
  const param = {
    TableName: "sample",
    Item: {
      id: uuid.v1(),
      title: event.title,
      text: event.text,
      hoge_id: event.hoge.id,
      hoge_code: event.hoge.code,
      createdAt: timestamp
    }
  };

  dynamoDb.put(param, (error, result) => {
    if (error) {
      console.log(error);
      callback(new Error("dynamodb put error"));
      return;
    }

    console.log(result);
    const response = {
      statusCode: 200
    };
    callback(null, response);
  });
}

function dynamoDBDelete(callback: Function) {
  const param = {
    TableName: "sample",
    Key: {
      id: "76798d60-e710-11e7-9992-955e1a30142a"
    }
  };

  dynamoDb.delete(param, (error, result) => {
    if (error) {
      console.log(error);
      callback(new Error("dynamodb delete error"));
      return;
    }

    console.log(result);
    const response = {
      statusCode: 200
    };
    callback(null, response);
  });
}

function dynamoDBScan(callback: Function) {
  const param = {
    TableName: "sample",
    FilterExpression: "text = :text",
    ExpressionAttributeValues: { ":text": "text" }
  };

  dynamoDb.scan(param, (error, result) => {
    if (error) {
      console.log(error);
    }

    console.log(result);
    const response = {
      statusCode: 200
    };
    callback(null, response);
  });
}
