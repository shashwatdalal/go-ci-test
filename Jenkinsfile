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
        sh 'go run main.go'
      }
    }
    stage('Test') {
      steps {
        sh 'cd test/'
        sh 'go test -v | go2xunit -output tests.xml'
      }
    }
  }
}
