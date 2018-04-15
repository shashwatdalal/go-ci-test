FROM golang:1.10.1-alpine3.7
RUN apk update && apk add git tree make

#install libraries
RUN go get gopkg.in/check.v1 github.com/tebeka/go2xunit

#add util and tests
RUN cd src && mkdir go-ci-test
ADD . src/go-ci-test