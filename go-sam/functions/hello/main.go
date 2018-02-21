package main

import (
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func HelloHandler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println(request)
	return events.APIGatewayProxyResponse{
		
	}, nil
}

func main() {
	lambda.Start(HelloHandler)
}
