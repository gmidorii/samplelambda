package main

import (
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println(request)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello " + request.Body,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
