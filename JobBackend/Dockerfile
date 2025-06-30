FROM maven:3.9.6-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jdk
COPY --from=build /target/JobBackend-0.0.1-SNAPSHOT.jar JobBackend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "JobBackend.jar"]
