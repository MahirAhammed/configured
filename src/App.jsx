import { useState } from "react";

const CATEGORIES = [
  {
    id: "spring",
    name: "Spring Boot",
    lang: "Java",
    description:
      "application.properties and .yml config for datasource, JPA, logging, and more.",
    icon: "/logos/spring.svg",
    outputs: [".properties", ".yml"],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    lang: "Python",
    description:
      "Pydantic settings class and .env file for database, CORS, JWT, and Redis.",
    icon: "/logos/fastapi.svg",
    outputs: [".env", "config.py"],
  },
  {
    id: "docker",
    name: "Docker",
    lang: "Infra",
    description:
      "docker-compose with app, database, Redis, healthchecks, and restart policies.",
    icon: "/logos/docker.svg",
    outputs: ["docker-compose.yml", "Dockerfile", ".dockerignore"],
  },
  {
    id: "nestjs",
    name: "NestJS",
    lang: "TypeScript",
    description:
      "ConfigModule setup, TypeORM config, JWT, CORS, and Redis cache settings.",
    icon: "/logos/nestjs.svg",
    outputs: [".env", "app.module snippet"],
  },
  {
    id: "gitignore",
    name: ".gitignore",
    lang: "All stacks",
    description:
      "Merged .gitignore for Java, Python, Node, with IDE and OS file exclusions.",
    icon: "/logos/git.svg",
    outputs: [".gitignore"],
  },
  {
    id: 'soon',
    name: 'More coming soon...',
    lang: '',
    description: 'More on the way to be added on demand.',
    icon: null,
    outputs: [],
    soon: true,
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  function handleCategorySelect(categoryId) {
    setSelectedCategory(categoryId);
  }

  return (
    <div className="app">
      <header>
        <h1 className="logo">Con<span>Figured</span></h1>
      </header>

    </div>
  );
}

export default App;
