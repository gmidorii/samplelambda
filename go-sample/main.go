package main

import (
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Body struct {
	Word string
	Code string
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println(request)
	var body Body
	json.Unmarshal([]byte(request.Body), &body)
	log.Println(body)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello " + request.Body,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
