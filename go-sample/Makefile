BUILDFILE=go-sample

zip: 
	GOOS=linux GOARCH=amd64 go build -o $(BUILDFILE)
	zip deployment.zip $(BUILDFILE)

