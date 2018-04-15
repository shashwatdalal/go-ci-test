FROM golang:1.10.1-alpine3.7
RUN apk update && apk add git tree
RUN go get gopkg.in/check.v1 github.com/tebeka/go2xunit
ENV check "in docker image"
