BUILDFILE=gosample
ZIPFILE=gosample.zip
S3BUCKET=midori-lambda-code
S3KEY=go/$(ZIPFILE)
FUNCTIONNAME=goSampleLambda

zip: 
	GOOS=linux GOARCH=amd64 go build -o $(BUILDFILE)
	zip $(ZIPFILE) $(BUILDFILE)

upload: 
	make zip
	aws s3 cp $(ZIPFILE) s3://$(S3BUCKET)/$(S3KEY)

deploy:
	make upload
	aws lambda update-function-code \
		--function-name $(FUNCTIONNAME) \
		--s3-bucket $(S3BUCKET) \
		--s3-key $(S3KEY)
