FROM golang:1.10.1-alpine3.7
RUN export GOPATH=$WORKSPACE/..
RUN export PATH=$GOPATH:$PATH
RUN apk update && apk add git tree
RUN go get gopkg.in/check.v1 github.com/tebeka/go2xunit
