'use strict';

import * as uuid from 'uuid'
import {DynamoDB} from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

export function hello(event: Sample, context: any, callback: Function) {
  console.log(event)

  const timestamp = new Date().getTime()
  console.log(timestamp)
  const param = {
    TableName: 'sample',
    Item: {
      id: uuid.v1(),
      text: event.text,
      createdAt: timestamp
    }
  }

  dynamoDb.put(param, (error, result) => {
    if (error) {
      console.log(error)
      callback(new Error("dynamodb put error"))
      return
    }

    const response = {
      statusCode: 200
    }
    callback(null, response)
  })
}

declare class Sample {
  text: string
}