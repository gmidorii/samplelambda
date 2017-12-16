'use strict';

import * as uuid from 'uuid'
import {DynamoDB} from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

export function hello(event: any, context: any, callback: Function) {
  console.log(event)

  const timestamp = new Date().getTime()
  console.log(timestamp)
  const param = {
    TableName: 'sample',
    Item: {
      id: uuid.v1(),
      text: 'text',
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
