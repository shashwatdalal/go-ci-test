node {

    stage('Regression Test') {
      node("katalon-chrome-tests") {
          sh 'pwd && cd ../../webapps-ui-tests && tree && ./run_chrome'
      }
    }
}