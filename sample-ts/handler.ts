'use strict';

import * as uuid from 'uuid'
import {DynamoDB} from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

export function hello(event: Sample, context: any, callback: Function) {
  console.log(event)

  const timestamp = new Date().getTime()
  console.log(timestamp)

  const gParam = {
    TableName: 'sample',
    Key: {
      'id': '352345e0-e337-11e7-be4c-f7cf2d1f989a'
    }
  }

  dynamoDb.get(gParam, (err, result) => {
    if (err) {
      console.log(err)
      callback(new Error('dynamodb get error'))
      return
    }
    console.log(result)
  })

  const param = {
    TableName: 'sample',
    Item: {
      id: uuid.v1(),
      title: event.title,
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
  title: string
  text: string
}