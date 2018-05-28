FROM golang:1.10.1-alpine3.7
RUN apk update && apk add git tree make bash

#install libraries
RUN go get -v gopkg.in/check.v1 github.com/tebeka/go2xunit

#set up workdir
ENV GOBIN /go/bin
WORKDIR /go/src/go-ci-test
COPY . .

RUN go install main.go
ENTRYPOINT /go/bin/main
EXPOSE 8080