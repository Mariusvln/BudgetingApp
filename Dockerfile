FROM node:24-alpine AS frontend-build
WORKDIR /app/react-frontend
COPY react-frontend/package*.json ./
RUN npm ci
COPY react-frontend/ ./
RUN npm run build

FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app/backend-java
COPY backend-java/pom.xml ./
RUN mvn -B -DskipTests dependency:go-offline
COPY backend-java/src ./src
COPY --from=frontend-build /app/react-frontend/dist ./src/main/resources/static
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-build /app/backend-java/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
