FROM golang:1.10.1-alpine3.7
RUN apk update && apk add git tree make

#set up workdir
WORKDIR /go/src/go-ci-test
COPY . .

#install libraries
RUN go get -v gopkg.in/check.v1 github.com/tebeka/go2xunit
