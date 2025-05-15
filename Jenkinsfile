pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Run Jest tests with coverage
                sh 'npm test -- --coverage'
            }
        }
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarQube Scanner'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    // Pass the coverage report path to SonarQube
                    sh """
                    ${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=my-project \
                    -Dsonar.sources=src \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                    """
                }
            }
        }
    }
}
