import * as fs from 'fs';
import { TOPICS, Topic } from '../src/data/topics';

const categoryOrder = [
  "Java Core",
  "Multithreading & Concurrency",
  "Object-Oriented Design & Patterns",
  "Low-Level Design",
  "Spring Boot",
  "System Design",
  "Performance & Scalability"
];

const topicRelevancyOrder: { [key: string]: string[] } = {
  "Java Core": [
    "java-collections",
    "java-generics",
    "java-optional",
    "lambda-expressions",
    "functional-interfaces",
    "java-streams-api",
    "java-stream-api-deep-dive",
    "streams-grouping",
    "parallel-streams",
    "java-modern-features",
    "java-21-record-patterns",
    "java-21-sequenced-collections",
    "java-21-scoped-values",
    "java-structured-concurrency",
    "java-functional-internals",
    "jvm-architecture",
    "java-classloaders",
    "java-memory-management-gc-roots",
    "java-memory-model",
    "java-memory-model-deep-dive",
    "java-reference-types",
    "java-reflection-annotations",
    "java-nio-selector",
    "java-unsafe-api",
    "java-foreign-function-memory-api"
  ],
  "Object-Oriented Design & Patterns": [
    "solid-principles",
    "singleton",
    "factory-pattern",
    "builder-pattern",
    "observer-pattern",
    "strategy-pattern",
    "decorator-pattern"
  ],
  "Low-Level Design": [
    "parking-lot",
    "vending-machine",
    "snake-and-ladder",
    "splitwise",
    "lru-cache",
    "rate-limiter",
    "notification-system",
    "logging-framework",
    "file-system"
  ],
  "Multithreading & Concurrency": [
    "thread-pool",
    "blocking-queue",
    "completable-future",
    "deadlock-prevention",
    "java-virtual-threads",
    "java-virtual-threads-internals",
    "advanced-concurrency-interview"
  ],
  "Spring Boot": [
    "spring-di-ioc",
    "bean-lifecycle",
    "spring-annotations",
    "spring-profiles-config",
    "spring-exception-handling",
    "spring-data-jpa",
    "spring-data-jpa-performance",
    "spring-data-redis-pubsub",
    "spring-aop",
    "spring-aop-deep-dive",
    "springboot-conditional-annotations",
    "springboot-custom-starter",
    "springboot-event-listeners",
    "spring-security",
    "spring-security-jwt-impl",
    "spring-security-oauth2-oidc",
    "spring-webflux",
    "springboot-rsocket",
    "spring-actuator",
    "springboot-observability",
    "distributed-tracing-micrometer",
    "springboot-batch",
    "springboot-native-graalvm",
    "springboot-declarative-http-client",
    "spring-testing",
    "service-discovery-eureka",
    "spring-cloud-config",
    "spring-cloud-gateway",
    "spring-cloud-stream",
    "circuit-breaker"
  ],
  "System Design": [
    "monolith-vs-microservices",
    "microservices-patterns",
    "api-design-rest-graphql-grpc",
    "api-versioning-strategies",
    "api-gateway",
    "load-balancing-strategies",
    "dns-system-design",
    "cdn-edge-computing",
    "caching-strategies",
    "distributed-caching-redis-cluster",
    "database-indexing",
    "database-replication",
    "database-sharding",
    "database-isolation-levels",
    "lsm-trees-vs-btrees",
    "consistency-models",
    "pacelc-theorem",
    "consistent-hashing",
    "bloom-filter",
    "distributed-id-generation",
    "snowflake-id",
    "distributed-lock",
    "leader-election-consensus",
    "gossip-protocol",
    "asynchronous-messaging",
    "distributed-transactions-2pc-saga",
    "event-sourcing-cqrs",
    "rate-limiting-algorithms",
    "api-security-owasp",
    "service-mesh-sidecar",
    "microservices-deployment-strategies",
    "url-shortener",
    "chat-system",
    "search-engine-inverted-index",
    "quadtrees-system-design",
    "system-design-nearby-friends-geospatial",
    "vector-databases-ai",
    "system-design-ad-click-aggregator"
  ],
  "Performance & Scalability": [
    "java-performance-tuning",
    "docker-kubernetes-basics"
  ]
};

const categoryOverrides: { [key: string]: string } = {
  "java-performance-tuning": "Performance & Scalability",
  "database-indexing": "System Design",
  "docker-kubernetes-basics": "Performance & Scalability"
};

function reorganize() {
  console.log("Starting reorganization based on learning path relevancy...");

  // 1. Normalize categories and remove duplicates
  const uniqueTopicsMap = new Map<string, Topic>();
  TOPICS.forEach(topic => {
    let normalizedCategory = topic.category;
    if (normalizedCategory === "JAVA") normalizedCategory = "Java Core";
    if (normalizedCategory === "Springboot") normalizedCategory = "Spring Boot";
    
    // Apply overrides
    if (categoryOverrides[topic.id]) {
      normalizedCategory = categoryOverrides[topic.id];
    }
    
    uniqueTopicsMap.set(topic.id, { ...topic, category: normalizedCategory });
  });

  const topicsArray = Array.from(uniqueTopicsMap.values());

  // 2. Sort topics
  topicsArray.sort((a, b) => {
    const catIndexA = categoryOrder.indexOf(a.category);
    const catIndexB = categoryOrder.indexOf(b.category);

    if (catIndexA !== catIndexB) {
      return catIndexA - catIndexB;
    }

    // Secondary sort: by relevancy order within category
    const relevancyList = topicRelevancyOrder[a.category] || [];
    const relIndexA = relevancyList.indexOf(a.id);
    const relIndexB = relevancyList.indexOf(b.id);

    if (relIndexA !== -1 && relIndexB !== -1) {
      return relIndexA - relIndexB;
    }
    
    if (relIndexA !== -1) return -1;
    if (relIndexB !== -1) return 1;

    // Fallback to alphabetical if not in relevancy list
    return a.title.localeCompare(b.title);
  });

  // 3. Generate the file content
  let content = `export interface Topic {
  id: string;
  category: string;
  title: string;
  description: string;
  javaCode: string;
  concepts: string[];
  tradeoffs: string[];
  interviewTips: string[];
  deepDive: string;
  steps: { title: string; description: string }[];
}

export const TOPICS: Topic[] = [
`;

  topicsArray.forEach((topic, index) => {
    const stringifyWithTemplate = (obj: any) => {
      const parts = [];
      parts.push(`    id: ${JSON.stringify(obj.id)},`);
      parts.push(`    category: ${JSON.stringify(obj.category)},`);
      parts.push(`    title: ${JSON.stringify(obj.title)},`);
      parts.push(`    description: ${JSON.stringify(obj.description)},`);
      parts.push(`    javaCode: \`${obj.javaCode.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,`);
      parts.push(`    concepts: ${JSON.stringify(obj.concepts, null, 6)},`);
      parts.push(`    tradeoffs: ${JSON.stringify(obj.tradeoffs, null, 6)},`);
      parts.push(`    interviewTips: ${JSON.stringify(obj.interviewTips, null, 6)},`);
      parts.push(`    deepDive: \`${obj.deepDive.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,`);
      parts.push(`    steps: ${JSON.stringify(obj.steps, null, 6)}`);
      return `  {\n${parts.join("\n")}\n  }`;
    };

    content += `${stringifyWithTemplate(topic)}${index === topicsArray.length - 1 ? "" : ","}\n`;
  });

  content += "];\n";

  fs.writeFileSync('./src/data/topics.ts', content);
  console.log("Reorganization complete!");
}

reorganize();
