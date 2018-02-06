package main

import (
	"encoding/json"
	"log"
	"sync"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Body struct {
	Word string `json:"word"`
	Code string `json:"code"`
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println(request)

	var body Body
	json.Unmarshal([]byte(request.Body), &body)
	log.Println(body)
	log.Println("add sample")
	log.Println("sam test")

	var wg sync.WaitGroup
	wg.Add(1)
	go func(wg *sync.WaitGroup) {
		defer wg.Done()
		time.Sleep(300 * time.Millisecond)
		log.Println("go routine test")
	}(&wg)

	log.Println("hogehoge")
	wg.Wait()

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello " + request.Body,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
