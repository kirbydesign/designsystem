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
    securityContext:
      runAsUser: 0
      fsGroup: 0
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
    - name: helm
      image: gcr.io/kubernetes-helm/tiller:v2.10.0
      command:
      - cat
      tty: true
    volumes:
    - name: jenkins-docker-cfg
      secret:
        secretName: regcred
        items:
        - key: .dockerconfigjson
          path: .docker/config.json
"""
        }
    }

    stages {
        stage('Commit hash') {

        }
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
                    sh './node_modules/.bin/ng build --base-href ./ --prod --aot --progress false'
                }
            }
        }
        stage('Container Image') {
            environment {
                PATH = "/busybox:$PATH"
            }
            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                    ansiColor('xterm') {
                        sh '''#!/busybox/sh
/kaniko/executor -f `pwd`/Dockerfile -c `pwd` --destination=drbreg.azurecr.io/kirby/design:git${env.GIT_COMMIT}
                        '''
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                container('helm') {
                    ansiColor('xterm') {
                        sh '/helm upgrade -i kirby config/chart --set image.tag=git${env.GIT_COMMIT} -f config/helm/staging.yaml'
                    }
                }
            }
        }
    }
}