node {
  def goLangImage = docker.build("golang")
   stage('Build') {
       goLangImage.inside {
            sh 'tree'
       }
    }
    stage('Test') {
        sh 'cd ~/$GOPATH'
        sh 'tree'
        sh 'cd test'
        sh 'go test -v | go2xunit -output tests.xml'
    }
}
