'use strict';

import * as uuid from 'uuid'
import {DynamoDB} from 'aws-sdk'
import { int } from 'aws-sdk/clients/datapipeline';

const dynamoDb = new DynamoDB.DocumentClient()

export function hello(event: Sample, context: any, callback: Function) {
  console.log(event)

  const timestamp = new Date().getTime()
  console.log(timestamp)

  // Get
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
  
  var upParam = {
    TableName: 'sample',
    Key : {
      id : 'd4b46f90-e70f-11e7-8dd8-c5e92e1cb649'
    },
    ExpressionAttributeNames : {
      '#T': 'text',
      '#H': 'hoge_id',
    },
    ExpressionAttributeValues: {
      ":newText": 'no event.json',
      ":newHogeId": 'hogehoge'
    },
    UpdateExpression: 'SET #T = :newText, #H = :newHogeId'
  }
  dynamoDb.update(upParam, (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    const response = {
      statusCode: 200
    }
    callback(null,response)
  })
  // Post
  const param = {
    TableName: 'sample',
    Item: {
      id: uuid.v1(),
      title: event.title,
      text: event.text,
      hoge_id: event.hoge.id,
      hoge_code: event.hoge.code,
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
  hoge: Hoge
}

declare class Hoge {
  id: string
  code: number
}