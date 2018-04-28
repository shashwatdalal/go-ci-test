pipeline {
  agent {
    dockerfile true
  }
  stages {
    stage('Docker Tests') {
      steps {
        sh 'tree'
      }
    }
    stage('Build') {
      steps {
        sh 'go build main.go'
      }
    }
    stage('Unit-Tests') {
      parallel {
        stage('Util Test') {
          steps {
            sh 'cd tests/go-tests && go test basic_test.go -v | go2xunit -fail -output basic_test.xml'
          }
          post {
            always {
              junit 'tests/go-tests/basic_test.xml'

            }

          }
        }
        stage('Handler Test') {
          steps {
            sh 'cd tests/go-tests && go test handler_test.go -v | go2xunit -fail -output handler_test.xml'
          }
          post {
            always {
              junit 'tests/go-tests/handler_test.xml'
            }
          }
        }
      }
    }
  }
}
