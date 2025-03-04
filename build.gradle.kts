plugins {
    kotlin("jvm") version "1.9.0"
    kotlin("plugin.spring") version "1.9.0"
    id("org.springframework.boot") version "3.2.2"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "com.example.budgetapp"
version = "1.0"

repositories {
    mavenCentral()
}

dependencies {
<<<<<<< HEAD
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    // ✅ Kotlinx Serialization (Fixes `@Serializable` error)
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")

    // ✅ Ktor Dependencies (Fixes `ktor` unresolved reference errors)
    implementation("io.ktor:ktor-server-core:2.3.0")
    implementation("io.ktor:ktor-server-netty:2.3.0")
    implementation("io.ktor:ktor-server-content-negotiation:2.3.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.0")
    implementation("io.ktor:ktor-serialization-gson:2.3.3")

    // ✅ Test dependencies
    testImplementation("org.springframework.boot:spring-boot-starter-test")
=======
    implementation("io.ktor:ktor-server-core:2.3.4")
    implementation("io.ktor:ktor-server-netty:2.3.4")
    implementation("io.ktor:ktor-server-content-negotiation:2.3.4")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.4")
    implementation("io.ktor:ktor-server:2.3.4")
    implementation("io.github.microutils:kotlin-logging-jvm:3.0.5")
    implementation("ch.qos.logback:logback-classic:1.4.11")
>>>>>>> dfd12af (Logger)
}

// ✅ Force Java 17 (Fixes JVM 21 Error)
kotlin {
    jvmToolchain(17)
}
