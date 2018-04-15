pipeline {
  stages {
    stage('Docker Tests') {
      agent {
        dockerfile true
      }
      steps {
        sh 'tree'
      }
    }
    stage('Build') {
      agent {
        dockerfile true
      }
      steps {
        sh 'echo $GOROOT'
        sh 'echo $GOPATH'
        sh 'pwd'
        sh 'go build *.go'
      }
    }
    stage('Test') {
      steps {
        sh 'cd src/'
        sh 'go test -v | go2xunit -output tests.xml'
      }
    }
  }
}
