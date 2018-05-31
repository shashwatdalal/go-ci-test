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

    stage('Push Image') {
        def prodImage = docker.build("shashwatdalal/prod-image","-f ./dockerfiles/Dockerfile.prod .")
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
          prodImage.push("latest")
        }
    }

    stage('Deploy') {
			node("production") {
        sh 'sudo docker pull shashwatdalal/prod-image && \
            sudo docker rm -f $(docker ps -a -q) && \
            sudo docker run -d --rm --name main -p 80:8080 shashwatdalal/prod-image'
      }
    }
}