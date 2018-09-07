pipeline {
    agent {
        kubernetes {
            label 'builder'
            cloud 'kubernetes'
            defaultContainer 'jnlp'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:8
      command:
        - cat
      tty: true
"""
        }
    }

    stages {
        stage('Install npm dependencies') {
            steps {
                container('node') {
                    sh 'npm install'
                }
            }
        }
        stage('Linting') {
            steps {
                container('node') {
                    sh './node_modules/.bin/ng lint'
                }
            }
        }
        stage('Run tests') {
            steps {
                container('node') {
                    sh './node_modules/.bin/ng test --progress false --watch false'
                }
            }
        }
        stage('Build') {
            steps {
                container('node') {
                    sh './node_modules/.bin/ng build --base-href ./ --prod --aot --progress false'
                }
            }
        }
    }
}