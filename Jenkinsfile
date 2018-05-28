pipeline {
  agent none
  stages {
    stage('Build Dockerfile') {
      agent any
      steps { sh 'docker build -t go-ci-test .' }
    }
    stage('Build Source') {
       agent { docker { image 'go-ci-test:latest' } }
      steps { sh 'go build main.go' }
    }
    stage('Unit-Tests') {
      parallel {
        stage('Util Test') {
          agent { docker { image 'go-ci-test:latest' } }
          steps { sh 'cd tests/go-tests && go test basic_test.go -v | go2xunit -fail -output basic_test.xml' }
          post { always { junit 'tests/go-tests/basic_test.xml' } }
        }
        stage('Handler Test') {
          agent { docker { image 'go-ci-test:latest' } }
          steps { sh 'cd tests/go-tests && go test handler_test.go -v | go2xunit -fail -output handler_test.xml' }
          post { always { junit 'tests/go-tests/handler_test.xml' } }
        }
      }
    }
    stage('Production') {
      agent { label 'production' }
      steps { sh 'git pull && echo $USER && sudo docker build -t go-ci-test .' && docker run -d -p 8080:8080 go-ci-test }
    }
  }
}
