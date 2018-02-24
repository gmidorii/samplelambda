.PHONY: build

BUILD=build
BINARY=function
OS=linux
ARCH=amd64

build:
	cd $(PWD)/functions/hello && \
		GOOS=$(OS) GOARCH=$(ARCH) go build -o $(PWD)/$(BUILD)/hello