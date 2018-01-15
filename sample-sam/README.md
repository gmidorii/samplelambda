# Sample SAM

## Overview
sample code.  
used AWS SAM.

## Memo

### local sam
```sh
# must created env.json
sam local invoke "VotePost" --event event.json --env-vars env.json

sam local invoke VoteGet -e event-get.json -n env.json
```

### docker
```sh
docker run -it -d -p 7777:7777 tray/dynamodb-local -inMemory -port 7777 -sharedDb
```

### aws cli
```sh
# list
aws dynamodb list-tables --endpoint-url http://localhost:7777

# create table
aws dynamodb create-table \
    --table-name Vote \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --endpoint-url http://localhost:7777

# describe
aws dynamodb describe-table --table-name Vote --endpoint-url http://localhost:7777

# scan
aws dynamodb --endpoint-url http://localhost:7777 scan --table-name Vote
```

### API GW
```sh
# curl
curl -H "Content-Type:application/json" -d '{ "id": "hogehoges" }' http://127.0.0.1:3000/vote
```