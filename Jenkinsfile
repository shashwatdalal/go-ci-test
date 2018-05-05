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
    stage('Integration-Tests') {
      agent {
        label 'katalon-tests'
      }
      steps {
      sh 'cd tests/integration-tests && tree && sudo ./run_chrome'
      }
      post {
      always {
                    junit 'tests/reports/chrome/*.xml'
                  }
                }
     }
  }
}
