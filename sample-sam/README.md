# Sample SAM

## Memo

### local sam
```sh
TABLE_NAME=Vote \
LOCALURL=http://[privateIP]:7777 \
sam local invoke "VotePost" --event event.json
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
```
