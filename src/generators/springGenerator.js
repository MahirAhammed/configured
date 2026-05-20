const DB_CONFIG = {
  postgres: {
    url: "jdbc:postgresql://localhost:5432/mydb",
    driver: "org.postgresql.Driver",
    username: "postgres",
    password: "postgres",
  },
  mysql: {
    url: "jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC",
    driver: "com.mysql.cj.jdbc.Driver",
    dialect: "org.hibernate.dialect.MySQL8Dialect",
    mongoUri: null,
  },
  mongodb: {
    url: null,
    driver: null,
    dialect: null,
    mongoUri: "mongodb://localhost:27017/mydb",
  },
  h2: {
    url: "jdbc:h2:mem:testdb",
    driver: "org.h2.Driver",
    dialect: "org.hibernate.dialect.H2Dialect",
    mongoUri: null,
  },
};

// .properties generator
function buildProperties(selection) {
  const db = DB_CONFIG[selection.database];
  const lines = [];

  const gap = () => {if (lines.length > 0) lines.push("");};

  if (selection.database === "mongodb") {
    lines.push("# MongoDB");
    lines.push(`spring.data.mongodb.uri=${db.mongoUri}`);
    lines.push("spring.data.mongodb.database=mydb");
  } else {
    lines.push("# Datasource");
    lines.push(`spring.datasource.url=${db.url}`);
    lines.push(`spring.datasource.username=${db.username}`);
    lines.push(`spring.datasource.password=${db.password}`);
    lines.push(`spring.datasource.driver-class-name=${db.driver}`);
  }

  // JPA / Hibernate
  if (selection.jpa && selection.database !== "mongodb") {
    gap();
    lines.push("# JPA / Hibernate");
    lines.push(`spring.jpa.hibernate.ddl-auto=${selection.ddlAuto}`);
    lines.push("spring.jpa.show-sql=false");
    lines.push("spring.jpa.properties.hibernate.format_sql=true");
    if (db.dialect) {
      lines.push(`spring.jpa.properties.hibernate.dialect=${db.dialect}`);
    }
  }

  // Hikari pool
  if (selection.pool && selection.database !== "mongodb") {
    gap();
    lines.push("# HikariCP connection pool");
    lines.push("spring.datasource.hikari.maximum-pool-size=10");
    lines.push("spring.datasource.hikari.minimum-idle=2");
    lines.push("spring.datasource.hikari.idle-timeout=30000");
    lines.push("spring.datasource.hikari.connection-timeout=20000");
    lines.push("spring.datasource.hikari.max-lifetime=1800000");
  }

  // Flyway
  if (selection.flyway && selection.database !== "mongodb") {
    gap();
    lines.push("# Flyway");
    lines.push("spring.flyway.enabled=true");
    lines.push("spring.flyway.locations=classpath:db/migration");
    lines.push("spring.flyway.baseline-on-migrate=true");
  }

  // Server
  if (selection.serverPort) {
    gap();
    lines.push("# Server");
    lines.push("server.port=8080");
    lines.push("server.servlet.context-path=/");
  }

  // Logging
  if (selection.logging) {
    gap();
    lines.push("# Logging");
    lines.push(`logging.level.root=${selection.logLevel}`);
    lines.push("logging.level.org.springframework=WARN");
    lines.push("logging.level.com.yourapp=DEBUG");
    lines.push("logging.file.name=logs/app.log");
    lines.push(
      "logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n",
    );
  }

  // Redis
  if (selection.redis) {
    gap();
    lines.push("# Redis");
    lines.push("spring.data.redis.host=localhost");
    lines.push("spring.data.redis.port=6379");
    lines.push("spring.data.redis.password=your_redis_password");
    lines.push("spring.cache.type=redis");
  }

  // Mail
  if (selection.mail) {
    gap();
    lines.push("# Mail (SMTP)");
    lines.push("spring.mail.host=smtp.gmail.com");
    lines.push("spring.mail.port=587");
    lines.push("spring.mail.username=your_email@gmail.com");
    lines.push("spring.mail.password=your_app_password");
    lines.push("spring.mail.properties.mail.smtp.auth=true");
    lines.push("spring.mail.properties.mail.smtp.starttls.enable=true");
  }

  // Actuator
  if (selection.actuator) {
    gap();
    lines.push("# Actuator");
    lines.push("management.endpoints.web.exposure.include=health,info");
    lines.push("management.endpoint.health.show-details=when-authorized");
  }

  // API key
  if (selection.apiKey) {
    gap();
    lines.push('# API key — reference in code with @Value("${app.api-key}")');
    lines.push("app.api-key=your_api_key_here");
  }

  return lines.join("\n");
}

// YAML GENERATOR
function buildYml(selection) {
  const db = DB_CONFIG[selection.database];
  const lines = [];

  const push = (line) => lines.push(line);
  const gap = () => push("");

  push("spring:");

  // Datasource
  if (selection.database === "mongodb") {
    push("  data:");
    push("    mongodb:");
    push(`      uri: ${db.mongoUri}`);
    push("      database: mydb");
  } else {
    push("  datasource:");
    push(`    url: ${db.url}`);
    push(`    username: ${db.username}`);
    push(`    password: ${db.password}`);
    push(`    driver-class-name: ${db.driver}`);

    if (selection.pool) {
      push("    hikari:");
      push("      maximum-pool-size: 10");
      push("      minimum-idle: 2");
      push("      idle-timeout: 30000");
      push("      connection-timeout: 20000");
      push("      max-lifetime: 1800000");
    }
  }

  // JPA
  if (selection.jpa && selection.database !== "mongodb") {
    push("  jpa:");
    push("    hibernate:");
    push(`      ddl-auto: ${selection.ddlAuto}`);
    push("    show-sql: false");
    push("    properties:");
    push("      hibernate:");
    push("        format_sql: true");
    if (db.dialect) push(`        dialect: ${db.dialect}`);
  }

  // Flyway
  if (selection.flyway && selection.database !== "mongodb") {
    push("  flyway:");
    push("    enabled: true");
    push("    locations: classpath:db/migration");
    push("    baseline-on-migrate: true");
  }

  // Redis
  if (selection.redis) {
    push("  data:");
    push("    redis:");
    push("      host: localhost");
    push("      port: 6379");
    push("      password: your_redis_password");
    push("  cache:");
    push("    type: redis");
  }

  // Mail
  if (selection.mail) {
    push("  mail:");
    push("    host: smtp.gmail.com");
    push("    port: 587");
    push("    username: your_email@gmail.com");
    push("    password: your_app_password");
    push("    properties:");
    push("      mail:");
    push("        smtp:");
    push("          auth: true");
    push("          starttls:");
    push("            enable: true");
  }

  // Server
  if (selection.serverPort) {
    gap();
    push("server:");
    push("  port: 8080");
    push("  servlet:");
    push("    context-path: /");
  }

  // Logging
  if (selection.logging) {
    gap();
    push("logging:");
    push("  level:");
    push(`    root: ${selection.logLevel}`);
    push("    org.springframework: WARN");
    push("    com.yourapp: DEBUG");
    push("  file:");
    push("    name: logs/app.log");
  }

  // Actuator
  if (selection.actuator) {
    gap();
    push("management:");
    push("  endpoints:");
    push("    web:");
    push("      exposure:");
    push("        include: health,info");
    push("  endpoint:");
    push("    health:");
    push("      show-details: when-authorized");
  }

  // API key
  if (selection.apiKey) {
    gap();
    push('# Reference in code with @Value("${app.api-key}")');
    push("app:");
    push("  api-key: your_api_key_here");
  }

  return lines.join("\n");
}

// Public API
export function generateSpring(selections) {
  return {
    properties: buildProperties(selections),
    yml: buildYml(selections),
  };
}
