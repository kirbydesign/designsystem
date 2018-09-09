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
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      command:
      - /busybox/cat
      tty: true
      volumeMounts:
      - name: jenkins-docker-cfg
        mountPath: /root
    volumes:
    - name: jenkins-docker-cfg
      projected:
        sources:
        - secret:
          name: regcred
          items:
          - key: .dockerconfigjson
            path: .docker/config.json
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
        /*
        stage('Run tests') {
            steps {
                container('node') {
                    sh './node_modules/.bin/ng test --progress false --watch false'
                }
            }
        }
        */
        stage('Build') {
            steps {
                container('node') {
                    //sh './node_modules/.bin/ng build --base-href ./ --prod --aot --progress false'
                    sh './node_modules/.bin/ng build --base-href ./ --aot --progress false'
                    stash(name: 'distribution', includes: 'dist/**')
                }
            }
        }
        stage('Container Image') {
            steps {
                container('kaniko') {
                    unstash(name: 'distribution')
                    sh '/kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure-skip-tls-verify --destination=drbreg.azurecr.io/kirby/design'
                }
            }
        }
    }
}