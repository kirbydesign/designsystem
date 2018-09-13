import com.cloudbees.groovy.cps.NonCPS

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
        stage('Install npm dependencies') {
            steps {
                container('node') {
                    ansiColor('xterm') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Linting') {
            steps {
                container('node') {
                    ansiColor('xterm') {
                        sh './node_modules/.bin/ng lint'
                    }
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
                    ansiColor('xterm') {
                        sh './node_modules/.bin/ng build --base-href ./ --prod --aot --progress false'
                    }
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
                        sh """#!/busybox/sh
/kaniko/executor -f `pwd`/Dockerfile -c `pwd` --destination=drbreg.azurecr.io/kirby/design:git${env.GIT_COMMIT}
                        """
                    }
                }
            }
        }
        stage('Deploy branch') {
            when {
                not {
                    branch 'master'
                }
            }
            steps {
                container('helm') {
                    ansiColor('xterm') {
                        script {
                            def name = env.BRANCH_NAME.replaceAll("[^-a-z0-9]+", "-")
                            def dnsName = generateDNS("kirby-${name}", '79e7f2f3549145978da6.northeurope.aksapp.io')
                            sh "/helm upgrade -i kirby-${name} config/chart --set image.repository=drbreg.azurecr.io/kirby/design --set image.tag=git${env.GIT_COMMIT} --set ingress.host=${dnsName} -f config/helm/branch.yaml"
                        }
                    }
                }
            }
        }
        stage('Deploy master') {
            when {
                branch 'master'
            }
            steps {
                container('helm') {
                    ansiColor('xterm') {
                        sh "/helm upgrade -i kirby config/chart --set image.repository=drbreg.azurecr.io/kirby/design --set image.tag=git${env.GIT_COMMIT} -f config/helm/staging.yaml"
                    }
                }
            }
        }
    }
}

@NonCPS
def generateDNS(name, domain) {
    def length = 64 - domain.length()
    if (length < 5) {
        error "Less than 5 characters to DNS name please find a more appropriate subdomain"
    }
    def host = name
    while (host.length() > length) {
        host = shortenHost(host)
    }
    return "${host}.${domain}"
}

@NonCPS
def shortenHost(name) {
    def magicWords = ['feature']
    def shortened = name
    magicWords.each { w -> 
        shortened = shortened.replace(w, "")
    }
    shortened = shortened.replace("--", "-")
    if (shortened.length() < name.length()) {
        return shortened
    }

    return name.substring(0, name.length() - 2)
}