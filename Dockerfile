FROM alpine:3.7

RUN apk add --no-cache ca-certificates

ENV GOLANG_VERSION 1.10.1

# make-sure-R0-is-zero-before-main-on-ppc64le.patch: https://github.com/golang/go/commit/9aea0e89b6df032c29d0add8d69ba2c95f1106d9 (Go 1.9)
#COPY *.patch /go-alpine-patches/

RUN set -eux; \
	apk add --no-cache --virtual .build-deps \
		bash \
		gcc \
		musl-dev \
		openssl \
		go \
	; \
	export \
# set GOROOT_BOOTSTRAP such that we can actually build Go
		GOROOT_BOOTSTRAP="$(go env GOROOT)" \
# ... and set "cross-building" related vars to the installed system's values so that we create a build targeting the proper arch
# (for example, if our build host is GOARCH=amd64, but our build env/image is GOARCH=386, our build needs GOARCH=386)
		GOOS="$(go env GOOS)" \
		GOARCH="$(go env GOARCH)" \
		GOHOSTOS="$(go env GOHOSTOS)" \
		GOHOSTARCH="$(go env GOHOSTARCH)" \
	; \
# also explicitly set GO386 and GOARM if appropriate
# https://github.com/docker-library/golang/issues/184
	apkArch="$(apk --print-arch)"; \
	case "$apkArch" in \
		armhf) export GOARM='6' ;; \
		x86) export GO386='387' ;; \
	esac; \
	\
	wget -O go.tgz "https://golang.org/dl/go$GOLANG_VERSION.src.tar.gz"; \
	echo '589449ff6c3ccbff1d391d4e7ab5bb5d5643a5a41a04c99315e55c16bbf73ddc *go.tgz' | sha256sum -c -; \
	tar -C /usr/local -xzf go.tgz; \
	rm go.tgz; \
	\
	cd /usr/local/go/src; \
	for p in /go-alpine-patches/*.patch; do \
		[ -f "$p" ] || continue; \
		patch -p2 -i "$p"; \
	done; \
	./make.bash; \
	\
	rm -rf /go-alpine-patches; \
	apk del .build-deps; \
	\
	export PATH="/usr/local/go/bin:$PATH"; \
	go version

ENV GOPATH $PWD/go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"
WORKDIR $GOPATH

RUN apk update && apk add git tree
RUN go get gopkg.in/check.v1 github.com/tebeka/go2xunit
