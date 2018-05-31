node {

		def goImage
		def nodeImage

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
    }

    stage('Build images') {
        goImage = docker.build("shashwatdalal/go-lang-image","-f ./dockerfiles/Dockerfile.goLang .")
        nodeImage = docker.build("shashwatdalal/node-image","-f ./dockerfiles/Dockerfile.node .")
    }

    stage('React Tests') {
       nodeImage.inside('-v $PWD:/node') {
          sh 'yarn install'
          sh 'yarn build'
        }
    }

    stage('Go Tests') {
      goImage.inside('-v $PWD:/go/src/go-ci-test') {
        sh 'go build -o main'
      }
    }

    stage('Push image') {
        def prodImage = docker.build("shashwatdalal/prod-image","-f ./dockerfiles/Dockerfile.prod .")
        prodImage.withRun() {
					sh 'pwd'
        }
        sh 'pwd'
        prodImage.push()
    }
}