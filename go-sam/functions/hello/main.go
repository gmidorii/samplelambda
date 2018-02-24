package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response struct {
	Status  int16
	Message string
}

func HelloHandler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println(request)
	res := Response{
		Status:  http.StatusOK,
		Message: "Hello!!",
	}
	s, err := json.Marshal(res)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
		}, errors.New("json marshal error!!")
	}
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(s),
	}, nil
}

func main() {
	lambda.Start(HelloHandler)
}
