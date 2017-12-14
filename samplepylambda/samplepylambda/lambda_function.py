import json
import boto3

print('Loading function')

s3 = boto3.resource("s3")
dynamodb = boto3.resource('dynamodb', 
                region_name='ap-northeast-1')

def lambda_handler(event, context):
    name = "midori-sample-doc"
    bucket = s3.Bucket(name)
    
    for summary in bucket.objects.all():
        print(summary.key)
        
    obj = bucket.Object("環境構築.md")
    print(obj.key)
    
    res = obj.get()
    body = res['Body'].read()
    # print(body.decode("utf-8"))
    
    table = dynamodb.Table('sample')
    print(table.scan()) 
    return "OK"
