node {
  def testImage = docker.build("test-image")
   stage('Build') {
       sh 'go run main.go'
    }
    stage('Test') {
        sh 'cd ~/$GOPATH'
        sh 'tree'
        sh 'cd test'
        sh 'go test -v | go2xunit -output tests.xml'
    }
}
