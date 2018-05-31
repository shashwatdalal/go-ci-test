node {
    def go-image
    def node-image
    def prod-image

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */
        checkout scm
    }

    stage('Build images') {
        go-image = docker.build("shashwatdalal/go-lang-image","./dockerfiles/Dockerfile.goLang")
        node-image = docker.build("shashwatdalal/node-image","./dockerfiles/Dockerfile.node")
    }

    stage('React Tests') {
        docker.image('shashwatdalal/node-image').withRun('-v $PWD:node') {
          yarn install
          yarn build
        }
    }

    stage('Go Tests') {
      docker.image('shashwatdalal/go-lang-image').withRun('-v $PWD:/go/src/go-ci-test') {
        go build -o main
      }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        prod-image = docker.build("shashwatdalal/prod-image","./dockerfiles/Dockerfile.prod")
        prod-image.push()
    }
}