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
    stage('Test') {
      parallel {
        stage('Util Tests') {
          steps {
            sh 'cd tests/ && go test basic_test.go -v | go2xunit -fail -output basic_test.xml'
          }
          post {
            always {
              junit 'tests/basic_test.xml'
            }
          }
        }
        stage('Handler Tests') {
          steps {
            sh 'cd tests/ && go test handler_test.go -v | go2xunit -fail -output handler_test.xml'
          }
          post {
            always {
              junit 'tests/handler_test.xml'
            }
          }
        }
      }
    }
  }
}
