node {

    stage('Regression Test') {
      node("katalon-chrome-tests") {
          sh 'pwd && cd ../../webapp-ui-tests && tree && ./run_chrome'
      }
    }
}