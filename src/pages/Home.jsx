import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'

const CATEGORIES = [
  {
    id: 'spring',
    name: 'Spring Boot',
    lang: 'Java',
    description: 'application.properties and .yml for datasource, JPA, logging, and more.',
    icon: '/logos/spring.svg',
    outputs: ['.properties', '.yml'],
    route: '/spring-boot',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    lang: 'Python',
    description: 'Pydantic settings and .env for database, CORS, JWT, and Redis.',
    icon: '/logos/fastapi.svg',
    outputs: ['.env', 'config.py'],
    route: '/fastapi',
    soon: true,

  },
  {
    id: 'docker',
    name: 'Docker',
    lang: 'Infra',
    description: 'docker-compose with app, database, Redis, healthchecks, and restart policies.',
    icon: '/logos/docker.svg',
    outputs: ['docker-compose.yml', 'Dockerfile', '.dockerignore'],
    route: '/docker',
    soon: true,

  },
  {
    id: 'express',
    name: 'ExpressJS',
    lang: 'TypeScript',
    description: 'ConfigModule, TypeORM, JWT, CORS, and Redis cache settings.',
    icon: '/logos/expressjs.svg',
    outputs: ['.env', 'app.module snippet'],
    route: '/express',
    soon: true,

  },
  {
    id: 'gitignore',
    name: '.gitignore',
    lang: 'All stacks',
    description: 'Merged .gitignore for Java, Python, Node, with IDE and OS file exclusions.',
    icon: '/logos/git.svg',
    outputs: ['.gitignore'],
    route: '/gitignore',
    soon: true,

  },
  {
    id: 'soon',
    name: 'Space for more',
    lang: '',
    description: 'More to be added on demand...',
    icon: null,
    outputs: [],
    soon: true,
  },
]

export default function Home() {
  const navigate = useNavigate()

  function handleSelect(category) {
    if (category.route) navigate(category.route)
  }

  return (
    <>
      <Hero />
      <CategoryGrid categories={CATEGORIES} onSelect={handleSelect} />
    </>
  )
}