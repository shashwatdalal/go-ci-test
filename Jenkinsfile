node {

    stage('Regression Test') {
      node("katalon-chrome-tests") {
          sh 'pwd && cd ../../ && tree && ./run_chrome'
      }
    }
}