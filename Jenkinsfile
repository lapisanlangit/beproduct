
pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/lapisanlangit/beproduct.git'
        REGISTRY_URL = '192.168.1.X:6300'
        DOCKER_IMAGE_NAME = '192.168.1.X:6300/beproduct_jenkins'
        CONTAINER_NAME='beproduct'
        DOCKER_IMAGE_TAG = '1.0'
        DOCKER_LOGIN='dockerlogin'
        DESTINATION_HOST = 'jati@192.168.1.X'
    }

    stages {
        stage('Clone Repository Github') {
            steps {
                git branch: 'main', 
                url: GITHUB_REPO_URL, 
                credentialsId: 'githublogin'
            }
        }

        stage('Build Image BE') {
            steps {
                echo 'Building Image BE...'
                script {
                   sh '''
                    docker build . -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                '''
                }
            }
        }


        stage('Docker Push to Local Registry') {
            steps {
                echo 'Docker Push...'
                script {
                    docker.withRegistry("https://${REGISTRY_URL}", 'dockerlogin') {
                        def customImage = docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                        customImage.push()
                    }
                }
            }
        }

        stage('SSH Destination Server and Docker Pull') {
            steps {
                script {
                        withCredentials([usernamePassword(credentialsId: 'dockerlogin', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh '''
                               ssh ${DESTINATION_HOST} << EOF
                               echo '${DOCKER_PASSWORD}' | docker login '${REGISTRY_URL}' --username '${DOCKER_USER}' --password-stdin
                               docker pull ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                              << EOF
                            '''
                        
                    }           
                }
            }
        }  


        // stage('Running BE Product') {
        //     steps {
        //         script {      
        //                     sh '''
        //                        ssh ${DESTINATION_HOST} << EOF
        //                        docker stop ${CONTAINER_NAME}
        //                        docker rm ${CONTAINER_NAME}
        //                        cd envfile
        //                        docker run --env-file .env --name ${CONTAINER_NAME} -p 5000:5000 -d ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
        //                       << EOF
        //                     '''
                         
        //         }
        //     }
        // }       



        stage('Running Docker Service BE Product') {
            steps {
                script {      
                            sh '''
                               ssh ${DESTINATION_HOST} << EOFW
                               cd envfile
                               docker service create --env-file .env --network product-network --name svc-beproduct -p 5000:5000 -d ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                               docker service update --force svc-feproduct
                              << EOF
                            ''' 
                }
            }
        }   

    //  stage('Rolling Update  BE Product') {
    //         steps {
    //             script {      
    //                         sh '''
    //                            ssh ${DESTINATION_HOST} << EOF
    //                            docker service update --image ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} --update-parallelism 2  --update-delay 10s svc-beproduct
    //                           << EOF
    //                         '''
                         
    //             }
    //         }
    //     }       
    
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
