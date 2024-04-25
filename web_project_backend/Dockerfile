
FROM amazoncorretto:17-alpine3.17
EXPOSE 8080
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} web_project.jar
CMD ["java", "-jar", "/web_project.jar"]