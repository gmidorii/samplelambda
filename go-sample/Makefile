BUILDFILE=gosample
ZIPFILE=gosample.zip
S3BUCKET=midori-lambda-code
S3KEY=go/$(ZIPFILE)
FUNCTIONNAME=goSampleLambda
BUILD_DIR=build/HelloFunction
ZIP_DIR=zip/HelloFunction
PACKAGE_BUCKET=midori-sam-package

build: 
	GOOS=linux GOARCH=amd64 go build -o $(BUILDFILE)

zip: 
	make build
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

local-invoke:
	make build
	sam local invoke ${function} -e event/${function}/event.json

sam-zip:
	GOOS=linux GOARCH=amd64 go build -o $(BUILD_DIR)/$(BUILDFILE)
	zip $(ZIP_DIR)/$(ZIPFILE) $(BUILD_DIR)/*

# package: upload s3 to lambda zip code
sam-package:
	aws cloudformation package \
		--template-file template.yml \
		--output-template-file template.deploy \
		--s3-bucket $(PACKAGE_BUCKET)

# deploy: create stack
sam-deploy:
	aws cloudformation deploy \
		--template-file template.deploy \
		--stack-name sam-sample-go \
		--capabilities CAPABILITY_IAM

sam-update:
	aws cloudformation update-stack \
		--template-file template.deploy \
		--stack-name sam-sample-go \
		--capabilities CAPABILITY_IAM

sample:
	$(eval FILES := $(shell ls -1 functions/**/*.go))
	$(eval PWD := $(shell pwd))
	@for f in $(FILES) ; do \
		echo $$f \
		echo $(PWD) \
		go build -o $(BUILD_DIR)/$(BUILDFILE); \
	done

