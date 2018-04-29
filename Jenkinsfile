pipeline {
  agent none
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
        sh 'go build main.go'
      }
    }
    stage('Unit-Tests') {
       agent {
            dockerfile true
       }
      parallel {
        stage('Util Test') {
          steps {
            sh 'cd tests/go-tests && go test basic_test.go -v | go2xunit -fail -output basic_test.xml'
          }
          post {
            always {
              junit 'tests/basic_test.xml'

            }
          }
        }
        stage('Handler Test') {
          steps {
            sh 'cd tests/go-tests && go test handler_test.go -v | go2xunit -fail -output handler_test.xml'
          }
          post {
            always {
              junit 'tests/handler_test.xml'
            }
          }
        }
      }
    }
    stage('Integration-Tests') {
      agent any
      steps {
      sh 'exit'
      sh 'go build main.go'
      }
     }
  }
}
