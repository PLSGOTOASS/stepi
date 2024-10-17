FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY . .
RUN chmod +x gradlew
RUN ./gradlew build --no-daemon --stacktrace

EXPOSE 8080
CMD ["java", "-jar", "build/libs/Back-0.0.1-SNAPSHOT.jar"]

