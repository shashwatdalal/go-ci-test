pipeline {
  agent none
  stages {
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t go-ci-test .'
      }
    }
    stage('Build') {
       agent {
           image 'go-cl-test:latest' 
       }
      steps {
        sh 'go build main.go'
      }
    }
    stage('Unit-Tests') {
      parallel {
        stage('Util Test') {
          agent {
            dockerfile true
          }
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
          agent {
            dockerfile true
          }
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
    stage('System-Tests') {
      agent {
        label 'katalon-tests'
      }
      steps {
        sh 'cd tests/integration-tests && ./run_chrome'
      }
      post {
        always {
          junit 'tests/reports/chrome/*.xml'
<<<<<<< HEAD
        }
=======

        }

>>>>>>> 8e0210100f91ee1395f7442e74c13ef6f1341127
      }
    }
  }
}
