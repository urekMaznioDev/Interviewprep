export interface Topic {
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
  {
    id: "java-collections",
    category: "Java Core",
    title: "Java Collections Framework",
    description: "Deep dive into List, Set, Map implementations and their internal workings.",
    javaCode: `
import java.util.*;
import java.util.concurrent.*;

/**
 * Deep Dive into Java Collections
 */
public class CollectionsDeepDive {
    public static void main(String[] args) {
        // 1. HashMap: O(1) average, O(log n) worst case (Treeification)
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 90);
        scores.put("Bob", 85);

        // 2. ConcurrentHashMap: Thread-safe without global lock
        Map<String, String> concurrentMap = new ConcurrentHashMap<>();
        concurrentMap.put("Key", "Value");

        // 3. CopyOnWriteArrayList: Thread-safe for read-heavy scenarios
        List<String> cowList = new CopyOnWriteArrayList<>();
        cowList.add("Initial");

        // 4. PriorityQueue: Heap-based priority management
        Queue<Integer> pq = new PriorityQueue<>((a, b) -> b - a); // Max-heap
        pq.offer(10);
        pq.offer(30);
        pq.offer(20);
        System.out.println("PQ Poll: " + pq.poll()); // 30

        // 5. LinkedHashMap: Preserves insertion order
        Map<String, String> lhm = new LinkedHashMap<>(16, 0.75f, true); // Access order
        lhm.put("A", "1");
        lhm.put("B", "2");
        lhm.get("A"); // Moves A to end
        System.out.println("LinkedHashMap: " + lhm.keySet());
    }
}
`,
    concepts: [
      "Fail-Fast vs Fail-Safe Iterators.",
      "HashMap Internals: Buckets, Load Factor, Rehashing, Treeification.",
      "Concurrent Collections: CopyOnWriteArrayList, ConcurrentHashMap.",
      "Sorting: Comparable vs Comparator."
],
    tradeoffs: [
      "ArrayList: O(1) access, O(n) insertion (middle).",
      "LinkedList: O(n) access, O(1) insertion (ends). High memory overhead.",
      "HashMap: O(1) average time, O(n) worst case (or O(log n) with treeification)."
],
    interviewTips: [
      "How does HashMap handle collisions? (Chaining -> Treeification).",
      "Difference between HashMap and Hashtable.",
      "Why is String a good key for HashMap? (Immutable, cached hashCode).",
      "When to use TreeMap vs HashMap?"
],
    deepDive: `
## Java Collections Deep Dive

### 1. HashMap Internals (Java 8+)
*   **Buckets**: An array of Nodes.
*   **Collision Handling**: Uses a linked list. If a bucket exceeds 8 elements and total capacity > 64, it converts to a **Red-Black Tree** (Treeification) for O(log n) performance.
*   **Rehashing**: When size exceeds \`capacity * loadFactor\` (default 0.75), the table size doubles.

### 2. ConcurrentHashMap
*   **Java 7**: Used Segments (ReentrantLock on parts of the map).
*   **Java 8+**: Uses CAS for new nodes and \`synchronized\` only on the first node of a bucket. Much higher concurrency.

### 3. List Implementations
*   **ArrayList**: Dynamic array. Resizes by 50% when full.
*   **CopyOnWriteArrayList**: Thread-safe. Creates a new copy on every write. Great for read-heavy scenarios.
`,
    steps: [
      {
            "title": "Choose Interface",
            "description": "Decide between List, Set, or Map based on data uniqueness and order."
      },
      {
            "title": "Select Implementation",
            "description": "Consider performance requirements (e.g., HashMap vs TreeMap)."
      },
      {
            "title": "Handle Concurrency",
            "description": "Use java.util.concurrent if accessed by multiple threads."
      },
      {
            "title": "Optimize Capacity",
            "description": "Provide initial capacity if the size is known to avoid rehashing."
      }
]
  },
  {
    id: "java-generics",
    category: "Java Core",
    title: "Java Generics",
    description: "Allows types (classes and interfaces) to be parameters when defining classes, interfaces, and methods.",
    javaCode: `
import java.util.*;

/**
 * JAVA GENERICS: Type safety and reusability.
 */
class Box<T> {
    private T content;
    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

class Pair<K, V> {
    private K key;
    private V value;
    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey() { return key; }
    public V getValue() { return value; }
}

class GenericUtils {
    // 1. Bounded Type Parameter (Upper Bound)
    public static <T extends Comparable<T>> T findMax(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }

    // 2. Wildcards: PECS (Producer Extends, Consumer Super)
    // Producer: Read-only access
    public static double sumOfList(List<? extends Number> list) {
        double s = 0.0;
        for (Number n : list) s += n.doubleValue();
        return s;
    }

    // Consumer: Write-only access
    public static void addNumbers(List<? super Integer> list) {
        for (int i = 1; i <= 5; i++) list.add(i);
    }
}

public class GenericsDemo {
    public static void main(String[] args) {
        // Generic Class
        Box<String> stringBox = new Box<>();
        stringBox.set("Hello Generics");
        System.out.println("Box content: " + stringBox.get());

        // Generic Method with Bounds
        System.out.println("Max of 10, 20: " + GenericUtils.findMax(10, 20));
        System.out.println("Max of 'A', 'B': " + GenericUtils.findMax("A", "B"));

        // Wildcards
        List<Integer> ints = Arrays.asList(1, 2, 3);
        System.out.println("Sum of ints: " + GenericUtils.sumOfList(ints));

        List<Number> nums = new ArrayList<>();
        GenericUtils.addNumbers(nums);
        System.out.println("Numbers added: " + nums);
    }
}
`,
    concepts: [
      "Type Safety: Catches type errors at compile time rather than runtime.",
      "Code Reusability: Write a single class or method that works with different types.",
      "Type Erasure: The compiler removes generic type information after compilation for backward compatibility."
],
    tradeoffs: [
      "Complexity: Wildcards (? extends T, ? super T) can be difficult to understand.",
      "Runtime Limitations: Cannot use primitive types (int, double) or create instances of type parameters (new T())."
],
    interviewTips: [
      "Explain the PECS principle (Producer Extends, Consumer Super).",
      "Discuss why you cannot create an array of a generic type."
],
    deepDive: `
## Java Generics Design Guide

### 1. Problem Statement
Enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods, providing compile-time type safety and removing the need for explicit casting.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Define Generic Class: Box<T>] --> B[Compile Time]
    B --> C{Type Check}
    C -- Success --> D[Type Erasure]
    C -- Failure --> E[Compile Error]
    D --> F[Bytecode with Object/Bounds]
    F --> G[Runtime]
\`\`\`

### 3. Requirements
*   **Type Safety**: Catch type errors at compile time.
*   **Reusability**: Write code that works with different types.
*   **Eliminate Casts**: Avoid manual casting from \`Object\`.

### 4. Sequence Diagram (Wildcards)
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant G as GenericMethod
    
    C->>G: process(List<? extends Number>)
    Note over G: Can read as Number
    G-->>C: Success
    
    C->>G: add(List<? super Integer>)
    Note over G: Can add Integer
    G-->>C: Success
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Declaration**: A generic type parameter \`T\` is declared in the class or method signature.
2.  **Usage**: \`T\` is used as a placeholder for the actual type.
3.  **Compilation**: The Java compiler checks that all usages of \`T\` are consistent with the provided type argument.
4.  **Type Erasure**: To maintain backward compatibility, the compiler replaces all type parameters with their bounds (usually \`Object\`) in the generated bytecode.
5.  **Bridge Methods**: The compiler may generate bridge methods to preserve polymorphism in generic types.
6.  **Runtime**: At runtime, the JVM has no knowledge of the generic type parameters (except for some metadata).

### 6. Core Concepts

Generics were introduced in Java 5 to provide stronger type checks at compile time and to support generic programming.

*   **Type Parameters**: Placeholders for types (e.g., \`<T>\`, \`<K, V>\`).
*   **Bounded Wildcards**:
    *   \`<? extends T>\`: Upper bound. Can read as \`T\`, but cannot write (except null).
    *   \`<? super T>\`: Lower bound. Can write \`T\`, but can only read as \`Object\`.
*   **Type Erasure**: The process where the compiler removes all generic type information during compilation.
`,
    steps: [
      {
            "title": "Define Parameter",
            "description": "Use angle brackets <T> to define a type parameter."
      },
      {
            "title": "Use Parameter",
            "description": "Use the type parameter for fields, method parameters, or return types."
      },
      {
            "title": "Instantiate",
            "description": "Specify the concrete type when creating an instance of the generic class."
      },
      {
            "title": "Wildcards",
            "description": "Use wildcards to increase the flexibility of generic methods and collections."
      }
]
  },
  {
    id: "java-optional",
    category: "Java Core",
    title: "Java Optional",
    description: "A container object which may or may not contain a non-null value, used to avoid NullPointerExceptions.",
    javaCode: `
import java.util.Optional;

/**
 * JAVA OPTIONAL: Avoiding NullPointerExceptions.
 */
public class OptionalDemo {
    public static void main(String[] args) {
        // 1. Creation
        Optional<String> name = Optional.of("John Doe");
        Optional<String> empty = Optional.empty();

        // 2. ifPresent / ifPresentOrElse
        name.ifPresent(n -> System.out.println("Name exists: " + n));
        
        // 3. orElse vs orElseGet
        // orElse: Always evaluates the default value
        // orElseGet: Evaluates default value only if Optional is empty (Lazy)
        String result = empty.orElse(getDefault());
        String resultLazy = empty.orElseGet(() -> getDefault());

        // 4. Chaining (Filter, Map, FlatMap)
        String processed = name
            .filter(n -> n.length() > 5)
            .map(String::toUpperCase)
            .orElse("DEFAULT");
        System.out.println("Processed: " + processed);

        // 5. orElseThrow
        try {
            empty.orElseThrow(() -> new RuntimeException("Value not found!"));
        } catch (Exception e) {
            System.out.println("Caught expected error: " + e.getMessage());
        }
    }

    private static String getDefault() {
        System.out.println("Computing default...");
        return "Default Value";
    }
}
`,
    concepts: [
      "Null Safety: Explicitly handling the absence of a value.",
      "Fluent API: Chaining operations like map, filter, and flatMap.",
      "Avoid NPEs: Reducing the need for explicit null checks."
],
    tradeoffs: [
      "Pros: Cleaner code, better API design (indicates that a value might be missing).",
      "Cons: Slight performance overhead due to object wrapping. Should not be used for class fields or method parameters (best for return types)."
],
    interviewTips: [
      "What is the difference between orElse() and orElseGet()? (orElseGet is lazy).",
      "Why should you avoid using Optional as a parameter?",
      "How to use flatMap with Optional?"
],
    deepDive: `
## Java Optional Design Guide

### 1. Best Practices
*   **Return Type Only**: Use \`Optional\` primarily as a return type for methods that might not return a value.
*   **Avoid Fields**: Do not use \`Optional\` for class fields as it is not serializable and adds memory overhead.
*   **Don't wrap Collections**: Return an empty collection instead of an \`Optional<List>\`.
*   **Lazy Defaults**: Use \`orElseGet()\` if the default value is expensive to compute.

### 2. Common Methods
*   \`of(value)\`: Creates an Optional with a non-null value. Throws NPE if value is null.
*   \`ofNullable(value)\`: Creates an Optional that can be empty.
*   \`isPresent()\` / \`isEmpty()\`: Checks if a value exists.
*   \`ifPresent(Consumer)\`: Executes logic if value exists.
*   \`map(Function)\`: Transforms the value if it exists.
*   \`flatMap(Function)\`: Similar to map but for functions that return an Optional.
`,
    steps: [
      {
            "title": "Wrap Value",
            "description": "Use Optional.ofNullable() to wrap a potentially null value."
      },
      {
            "title": "Handle Absence",
            "description": "Use orElse() or orElseGet() to provide a fallback."
      },
      {
            "title": "Transform Data",
            "description": "Use map() or filter() to process the value if present."
      },
      {
            "title": "Avoid get()",
            "description": "Prefer functional methods over calling get() directly to avoid NoSuchElementException."
      }
]
  },
  {
    id: "lambda-expressions",
    category: "Java Core",
    title: "Lambda Expressions",
    description: "A short block of code which takes in parameters and returns a value, enabling functional programming.",
    javaCode: `
import java.util.*;
import java.util.function.*;

/**
 * LAMBDA EXPRESSIONS: Functional programming in Java.
 */
public class LambdaDemo {
    public static void main(String[] args) {
        List<String> languages = Arrays.asList("Java", "Python", "C++", "JavaScript");

        // 1. Comparator Lambda
        languages.sort((s1, s2) -> s1.length() - s2.length());
        System.out.println("Sorted by length: " + languages);

        // 2. Consumer Lambda (forEach)
        languages.forEach(lang -> System.out.println("Processing: " + lang));

        // 3. Predicate Lambda (Filtering)
        languages.removeIf(lang -> lang.startsWith("C"));
        System.out.println("After removal: " + languages);

        // 4. Custom Functional Interface
        MathOperation addition = (a, b) -> a + b;
        MathOperation multiplication = (a, b) -> a * b;
        
        System.out.println("10 + 5 = " + operate(10, 5, addition));
        System.out.println("10 * 5 = " + operate(10, 5, multiplication));

        // 5. Method References
        languages.forEach(System.out::println);
    }

    private static int operate(int a, int b, MathOperation op) {
        return op.execute(a, b);
    }

    @FunctionalInterface
    interface MathOperation {
        int execute(int a, int b);
    }
}
`,
    concepts: [
      "Functional Interface: An interface with exactly one abstract method (e.g., Runnable, Comparator).",
      "Syntax: (parameters) -> expression or { statements }.",
      "Closure: Accessing variables from the enclosing scope (must be effectively final).",
      "Method References: Shorthand for lambdas that call an existing method (e.g., System.out::println)."
],
    tradeoffs: [
      "Conciseness vs. Debugging: Makes code shorter but stack traces can be harder to read.",
      "Performance: Minimal overhead compared to anonymous inner classes."
],
    interviewTips: [
      "Explain the difference between a lambda and an anonymous inner class.",
      "Discuss the @FunctionalInterface annotation."
],
    deepDive: `
## Lambda Expressions Design Guide

### 1. Problem Statement
Enable functional programming in Java by allowing functionality to be treated as a method argument, reducing boilerplate code and improving readability.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Functional Interface] --> B[Lambda Expression]
    B --> C{Compiler Check}
    C -- Match --> D[Target Typing]
    C -- Mismatch --> E[Compile Error]
    D --> F[Invoke Dynamic]
    F --> G[Runtime Execution]
\`\`\`

### 3. Requirements
*   **Conciseness**: Reduce the verbosity of anonymous inner classes.
*   **Readability**: Focus on the logic rather than the structure.
*   **Functional Interfaces**: A lambda can only be used where a functional interface is expected.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant L as Lambda
    participant FI as Functional Interface
    
    C->>L: (a, b) -> a + b
    Note over L: Compiler infers types
    C->>FI: execute(10, 20)
    FI->>L: run logic
    L-->>FI: 30
    FI-->>C: 30
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Target Typing**: The compiler determines the type of the lambda based on the context (e.g., the parameter type of a method).
2.  **Type Inference**: In most cases, you don't need to specify the types of the parameters; the compiler infers them from the functional interface's method signature.
3.  **Bytecode Generation**: Unlike anonymous inner classes (which generate a new \`.class\` file), lambdas use the \`invokedynamic\` instruction introduced in Java 7. This is more efficient as it avoids class loading overhead.
4.  **Capture of Variables**: Lambdas can access variables from their enclosing scope. These variables must be **final** or **effectively final** (not modified after initialization).
5.  **Execution**: The lambda body is executed only when the functional interface's method is called.

### 6. Functional Interfaces
A functional interface is an interface with exactly one abstract method. Examples include:
*   \`Runnable\`: \`void run()\`
*   \`Comparator\`: \`int compare(T o1, T o2)\`
*   \`Predicate\`: \`boolean test(T t)\`
*   \`Function\`: \`R apply(T t)\`
*   \`Consumer\`: \`void accept(T t)\`

### 7. Method References
Method references are a shorthand for lambdas that simply call an existing method.
*   \`System.out::println\` is equivalent to \`x -> System.out.println(x)\`.
*   \`String::toUpperCase\` is equivalent to \`s -> s.toUpperCase()\`.

### 8. Benefits
*   **Improved Readability**: Code is much more concise and expressive.
*   **Parallelism**: Lambdas make it easier to use the Streams API for parallel processing.
*   **Behavior Parameterization**: You can pass logic as an argument to methods.
`,
    steps: [
      {
            "title": "Target Type",
            "description": "Identify the functional interface the lambda will implement."
      },
      {
            "title": "Parameters",
            "description": "Define the input parameters (types are often inferred)."
      },
      {
            "title": "Body",
            "description": "Write the logic as a single expression or a block of code."
      },
      {
            "title": "Execution",
            "description": "The lambda is executed when the functional interface's method is called."
      }
]
  },
  {
    id: "functional-interfaces",
    category: "Java Core",
    title: "Functional Interfaces",
    description: "Interfaces with exactly one abstract method, used as the basis for lambda expressions.",
    javaCode: `
import java.util.function.*;
import java.util.*;

/**
 * FUNCTIONAL INTERFACES: The foundation of Lambdas.
 */
public class FunctionalDemo {
    public static void main(String[] args) {
        // 1. Predicate (Boolean-valued function)
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("Is 10 even? " + isEven.test(10));

        // 2. Function (Transform T to R)
        Function<String, Integer> stringLength = String::length;
        System.out.println("Length of 'Hello': " + stringLength.apply("Hello"));

        // 3. Consumer (Accepts T, returns void)
        Consumer<String> printer = s -> System.out.println("Printing: " + s);
        printer.accept("Functional Interfaces");

        // 4. Supplier (Returns T, takes nothing)
        Supplier<Double> randomValue = Math::random;
        System.out.println("Random: " + randomValue.get());

        // 5. BiFunction (Two arguments)
        BiFunction<Integer, Integer, String> sumString = (a, b) -> "Sum is: " + (a + b);
        System.out.println(sumString.apply(5, 7));

        // 6. UnaryOperator (T -> T)
        UnaryOperator<String> shout = s -> s.toUpperCase() + "!!!";
        System.out.println(shout.apply("hello"));

        // 7. BinaryOperator (T, T -> T)
        BinaryOperator<Integer> max = Integer::max;
        System.out.println("Max of 10, 20: " + max.apply(10, 20));
    }
}
`,
    concepts: [
      "Standard Interfaces: Predicate, Function, Consumer, Supplier.",
      "Bi-Interfaces: BiFunction, BiConsumer for two arguments.",
      "Primitive Specializations: IntPredicate, DoubleFunction to avoid boxing.",
      "Custom Interfaces: Using @FunctionalInterface to define your own."
],
    tradeoffs: [
      "Reusability vs. Specificity: Standard interfaces are reusable but might not have descriptive method names.",
      "Boxing: Using generic interfaces with primitives can lead to performance overhead."
],
    interviewTips: [
      "Explain the purpose of the @FunctionalInterface annotation.",
      "Discuss the difference between a Consumer and a Supplier."
],
    deepDive: `
## Functional Interfaces Design Guide

### 1. Problem Statement
Provide a way to represent a single unit of functionality as a type, enabling functional programming patterns like lambda expressions and method references.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Interface with 1 Abstract Method] --> B[@FunctionalInterface Annotation]
    B --> C[Lambda Expression Implementation]
    C --> D[Target Type Matching]
    D --> E[Method Invocation]
\`\`\`

### 3. Requirements
*   **Single Abstract Method (SAM)**: The interface must have exactly one abstract method.
*   **Default/Static Methods**: Can have any number of default or static methods.
*   **Object Class Methods**: Can override methods from the \`Object\` class (like \`equals\`) without counting against the SAM limit.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant FI as Functional Interface
    participant L as Lambda Body
    
    C->>FI: apply(input)
    FI->>L: execute logic
    L-->>FI: result
    FI-->>C: result
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Definition**: An interface is defined with a single abstract method. The \`@FunctionalInterface\` annotation is optional but recommended as it tells the compiler to enforce the SAM rule.
2.  **Implementation**: Instead of creating a concrete class or an anonymous inner class, a lambda expression is used to provide the implementation for the single abstract method.
3.  **Type Matching**: When the lambda is passed to a method, the compiler matches the lambda's signature with the functional interface's abstract method.
4.  **Invocation**: The code inside the lambda is executed only when the abstract method of the interface is called on the instance.

### 6. Standard Functional Interfaces (java.util.function)
Java provides a set of built-in functional interfaces for common tasks:
*   **Predicate<T>**: Takes a \`T\` and returns a \`boolean\`. Used for filtering.
*   **Function<T, R>**: Takes a \`T\` and returns an \`R\`. Used for transformation.
*   **Consumer<T>**: Takes a \`T\` and returns \`void\`. Used for side effects.
*   **Supplier<T>**: Takes nothing and returns a \`T\`. Used for lazy generation.
*   **UnaryOperator<T>**: A \`Function\` where input and output types are the same.
*   **BinaryOperator<T>**: Takes two \`T\`s and returns a \`T\`.

### 7. Primitive Specializations
To avoid the performance overhead of auto-boxing (e.g., converting \`int\` to \`Integer\`), Java provides primitive versions like \`IntPredicate\`, \`LongFunction\`, \`DoubleConsumer\`, etc.

### 8. Benefits
*   **Clean Code**: Removes the need for verbose anonymous classes.
*   **API Design**: Allows developers to write APIs that accept behavior as parameters.
*   **Parallelism**: Essential for the Streams API to work efficiently.
`,
    steps: [
      {
            "title": "Identify Need",
            "description": "Determine the input and output types for your functional logic."
      },
      {
            "title": "Choose Interface",
            "description": "Select a standard interface or define a custom one."
      },
      {
            "title": "Implement",
            "description": "Provide the implementation using a lambda or method reference."
      },
      {
            "title": "Invoke",
            "description": "Call the single abstract method to execute the logic."
      }
]
  },
  {
    id: "java-streams-api",
    category: "Java Core",
    title: "Java Streams API",
    description: "Functional-style operations on streams of elements, such as map-reduce transformations.",
    javaCode: `
import java.util.*;
import java.util.stream.*;

/**
 * JAVA STREAMS API: Functional data processing.
 */
public class StreamDemo {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("John", "IT", 5000),
            new Employee("Jane", "HR", 6000),
            new Employee("Bob", "IT", 4000),
            new Employee("Alice", "HR", 7000),
            new Employee("Charlie", "IT", 5500)
        );

        // 1. Filtering and Mapping
        List<String> itNames = employees.stream()
            .filter(e -> "IT".equals(e.getDept()))
            .map(Employee::getName)
            .collect(Collectors.toList());
        System.out.println("IT Employees: " + itNames);

        // 2. Grouping By
        Map<String, List<Employee>> employeesByDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDept));
        System.out.println("By Dept: " + employeesByDept.keySet());

        // 3. Calculating Averages
        Map<String, Double> avgSalaryByDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDept, 
                Collectors.averagingDouble(Employee::getSalary)));
        System.out.println("Avg Salary by Dept: " + avgSalaryByDept);

        // 4. Reducing (Total Salary)
        double totalSalary = employees.stream()
            .map(Employee::getSalary)
            .reduce(0.0, Double::sum);
        System.out.println("Total Salary: \$" + totalSalary);

        // 5. FlatMap (Flattening nested lists)
        List<List<String>> skills = Arrays.asList(
            Arrays.asList("Java", "Spring"),
            Arrays.asList("SQL", "Docker")
        );
        List<String> allSkills = skills.stream()
            .flatMap(Collection::stream)
            .distinct()
            .collect(Collectors.toList());
        System.out.println("All Skills: " + allSkills);
    }
}

class Employee {
    private String name, dept;
    private double salary;
    public Employee(String name, String dept, double salary) {
        this.name = name; this.dept = dept; this.salary = salary;
    }
    public String getName() { return name; }
    public String getDept() { return dept; }
    public double getSalary() { return salary; }
}
`,
    concepts: [
      "Pipelining: Chaining intermediate operations (filter, map, sorted).",
      "Internal Iteration: Stream handles iteration, allowing for optimization (parallelism).",
      "Lazy Evaluation: Intermediate operations are not executed until a terminal operation is called.",
      "Immutability: Streams do not modify the source; they produce a new result."
],
    tradeoffs: [
      "Pros: Concise, readable code. Easy parallelism. Encourages functional programming.",
      "Cons: Performance overhead for simple loops. Debugging can be harder (stack traces)."
],
    interviewTips: [
      "Difference between map() and flatMap().",
      "What is a terminal operation? (collect, forEach, reduce).",
      "How does lazy evaluation work in Streams?",
      "When to use parallelStream()? (Large datasets, CPU-intensive tasks)."
],
    deepDive: `
## Java Streams API Deep Dive

### 1. Stream Pipeline
A stream pipeline consists of:
1.  **Source**: (e.g., a Collection, an array, a generator function).
2.  **Intermediate Operations**: (e.g., \`filter\`, \`map\`, \`distinct\`). These return a new stream and are lazy.
3.  **Terminal Operation**: (e.g., \`collect\`, \`count\`, \`reduce\`). This triggers the processing and produces a result or side-effect.

### 2. map() vs flatMap()
*   **map()**: Transforms each element into exactly one other element. Result: \`Stream<T>\`.
*   **flatMap()**: Transforms each element into zero or more elements (a stream) and flattens them. Result: \`Stream<R>\`. Use it for nested collections.

### 3. Parallel Streams
Parallel streams use the \`ForkJoinPool.commonPool()\` by default. They are beneficial for large datasets where the operations are independent and computationally expensive.
`,
    steps: [
      {
            "title": "Create Stream",
            "description": "Obtain a stream from a collection or array."
      },
      {
            "title": "Apply Filters",
            "description": "Use filter() to remove unwanted elements."
      },
      {
            "title": "Transform Data",
            "description": "Use map() or flatMap() to change the data type or value."
      },
      {
            "title": "Collect Result",
            "description": "Use a terminal operation like collect() to get the final output."
      }
]
  },
  {
    id: "java-stream-api-deep-dive",
    category: "Java Core",
    title: "Java Stream API (Deep Dive)",
    description: "Understanding the functional pipeline, lazy evaluation, and parallel processing in Java Streams.",
    javaCode: `
import java.util.*;
import java.util.stream.*;

/**
 * JAVA STREAMS: Pipeline, Lazy Evaluation, and Short-circuiting.
 */
public class StreamDeepDive {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Edward");

        System.out.println("--- Starting Stream Pipeline ---");
        
        // 1. Lazy Evaluation Demo
        Stream<String> stream = names.stream()
            .filter(name -> {
                System.out.println("Filtering: " + name);
                return name.length() > 3;
            })
            .map(name -> {
                System.out.println("Mapping: " + name);
                return name.toUpperCase();
            })
            .limit(2); // 2. Short-circuiting

        System.out.println("Stream defined, but not executed yet.");
        
        // 3. Terminal Operation triggers execution
        List<String> result = stream.collect(Collectors.toList());
        
        System.out.println("Final Result: " + result);

        // 4. Parallel Stream
        long count = IntStream.rangeClosed(1, 1_000_000)
            .parallel()
            .filter(n -> n % 2 == 0)
            .count();
        System.out.println("Parallel Count: " + count);
    }
}
`,
    concepts: [
      "Pipeline: Source -> Intermediate Operations -> Terminal Operation.",
      "Lazy Evaluation: Intermediate operations are not executed until a terminal operation is called.",
      "Short-circuiting: Operations like limit() or findFirst() that don't need to process the whole stream.",
      "Immutability: Streams do not modify the source; they produce a new result.",
      "Parallelism: Using ForkJoinPool to process data across multiple CPU cores."
],
    tradeoffs: [
      "Pros: Concise code, easy parallelism, functional style reduces side effects.",
      "Cons: Performance overhead for small collections, harder to debug (stack traces), potential for stateful lambda issues."
],
    interviewTips: [
      "Difference between Intermediate and Terminal operations.",
      "What is a 'Stateful' intermediate operation? (e.g., sorted(), distinct()).",
      "When should you NOT use parallel streams? (Small datasets, blocking I/O, stateful operations).",
      "How does flatMap() differ from map()?"
],
    deepDive: `
## Java Stream API Deep Dive

### 1. The Pipeline Architecture
A stream is not a data structure. It's a view of a data source. The pipeline consists of:
*   **Source**: Collection, Array, I/O channel.
*   **Intermediate Operations**: Transform the stream into another stream (filter, map, flatMap, sorted).
*   **Terminal Operation**: Produces a result or a side-effect (collect, forEach, reduce, count).

### 2. Lazy Evaluation & Optimization
Java optimizes the pipeline. It doesn't perform all filters, then all maps. Instead, it processes each element through the entire pipeline one by one. If it hits a short-circuiting operation like \`limit(2)\`, it stops immediately, even if the source has millions of items.

### 3. Parallel Streams & ForkJoinPool
Parallel streams use the common \`ForkJoinPool\`. They split the source into chunks (using \`Spliterator\`), process them in parallel, and merge the results. **Warning**: Sharing the common pool with blocking I/O can starve other parts of your application.
`,
    steps: [
      {
            "title": "Create Stream",
            "description": "Use .stream() or .parallelStream() on a collection."
      },
      {
            "title": "Apply Filters/Maps",
            "description": "Chain intermediate operations to define the transformation logic."
      },
      {
            "title": "Terminal Operation",
            "description": "Call a terminal operation like .collect() or .reduce() to execute the pipeline."
      },
      {
            "title": "Optimize",
            "description": "Use primitive streams (IntStream, LongStream) to avoid boxing overhead."
      }
]
  },
  {
    id: "streams-grouping",
    category: "Java Core",
    title: "Grouping & Partitioning",
    description: "Using Java Streams to group collections of objects by their properties.",
    javaCode: `
import java.util.*;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String department;
    private double salary;

    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }

    @Override
    public String toString() {
        return String.format("Employee{name='%s', dept='%s', salary=%.2f}", name, department, salary);
    }
}

public class StreamGroupingDemo {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Alice", "IT", 75000),
            new Employee("Bob", "HR", 50000),
            new Employee("Charlie", "IT", 85000),
            new Employee("David", "Finance", 90000),
            new Employee("Eve", "HR", 55000)
        );

        // 1. Group by Department
        Map<String, List<Employee>> byDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDepartment));
        System.out.println("By Department: " + byDept);

        // 2. Count by Department
        Map<String, Long> countByDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDepartment, Collectors.counting()));
        System.out.println("Count by Dept: " + countByDept);

        // 3. Average Salary by Department
        Map<String, Double> avgSalaryByDept = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment, 
                Collectors.averagingDouble(Employee::getSalary)
            ));
        System.out.println("Avg Salary by Dept: " + avgSalaryByDept);

        // 4. Partitioning (High vs Low Salary > 70k)
        Map<Boolean, List<Employee>> highSalary = employees.stream()
            .collect(Collectors.partitioningBy(e -> e.getSalary() > 70000));
        System.out.println("High Salary (>70k): " + highSalary.get(true));
        
        // 5. Multi-level Grouping (Dept -> Salary Range)
        Map<String, Map<String, List<Employee>>> multiLevel = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDepartment,
                Collectors.groupingBy(e -> e.getSalary() > 70000 ? "High" : "Low")));
        System.out.println("Multi-level: " + multiLevel);
    }
}
`,
    concepts: [
      "Collectors.groupingBy",
      "Collectors.partitioningBy",
      "Downstream Collectors",
      "Method References"
],
    tradeoffs: [
      "Pros: Declarative, readable, easy to parallelize.",
      "Cons: Can be harder to debug, slight overhead for small collections."
],
    interviewTips: [
      "Explain the difference between groupingBy and partitioningBy.",
      "Discuss how to handle null keys in groupingBy.",
      "Mention how to use a custom Map implementation (e.g., TreeMap) in groupingBy."
],
    deepDive: `
## Java Streams Grouping & Partitioning Guide

### 1. Problem Statement
Efficiently categorize and aggregate data from collections using functional programming principles.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Collection] --> B[Stream]
    B --> C{Terminal Operation: collect}
    C --> D[groupingBy]
    C --> E[partitioningBy]
    D --> F[Map<Key, List<T>>]
    E --> G[Map<Boolean, List<T>>]
    F --> H[Optional Downstream Collector]
    H --> I[Map<Key, AggregatedValue>]
\`\`\`

### 3. Requirements
*   **Declarative**: Focus on "what" to do, not "how".
*   **Flexibility**: Support multi-level grouping and custom aggregations.
*   **Performance**: Minimize overhead and support parallel processing.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Collection
    participant S as Stream
    participant CL as Collector
    participant M as Result Map
    
    C->>S: stream()
    S->>CL: collect(groupingBy(classifier))
    loop For each element
        CL->>CL: Apply classifier
        CL->>M: Put element into list for key
    end
    CL-->>S: Result Map
    S-->>C: Final Map
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Stream Creation**: The source collection is converted into a \`Stream\`.
2.  **Classifier Application**: For each element in the stream, the classifier function (e.g., \`Employee::getDepartment\`) is applied to determine its key.
3.  **Map Insertion**: The element is added to a list associated with that key in an internal \`Map\`.
4.  **Downstream Processing**: If a downstream collector is provided (e.g., \`counting()\`), it is applied to the list of elements for each key to produce a single value.
5.  **Terminal Result**: The final \`Map\` is returned to the caller.

### 6. Declarative Data Processing

Java Streams allow you to process collections in a declarative way, focusing on *what* to do rather than *how* to do it.

### 7. GroupingBy

\`Collectors.groupingBy\` is similar to the \`GROUP BY\` clause in SQL. It takes a **classifier function** and produces a Map where keys are the result of the classifier and values are lists of items.

*   **Downstream Collectors**: You can pass a second collector to \`groupingBy\` to perform further operations on the grouped items (e.g., counting, summing, averaging).

### 8. PartitioningBy

A special case of grouping where the classifier is a **Predicate**. The resulting Map always has two keys: \`true\` and \`false\`. This is more efficient than \`groupingBy\` when you only have two categories.

### 9. Performance Considerations

*   **Lazy Evaluation**: Streams are not processed until a terminal operation (like \`collect\`) is called.
*   **Parallel Streams**: Can significantly speed up processing on large datasets, but be careful with thread-safety and overhead on small datasets.
`,
    steps: [
      {
            "title": "Create Stream",
            "description": "Convert the collection into a stream."
      },
      {
            "title": "Define Classifier",
            "description": "Provide a function to determine the grouping key."
      },
      {
            "title": "Apply Collector",
            "description": "Use Collectors.groupingBy() in the terminal collect() call."
      },
      {
            "title": "Optional Downstream",
            "description": "Add a second collector for aggregation if needed."
      }
]
  },
  {
    id: "parallel-streams",
    category: "Java Core",
    title: "Parallel Streams",
    description: "Leverages multi-core processors to perform stream operations in parallel for better performance on large datasets.",
    javaCode: `
import java.util.stream.LongStream;
import java.util.concurrent.TimeUnit;

/**
 * PARALLEL STREAMS: Utilizing multi-core processors.
 */
public class ParallelStreamDemo {
    public static void main(String[] args) {
        long limit = 10_000_000;

        // 1. Sequential Stream
        long start = System.currentTimeMillis();
        long sumSeq = LongStream.rangeClosed(1, limit)
                .map(ParallelStreamDemo::heavyTask)
                .sum();
        long end = System.currentTimeMillis();
        System.out.println("Sequential Time: " + (end - start) + "ms");

        // 2. Parallel Stream
        start = System.currentTimeMillis();
        long sumPar = LongStream.rangeClosed(1, limit)
                .parallel() // Converts to parallel stream
                .map(ParallelStreamDemo::heavyTask)
                .sum();
        end = System.currentTimeMillis();
        System.out.println("Parallel Time: " + (end - start) + "ms");
        
        // 3. Thread Pool Info
        System.out.println("Common Pool Parallelism: " + 
            java.util.concurrent.ForkJoinPool.getCommonPoolParallelism());
    }

    private static long heavyTask(long n) {
        // Simulate CPU intensive work
        return (long) Math.sqrt(n * n + n * 2);
    }
}
`,
    concepts: [
      "Fork/Join Framework: The underlying engine that splits tasks and joins results.",
      "Common Pool: Uses the ForkJoinPool.commonPool() by default.",
      "Spliterator: Responsible for partitioning the source data into chunks."
],
    tradeoffs: [
      "Pros: Significant speedup for CPU-intensive tasks on large collections.",
      "Cons: Overhead of thread management. Not suitable for small datasets or blocking I/O."
],
    interviewTips: [
      "When should you NOT use parallel streams? (Small data, stateful lambdas, blocking operations).",
      "How to configure the number of threads in the common pool?"
],
    deepDive: `
## Parallel Streams Design Guide

### 1. The NQ Model
A rule of thumb for when to use parallel streams: **N * Q > 10,000**, where:
*   **N**: Number of data elements.
*   **Q**: Cost per element (CPU cycles).

### 2. Common Pitfalls
*   **Shared State**: Never use stateful lambda expressions (lambdas that modify external variables).
*   **Order Sensitivity**: Operations like \`findFirst()\` or \`limit()\` are much slower in parallel.
*   **Blocking I/O**: Parallel streams are designed for CPU-bound tasks. For I/O, use a custom thread pool or CompletableFuture.

### 3. Custom Thread Pool
You can run a parallel stream in a specific ForkJoinPool to avoid saturating the common pool:
\`\`\`java
ForkJoinPool customPool = new ForkJoinPool(4);
customPool.submit(() -> list.parallelStream()...).get();
\`\`\`
`,
    steps: [
      {
            "title": "Check Dataset Size",
            "description": "Ensure the collection is large enough to justify parallel overhead."
      },
      {
            "title": "Verify Statelessness",
            "description": "Ensure all lambda operations are stateless and thread-safe."
      },
      {
            "title": "Call parallelStream",
            "description": "Switch from stream() to parallelStream()."
      },
      {
            "title": "Monitor Performance",
            "description": "Benchmark to ensure actual performance gains."
      }
]
  },
  {
    id: "java-modern-features",
    category: "Java Core",
    title: "Java 17+ Modern Features",
    description: "Exploring the latest enhancements in the Java language, including Records, Sealed Classes, and Pattern Matching.",
    javaCode: `
/**
 * JAVA 17+ MODERN FEATURES
 */

// 1. Records: Concise data carriers
record User(String name, int age) {}

// 2. Sealed Classes: Restricted hierarchies
sealed interface Shape permits Circle, Square {}
final class Circle implements Shape { double radius; }
final class Square implements Shape { double side; }

public class ModernJavaDemo {
    public static void main(String[] args) {
        // 3. Pattern Matching for switch
        Object obj = new Circle();
        String result = switch (obj) {
            case Circle c -> "Circle with radius " + c.radius;
            case Square s -> "Square with side " + s.side;
            default -> "Unknown shape";
        };
        
        // 4. Text Blocks
        String json = """
            {
                "name": "Alice",
                "age": 30
            }
            """;
    }
}
`,
    concepts: [
      "Records: Immutable classes that automatically generate constructors, accessors, equals, hashCode, and toString.",
      "Sealed Classes/Interfaces: Allow a class to specify which other classes can extend or implement it.",
      "Pattern Matching: Simplifies code by combining type checking and casting (instanceof and switch).",
      "Text Blocks: Multi-line string literals that preserve formatting without escape characters.",
      "Switch Expressions: Allow switch to return a value and use the arrow (->) syntax."
],
    tradeoffs: [
      "Pros: Significantly reduces boilerplate code, improves type safety, makes code more readable and expressive.",
      "Cons: Requires upgrading to modern JDKs (17+), some features might feel unfamiliar to developers used to older Java versions."
],
    interviewTips: [
      "What is the difference between a Record and a standard Class?",
      "Why would you use a Sealed Class? (To model restricted domain hierarchies).",
      "How does Pattern Matching improve the 'instanceof' check?",
      "Are Records truly immutable? (Yes, their fields are final, but they can hold references to mutable objects)."
],
    deepDive: `
## Java 17+ Modern Features Deep Dive

### 1. Records
Records are a game-changer for DTOs and data-holding classes. They are \`final\` and their fields are \`final\`. They provide a compact syntax that replaces dozens of lines of boilerplate.
\`\`\`java
public record Point(int x, int y) {}
\`\`\`

### 2. Sealed Classes
Sealed classes provide more control over inheritance. By using \`permits\`, you can ensure that no one else can extend your class. This is particularly useful for creating **Algebraic Data Types (ADTs)** where you know all possible subtypes at compile time.

### 3. Pattern Matching
Pattern matching is being rolled out across the language. It started with \`instanceof\` (no more manual casting!) and has moved into \`switch\` statements. This allows for very clean, declarative code when handling different types of objects.
`,
    steps: [
      {
            "title": "Use Records",
            "description": "Replace your boilerplate DTOs and POJOs with Records."
      },
      {
            "title": "Apply Sealed Classes",
            "description": "Use sealed hierarchies for domain models with a fixed set of types."
      },
      {
            "title": "Leverage Pattern Matching",
            "description": "Simplify your type-checking logic using the new switch and instanceof syntax."
      },
      {
            "title": "Use Text Blocks",
            "description": "Use text blocks for SQL queries, JSON, or HTML templates within your code."
      }
]
  },
  {
    id: "java-21-record-patterns",
    category: "Java Core",
    title: "Java 21 Record Patterns",
    description: "Deconstructing records using pattern matching for more concise and readable data processing.",
    javaCode: `
/**
 * JAVA 21 RECORD PATTERNS
 */
record Point(int x, int y) {}
record ColoredPoint(Point p, String color) {}

public class RecordPatternDemo {
    public static void main(String[] args) {
        Object obj = new ColoredPoint(new Point(10, 20), "Red");

        // 1. Nested Record Pattern Matching
        if (obj instanceof ColoredPoint(Point(int x, int y), String c)) {
            System.out.println("X: " + x + ", Y: " + y + ", Color: " + c);
        }

        // 2. Pattern Matching in Switch
        String result = switch (obj) {
            case ColoredPoint(Point p, String c) when c.equals("Red") -> "Red point at " + p;
            case ColoredPoint(Point p, String c) -> "Point at " + p;
            default -> "Unknown";
        };
    }
}
`,
    concepts: [
      "Deconstruction: Breaking a record into its individual components during pattern matching.",
      "Nested Patterns: Matching records within records in a single expression.",
      "Guards (when): Adding boolean conditions to pattern matches.",
      "Inference: The compiler automatically infers the types of the deconstructed components.",
      "Exhaustiveness: The compiler ensures that all possible cases are handled in a switch expression."
],
    tradeoffs: [
      "Pros: Eliminates manual casting and accessor calls, makes data processing code much cleaner.",
      "Cons: Requires Java 21+, only works with Records (not standard classes)."
],
    interviewTips: [
      "What is Record Deconstruction?",
      "How do Record Patterns improve switch statements?",
      "Can you use Record Patterns with standard classes? (No, only with Records).",
      "What is a 'Guard' in pattern matching?"
],
    deepDive: `
## Java 21 Record Patterns Deep Dive

### 1. Beyond Type Matching
Before Record Patterns, you could match a type: \`if (obj instanceof Point p)\`. But you still had to call \`p.x()\` and \`p.y()\`. Record Patterns allow you to "extract" those values directly in the match: \`if (obj instanceof Point(int x, int y))\`.

### 2. Nested Deconstruction
The real power comes with nested records. You can deconstruct an entire tree of data in a single line. This is incredibly useful when working with complex JSON-like data structures modeled as records.

### 3. Pattern Matching for Switch
Record patterns work perfectly with the new \`switch\` expressions. You can match specific shapes of data and even use the \`when\` clause to add extra logic, creating highly expressive and type-safe data processing pipelines.
`,
    steps: [
      {
            "title": "Model with Records",
            "description": "Use Records for your data-carrying objects."
      },
      {
            "title": "Use instanceof Deconstruction",
            "description": "Replace manual accessor calls with record patterns in if-statements."
      },
      {
            "title": "Apply to Switch",
            "description": "Use record patterns in switch expressions for complex branching logic."
      },
      {
            "title": "Add Guards",
            "description": "Use the 'when' keyword to add fine-grained conditions to your patterns."
      }
]
  },
  {
    id: "java-21-sequenced-collections",
    category: "Java Core",
    title: "Java 21 Sequenced Collections",
    description: "A new set of interfaces that provide a uniform way to access elements in collections with a defined encounter order.",
    javaCode: `
import java.util.*;

/**
 * JAVA 21 SEQUENCED COLLECTIONS
 */
public class SequencedDemo {
    public static void main(String[] args) {
        // 1. SequencedList
        SequencedList<String> list = new ArrayList<>(List.of("B", "C"));
        list.addFirst("A");
        list.addLast("D");
        
        System.out.println("First: " + list.getFirst());
        System.out.println("Last: " + list.getLast());
        System.out.println("Reversed: " + list.reversed());

        // 2. SequencedSet
        SequencedSet<String> set = new LinkedHashSet<>(List.of("X", "Y"));
        set.addFirst("W");
        
        // 3. SequencedMap
        SequencedMap<Integer, String> map = new LinkedHashMap<>();
        map.put(2, "Two");
        map.putFirst(1, "One");
        
        System.out.println("First Entry: " + map.firstEntry());
    }
}
`,
    concepts: [
      "Encounter Order: A defined sequence in which elements are processed (e.g., List, LinkedHashSet).",
      "SequencedCollection: The base interface with addFirst, addLast, getFirst, getLast, removeFirst, removeLast, and reversed().",
      "SequencedSet: A set that preserves encounter order.",
      "SequencedMap: A map that preserves encounter order (firstEntry, lastEntry, pollFirstEntry, pollLastEntry).",
      "Uniformity: Before Java 21, getting the last element of a List vs a LinkedHashSet required different code."
],
    tradeoffs: [
      "Pros: Cleaner and more consistent API, reduces boilerplate for common operations (like getting the last element).",
      "Cons: Requires Java 21+, only applies to collections that have a defined order (not HashSet or HashMap)."
],
    interviewTips: [
      "What problem do Sequenced Collections solve? (Lack of a uniform API for ordered collections).",
      "How did you get the last element of a List before Java 21? (list.get(list.size() - 1)).",
      "Which existing collections implement these new interfaces? (ArrayList, LinkedList, LinkedHashSet, LinkedHashMap, etc.).",
      "What does the reversed() method return? (A reversed view of the collection, not a copy)."
],
    deepDive: `
## Java 21 Sequenced Collections Deep Dive

### 1. The Gap in the Collections API
For 25 years, Java lacked a common interface for collections with a defined order. If you wanted the last element of a \`List\`, you used \`list.get(list.size() - 1)\`. For a \`SortedSet\`, you used \`set.last()\`. For a \`Deque\`, you used \`deque.getLast()\`. This was inconsistent and cumbersome.

### 2. The New Hierarchy
Java 21 introduced three new interfaces:
*   \`SequencedCollection<E>\`
*   \`SequencedSet<E>\`
*   \`SequencedMap<K, V>\`
These are integrated into the existing hierarchy. For example, \`List\` now extends \`SequencedCollection\`.

### 3. The reversed() View
The \`reversed()\` method is particularly powerful. It doesn't copy the data; it returns a **view** that provides the elements in reverse order. This is highly efficient (O(1)) and allows you to use standard loops or streams on the reversed data without the overhead of creating a new collection.
`,
    steps: [
      {
            "title": "Identify Ordered Collections",
            "description": "Use these new methods on ArrayList, LinkedList, LinkedHashSet, or LinkedHashMap."
      },
      {
            "title": "Simplify Access",
            "description": "Replace list.get(0) with list.getFirst() and list.get(size-1) with list.getLast()."
      },
      {
            "title": "Use Reversed Views",
            "description": "Use .reversed() when you need to iterate backwards without copying data."
      },
      {
            "title": "Update Map Logic",
            "description": "Use map.firstEntry() and map.lastEntry() for cleaner code in LinkedHashMaps."
      }
]
  },
  {
    id: "java-21-scoped-values",
    category: "Java Core",
    title: "Java 21 Scoped Values",
    description: "A modern, lightweight alternative to ThreadLocal for sharing data across threads, especially with Virtual Threads.",
    javaCode: `
import java.util.concurrent.ScopedValue;

/**
 * JAVA 21 SCOPED VALUES: Immutable and lightweight data sharing.
 */
public class ScopedValuesDemo {
    // 1. Define a ScopedValue
    private static final ScopedValue<String> CONTEXT = ScopedValue.newInstance();

    public static void main(String[] args) {
        // 2. Bind a value for a specific scope
        ScopedValue.where(CONTEXT, "User-123").run(() -> {
            processRequest();
        });
        
        // Outside the scope, the value is not accessible
        System.out.println("Is bound: " + CONTEXT.isBound());
    }

    private static void processRequest() {
        // 3. Retrieve the value
        System.out.println("Processing for: " + CONTEXT.get());
        
        // ScopedValues are inherited by subtasks in Structured Concurrency
    }
}
`,
    concepts: [
      "ScopedValue: A container for a value that is available for a specific duration of execution.",
      "Immutability: Unlike ThreadLocal, ScopedValues are immutable. You cannot 'set' them once bound.",
      "Inheritance: ScopedValues are automatically inherited by child threads in Structured Concurrency.",
      "Memory Efficiency: Much lighter than ThreadLocal, especially when dealing with millions of Virtual Threads.",
      "Rebinding: You can 'rebind' a value in a nested scope, but it only affects that scope."
],
    tradeoffs: [
      "Pros: Thread-safe by design (immutable), prevents memory leaks (automatically cleared), optimized for Virtual Threads.",
      "Cons: Requires Java 21+, cannot be modified once bound (which might require refactoring some logic)."
],
    interviewTips: [
      "Why were Scoped Values introduced? (To solve the scalability and memory issues of ThreadLocal with Virtual Threads).",
      "Difference between ThreadLocal and ScopedValue.",
      "How do Scoped Values handle inheritance?",
      "Can you change the value of a ScopedValue inside its scope? (No, they are immutable)."
],
    deepDive: `
## Java 21 Scoped Values Deep Dive

### 1. The Problem with ThreadLocal
\`ThreadLocal\` variables are mutable and stay in memory as long as the thread is alive. With the introduction of **Virtual Threads** (where you might have millions of threads), the memory overhead of \`ThreadLocal\` becomes a bottleneck. Also, \`InheritableThreadLocal\` is expensive because it copies the entire map to every child thread.

### 2. The Solution: Scoped Values
Scoped Values are designed to be "one-way" and "temporary".
*   **Bound**: You bind a value to a scope using \`ScopedValue.where(...).run(...)\`.
*   **Immutable**: The value cannot be changed within that scope.
*   **Automatic Cleanup**: Once the \`run()\` method completes, the binding is gone. No risk of memory leaks.

### 3. Performance
Scoped Values use a very efficient internal representation that allows for fast lookups even in deep call stacks. They are specifically optimized to work with the **Structured Concurrency** API, making it easy to pass context (like security tokens or request IDs) down to thousands of subtasks.
`,
    steps: [
      {
            "title": "Define ScopedValue",
            "description": "Create a static final ScopedValue instance."
      },
      {
            "title": "Bind at Entry",
            "description": "Use ScopedValue.where() at the start of a request or task."
      },
      {
            "title": "Access Deeply",
            "description": "Call .get() anywhere within the execution scope to retrieve the value."
      },
      {
            "title": "Use with Virtual Threads",
            "description": "Prefer ScopedValue over ThreadLocal when scaling to high thread counts."
      }
]
  },
  {
    id: "java-structured-concurrency",
    category: "Java Core",
    title: "Java 21: Structured Concurrency",
    description: "Managing multiple concurrent tasks as a single unit of work to improve reliability and observability.",
    javaCode: `
import java.util.concurrent.*;
import java.util.concurrent.StructuredTaskScope;

/**
 * STRUCTURED CONCURRENCY: Managing subtasks.
 */
public class StructuredConcurrencyDemo {
    public static void main(String[] args) {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            // 1. Fork subtasks
            StructuredTaskScope.Subtask<String> userTask = scope.fork(() -> fetchUser());
            StructuredTaskScope.Subtask<Integer> orderTask = scope.fork(() -> fetchOrderCount());

            // 2. Join and propagate failures
            scope.join();
            scope.throwIfFailed();

            // 3. Get results
            System.out.println("User: " + userTask.get());
            System.out.println("Orders: " + orderTask.get());

        } catch (Exception e) {
            System.err.println("Task failed: " + e.getMessage());
        }
    }

    private static String fetchUser() throws InterruptedException {
        Thread.sleep(100);
        return "John Doe";
    }

    private static int fetchOrderCount() throws InterruptedException {
        Thread.sleep(150);
        return 42;
    }
}
`,
    concepts: [
      "Structured Task Scope: A scope that ensures all subtasks complete before the parent continues.",
      "ShutdownOnFailure: Cancels all other subtasks if one fails.",
      "ShutdownOnSuccess: Returns the first successful result and cancels others (Racing).",
      "Error Propagation: Automatically handles and propagates exceptions from subtasks.",
      "Observability: Subtasks are linked to the parent in thread dumps, making debugging easier."
],
    tradeoffs: [
      "Pros: Prevents 'orphan' threads, simplifies error handling, improves code readability.",
      "Cons: Still in preview/incubating in some versions, requires a mindset shift from CompletableFuture."
],
    interviewTips: [
      "What is the problem with 'Unstructured' concurrency (e.g., ExecutorService)? (Threads can leak, errors are hard to track).",
      "How does Structured Concurrency improve thread dumps?",
      "Difference between ShutdownOnFailure and ShutdownOnSuccess.",
      "How does it relate to Virtual Threads?"
],
    deepDive: `
## Structured Concurrency Deep Dive

### 1. The Problem: Unstructured Concurrency
With \`ExecutorService\`, if a parent task starts two subtasks and then fails, the subtasks might keep running in the background (leaking resources). There is no built-in relationship between the parent and children.

### 2. The Solution: Structured Task Scope
Structured Concurrency treats a group of related tasks as a single unit. If the scope is closed, all tasks within it are guaranteed to be finished (or cancelled). This follows the principle of "Structured Programming" (like if/else or loops) but for threads.

### 3. Integration with Virtual Threads
Structured Concurrency is designed to work perfectly with Virtual Threads. You can fork thousands of subtasks within a scope, and the JVM will manage them efficiently without the overhead of platform threads.
`,
    steps: [
      {
            "title": "Open a Scope",
            "description": "Use `StructuredTaskScope` within a try-with-resources block."
      },
      {
            "title": "Fork Subtasks",
            "description": "Use `scope.fork()` to start concurrent operations."
      },
      {
            "title": "Join",
            "description": "Call `scope.join()` to wait for all tasks to complete."
      },
      {
            "title": "Handle Results",
            "description": "Use `scope.throwIfFailed()` or `subtask.get()` to process results."
      }
]
  },
  {
    id: "java-functional-internals",
    category: "Java Core",
    title: "Functional Programming Internals",
    description: "Understanding how Lambdas, Functional Interfaces, and Method References work under the hood.",
    javaCode: `
import java.util.function.Function;

/**
 * FUNCTIONAL INTERNALS: invokedynamic and LambdaMetafactory.
 */
public class FunctionalInternals {
    public static void main(String[] args) {
        // 1. Lambda Expression
        Function<String, Integer> lengthFunc = s -> s.length();
        
        // 2. Method Reference
        Function<String, Integer> lengthRef = String::length;

        System.out.println("Lambda class: " + lengthFunc.getClass().getName());
        System.out.println("Method Ref class: " + lengthRef.getClass().getName());
    }
}
`,
    concepts: [
      "Functional Interface: An interface with exactly one abstract method (SAM).",
      "Lambda Expression: An anonymous function that can be treated as a value.",
      "Method Reference: A shorthand for a lambda that calls an existing method.",
      "invokedynamic: The JVM instruction used to implement lambdas efficiently.",
      "LambdaMetafactory: The bootstrap method that generates the implementation class at runtime.",
      "Target Typing: The compiler infers the type of a lambda based on the context."
],
    tradeoffs: [
      "Pros: Concise code, enables parallel streams, better readability for simple logic.",
      "Cons: Can be harder to debug (anonymous classes in stack traces), performance overhead of object creation (though minimized by JVM)."
],
    interviewTips: [
      "How are lambdas implemented in Java? (invokedynamic, not anonymous inner classes).",
      "What is a Functional Interface? (e.g., Runnable, Callable, Comparator).",
      "What is the difference between a Lambda and an Anonymous Inner Class? (Lambdas don't have 'this' referring to themselves; they don't create a .class file).",
      "What is 'Effectively Final'?"
],
    deepDive: `
## Functional Programming Internals Deep Dive

### 1. The invokedynamic Instruction
Before Java 7, the JVM only had 4 method invocation instructions. Java 7 added \`invokedynamic\`, which allows the linkage between a call site and a method to be deferred until runtime. This is the foundation for Lambdas in Java 8.

### 2. LambdaMetafactory
When the JVM encounters a lambda, it uses \`LambdaMetafactory\` to create a "call site". This call site points to a dynamically generated class that implements the functional interface. Unlike anonymous inner classes, this class is generated once and reused, making it much more efficient.

### 3. Effectively Final
Lambdas can capture variables from their enclosing scope. However, those variables must be \`final\` or "effectively final" (not modified after initialization). This is because the lambda might run in a different thread, and allowing modification would lead to race conditions.
`,
    steps: [
      {
            "title": "Identify SAM",
            "description": "Ensure the interface has exactly one abstract method (use @FunctionalInterface)."
      },
      {
            "title": "Write Lambda",
            "description": "Use the (parameters) -> { body } syntax for the implementation."
      },
      {
            "title": "Use Method Refs",
            "description": "Prefer Method References (Class::method) for even more concise code."
      },
      {
            "title": "Avoid Side Effects",
            "description": "Keep lambdas pure (no modification of external state) for better thread safety."
      }
]
  },
  {
    id: "jvm-architecture",
    category: "Java Core",
    title: "JVM Architecture",
    description: "The internal architecture of the Java Virtual Machine, including memory areas and execution engine.",
    javaCode: `
import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * Demonstrating JVM Runtime Data Areas & Reflection
 */
public class JvmDeepDive {
    // 1. Method Area: Stores class-level data (metadata, static variables)
    private static final String JVM_VERSION = "21";

    public static void main(String[] args) throws Exception {
        // 2. Stack Area: localVal is stored in the current thread's stack frame
        int localVal = 42;

        // 3. Heap Area: The 'runtime' object is stored on the heap
        Runtime runtime = Runtime.getRuntime();

        System.out.println("JVM Version: " + JVM_VERSION);
        System.out.println("Max Memory: " + runtime.maxMemory() / (1024 * 1024) + "MB");
        System.out.println("Total Memory: " + runtime.totalMemory() / (1024 * 1024) + "MB");

        // 4. Execution Engine: Demonstrating Reflection (Class Loading & Introspection)
        Class<?> clazz = Class.forName("java.util.ArrayList");
        System.out.println("Class Name: " + clazz.getName());
        
        Method[] methods = clazz.getDeclaredMethods();
        System.out.println("Sample Methods from ArrayList:");
        Arrays.stream(methods).limit(5).forEach(m -> System.out.println(" - " + m.getName()));

        // 5. Native Method Stack: System.currentTimeMillis() calls a native method
        long startTime = System.currentTimeMillis();
        
        // Simulate some work
        Thread.sleep(100);
        
        System.out.println("Execution Time: " + (System.currentTimeMillis() - startTime) + "ms");
    }
}
`,
    concepts: [
      "Class Loader: Loads class files into memory.",
      "Runtime Data Areas: Heap, Stack, Method Area, PC Register, Native Method Stack.",
      "Execution Engine: Interpreter, JIT Compiler, Garbage Collector."
],
    tradeoffs: [
      "Portability vs. Performance: JVM provides 'Write Once, Run Anywhere' but adds a layer of abstraction.",
      "Garbage Collection: Automates memory management but can cause 'Stop-the-World' pauses."
],
    interviewTips: [
      "Explain the different generations in the Heap (Young, Old, Metaspace).",
      "Discuss how the JIT compiler improves performance over time."
],
    deepDive: `
## JVM Architecture Design Guide

### 1. Problem Statement
Understand how the Java Virtual Machine (JVM) manages memory, executes code, and provides a platform-independent runtime environment.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[.class files] --> B[Class Loader]
    B --> C[Runtime Data Areas]
    C --> D[Method Area]
    C --> E[Heap]
    C --> F[Stack]
    C --> G[PC Registers]
    C --> H[Native Method Stack]
    C --> I[Execution Engine]
    I --> J[Interpreter]
    I --> K[JIT Compiler]
    I --> L[Garbage Collector]
\`\`\`

### 3. Requirements
*   **Platform Independence**: "Write Once, Run Anywhere" (WORA).
*   **Memory Management**: Automatic allocation and deallocation (GC).
*   **Security**: Bytecode verification and sandboxing.
*   **Performance**: Dynamic optimization via JIT.

### 4. Sequence Diagram (Class Loading)
\`\`\`mermaid
sequenceDiagram
    participant CL as ClassLoader
    participant V as Verifier
    participant P as Preparer
    participant R as Resolver
    participant I as Initializer
    
    CL->>V: Load Bytecode
    V->>P: Verify Format & Safety
    P->>R: Allocate Static Memory
    R->>I: Resolve Symbolic References
    I-->>CL: Class Ready for Use
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Loading**: The \`Class Loader\` reads the \`.class\` file and creates a binary representation in the \`Method Area\`.
2.  **Linking**:
    *   **Verification**: Ensures the bytecode is valid and doesn't violate security rules.
    *   **Preparation**: Allocates memory for static variables and initializes them to default values.
    *   **Resolution**: Replaces symbolic references in the constant pool with direct references.
3.  **Initialization**: Executes static initializers and assigns actual values to static variables.
4.  **Execution**:
    *   The \`Interpreter\` reads bytecode and executes it line by line.
    *   The \`JIT Compiler\` identifies "hot spots" (frequently executed code) and compiles them into native machine code for better performance.
5.  **Garbage Collection**: A background thread identifies objects on the \`Heap\` that are no longer reachable and reclaims their memory.

### 6. Core Components

The JVM is the heart of the Java platform. Understanding its architecture is crucial for performance tuning and debugging.

*   **Class Loader**: Loads class files into memory.
*   **Runtime Data Areas**: Heap, Stack, Method Area, PC Register, Native Method Stack.
*   **Execution Engine**: Interpreter, JIT Compiler, Garbage Collector.
`,
    steps: [
      {
            "title": "Loading",
            "description": "The Class Loader reads .class files and loads them into the Method Area."
      },
      {
            "title": "Allocation",
            "description": "Objects are created on the Heap, while local variables are stored on the Stack."
      },
      {
            "title": "Execution",
            "description": "The Execution Engine converts bytecode to machine code using the Interpreter or JIT."
      },
      {
            "title": "GC",
            "description": "The Garbage Collector identifies and removes unreachable objects to free up memory."
      }
]
  },
  {
    id: "java-classloaders",
    category: "Java Core",
    title: "Java ClassLoaders",
    description: "Understanding how the JVM finds, loads, and links classes at runtime.",
    javaCode: `
/**
 * CLASSLOADER HIERARCHY DEMO
 */
public class ClassLoaderDemo {
    public static void main(String[] args) {
        // 1. Application ClassLoader (Loads your code)
        System.out.println("App ClassLoader: " + 
            ClassLoaderDemo.class.getClassLoader());

        // 2. Platform ClassLoader (Loads Java SE modules)
        System.out.println("Platform ClassLoader: " + 
            ClassLoaderDemo.class.getClassLoader().getParent());

        // 3. Bootstrap ClassLoader (Native, loads core classes like String)
        System.out.println("Bootstrap ClassLoader: " + 
            String.class.getClassLoader()); // Returns null
    }
}
`,
    concepts: [
      "Delegation Model: A ClassLoader delegates loading to its parent before trying itself.",
      "Bootstrap ClassLoader: The root, loads core Java libraries (rt.jar, java.base).",
      "Platform ClassLoader: Loads standard Java extension libraries.",
      "Application ClassLoader: Loads classes from the system classpath.",
      "Visibility: A parent ClassLoader cannot see classes loaded by its children.",
      "Uniqueness: A class is uniquely identified by its fully qualified name AND its ClassLoader."
],
    tradeoffs: [
      "Pros: Isolation (different versions of same library), dynamic loading (plugins).",
      "Cons: 'NoClassDefFoundError' and 'ClassNotFoundException' can be hard to debug."
],
    interviewTips: [
      "What is the Delegation Principle?",
      "Can you load two different versions of the same class? (Yes, using custom ClassLoaders).",
      "What is a 'Context ClassLoader'?",
      "Explain the difference between Class.forName() and loadClass()."
],
    deepDive: `
## Java ClassLoaders Deep Dive

### 1. The Loading Process
1.  **Loading**: Finding the binary representation of the class (byte array).
2.  **Linking**: Verification (security), Preparation (static fields), and Resolution (symbolic links).
3.  **Initialization**: Executing static blocks and initializing static fields.

### 2. Custom ClassLoaders
Used in:
*   **Web Servers (Tomcat)**: To isolate different web applications from each other.
*   **OSGi**: For modular systems where bundles can be added/removed at runtime.
*   **Hot Swapping**: Reloading classes without restarting the JVM.

### 3. The "Parent First" Rule
By default, Java uses "Parent First" delegation. However, some systems (like Tomcat) use "Child First" for web apps to allow them to override libraries provided by the server.
`,
    steps: [
      {
            "title": "Understand Hierarchy",
            "description": "Always check the parent-child relationship when debugging class issues."
      },
      {
            "title": "Check Classpath",
            "description": "Ensure JARs are in the correct location for the Application ClassLoader."
      },
      {
            "title": "Use for Plugins",
            "description": "Implement a custom ClassLoader if you need to load code from external locations at runtime."
      },
      {
            "title": "Debug with -verbose:class",
            "description": "Use this JVM flag to see exactly where each class is being loaded from."
      }
]
  },
  {
    id: "java-memory-management-gc-roots",
    category: "Java Core",
    title: "GC Roots & Reachability",
    description: "Understanding how the JVM identifies live objects and the different states of reachability.",
    javaCode: `
/**
 * GC ROOTS & REACHABILITY
 */

/*
1. GC Roots:
   - Local variables in stack frames.
   - Active threads.
   - Static variables in loaded classes.
   - JNI (Native) references.

2. Reachability States:
   - Strongly Reachable: Standard reference.
   - Softly Reachable: SoftReference.
   - Weakly Reachable: WeakReference.
   - Phantom Reachable: PhantomReference.
   - Unreachable: Eligible for GC.
*/
`,
    concepts: [
      "GC Roots: Objects that are always considered reachable and serve as the starting point for the mark-and-sweep algorithm.",
      "Object Graph: The network of objects connected by references.",
      "Mark-and-Sweep: The process of traversing the graph from roots to find live objects.",
      "Stop-the-World: Pausing application threads to ensure a consistent view of the heap during GC.",
      "Memory Leak: When objects are reachable from GC roots but no longer needed by the application."
],
    tradeoffs: [
      "Pros: Automatic memory management prevents most memory leaks and dangling pointers.",
      "Cons: GC pauses can impact application latency; understanding roots is critical for debugging complex leaks."
],
    interviewTips: [
      "What are the common types of GC Roots?",
      "How does the JVM detect a memory leak? (Objects reachable from roots that shouldn't be).",
      "Explain the difference between 'Shallow Heap' and 'Retained Heap'.",
      "What happens if a static variable holds a reference to a large object?"
],
    deepDive: `
## GC Roots & Reachability Deep Dive

### 1. What are GC Roots?
The Garbage Collector needs a starting point to determine which objects are still in use. These starting points are called **GC Roots**. Any object that can be reached from a root (directly or indirectly) is considered "live".

### 2. Common GC Roots
*   **Stack Locals**: Variables currently in use in any thread's stack.
*   **Static Variables**: Fields defined in classes. These live as long as the class is loaded.
*   **JNI References**: Objects passed to native code.
*   **System Classes**: Classes loaded by the system class loader.

### 3. Reachability Analysis
The JVM performs a "Mark" phase where it starts from all roots and traverses every reference.
*   **Strongly Reachable**: If there is at least one path of strong references from a root.
*   **Unreachable**: If no path exists from any root. These objects are candidates for collection.
*   **Circular References**: If Object A points to B and B points to A, but neither is reachable from a root, both are collected.
`,
    steps: [
      {
            "title": "Identify Roots",
            "description": "Understand which objects in your app act as GC roots (statics, thread locals)."
      },
      {
            "title": "Analyze Heap",
            "description": "Use tools like VisualVM or MAT to visualize the object graph."
      },
      {
            "title": "Check Statics",
            "description": "Be careful with static collections; they are a common source of memory leaks."
      },
      {
            "title": "Monitor GC",
            "description": "Use -XX:+PrintGCDetails to see how often and why GC is triggered."
      }
]
  },
  {
    id: "java-memory-model",
    category: "Java Core",
    title: "Java Memory Model & GC",
    description: "Understanding Heap, Stack, Metaspace, and how Garbage Collection works in Java.",
    javaCode: `
import java.util.concurrent.atomic.AtomicInteger;

/**
 * JAVA MEMORY MODEL: Visibility, Atomicity, and Ordering.
 */
public class JMMDemo {
    // 1. volatile: Ensures visibility. 
    // Changes made by one thread are immediately visible to others.
    private static volatile boolean running = true;

    // 2. AtomicInteger: Ensures atomicity.
    // Compound operations (read-modify-write) are thread-safe.
    private static final AtomicInteger counter = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            while (running) {
                counter.incrementAndGet();
            }
            System.out.println("Thread 1: Stopped at " + counter.get());
        });

        t1.start();
        Thread.sleep(50); // Let it run

        // 3. Visibility in action
        running = false; 
        t1.join();

        System.out.println("Main: Final count is " + counter.get());
    }
}

/**
 * MEMORY STRUCTURE:
 * - Stack: Thread-local, stores primitives and object references.
 * - Heap: Shared, stores actual objects.
 * - Metaspace: Stores class-level data (Method area).
 */
`,
    concepts: [
      "Heap: Where all objects live. Divided into Young (Eden, S0, S1) and Old Generation.",
      "Stack: Where local variables and method calls live. Thread-local.",
      "Metaspace: Stores class metadata (replaces PermGen).",
      "Garbage Collection: Automatic memory management (G1, ZGC, Shenandoah)."
],
    tradeoffs: [
      "Pros: No manual memory management (prevents many memory leaks).",
      "Cons: GC pauses (Stop-the-world) can impact latency. Memory overhead."
],
    interviewTips: [
      "Difference between Heap and Stack.",
      "How does G1 GC work? (Region-based, concurrent).",
      "What is a Memory Leak in Java? (Unreachable objects still referenced).",
      "Explain 'Strong', 'Soft', 'Weak', and 'Phantom' references."
],
    deepDive: `
## Java Memory Management

### 1. JVM Memory Structure
*   **Heap**: Shared among all threads.
    *   **Young Generation**: Where new objects are created. Minor GC happens here.
    *   **Old Generation**: Where long-lived objects are moved. Major/Full GC happens here.
*   **Stack**: Each thread has its own stack. Stores frames (local variables, partial results).
*   **Program Counter (PC) Register**: Stores the address of the current instruction.
*   **Native Method Stack**: Used for native methods (JNI).

### 2. Garbage Collection Algorithms
*   **Serial GC**: Single-threaded, for small apps.
*   **Parallel GC**: Throughput-focused, uses multiple threads for Young Gen.
*   **G1 (Garbage First)**: Default in Java 9+. Divides heap into regions. Predictable pauses.
*   **ZGC / Shenandoah**: Ultra-low latency GCs (sub-millisecond pauses).

### 3. Memory Leaks
Common causes:
*   Static collections holding references.
*   Unclosed resources (Streams, Connections).
*   Inner classes holding references to outer classes.
*   Incorrect \`equals()\` and \`hashCode()\` in HashMaps.
`,
    steps: [
      {
            "title": "Monitor Memory",
            "description": "Use tools like jconsole, VisualVM, or JProfiler."
      },
      {
            "title": "Analyze Heap Dumps",
            "description": "Use Eclipse MAT to find memory leaks."
      },
      {
            "title": "Tune JVM",
            "description": "Adjust -Xms, -Xmx, and -XX:MaxMetaspaceSize."
      },
      {
            "title": "Choose GC",
            "description": "Select the right GC (e.g., -XX:+UseG1GC) for your workload."
      }
]
  },
  {
    id: "java-memory-model-deep-dive",
    category: "Java Core",
    title: "Java Memory Model (JMM) Deep Dive",
    description: "Understanding visibility, atomicity, and ordering in multi-threaded Java applications.",
    javaCode: `
import java.util.concurrent.atomic.AtomicInteger;

/**
 * JAVA MEMORY MODEL: Volatile, Synchronized, and Atomics.
 */
public class JmmDeepDive {
    // 1. Volatile: Ensures visibility across threads
    private volatile boolean running = true;
    
    // 2. Atomic: Ensures atomicity without explicit locking
    private AtomicInteger count = new AtomicInteger(0);

    public void startTask() {
        new Thread(() -> {
            while (running) {
                count.incrementAndGet();
            }
            System.out.println("Thread stopped. Final count: " + count.get());
        }).start();
    }

    public void stopTask() {
        running = false; // Visibility guaranteed by volatile
    }

    public static void main(String[] args) throws InterruptedException {
        JmmDeepDive demo = new JmmDeepDive();
        demo.startTask();
        Thread.sleep(100);
        demo.stopTask();
    }
}
`,
    concepts: [
      "Visibility: Ensuring changes made by one thread are visible to others.",
      "Atomicity: Operations that are all-or-nothing (e.g., AtomicInteger).",
      "Ordering: Preventing the compiler/CPU from reordering instructions in a way that breaks logic.",
      "Happens-Before: A formal guarantee that one action is visible to another.",
      "Volatile: Prevents caching and reordering for a specific variable."
],
    tradeoffs: [
      "Pros: High performance (volatile is cheaper than synchronized), prevents subtle concurrency bugs.",
      "Cons: Volatile does not guarantee atomicity (e.g., count++), JMM is complex to master."
],
    interviewTips: [
      "What is the 'Happens-Before' relationship?",
      "Does volatile guarantee thread-safety for 'i++'? (No, because it's read-modify-write).",
      "Explain the difference between Synchronized and Volatile.",
      "What is Instruction Reordering and why does it happen?"
],
    deepDive: `
## Java Memory Model Deep Dive

### 1. The Visibility Problem
CPUs have local caches (L1, L2, L3). When a thread updates a variable, it might only update its local cache, not main memory. Other threads reading from their own caches won't see the update. **Volatile** forces threads to read/write directly to main memory.

### 2. Happens-Before Guarantee
The JMM defines rules where one action is guaranteed to "happen before" another:
*   **Program Order**: Each action in a single thread happens before subsequent actions in that thread.
*   **Volatile Write**: A write to a volatile field happens before every subsequent read of that same field.
*   **Monitor Lock**: An unlock on a monitor happens before every subsequent lock on that same monitor.

### 3. Instruction Reordering
To optimize performance, the compiler and CPU might swap the order of instructions if they don't depend on each other. In a multi-threaded context, this can be disastrous. Memory barriers (fences) are used to prevent this reordering around volatile or synchronized blocks.
`,
    steps: [
      {
            "title": "Use Volatile",
            "description": "Use for flags or state variables where visibility is the only concern."
      },
      {
            "title": "Use Atomics",
            "description": "Use AtomicInteger, AtomicReference, etc., for thread-safe counters or updates without locks."
      },
      {
            "title": "Use Synchronized",
            "description": "Use when you need both visibility and atomicity for complex logic blocks."
      },
      {
            "title": "Understand Fences",
            "description": "Be aware that final fields also have special JMM guarantees after constructor completion."
      }
]
  },
  {
    id: "java-reference-types",
    category: "Java Core",
    title: "Java Reference Types",
    description: "Understanding Strong, Soft, Weak, and Phantom references and how they interact with the Garbage Collector.",
    javaCode: `
import java.lang.ref.*;
import java.util.WeakHashMap;

/**
 * JAVA REFERENCE TYPES: Strong, Soft, Weak, and Phantom.
 */
public class ReferenceDemo {
    public static void main(String[] args) {
        // 1. Strong Reference: Standard reference, never GC'd if reachable.
        Object strong = new Object();

        // 2. Soft Reference: GC'd only if memory is low. Good for caches.
        SoftReference<Object> soft = new SoftReference<>(new Object());

        // 3. Weak Reference: GC'd at the next GC cycle.
        WeakReference<Object> weak = new WeakReference<>(new Object());

        // 4. WeakHashMap: Entries are removed when keys are no longer strongly reachable.
        WeakHashMap<Object, String> weakMap = new WeakHashMap<>();
        Object key = new Object();
        weakMap.put(key, "Value");
        key = null; // Now the entry can be GC'd
    }
}
`,
    concepts: [
      "Strong Reference: The default. Prevents GC as long as the object is reachable.",
      "Soft Reference: Used for memory-sensitive caches. GC'd only when the JVM is about to throw OutOfMemoryError.",
      "Weak Reference: Used for metadata or mappings that shouldn't prevent GC. GC'd as soon as no strong references exist.",
      "Phantom Reference: Used for pre-mortem cleanup. The get() method always returns null.",
      "ReferenceQueue: A mechanism to be notified when an object has been GC'd."
],
    tradeoffs: [
      "Pros: Fine-grained control over memory, prevents memory leaks in caches and listeners.",
      "Cons: Can be complex to use correctly, risk of NullPointerException if not checked properly."
],
    interviewTips: [
      "Difference between Soft and Weak references.",
      "When would you use a WeakHashMap? (For metadata or caches where keys are not managed by the map).",
      "What is the purpose of a PhantomReference? (To perform cleanup after an object is finalized).",
      "How does the GC decide which SoftReferences to clear?"
],
    deepDive: `
## Java Reference Types Deep Dive

### 1. Strong References
These are your everyday variables. If you have \`Object obj = new Object();\`, the object will never be collected as long as \`obj\` is in scope.

### 2. Soft vs. Weak
*   **SoftReference**: "Collect me if you really have to." The JVM will clear these only if it's running out of memory. This makes them perfect for **Memory-Sensitive Caches**.
*   **WeakReference**: "Collect me as soon as you see me." If an object is only reachable via weak references, it will be collected in the next GC cycle. This is perfect for **Canonical Mappings** or listeners that you don't want to manually unregister.

### 3. Phantom References
Unlike Soft and Weak, you cannot access the object through a \`PhantomReference\` (it returns \`null\`). Its only purpose is to be placed in a \`ReferenceQueue\` when the object is ready to be deleted. This is a more flexible and reliable alternative to the deprecated \`finalize()\` method.
`,
    steps: [
      {
            "title": "Use Strong by Default",
            "description": "Use standard references for most application logic."
      },
      {
            "title": "Use Soft for Caches",
            "description": "Implement caches using SoftReference to prevent OutOfMemoryErrors."
      },
      {
            "title": "Use Weak for Metadata",
            "description": "Use WeakHashMap to store extra data about objects without preventing their collection."
      },
      {
            "title": "Use ReferenceQueue",
            "description": "Always use a ReferenceQueue with PhantomReferences to perform cleanup."
      }
]
  },
  {
    id: "java-reflection-annotations",
    category: "Java Core",
    title: "Reflection API & Custom Annotations",
    description: "Deep dive into Java's ability to inspect and modify its own behavior at runtime, and how to create custom annotations.",
    javaCode: `
import java.lang.annotation.*;
import java.lang.reflect.*;

/**
 * 1. Defining a Custom Annotation
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface LogExecutionTime {
    String value() default "Default Action";
}

/**
 * 2. Using the Annotation
 */
class Service {
    @LogExecutionTime("User Login")
    public void login(String username) {
        System.out.println("Logging in user: " + username);
    }

    public void logout() {
        System.out.println("Logging out...");
    }
}

/**
 * 3. Processing at Runtime via Reflection
 */
public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Service service = new Service();
        Class<?> clazz = service.getClass();

        System.out.println("Inspecting class: " + clazz.getName());

        for (Method method : clazz.getDeclaredMethods()) {
            if (method.isAnnotationPresent(LogExecutionTime.class)) {
                LogExecutionTime annotation = method.getAnnotation(LogExecutionTime.class);
                
                System.out.println("
Found Annotated Method: " + method.getName());
                System.out.println("Annotation Value: " + annotation.value());

                // Invoke method dynamically
                long start = System.currentTimeMillis();
                method.invoke(service, "admin");
                long end = System.currentTimeMillis();
                
                System.out.println("Execution took: " + (end - start) + "ms");
            }
        }
    }
}
`,
    concepts: [
      "Reflection: Inspecting classes, methods, and fields at runtime.",
      "Introspection: The process of discovering properties of a class.",
      "Annotations: Metadata that can be read by the compiler or at runtime.",
      "RetentionPolicy: How long an annotation is kept (Source, Class, Runtime).",
      "Target: Where an annotation can be applied (Method, Field, Type, etc.)."
],
    tradeoffs: [
      "Pros: Highly flexible, enables frameworks like Spring and Hibernate to work.",
      "Cons: Performance overhead, breaks encapsulation (can access private fields), harder to debug."
],
    interviewTips: [
      "How does Spring use Reflection? (To instantiate beans and inject dependencies).",
      "Difference between getMethods() and getDeclaredMethods().",
      "What is the performance cost of Reflection?",
      "How to prevent Reflection from breaking a Singleton? (Throw exception in constructor)."
],
    deepDive: `
## Reflection & Annotations Deep Dive

### 1. How Reflection Works
Reflection allows you to bypass compile-time checks. You can load a class by name, create an instance, find its fields, and even change their values even if they are \`private\`.

### 2. Meta-Annotations
When creating custom annotations, you use meta-annotations:
*   \`@Retention\`: Usually \`RUNTIME\` if you want to process it via reflection.
*   \`@Target\`: Defines where it can be used.
*   \`@Documented\`: Includes it in Javadoc.
*   \`@Inherited\`: Allows subclasses to inherit the annotation.

### 3. Framework Magic
Frameworks like Spring use reflection to scan for \`@Component\`, \`@Autowired\`, etc. They use proxies (JDK Dynamic Proxy or CGLIB) to add behavior (like \`@Transactional\`) around your methods.
`,
    steps: [
      {
            "title": "Define Annotation",
            "description": "Create an @interface with @Retention(RUNTIME)."
      },
      {
            "title": "Apply Annotation",
            "description": "Place the annotation on methods or fields."
      },
      {
            "title": "Scan with Reflection",
            "description": "Use Class.getDeclaredMethods() to find annotated elements."
      },
      {
            "title": "Execute Logic",
            "description": "Use Method.invoke() or Field.set() to perform dynamic actions."
      }
]
  },
  {
    id: "java-nio-selector",
    category: "Java Core",
    title: "Java NIO & Selector Pattern",
    description: "Understanding non-blocking I/O and how a single thread can manage multiple concurrent connections.",
    javaCode: `
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.util.*;

/**
 * JAVA NIO: Simulating a Non-blocking Server with Selector.
 */
public class NioServerSimulation {
    public static void main(String[] args) throws IOException {
        // 1. Open a Selector
        Selector selector = Selector.open();

        // 2. Open a ServerSocketChannel and bind it
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.bind(new InetSocketAddress("localhost", 8080));
        serverChannel.configureBlocking(false); // CRITICAL: Non-blocking mode

        // 3. Register the channel with the selector for 'ACCEPT' events
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);

        System.out.println("NIO Server started on port 8080...");

        // Simulating the event loop (usually runs in a while(true) loop)
        for (int i = 0; i < 5; i++) {
            System.out.println("
--- Event Loop Iteration " + (i + 1) + " ---");
            
            // In a real app, this blocks until at least one channel is ready
            // selector.select(); 
            
            Set<SelectionKey> selectedKeys = selector.selectedKeys();
            Iterator<SelectionKey> iter = selectedKeys.iterator();

            while (iter.hasNext()) {
                SelectionKey key = iter.next();

                if (key.isAcceptable()) {
                    System.out.println("Event: New Connection Acceptable");
                    // Accept the connection and register for READ
                    // SocketChannel client = serverChannel.accept();
                    // client.configureBlocking(false);
                    // client.register(selector, SelectionKey.OP_READ);
                }
                
                if (key.isReadable()) {
                    System.out.println("Event: Data Ready to Read");
                }

                iter.remove(); // CRITICAL: Remove handled key
            }
        }
    }
}
`,
    concepts: [
      "Channels: Bi-directional buffers for data (FileChannel, SocketChannel).",
      "Buffers: Containers for data (ByteBuffer, CharBuffer).",
      "Selectors: Multiplexors that monitor multiple channels for events.",
      "Non-blocking I/O: Threads don't wait for I/O to complete; they move on to other tasks.",
      "Zero-Copy: Efficiently transferring data between channels without copying to user space (transferTo)."
],
    tradeoffs: [
      "Pros: High scalability (thousands of connections per thread), efficient resource usage.",
      "Cons: Higher complexity (state management), harder to debug than traditional blocking I/O."
],
    interviewTips: [
      "Difference between IO (Blocking) and NIO (Non-blocking).",
      "What is the role of a Selector?",
      "How does Netty build upon Java NIO?",
      "Explain 'Zero-Copy' and why it's fast."
],
    deepDive: `
## Java NIO Deep Dive

### 1. The Problem with Blocking I/O (OIO)
In traditional \`java.io\`, each connection requires a dedicated thread. If you have 10,000 connections, you need 10,000 threads. This leads to massive memory overhead (stack size) and context-switching latency.

### 2. The NIO Solution
NIO uses a single thread (or a small pool) to manage many channels. The **Selector** is the heart of this. It queries the OS (using \`epoll\` on Linux) to find out which channels have data ready.

### 3. Channels & Buffers
Data is always read from a channel into a buffer, or written from a buffer into a channel. This provides a more flexible way to handle data than the stream-based approach of OIO.

### 4. Zero-Copy
NIO allows you to transfer data directly from a file channel to a socket channel (\`transferTo\`) without the data ever entering the Java application's memory. This bypasses the CPU and is extremely fast for serving static files or proxying data.
`,
    steps: [
      {
            "title": "Open Selector",
            "description": "Create a Selector to monitor multiple channels."
      },
      {
            "title": "Configure Channels",
            "description": "Set channels to non-blocking mode (`configureBlocking(false)`)."
      },
      {
            "title": "Register Events",
            "description": "Register channels with the selector for specific events (ACCEPT, READ, WRITE)."
      },
      {
            "title": "Event Loop",
            "description": "Run a loop that calls `select()` and processes ready keys."
      }
]
  },
  {
    id: "java-unsafe-api",
    category: "Java Core",
    title: "Java Unsafe API",
    description: "Exploring the low-level, internal API used for direct memory access and hardware-level operations.",
    javaCode: `
import sun.misc.Unsafe;
import java.lang.reflect.Field;

/**
 * JAVA UNSAFE API: Direct memory access.
 */
public class UnsafeDemo {
    public static void main(String[] args) throws Exception {
        // 1. Get the Unsafe instance via reflection
        Field f = Unsafe.class.getDeclaredField("theUnsafe");
        f.setAccessible(true);
        Unsafe unsafe = (Unsafe) f.get(null);

        // 2. Allocate memory directly
        long address = unsafe.allocateMemory(1024);
        
        // 3. Put and Get values
        unsafe.putInt(address, 42);
        System.out.println("Value at address: " + unsafe.getInt(address));

        // 4. Free memory manually
        unsafe.freeMemory(address);
    }
}
`,
    concepts: [
      "Off-heap Memory: Allocating memory outside the JVM's managed heap.",
      "Direct Memory Access: Reading and writing to memory addresses directly.",
      "CAS (Compare-And-Swap): Hardware-level atomic operations used by java.util.concurrent.",
      "Object Layout: Manipulating fields of an object by calculating their offsets.",
      "Thread Parking: The low-level mechanism used by LockSupport to pause threads."
],
    tradeoffs: [
      "Pros: Extreme performance for high-frequency trading or low-level systems, bypasses GC overhead.",
      "Cons: Highly dangerous (can crash the JVM), non-portable, being phased out in favor of safer APIs (VarHandle, Foreign Memory)."
],
    interviewTips: [
      "What is the Unsafe class used for? (Direct memory, CAS, thread parking).",
      "Why is it called 'Unsafe'? (No safety checks; manual memory management).",
      "How do libraries like Netty or Cassandra use it? (For high-performance off-heap buffers).",
      "What is the modern replacement for Unsafe? (VarHandle and Foreign Function & Memory API)."
],
    deepDive: `
## Java Unsafe API Deep Dive

### 1. The "Backdoor" to the JVM
The \`sun.misc.Unsafe\` class provides a collection of methods for performing low-level operations that are normally restricted. It is used extensively by the JDK itself and high-performance libraries.

### 2. Key Capabilities
*   **Memory Management**: \`allocateMemory\`, \`reallocateMemory\`, and \`freeMemory\`. This is "C-style" memory management in Java.
*   **CAS Operations**: \`compareAndSwapInt\`, \`compareAndSwapObject\`. These are the building blocks of atomic variables and non-blocking data structures.
*   **Field Offsets**: \`objectFieldOffset\`. Allows you to read/write fields of an object without using standard getters/setters or reflection.

### 3. The Future
Since Java 9, the JVM team has been working to provide safer alternatives.
*   **VarHandle** (Java 9): Replaces CAS and field offset operations.
*   **Foreign Function & Memory API** (Java 22): Replaces direct memory allocation and native calls.
`,
    steps: [
      {
            "title": "Understand Risks",
            "description": "Never use Unsafe in production unless you are building a low-level systems library."
      },
      {
            "title": "Access via Reflection",
            "description": "The constructor is private; you must use reflection to get the instance."
      },
      {
            "title": "Manual Cleanup",
            "description": "Always free any memory you allocate to avoid native memory leaks."
      },
      {
            "title": "Migrate to VarHandle",
            "description": "Use VarHandle for atomic operations in modern Java versions."
      }
]
  },
  {
    id: "java-foreign-function-memory-api",
    category: "Java Core",
    title: "Foreign Function & Memory API",
    description: "The modern replacement for JNI and Unsafe, providing safe and efficient access to native memory and functions.",
    javaCode: `
import java.lang.foreign.*;
import java.lang.invoke.MethodHandle;

/**
 * JAVA 22+: Foreign Function & Memory API (Project Panama).
 */
public class PanamaDemo {
    public static void main(String[] args) throws Throwable {
        // 1. Get a linker and lookup for native functions
        Linker linker = Linker.nativeLinker();
        SymbolLookup stdlib = linker.defaultLookup();

        // 2. Find the 'strlen' function in C standard library
        MethodHandle strlen = linker.downcallHandle(
            stdlib.find("strlen").get(),
            FunctionDescriptor.of(ValueLayout.JAVA_LONG, ValueLayout.ADDRESS)
        );

        // 3. Allocate native memory (off-heap)
        try (Arena arena = Arena.ofConfined()) {
            MemorySegment str = arena.allocateFrom("Hello Panama!");
            
            // 4. Call the native function
            long len = (long) strlen.invoke(str);
            System.out.println("String length from C: " + len);
        }
    }
}
`,
    concepts: [
      "Arena: Manages the lifecycle of native memory segments (automatic cleanup).",
      "MemorySegment: A contiguous region of memory, either on-heap or off-heap.",
      "Linker: The bridge between Java and native code (Downcall/Upcall).",
      "FunctionDescriptor: Describes the signature of a native function.",
      "ValueLayout: Defines the layout of data in memory (e.g., JAVA_INT, ADDRESS).",
      "Project Panama: The umbrella project for improving Java/Native interoperability."
],
    tradeoffs: [
      "Pros: Much safer than JNI (no manual pointer arithmetic), better performance, easier to use, integrated with Java's memory model.",
      "Cons: Requires Java 22+, still requires understanding of native memory layouts."
],
    interviewTips: [
      "What is Project Panama?",
      "How does the Foreign Function API replace JNI?",
      "What is an 'Arena' and why is it useful? (Deterministic memory management).",
      "Difference between a Downcall and an Upcall."
],
    deepDive: `
## Foreign Function & Memory API Deep Dive

### 1. The End of JNI
For decades, **JNI (Java Native Interface)** was the only way to call C/C++ code. It was slow, complex, and dangerous. **Project Panama** replaces it with a pure Java API that is faster and safer.

### 2. Memory Segments & Arenas
The API introduces \`MemorySegment\` to represent any block of memory. \`Arena\` controls when that memory is freed.
*   **Confined Arena**: Memory is tied to a single thread and freed when the arena is closed.
*   **Shared Arena**: Memory can be accessed by multiple threads.
*   **Global Arena**: Memory lives forever (like static variables).

### 3. Downcalls & Upcalls
*   **Downcall**: Java calling a native function (e.g., calling \`printf\` in C).
*   **Upcall**: Native code calling back into Java (e.g., a C library calling a Java callback function).
`,
    steps: [
      {
            "title": "Define Layout",
            "description": "Describe the native data structure or function signature using ValueLayout."
      },
      {
            "title": "Lookup Symbol",
            "description": "Find the native function address using SymbolLookup."
      },
      {
            "title": "Create Handle",
            "description": "Use the Linker to create a MethodHandle for the native function."
      },
      {
            "title": "Allocate & Call",
            "description": "Use an Arena to manage memory and invoke the handle."
      }
]
  },
  {
    id: "java-virtual-threads-internals",
    category: "Java Core",
    title: "Virtual Threads Internals",
    description: "Deep dive into how Project Loom implements millions of lightweight threads on top of a small pool of carrier threads.",
    javaCode: `
import java.util.concurrent.Executors;

/**
 * VIRTUAL THREADS: Mounting and Unmounting.
 */
public class VirtualThreadInternals {
    public static void main(String[] args) {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            executor.submit(() -> {
                System.out.println("Running on: " + Thread.currentThread());
                // When this thread sleeps, it 'unmounts' from the carrier thread
                Thread.sleep(1000);
                System.out.println("Resumed on: " + Thread.currentThread());
            });
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
`,
    concepts: [
      "Carrier Thread: A platform (OS) thread that executes virtual threads.",
      "Mounting: The process of assigning a virtual thread to a carrier thread.",
      "Unmounting: Releasing the carrier thread when the virtual thread performs a blocking I/O operation.",
      "Continuation: A mechanism to save the state (stack) of a thread and resume it later.",
      "ForkJoinPool: The default scheduler used to manage carrier threads.",
      "Pinning: A state where a virtual thread cannot be unmounted (e.g., inside a 'synchronized' block)."
],
    tradeoffs: [
      "Pros: Massive scalability for I/O bound tasks, simple 'thread-per-request' model, low memory overhead.",
      "Cons: Not suitable for CPU-bound tasks, 'Pinning' can lead to carrier thread exhaustion, requires Java 21+."
],
    interviewTips: [
      "How does a Virtual Thread differ from a Platform Thread?",
      "What is 'Thread Pinning' and how to avoid it? (Use ReentrantLock instead of synchronized).",
      "What happens to the stack when a virtual thread is unmounted? (It's moved to the heap).",
      "Why is ForkJoinPool used as the scheduler?"
],
    deepDive: `
## Virtual Threads Internals Deep Dive

### 1. The Magic of Continuations
Virtual threads are implemented using **Continuations**. When a virtual thread hits a blocking operation (like a DB call or \`Thread.sleep\`), the JVM saves its current stack and local variables to the **Heap**. The **Carrier Thread** is then free to run another virtual thread.

### 2. Mounting & Unmounting
*   **Mounting**: The JVM copies the virtual thread's stack from the heap back to the carrier thread's stack.
*   **Unmounting**: The JVM copies the stack back to the heap.
This context switch is incredibly fast (nanoseconds) compared to an OS thread context switch (microseconds).

### 3. The Pinning Problem
If a virtual thread is inside a \`synchronized\` block or calling a native method, it is **Pinned** to the carrier thread. It cannot be unmounted. If all carrier threads become pinned, the entire system stops.
**Solution**: Replace \`synchronized\` with \`java.util.concurrent.locks.ReentrantLock\`.
`,
    steps: [
      {
            "title": "Use Java 21",
            "description": "Ensure you are using a modern JDK with Project Loom."
      },
      {
            "title": "Avoid Synchronized",
            "description": "Audit your code and libraries for 'synchronized' blocks that might cause pinning."
      },
      {
            "title": "Use Per-Task Executor",
            "description": "Use Executors.newVirtualThreadPerTaskExecutor() for request handling."
      },
      {
            "title": "Monitor Carrier Threads",
            "description": "Use JFR to detect pinning and carrier thread contention."
      }
]
  },
  {
    id: "thread-pool",
    category: "Multithreading & Concurrency",
    title: "Thread Pool Executor",
    description: "A framework for managing and reusing a pool of threads to execute tasks efficiently.",
    javaCode: `
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.*;

/**
 * 1. Standard ThreadPoolExecutor Usage
 */
public class ThreadPoolDemo {
    public static void main(String[] args) {
        // Core: 2, Max: 4, KeepAlive: 60s, Queue: LinkedBlockingQueue(10)
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            2, 4, 60L, TimeUnit.SECONDS,
            new LinkedBlockingQueue<>(10),
            new CustomThreadFactory(),
            new ThreadPoolExecutor.CallerRunsPolicy()
        );

        for (int i = 0; i < 15; i++) {
            int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " running on " + Thread.currentThread().getName());
                try { Thread.sleep(1000); } catch (InterruptedException e) { }
            });
        }
        executor.shutdown();
    }
}

class CustomThreadFactory implements ThreadFactory {
    private final AtomicInteger count = new AtomicInteger(1);
    @Override
    public Thread newThread(Runnable r) {
        return new Thread(r, "MyPool-Thread-" + count.getAndIncrement());
    }
}

/**
 * 2. Simple Thread Pool Implementation from Scratch (Conceptual)
 */
class SimpleThreadPool {
    private final BlockingQueue<Runnable> taskQueue;
    private final List<WorkerThread> workers;
    private boolean isStopped = false;

    public SimpleThreadPool(int numThreads, int maxTasks) {
        taskQueue = new LinkedBlockingQueue<>(maxTasks);
        workers = new ArrayList<>();
        for (int i = 0; i < numThreads; i++) {
            WorkerThread worker = new WorkerThread(taskQueue);
            workers.add(worker);
            worker.start();
        }
    }

    public synchronized void execute(Runnable task) throws Exception {
        if (this.isStopped) throw new IllegalStateException("ThreadPool is stopped");
        this.taskQueue.put(task);
    }

    public synchronized void stop() {
        this.isStopped = true;
        for (WorkerThread worker : workers) {
            worker.doStop();
        }
    }

    private static class WorkerThread extends Thread {
        private final BlockingQueue<Runnable> taskQueue;
        private boolean isStopped = false;

        public WorkerThread(BlockingQueue<Runnable> queue) { this.taskQueue = queue; }

        public void run() {
            while (!isStopped()) {
                try {
                    Runnable runnable = taskQueue.take();
                    runnable.run();
                } catch (Exception e) {
                    // Log or handle error
                }
            }
        }

        public synchronized void doStop() { isStopped = true; this.interrupt(); }
        private synchronized boolean isStopped() { return isStopped; }
    }
}
`,
    concepts: [
      "Core Pool Size: Minimum number of threads to keep alive.",
      "Max Pool Size: Maximum threads allowed when queue is full.",
      "Work Queue: Bounded vs Unbounded (ArrayBlockingQueue vs LinkedBlockingQueue).",
      "Keep Alive Time: Time idle threads (above core) wait before terminating.",
      "Rejection Handlers: Abort, CallerRuns, Discard, DiscardOldest."
],
    tradeoffs: [
      "Bounded Queue: Prevents OOM but can reject tasks. Requires careful sizing.",
      "Unbounded Queue: Never rejects tasks but can lead to OOM under high load.",
      "CallerRunsPolicy: Provides backpressure by slowing down the producer."
],
    interviewTips: [
      "What happens when a task is submitted? (Core -> Queue -> Max -> Reject).",
      "Why use a bounded queue? (To prevent resource exhaustion).",
      "Difference between shutdown() and shutdownNow()."
],
    deepDive: `
## ThreadPoolExecutor Internal Working

### 1. Task Submission Flow
When a task is submitted via \`execute()\`:
1.  **If \`runningThreads < corePoolSize\`**: Create a new thread even if other core threads are idle.
2.  **If \`runningThreads >= corePoolSize\`**: Try to add the task to the \`workQueue\`.
3.  **If \`workQueue\` is full**:
    *   If \`runningThreads < maximumPoolSize\`: Create a new non-core thread.
    *   If \`runningThreads >= maximumPoolSize\`: Reject the task using the \`RejectedExecutionHandler\`.

### 2. Rejection Policies
*   **AbortPolicy (Default)**: Throws \`RejectedExecutionException\`.
*   **CallerRunsPolicy**: The thread that submitted the task executes it. Provides natural backpressure.
*   **DiscardPolicy**: Silently drops the task.
*   **DiscardOldestPolicy**: Drops the oldest task in the queue and retries submission.

### 3. Sizing the Pool
*   **CPU Bound Tasks**: \`Number of Cores + 1\`.
*   **I/O Bound Tasks**: \`Number of Cores * (1 + WaitTime/ServiceTime)\`. Usually much larger than CPU bound.
`,
    steps: [
      {
            "title": "Define Core/Max",
            "description": "Set corePoolSize and maximumPoolSize based on workload type."
      },
      {
            "title": "Select Queue",
            "description": "Choose a BlockingQueue implementation (Array vs Linked)."
      },
      {
            "title": "Set Rejection",
            "description": "Define what happens when the pool is saturated."
      },
      {
            "title": "Monitor",
            "description": "Use executor.getPoolSize() and getQueue().size() for health checks."
      }
]
  },
  {
    id: "blocking-queue",
    category: "Multithreading & Concurrency",
    title: "Blocking Queue from Scratch",
    description: "A thread-safe queue that blocks when trying to dequeue from an empty queue or enqueue into a full queue.",
    javaCode: `
import java.util.LinkedList;
import java.util.Queue;

/**
 * A thread-safe Blocking Queue implementation from scratch.
 */
public class CustomBlockingQueue<T> {
    private final Queue<T> queue;
    private final int capacity;

    public CustomBlockingQueue(int capacity) {
        this.queue = new LinkedList<>();
        this.capacity = capacity;
    }

    public synchronized void enqueue(T item) throws InterruptedException {
        while (queue.size() == capacity) {
            System.out.println("Queue Full. Producer waiting...");
            wait();
        }
        queue.add(item);
        System.out.println("Produced: " + item);
        notifyAll(); // Wake up waiting consumers
    }

    public synchronized T dequeue() throws InterruptedException {
        while (queue.isEmpty()) {
            System.out.println("Queue Empty. Consumer waiting...");
            wait();
        }
        T item = queue.poll();
        System.out.println("Consumed: " + item);
        notifyAll(); // Wake up waiting producers
        return item;
    }

    public static void main(String[] args) {
        CustomBlockingQueue<Integer> bq = new CustomBlockingQueue<>(5);

        // Producer Thread
        new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    bq.enqueue(i);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }).start();

        // Consumer Thread
        new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    bq.dequeue();
                    Thread.sleep(500); // Slower consumer to trigger "Full" state
                }
            } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        }).start();
    }
}
`,
    concepts: [
      "Wait/Notify Mechanism",
      "Condition Variables",
      "Producer-Consumer Synchronization",
      "Intrinsic Locks"
],
    tradeoffs: [
      "Pros: Simple, uses built-in Java synchronization.",
      "Cons: notifyAll() can be inefficient (thundering herd problem). ReentrantLock with Conditions is better."
],
    interviewTips: [
      "Explain why 'while' loop is used instead of 'if' for wait().",
      "Discuss the difference between notify() and notifyAll().",
      "Mention ArrayBlockingQueue and LinkedBlockingQueue in java.util.concurrent."
],
    deepDive: `
## Blocking Queue Design Guide

### 1. Problem Statement
Design a thread-safe queue that blocks when trying to dequeue from an empty queue or enqueue into a full queue.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    subgraph Producer
        P1[Enqueue Item] --> P2{Queue Full?}
        P2 -- Yes --> P3[Wait on NotFull Condition]
        P2 -- No --> P4[Add Item to Queue]
        P4 --> P5[Signal NotEmpty]
    end

    subgraph Consumer
        C1[Dequeue Item] --> C2{Queue Empty?}
        C2 -- Yes --> C3[Wait on NotEmpty Condition]
        C2 -- No --> C4[Poll Item from Queue]
        C4 --> C5[Signal NotFull]
    end
\`\`\`

### 3. Requirements
*   **Thread Safety**: Multiple producers and consumers must be able to access the queue safely.
*   **Blocking Behavior**: Threads should sleep efficiently when the queue is full or empty.
*   **Fairness**: (Optional) Ensure threads are served in the order they arrived.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant P as Producer
    participant Q as BlockingQueue
    participant C as Consumer
    
    P->>Q: enqueue(item)
    alt Queue Full
        Q-->>P: wait()
    else Queue Not Full
        Q->>Q: add(item)
        Q-->>C: notify()
    end
    
    C->>Q: dequeue()
    alt Queue Empty
        Q-->>C: wait()
    else Queue Not Empty
        Q->>Q: poll()
        Q-->>P: notify()
    end
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Lock Acquisition**: Every method is \`synchronized\`, meaning only one thread can execute \`enqueue\` or \`dequeue\` at a time.
2.  **Condition Check**:
    *   **Producer**: Checks if \`size == capacity\`.
    *   **Consumer**: Checks if \`size == 0\`.
3.  **Waiting**: If the condition is met, the thread calls \`wait()\`. This releases the lock and puts the thread in a waiting state.
4.  **Notification**:
    *   When a producer adds an item, it calls \`notifyAll()\` to wake up any waiting consumers.
    *   When a consumer removes an item, it calls \`notifyAll()\` to wake up any waiting producers.
5.  **Re-check**: Woken threads must re-acquire the lock and re-check the condition in a \`while\` loop to handle spurious wakeups.

### 6. Producer-Consumer Problem

The Blocking Queue is the standard solution for the Producer-Consumer problem, where one or more threads produce data and others consume it.

### 7. Why use 'while' instead of 'if'?

This is a critical interview question. When a thread is woken up by \`notifyAll()\`, it doesn't immediately resume execution. It must first re-acquire the lock. By the time it gets the lock, another thread might have already consumed the item (for consumers) or filled the queue (for producers). This is called a **Spurious Wakeup**. The \`while\` loop ensures the condition is re-checked.

### 8. notify() vs notifyAll()

*   **notify()**: Wakes up only one thread. Risky if multiple conditions are being waited on (e.g., both producers and consumers waiting on the same lock).
*   **notifyAll()**: Wakes up all threads. Safer but can lead to the "Thundering Herd" problem where many threads wake up but only one can proceed.

### 9. Modern Approach: ReentrantLock

In production, we use \`java.util.concurrent.locks.Condition\`. This allows us to have two separate wait sets: one for "not full" and one for "not empty". This is much more efficient as we can wake up only the specific type of thread we need.
`,
    steps: [
      {
            "title": "Acquire Lock",
            "description": "Enter the synchronized block."
      },
      {
            "title": "Wait on Condition",
            "description": "If the queue is full/empty, call wait() to release the lock and sleep."
      },
      {
            "title": "Perform Action",
            "description": "Add or remove the item from the underlying queue."
      },
      {
            "title": "Signal Others",
            "description": "Call notifyAll() to wake up threads waiting on the other condition."
      }
]
  },
  {
    id: "completable-future",
    category: "Multithreading & Concurrency",
    title: "CompletableFuture",
    description: "A powerful tool for asynchronous programming, allowing you to chain tasks and handle results non-blockingly.",
    javaCode: `
import java.util.concurrent.CompletableFuture;

/**
 * COMPLETABLE FUTURE: Asynchronous task chaining.
 */
public class AsyncWorkflow {
    public static void main(String[] args) throws Exception {
        CompletableFuture<String> workflow = CompletableFuture.supplyAsync(() -> {
            simulateDelay(500);
            System.out.println("Step 1: Fetching Data...");
            return "Raw_Data";
        }).thenApply(data -> {
            System.out.println("Step 2: Processing " + data);
            return data + "_Processed";
        }).thenCompose(processed -> CompletableFuture.supplyAsync(() -> {
            System.out.println("Step 3: Saving " + processed + " to DB...");
            return "Success_ID_101";
        })).exceptionally(ex -> {
            System.err.println("Error in workflow: " + ex.getMessage());
            return "Fallback_ID";
        });

        System.out.println("Final Result: " + workflow.get());
    }

    private static void simulateDelay(int ms) {
        try { Thread.sleep(ms); } catch (InterruptedException e) {}
    }
}
`,
    concepts: [
      "Asynchronous Programming: Non-blocking execution of tasks.",
      "Chaining: Compose multiple asynchronous tasks together.",
      "Exception Handling: Built-in support for handling errors in async pipelines."
],
    tradeoffs: [
      "Complexity: Harder to debug than synchronous code.",
      "Resource Management: Requires careful management of thread pools (Executor)."
],
    interviewTips: [
      "Explain the difference between supplyAsync and runAsync.",
      "Discuss how to combine multiple futures using allOf or anyOf."
],
    deepDive: `
## CompletableFuture Design Guide

### 1. Problem Statement
Write non-blocking, asynchronous code that is easy to read, chain, and handle errors, avoiding "Callback Hell".

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Start Async Task] --> B{Success?}
    B -- Yes --> C[Apply Transformation: thenApply]
    C --> D[Chain another Future: thenCompose]
    D --> E[Consume Result: thenAccept]
    B -- No --> F[Handle Exception: exceptionally]
    F --> G[Recover/Log]
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Execute tasks in a separate thread pool.
    *   Chain multiple dependent tasks.
    *   Combine results from multiple independent tasks.
*   **Non-Functional**:
    *   **Non-blocking**: The main thread should not wait for async tasks.
    *   **Error Propagation**: Exceptions should flow through the pipeline.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant M as Main Thread
    participant CF as CompletableFuture
    participant E as Executor (ForkJoinPool)
    
    M->>CF: supplyAsync(task)
    CF->>E: submit(task)
    M->>CF: thenApply(transform)
    Note over M: Main thread continues...
    E->>CF: complete(result)
    CF->>CF: apply(transform)
    CF-->>M: Final Result (via join/get)
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Task Initiation**: \`supplyAsync\` or \`runAsync\` is called, submitting a task to the \`ForkJoinPool.commonPool()\` (or a custom executor).
2.  **Future Creation**: A \`CompletableFuture\` object is returned immediately, representing the pending result.
3.  **Callback Registration**: Methods like \`thenApply\` or \`thenAccept\` register callbacks that will be executed once the future completes.
4.  **Completion**: When the background task finishes, it completes the future with the result or an exception.
5.  **Pipeline Execution**: The registered callbacks are executed in sequence. If a callback returns another future, \`thenCompose\` is used to flatten the result.
6.  **Error Handling**: If any stage fails, the exception is propagated down the chain until an \`exceptionally\` or \`handle\` block is reached.

### 6. Core Concepts

CompletableFuture is a powerful tool for asynchronous programming in Java. It allows you to write non-blocking code that is easy to read and maintain.

*   **Asynchronous Programming**: Non-blocking execution of tasks.
*   **Chaining**: Compose multiple asynchronous tasks together.
*   **Exception Handling**: Built-in support for handling errors in async pipelines.
`,
    steps: [
      {
            "title": "Start Async",
            "description": "Initiate an asynchronous task using supplyAsync or runAsync."
      },
      {
            "title": "Chain Tasks",
            "description": "Use thenApply, thenCompose, or thenCombine to chain further actions."
      },
      {
            "title": "Handle Errors",
            "description": "Use exceptionally or handle to manage potential failures."
      },
      {
            "title": "Wait/Join",
            "description": "Use join or get to wait for the final result if necessary."
      }
]
  },
  {
    id: "deadlock-prevention",
    category: "Multithreading & Concurrency",
    title: "Deadlock Prevention",
    description: "Techniques to prevent a situation where two or more threads are blocked forever, waiting for each other.",
    javaCode: `
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.ThreadLocalRandom;

/**
 * 1. Lock Ordering (Prevention)
 */
class OrderedLocking {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void safeMethod() {
        // Always acquire locks in the same order
        synchronized (lock1) {
            synchronized (lock2) {
                System.out.println("Locks acquired safely via ordering");
            }
        }
    }
}

/**
 * 2. tryLock with Timeout (Avoidance)
 */
class DeadlockAvoidance {
    private final Lock lock1 = new ReentrantLock();
    private final Lock lock2 = new ReentrantLock();

    public void safeMethod() throws InterruptedException {
        while (true) {
            boolean gotLock1 = lock1.tryLock();
            boolean gotLock2 = lock2.tryLock();

            if (gotLock1 && gotLock2) {
                try {
                    System.out.println("Locks acquired safely via tryLock");
                    return;
                } finally {
                    lock1.unlock();
                    lock2.unlock();
                }
            }

            // Release whatever we got and retry after a backoff
            if (gotLock1) lock1.unlock();
            if (gotLock2) lock2.unlock();
            
            Thread.sleep(ThreadLocalRandom.current().nextInt(10, 50));
        }
    }
}
`,
    concepts: [
      "Mutual Exclusion: Only one thread can hold a resource at a time.",
      "Hold and Wait: A thread holds a resource while waiting for another.",
      "No Preemption: Resources cannot be forcibly taken from a thread.",
      "Circular Wait: A closed chain of threads waiting for each other."
],
    tradeoffs: [
      "Performance vs. Safety: Strict lock ordering prevents deadlocks but can limit concurrency.",
      "Complexity: Managing lock orders across a large codebase is challenging."
],
    interviewTips: [
      "Explain the four conditions for deadlock (Coffman conditions).",
      "Discuss how to use tryLock with timeouts to avoid indefinite waiting."
],
    deepDive: `
## Deadlock Prevention Design Guide

### 1. Problem Statement
Prevent a situation where two or more threads are blocked forever, each waiting for a resource held by another.

### 2. Step-by-Step Workflow Diagram (Lock Ordering)
\`\`\`mermaid
graph TD
    A[Thread 1] --> B[Lock A]
    B --> C[Lock B]
    D[Thread 2] --> E[Lock A]
    E --> F[Lock B]
    Note over A,D: Both threads follow same order
\`\`\`

### 3. Requirements
*   **Safety**: Ensure no circular wait can ever occur.
*   **Liveness**: Threads should eventually make progress.
*   **Simplicity**: The prevention strategy should be easy to follow across the codebase.

### 4. Sequence Diagram (Deadlock Scenario)
\`\`\`mermaid
sequenceDiagram
    participant T1 as Thread 1
    participant L1 as Lock 1
    participant L2 as Lock 2
    participant T2 as Thread 2
    
    T1->>L1: Acquire
    T2->>L2: Acquire
    T1->>L2: Request (Blocked)
    T2->>L1: Request (Blocked)
    Note over T1,T2: DEADLOCK
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Resource Identification**: Identify all resources that require exclusive access (locks).
2.  **Global Ordering**: Assign a unique numeric ID or a strict hierarchy to every lock.
3.  **Acquisition Rule**: A thread must always acquire locks in increasing order of their IDs.
4.  **Release Rule**: Locks can be released in any order, but usually, it's the reverse of acquisition.
5.  **Timeout Strategy**: Use \`tryLock(timeout)\` as a fallback. If a thread cannot acquire all needed locks within a timeframe, it releases its current locks and retries after a backoff.

### 6. The Four Conditions (Coffman Conditions)

For a deadlock to occur, all four conditions must be met:
1.  **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2.  **Hold and Wait**: A thread must be holding at least one resource and waiting for another.
3.  **No Preemption**: Resources cannot be forcibly taken from a thread.
4.  **Circular Wait**: A set of threads exists such that each thread is waiting for a resource held by the next thread in the set.

### 7. Prevention Strategies

*   **Lock Ordering**: The most common and effective strategy. Always acquire locks in a predefined order.
*   **Lock Timeout**: Use \`ReentrantLock.tryLock(timeout)\`. If the lock isn't available, the thread can do something else or retry later.
*   **Deadlock Detection**: Allow deadlocks to occur, but have a background thread that detects them and kills one of the involved threads (common in databases).
`,
    steps: [
      {
            "title": "Identify Locks",
            "description": "List all resources that require synchronization."
      },
      {
            "title": "Establish Order",
            "description": "Define a global order for acquiring multiple locks."
      },
      {
            "title": "Enforce Order",
            "description": "Ensure all threads follow the established order when acquiring locks."
      },
      {
            "title": "Use Timeouts",
            "description": "Use ReentrantLock.tryLock() with a timeout to break potential deadlocks."
      }
]
  },
  {
    id: "java-virtual-threads",
    category: "Multithreading & Concurrency",
    title: "Java 21 Virtual Threads",
    description: "Understanding Project Loom and how virtual threads revolutionize high-concurrency Java apps.",
    javaCode: `
import java.util.concurrent.*;
import java.time.Duration;
import java.util.stream.IntStream;

public class VirtualThreadDemo {
    public static void main(String[] args) {
        // 1. Simple Virtual Thread
        Thread vThread = Thread.ofVirtual().name("my-v-thread").start(() -> {
            System.out.println("Running on: " + Thread.currentThread());
        });

        // 2. Virtual Thread Per Task Executor
        // This is the recommended way to handle high-concurrency I/O tasks
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 10_000).forEach(i -> {
                executor.submit(() -> {
                    // Simulate blocking I/O (e.g., DB call)
                    // The carrier thread is released during this sleep
                    Thread.sleep(Duration.ofMillis(100));
                    return i;
                });
            });
        } // Auto-close waits for all tasks to complete

        // 3. Comparison with Platform Threads
        // Running 100k platform threads would likely crash with OutOfMemory
        // Running 100k virtual threads is trivial (uses only a few carrier threads)
    }
}
`,
    concepts: [
      "Virtual Threads: Lightweight threads managed by the JVM, not the OS.",
      "Carrier Threads: The platform threads that execute virtual threads.",
      "Mounting/Unmounting: How virtual threads yield the carrier thread during blocking I/O.",
      "Scalability: Running millions of threads with minimal memory overhead.",
      "Thread-per-request: Returning to a simple synchronous programming model."
],
    tradeoffs: [
      "Pros: Massive scalability for I/O-bound tasks. Simple code compared to reactive programming.",
      "Cons: Not suitable for CPU-bound tasks. ThreadLocals can be memory-intensive if misused."
],
    interviewTips: [
      "Difference between Platform Threads and Virtual Threads.",
      "How do Virtual Threads handle blocking I/O? (Yielding).",
      "Why are Virtual Threads not good for CPU-intensive work?",
      "What is 'Pinning' and how to avoid it? (Avoid synchronized blocks with long I/O)."
],
    deepDive: `
## Java 21 Virtual Threads (Project Loom)

### 1. The Problem
Traditional Java threads (Platform Threads) are wrappers around OS threads. They are expensive (1MB+ stack) and limited in number (a few thousands). This led to complex reactive/asynchronous programming models to handle high concurrency.

### 2. The Solution: Virtual Threads
Virtual threads are "user-mode" threads. They are extremely lightweight. When a virtual thread performs a blocking I/O operation (like a DB call), the JVM "unmounts" it from the carrier thread, allowing other virtual threads to run. When the I/O completes, it is "remounted" and continues.

### 3. Best Practices
*   **Don't Pool**: Virtual threads are cheap. Just create a new one per task.
*   **Avoid Pinning**: Don't use \`synchronized\` blocks around long-running I/O operations; use \`ReentrantLock\` instead.
*   **I/O Bound Only**: Use them for tasks that spend most of their time waiting for I/O.
`,
    steps: [
      {
            "title": "Identify I/O Tasks",
            "description": "Find parts of the app that block on network or disk."
      },
      {
            "title": "Update Executor",
            "description": "Switch to Executors.newVirtualThreadPerTaskExecutor()."
      },
      {
            "title": "Remove Pooling",
            "description": "Stop using fixed-size thread pools for these tasks."
      },
      {
            "title": "Monitor Pinning",
            "description": "Use JFR (Java Flight Recorder) to detect pinned threads."
      }
]
  },
  {
    id: "advanced-concurrency-interview",
    category: "Multithreading & Concurrency",
    title: "SDE3 Concurrency Interview Questions",
    description: "Advanced multithreading questions and scenarios for senior engineering roles.",
    javaCode: `
import java.util.concurrent.*;
import java.util.concurrent.locks.*;

/**
 * Scenario: Implementing a Thread-Safe Bounded Buffer
 * using ReentrantLock and Conditions
 */
class BoundedBuffer<T> {
    private final T[] items;
    private int putPtr, takePtr, count;
    private final Lock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    @SuppressWarnings("unchecked")
    public BoundedBuffer(int capacity) { items = (T[]) new Object[capacity]; }

    public void put(T x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) notFull.await();
            items[putPtr] = x;
            if (++putPtr == items.length) putPtr = 0;
            ++count;
            notEmpty.signal();
        } finally { lock.unlock(); }
    }

    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) notEmpty.await();
            T x = items[takePtr];
            if (++takePtr == items.length) takePtr = 0;
            --count;
            notFull.signal();
            return x;
        } finally { lock.unlock(); }
    }
}
`,
    concepts: [
      "Happens-Before Relationship: Memory visibility guarantees.",
      "CAS (Compare-And-Swap): Lock-free concurrency.",
      "False Sharing: Cache line contention.",
      "Thread Starvation vs Deadlock vs Livelock."
],
    tradeoffs: [
      "Lock-based: Easier to reason about but can have high contention.",
      "Lock-free: High performance but extremely complex to implement correctly."
],
    interviewTips: [
      "How would you design a thread-safe Singleton? (Double-checked locking + volatile).",
      "Explain the 'Diamond Problem' in the context of concurrent updates.",
      "How does ConcurrentHashMap achieve high concurrency? (Segment locking vs CAS).",
      "Design a Rate Limiter using multithreading primitives."
],
    deepDive: `
## SDE3 Multithreading Interview Prep

### 1. Memory Visibility & Volatile
The \`volatile\` keyword ensures that a variable is always read from and written to the main memory, not the CPU cache. It provides a "happens-before" guarantee but does NOT ensure atomicity (e.g., \`i++\` is still not thread-safe).

### 2. Optimistic vs Pessimistic Locking
*   **Pessimistic**: Assume conflict will happen. Use \`synchronized\` or \`ReentrantLock\`.
*   **Optimistic**: Assume no conflict. Use \`AtomicInteger\` (CAS). Better for low contention.

### 3. Advanced Scenarios
*   **Producer-Consumer with Bounded Buffer**: Use \`Condition\` objects (\`notFull\`, \`notEmpty\`).
*   **Dining Philosophers**: Classic deadlock scenario. Solution: Resource hierarchy or \`tryLock\`.
*   **Fork/Join Framework**: Work-stealing algorithm for recursive tasks.
`,
    steps: [
      {
            "title": "Analyze Requirements",
            "description": "Determine if the task is CPU-bound or I/O-bound."
      },
      {
            "title": "Choose Primitive",
            "description": "Select between synchronized, Lock, Semaphore, or Atomic."
      },
      {
            "title": "Handle Exceptions",
            "description": "Ensure threads are cleaned up and errors are logged."
      },
      {
            "title": "Test for Race Conditions",
            "description": "Use tools like jcstress or thread dump analysis."
      }
]
  },
  {
    id: "singleton",
    category: "Multithreading & Concurrency",
    title: "Thread-Safe Singleton",
    description: "Ensures a class has only one instance and provides a global point of access to it, safely in multi-threaded environments.",
    javaCode: `
// 1. Double-Checked Locking (Recommended for lazy loading)
public class DoubleCheckedSingleton {
    private static volatile DoubleCheckedSingleton instance;

    private DoubleCheckedSingleton() {}

    public static DoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
}

// 2. Bill Pugh Singleton (Thread-safe, lazy, no synchronization overhead)
public class BillPughSingleton {
    private BillPughSingleton() {}

    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}

// 3. Enum Singleton (Best protection against reflection/serialization)
public enum EnumSingleton {
    INSTANCE;
    public void doSomething() {}
}`,
    concepts: [
      "Volatile Keyword (Memory Visibility)",
      "Lazy Initialization",
      "Reflection Attack Protection",
      "Serialization Issues"
],
    tradeoffs: [
      "Eager: Simple but wastes memory if not used.",
      "Lazy (Synchronized): Thread-safe but slow due to lock overhead.",
      "Double-Checked: Efficient but requires 'volatile' for correctness."
],
    interviewTips: [
      "Explain why 'volatile' is necessary in Double-Checked Locking.",
      "Discuss how Reflection can break Singletons and how Enums prevent it.",
      "Mention the 'readResolve()' method for serializable singletons."
],
    deepDive: `
## Thread-Safe Singleton Design Guide

### 1. Problem Statement
Ensure a class has only one instance and provide a global point of access to it, safely in multi-threaded environments.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Call getInstance] --> B{Instance == null?}
    B -- No --> C[Return Instance]
    B -- Yes --> D[Synchronize on Class]
    D --> E{Instance == null?}
    E -- No --> F[Return Instance]
    E -- Yes --> G[Create Instance]
    G --> H[Return Instance]
\`\`\`

### 3. Requirements
*   **Uniqueness**: Only one instance allowed.
*   **Global Access**: Provide a static method to get the instance.
*   **Thread Safety**: Must work correctly in multi-threaded environments.
*   **Lazy Loading**: Instance should be created only when needed.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant T1 as Thread 1
    participant T2 as Thread 2
    participant S as Singleton Class
    
    T1->>S: getInstance()
    S->>S: Check instance == null (True)
    T2->>S: getInstance()
    S->>S: Check instance == null (True)
    S->>S: Synchronize block
    T1->>S: Acquire Lock
    T1->>S: Re-check null & Create Instance
    T1->>S: Release Lock
    T2->>S: Acquire Lock
    T2->>S: Re-check null (False)
    T2->>S: Release Lock
    S-->>T1: Return Instance
    S-->>T2: Return Instance
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Initial Call**: A thread calls \`getInstance()\`.
2.  **First Check**: It checks if \`instance\` is null. If not, it returns the instance immediately (fast path).
3.  **Synchronization**: If null, it enters a \`synchronized\` block on the class.
4.  **Second Check**: Inside the block, it checks \`instance == null\` again. This is vital because another thread might have initialized it while this thread was waiting for the lock.
5.  **Initialization**: If still null, it creates the instance.
6.  **Volatile Write**: The \`volatile\` keyword ensures that the write to the \`instance\` variable is visible to all threads and that the object is fully constructed before the reference is assigned.

### 6. The Singleton Challenge

In a multi-threaded environment, simple lazy initialization can result in multiple instances if two threads enter the \`if (instance == null)\` block simultaneously.

### Double-Checked Locking (DCL)

DCL reduces synchronization overhead by checking the instance twice.
*   **First Check**: Without synchronization, to see if the instance is already created.
*   **Second Check**: Inside a synchronized block, to ensure only one thread creates the instance.
*   **The Volatile Keyword**: Crucial! It prevents **instruction reordering**. Without it, a thread might see a non-null instance that hasn't been fully initialized yet.

### Bill Pugh Singleton

This approach uses an **Inner Static Class**. The inner class is not loaded into memory until \`getInstance()\` is called. This provides lazy initialization without the need for explicit synchronization, as the JVM handles class loading thread-safely.

### Enum Singleton

The most robust way. It provides built-in thread safety and protects against reflection and serialization attacks out of the box.
`,
    steps: [
      {
            "title": "Check Instance",
            "description": "Check if the instance is null without locking."
      },
      {
            "title": "Synchronize",
            "description": "Acquire a lock on the class object."
      },
      {
            "title": "Re-check",
            "description": "Check again inside the lock to prevent race conditions."
      },
      {
            "title": "Initialize",
            "description": "Create the instance and assign it to the volatile variable."
      }
]
  },
  {
    id: "solid-principles",
    category: "Object-Oriented Design & Patterns",
    title: "SOLID Principles",
    description: "A set of five design principles intended to make software designs more understandable, flexible, and maintainable.",
    javaCode: `
/**
 * 1. Single Responsibility (SRP)
 */
class Invoice {
    public void calculateTotal() { /* ... */ }
}
class InvoicePrinter {
    public void print(Invoice invoice) { /* ... */ }
}

/**
 * 2. Open/Closed (OCP)
 */
interface DiscountStrategy { double apply(double amount); }
class FestiveDiscount implements DiscountStrategy {
    public double apply(double amount) { return amount * 0.8; }
}

/**
 * 3. Liskov Substitution (LSP)
 */
interface Shape { double getArea(); }
class Rectangle implements Shape {
    protected double width, height;
    public double getArea() { return width * height; }
}
class Square implements Shape {
    private double side;
    public double getArea() { return side * side; }
}

/**
 * 4. Interface Segregation (ISP)
 */
interface Worker { void work(); }
interface Eater { void eat(); }
class Human implements Worker, Eater {
    public void work() { /* ... */ }
    public void eat() { /* ... */ }
}
class Robot implements Worker {
    public void work() { /* ... */ }
}

/**
 * 5. Dependency Inversion (DIP)
 */
interface MessageSender { void send(String msg); }
class EmailSender implements MessageSender {
    public void send(String msg) { /* ... */ }
}
class NotificationService {
    private final MessageSender sender;
    public NotificationService(MessageSender sender) { this.sender = sender; }
    public void notify(String msg) { sender.send(msg); }
}
`,
    concepts: [
      "Single Responsibility: A class should have one, and only one, reason to change.",
      "Open/Closed: Software entities should be open for extension, but closed for modification.",
      "Liskov Substitution: Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.",
      "Interface Segregation: Clients should not be forced to depend upon interfaces that they do not use.",
      "Dependency Inversion: Depend upon abstractions, not concretions."
],
    tradeoffs: [
      "Pros: Highly maintainable, testable, and scalable code. Reduced coupling.",
      "Cons: Can lead to more complex designs with many small classes and interfaces. Over-engineering risk."
],
    interviewTips: [
      "Be prepared to give a real-world example for each principle.",
      "Explain how SOLID relates to Design Patterns.",
      "Discuss the difference between Dependency Inversion and Dependency Injection."
],
    deepDive: `
## SOLID Principles Design Guide

### 1. Single Responsibility Principle (SRP)
Every module or class should have responsibility over a single part of the functionality provided by the software. This minimizes the impact of changes.

### 2. Open/Closed Principle (OCP)
You should be able to add new functionality without changing existing code. This is usually achieved using interfaces and abstract classes.

### 3. Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types. If a program is using a base class, then the reference to the base class can be replaced with a derived class without affecting the functionality of the program.

### 4. Interface Segregation Principle (ISP)
Many client-specific interfaces are better than one general-purpose interface. No client should be forced to depend on methods it does not use.

### 5. Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.
`,
    steps: [
      {
            "title": "Analyze Responsibilities",
            "description": "Break down large classes into smaller ones with single tasks."
      },
      {
            "title": "Use Abstractions",
            "description": "Define interfaces for behaviors that might change or expand."
      },
      {
            "title": "Verify Substitutability",
            "description": "Ensure subclasses don't violate the contracts of their parent classes."
      },
      {
            "title": "Invert Dependencies",
            "description": "Inject dependencies rather than creating them inside classes."
      }
]
  },
  {
    id: "factory-pattern",
    category: "Object-Oriented Design & Patterns",
    title: "Factory Pattern Variations",
    description: "Defines an interface for creating an object, but lets subclasses decide which class to instantiate. Covers Simple Factory, Factory Method, and Abstract Factory.",
    javaCode: `
import java.util.*;

/**
 * FACTORY PATTERN: Decoupling object creation.
 */
interface Document { void open(); }
class PdfDocument implements Document { public void open() { System.out.println("Opening PDF Document..."); } }
class WordDocument implements Document { public void open() { System.out.println("Opening Word Document..."); } }

abstract class DocumentCreator {
    public abstract Document createDocument();
    public void openDocument() {
        Document doc = createDocument();
        doc.open();
    }
}

class PdfCreator extends DocumentCreator { 
    public Document createDocument() { return new PdfDocument(); } 
}

class WordCreator extends DocumentCreator { 
    public Document createDocument() { return new WordDocument(); } 
}

/**
 * ABSTRACT FACTORY: Families of related products.
 */
interface Button { void render(); }
interface Checkbox { void render(); }

class WinButton implements Button { public void render() { System.out.println("Rendering Windows Button"); } }
class WinCheckbox implements Checkbox { public void render() { System.out.println("Rendering Windows Checkbox"); } }

class MacButton implements Button { public void render() { System.out.println("Rendering Mac Button"); } }
class MacCheckbox implements Checkbox { public void render() { System.out.println("Rendering Mac Checkbox"); } }

interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class WinFactory implements GUIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}

public class FactoryDemo {
    public static void main(String[] args) {
        System.out.println("--- Factory Method ---");
        DocumentCreator creator = new PdfCreator();
        creator.openDocument();

        System.out.println("
--- Abstract Factory (Windows) ---");
        GUIFactory winFactory = new WinFactory();
        winFactory.createButton().render();
        winFactory.createCheckbox().render();

        System.out.println("
--- Abstract Factory (Mac) ---");
        GUIFactory macFactory = new MacFactory();
        macFactory.createButton().render();
        macFactory.createCheckbox().render();
    }
}
`,
    concepts: [
      "Simple Factory: Centralized static method for creation.",
      "Factory Method: Defer instantiation to subclasses (OCP compliant).",
      "Abstract Factory: Factory of factories; creates families of related products.",
      "Loose Coupling: Client depends on abstractions, not concrete implementations."
],
    tradeoffs: [
      "Pros: Decouples creation from usage. Supports Open/Closed Principle.",
      "Cons: Increased complexity with many classes. Abstract Factory can be hard to extend with new product types."
],
    interviewTips: [
      "When to use Factory Method vs Abstract Factory? (Single product vs Family of products).",
      "How does it relate to Dependency Injection? (DI often uses factories under the hood).",
      "Explain how 'Static Factory Methods' in Java (e.g., Optional.of) differ from the pattern."
],
    deepDive: `
## Factory Pattern Variations

### 1. Simple Factory
A simple class with a method that returns different objects based on input. It violates the Open/Closed Principle because you must modify the factory class to add new products.

### 2. Factory Method
The "Real" Factory Pattern. It uses inheritance to allow subclasses to decide which concrete class to instantiate. The base class provides the interface, and subclasses implement the creation logic.

### 3. Abstract Factory
A higher-level abstraction. It defines an interface for creating a "family" of related objects (e.g., Windows UI vs Mac UI). It often uses Factory Methods internally.

### Comparison Table

| Variation | Complexity | Flexibility | Use Case |
| :--- | :--- | :--- | :--- |
| **Simple Factory** | Low | Low | Simple creation logic, few products. |
| **Factory Method** | Medium | High | When you don't know the exact types of objects beforehand. |
| **Abstract Factory** | High | Very High | When you need to create families of related objects. |
`,
    steps: [
      {
            "title": "Identify Products",
            "description": "Define a common interface for all products."
      },
      {
            "title": "Choose Variation",
            "description": "Select Simple, Method, or Abstract based on complexity."
      },
      {
            "title": "Implement Creator",
            "description": "Create the factory class or abstract creator."
      },
      {
            "title": "Decouple Client",
            "description": "Ensure the client only uses the product interface."
      }
]
  },
  {
    id: "builder-pattern",
    category: "Object-Oriented Design & Patterns",
    title: "Builder Pattern",
    description: "Separates the construction of a complex object from its representation.",
    javaCode: `
/**
 * BUILDER PATTERN: Constructing complex objects step by step.
 */
class User {
    private final String firstName; // Required
    private final String lastName;  // Required
    private final int age;          // Optional
    private final String phone;     // Optional

    private User(Builder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.phone = builder.phone;
    }

    @Override
    public String toString() {
        return "User: " + firstName + " " + lastName + ", Age: " + age + ", Phone: " + phone;
    }

    public static class Builder {
        private final String firstName;
        private final String lastName;
        private int age;
        private String phone;

        public Builder(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public User build() {
            User user = new User(this);
            validateUserObject(user);
            return user;
        }

        private void validateUserObject(User user) {
            if (user.age < 0 || user.age > 120) {
                throw new IllegalArgumentException("Invalid age: " + user.age);
            }
        }
    }

    public static void main(String[] args) {
        User user1 = new User.Builder("John", "Doe")
            .age(30)
            .phone("1234567")
            .build();
        System.out.println(user1);

        try {
            User user2 = new User.Builder("Jane", "Smith")
                .age(-5) // Invalid age
                .build();
        } catch (IllegalArgumentException e) {
            System.out.println("Error creating user: " + e.getMessage());
        }
    }
}
`,
    concepts: [
      "Immutability: Helps create immutable objects with many optional parameters.",
      "Readability: Avoids 'telescoping constructors'.",
      "Step-by-Step Construction: Allows building an object in multiple stages."
],
    tradeoffs: [
      "Boilerplate: Requires creating a static inner Builder class.",
      "Overhead: Slightly more memory usage due to the extra Builder object."
],
    interviewTips: [
      "Discuss when to use Builder vs. a simple constructor.",
      "Explain how Lombok' @Builder annotation simplifies this pattern."
],
    deepDive: `
## Builder Pattern Design Guide

### 1. Problem Statement
Design a way to construct complex objects step-by-step, especially when the object has many optional parameters, while ensuring the resulting object is immutable.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Client] --> B[Builder Object]
    B --> C[Set Field 1]
    C --> D[Set Field 2]
    D --> E[Set Field N]
    E --> F[Call build]
    F --> G[Constructor of Target Class]
    G --> H[Return Immutable Object]
\`\`\`

### 3. Requirements
*   **Immutability**: The final object should not have setters.
*   **Readability**: Avoid "telescoping constructors" (constructors with 10+ parameters).
*   **Validation**: Ensure the object is in a valid state before it's fully constructed.
*   **Flexibility**: Allow parameters to be set in any order.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant B as Builder
    participant T as Target Object
    
    C->>B: new Builder()
    C->>B: setName("John")
    B-->>C: this (Builder)
    C->>B: setAge(30)
    B-->>C: this (Builder)
    C->>B: build()
    B->>T: new Target(this)
    T-->>B: instance
    B-->>C: instance
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Private Constructor**: The target class has a private constructor that takes the \`Builder\` as an argument.
2.  **Static Inner Class**: A static inner class named \`Builder\` is created inside the target class.
3.  **Fluent Methods**: The \`Builder\` has methods for each field of the target class. Each method sets the field and returns \`this\` (the builder instance), allowing for method chaining.
4.  **Build Method**: The \`Builder\` has a \`build()\` method that calls the private constructor of the target class and returns the final object.
5.  **Validation**: Inside the \`build()\` method, you can perform validation logic to ensure all required fields are set correctly.

### 6. Telescoping Constructor Problem
Without the Builder pattern, you might end up with constructors like:
\`\`\`java
public User(String name) { ... }
public User(String name, int age) { ... }
public User(String name, int age, String email) { ... }
public User(String name, int age, String email, String address) { ... }
\`\`\`
This becomes unmanageable as the number of parameters grows.

### 7. Benefits
*   **Clean Code**: The client code is much more readable: \`User.builder().name("John").age(30).build()\`.
*   **Immutability**: Since the target class has no setters, it's thread-safe once created.
*   **Parameter Control**: You can make certain parameters mandatory by requiring them in the Builder's constructor.

### 8. Builder vs. Factory
*   **Factory**: Focuses on creating one of several related objects (polymorphism).
*   **Builder**: Focuses on the step-by-step construction of a single complex object.
`,
    steps: [
      {
            "title": "Static Inner Class",
            "description": "Create a static inner class named Builder."
      },
      {
            "title": "Fluent Methods",
            "description": "Add methods to the Builder that return 'this' for chaining."
      },
      {
            "title": "Build Method",
            "description": "Implement a build() method that returns the final object."
      },
      {
            "title": "Private Constructor",
            "description": "Make the main class constructor private to force the use of the Builder."
      }
]
  },
  {
    id: "observer-pattern",
    category: "Object-Oriented Design & Patterns",
    title: "Observer Pattern",
    description: "Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
    javaCode: `
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * OBSERVER PATTERN: One-to-many dependency notification.
 */
interface StockObserver {
    void update(String stockSymbol, double price);
}

class StockMarket {
    private final List<StockObserver> observers = new CopyOnWriteArrayList<>();
    private final String symbol;
    private double price;

    public StockMarket(String symbol) { this.symbol = symbol; }

    public void register(StockObserver observer) { observers.add(observer); }
    public void unregister(StockObserver observer) { observers.remove(observer); }

    public void setPrice(double newPrice) {
        this.price = newPrice;
        notifyObservers();
    }

    private void notifyObservers() {
        for (StockObserver observer : observers) {
            observer.update(symbol, price);
        }
    }
}

class MobileAppDisplay implements StockObserver {
    private String name;
    public MobileAppDisplay(String name) { this.name = name; }
    @Override
    public void update(String symbol, double price) {
        System.out.println("[" + name + "] " + symbol + " price updated to: \$" + price);
    }
}

public class ObserverDemo {
    public static void main(String[] args) {
        StockMarket appleStock = new StockMarket("AAPL");
        
        StockObserver user1 = new MobileAppDisplay("User1_Phone");
        StockObserver user2 = new MobileAppDisplay("User2_Tablet");
        
        appleStock.register(user1);
        appleStock.register(user2);
        
        System.out.println("--- Market Update 1 ---");
        appleStock.setPrice(150.50);
        
        appleStock.unregister(user1);
        
        System.out.println("--- Market Update 2 ---");
        appleStock.setPrice(152.75);
    }
}
`,
    concepts: [
      "Loose Coupling: The subject doesn't need to know the details of the observers.",
      "Broadcast Communication: One change can trigger many updates.",
      "Dynamic Relationships: Observers can be added or removed at runtime."
],
    tradeoffs: [
      "Memory Leaks: If observers are not removed, they can prevent the subject from being garbage collected.",
      "Unexpected Updates: Observers may be notified of changes they don't care about."
],
    interviewTips: [
      "Explain how Java's PropertyChangeListener implements this pattern.",
      "Discuss the difference between push and pull models of notification."
],
    deepDive: `
## Observer Pattern Design Guide

### 1. Problem Statement
Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Subject State Change] --> B[Notify Observers]
    B --> C[Observer 1: update]
    B --> D[Observer 2: update]
    B --> E[Observer 3: update]
    C --> F[React/Refresh]
    D --> G[React/Refresh]
    E --> H[React/Refresh]
\`\`\`

### 3. Requirements
*   **Loose Coupling**: The subject should not know the specific classes of its observers.
*   **Dynamic Subscription**: Observers should be able to register and unregister at runtime.
*   **Consistency**: All observers should be updated to a consistent state.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant S as Subject
    participant O1 as Observer 1
    participant O2 as Observer 2
    
    S->>S: stateChanged()
    S->>O1: update(data)
    O1-->>S: Ack
    S->>O2: update(data)
    O2-->>S: Ack
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Subscription**: Observers register themselves with the \`Subject\` by calling a method like \`addObserver(this)\`.
2.  **State Change**: An event occurs in the \`Subject\` that changes its internal state.
3.  **Notification**: The \`Subject\` iterates through its list of registered observers.
4.  **Update**: For each observer, the \`Subject\` calls the \`update()\` method defined in the \`Observer\` interface.
5.  **Reaction**: Each observer performs its specific logic in response to the notification (e.g., updating a UI component or logging an event).

### 6. Core Concepts

The Observer Pattern is essential for building event-driven systems. It allows objects to subscribe to events and react to state changes in other objects without being tightly coupled.

*   **Loose Coupling**: The subject doesn't need to know the details of the observers.
*   **Broadcast Communication**: One change can trigger many updates.
*   **Dynamic Relationships**: Observers can be added or removed at runtime.
`,
    steps: [
      {
            "title": "Define Interface",
            "description": "Create an Observer interface with an update method."
      },
      {
            "title": "Subject Class",
            "description": "Create a Subject class that maintains a list of observers and provides methods to add/remove them."
      },
      {
            "title": "Concrete Observers",
            "description": "Implement concrete observer classes that react to updates."
      },
      {
            "title": "Notify",
            "description": "The Subject calls the update method on all registered observers when its state changes."
      }
]
  },
  {
    id: "strategy-pattern",
    category: "Object-Oriented Design & Patterns",
    title: "Strategy vs State Pattern",
    description: "Strategy defines a family of algorithms. State allows an object to alter its behavior when its internal state changes.",
    javaCode: `
import java.util.*;

/**
 * STRATEGY PATTERN: Interchangeable algorithms
 */
interface PaymentStrategy {
    void pay(int amount);
}

class CreditCardStrategy implements PaymentStrategy {
    private String name;
    private String cardNumber;

    public CreditCardStrategy(String nm, String ccNum) {
        this.name = nm;
        this.cardNumber = ccNum;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid with credit card [" + cardNumber + "]");
    }
}

class PaypalStrategy implements PaymentStrategy {
    private String emailId;

    public PaypalStrategy(String email) {
        this.emailId = email;
    }

    @Override
    public void pay(int amount) {
        System.out.println(amount + " paid using Paypal [" + emailId + "]");
    }
}

class ShoppingCart {
    private List<Item> items = new ArrayList<>();

    public void addItem(Item item) { this.items.add(item); }

    public int calculateTotal() {
        return items.stream().mapToInt(Item::getPrice).sum();
    }

    public void pay(PaymentStrategy paymentMethod) {
        int amount = calculateTotal();
        paymentMethod.pay(amount);
    }
}

/**
 * STATE PATTERN: Behavior changes with internal state
 */
interface State {
    void doAction(Context context);
}

class StartState implements State {
    public void doAction(Context context) {
        System.out.println("Player is in start state");
        context.setState(this);
    }
    public String toString() { return "Start State"; }
}

class StopState implements State {
    public void doAction(Context context) {
        System.out.println("Player is in stop state");
        context.setState(this);
    }
    public String toString() { return "Stop State"; }
}

class Context {
    private State state;
    public Context() { state = null; }
    public void setState(State state) { this.state = state; }
    public State getState() { return state; }
}

class Item {
    private String code;
    private int price;
    public Item(String c, int p) { this.code = c; this.price = p; }
    public int getPrice() { return price; }
}

public class PatternDemo {
    public static void main(String[] args) {
        // Strategy Demo
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(new Item("1234", 10));
        cart.addItem(new Item("5678", 40));
        cart.pay(new PaypalStrategy("myemail@example.com"));

        // State Demo
        Context context = new Context();
        StartState startState = new StartState();
        startState.doAction(context);
        System.out.println(context.getState().toString());
    }
}
`,
    concepts: [
      "Strategy: Client chooses the algorithm. Focuses on 'How' to do something.",
      "State: Object changes behavior automatically based on internal state. Focuses on 'What' the object is.",
      "Encapsulation: Both patterns encapsulate logic into separate classes.",
      "Composition over Inheritance: Both use composition to achieve flexibility."
],
    tradeoffs: [
      "Pros: Eliminates complex conditional logic (if/else, switch). High maintainability.",
      "Cons: Increased number of classes. Client must be aware of strategies (in Strategy pattern)."
],
    interviewTips: [
      "Key Difference: In Strategy, the client usually provides the strategy. In State, the states themselves often handle transitions.",
      "Real-world Strategy: Payment methods (Credit Card, PayPal).",
      "Real-world State: Vending machine states (NoCoin, HasCoin, Sold)."
],
    deepDive: `
## Strategy vs State Pattern

### 1. Strategy Pattern
The Strategy pattern is about having different ways to perform the same task. The client is responsible for choosing which strategy to use. It's a "plug-and-play" mechanism for algorithms.

### 2. State Pattern
The State pattern is about an object's behavior changing as its internal state changes. The transitions between states are often handled by the states themselves or the context, not the client.

### Comparison Table

| Feature | Strategy Pattern | State Pattern |
| :--- | :--- | :--- |
| **Intent** | Encapsulate interchangeable algorithms. | Encapsulate state-dependent behavior. |
| **Knowledge** | Client knows which strategy to use. | Client is often unaware of state transitions. |
| **Transitions** | No transitions; one strategy is used. | States transition to other states. |
| **Focus** | "How" a task is performed. | "What" an object is at a given time. |
`,
    steps: [
      {
            "title": "Identify Logic",
            "description": "Find complex conditionals that depend on algorithms or states."
      },
      {
            "title": "Define Interface",
            "description": "Create an interface for the behavior."
      },
      {
            "title": "Implement Concrete Classes",
            "description": "Create classes for each algorithm or state."
      },
      {
            "title": "Context Integration",
            "description": "Use composition in the context class to hold the current strategy/state."
      }
]
  },
  {
    id: "decorator-pattern",
    category: "Object-Oriented Design & Patterns",
    title: "Decorator Pattern",
    description: "Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.",
    javaCode: `
/**
 * DECORATOR PATTERN: Adding responsibilities dynamically.
 */
interface MessageService {
    String send(String message);
}

class BasicMessageService implements MessageService {
    @Override
    public String send(String message) { return "Message: " + message; }
}

abstract class MessageDecorator implements MessageService {
    protected MessageService decoratedService;
    public MessageDecorator(MessageService service) { this.decoratedService = service; }
    public String send(String message) { return decoratedService.send(message); }
}

class EncryptionDecorator extends MessageDecorator {
    public EncryptionDecorator(MessageService service) { super(service); }
    @Override
    public String send(String message) {
        return super.send("ENCRYPTED(" + message + ")");
    }
}

class CompressionDecorator extends MessageDecorator {
    public CompressionDecorator(MessageService service) { super(service); }
    @Override
    public String send(String message) {
        return super.send("COMPRESSED(" + message + ")");
    }
}

class LoggingDecorator extends MessageDecorator {
    public LoggingDecorator(MessageService service) { super(service); }
    @Override
    public String send(String message) {
        System.out.println("[LOG] Sending message...");
        return super.send(message);
    }
}

public class DecoratorDemo {
    public static void main(String[] args) {
        // Wrapping multiple decorators
        MessageService service = new LoggingDecorator(
                                    new CompressionDecorator(
                                        new EncryptionDecorator(
                                            new BasicMessageService())));
        
        System.out.println("Final Output: " + service.send("Secret Data"));
    }
}
`,
    concepts: [
      "Open/Closed Principle: Classes should be open for extension but closed for modification.",
      "Composition over Inheritance: Decorators use composition to wrap objects.",
      "Dynamic Behavior: Add or remove responsibilities at runtime."
],
    tradeoffs: [
      "Pros: More flexible than static inheritance. Avoids feature-bloated classes high up in the hierarchy.",
      "Cons: Can result in many small objects that look similar, making it hard to debug."
],
    interviewTips: [
      "Compare Decorator vs Proxy vs Adapter patterns.",
      "Give real-world examples like Java I/O streams (BufferedReader wrapping FileReader)."
],
    deepDive: `
## Decorator Pattern Design Guide

### 1. Problem Statement
Extend the functionality of an object without affecting other objects of the same class, and without using inheritance which can lead to a "class explosion".

### 2. Workflow Diagram
\`\`\`mermaid
graph LR
    A[Client] --> B[Decorator]
    B --> C[Component]
    B -- Adds Behavior --> C
\`\`\`

### 3. Core Components
*   **Component**: The interface for objects that can have responsibilities added to them.
*   **Concrete Component**: The original object being decorated.
*   **Decorator**: Maintains a reference to a Component object and defines an interface that conforms to Component's interface.
*   **Concrete Decorator**: Adds responsibilities to the component.

### 4. Benefits
*   **Flexibility**: You can mix and match decorators to create complex combinations.
*   **Single Responsibility**: Instead of one class having all behaviors, behaviors are split into separate decorator classes.
`,
    steps: [
      {
            "title": "Define Interface",
            "description": "Create a common interface for both the original object and decorators."
      },
      {
            "title": "Base Component",
            "description": "Implement the basic version of the object."
      },
      {
            "title": "Base Decorator",
            "description": "Create an abstract decorator class that wraps the component."
      },
      {
            "title": "Concrete Decorators",
            "description": "Extend the base decorator to add specific features."
      }
]
  },
  {
    id: "parking-lot",
    category: "Low-Level Design",
    title: "Parking Lot System",
    description: "Design a multi-floor parking lot system supporting multiple vehicle types and dynamic pricing.",
    javaCode: `
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * PARKING LOT SYSTEM: LLD demonstrating Singleton, Strategy, and Composition.
 */
enum VehicleType { CAR, TRUCK, MOTORBIKE }

abstract class Vehicle {
    protected String licensePlate;
    protected VehicleType type;
    public Vehicle(String lp, VehicleType t) { this.licensePlate = lp; this.type = t; }
    public VehicleType getType() { return type; }
}

class Car extends Vehicle { public Car(String lp) { super(lp, VehicleType.CAR); } }
class Truck extends Vehicle { public Truck(String lp) { super(lp, VehicleType.TRUCK); } }

class ParkingSpot {
    private final int id;
    private final VehicleType supportedType;
    private Vehicle parkedVehicle;

    public ParkingSpot(int id, VehicleType type) { this.id = id; this.supportedType = type; }
    public synchronized boolean isFree() { return parkedVehicle == null; }
    public synchronized boolean park(Vehicle v) {
        if (isFree() && v.getType() == supportedType) {
            this.parkedVehicle = v;
            return true;
        }
        return false;
    }
    public synchronized void unpark() { this.parkedVehicle = null; }
    public int getId() { return id; }
}

class Level {
    private final int floor;
    private final List<ParkingSpot> spots;

    public Level(int floor, int numSpots) {
        this.floor = floor;
        this.spots = new ArrayList<>();
        for (int i = 0; i < numSpots; i++) {
            VehicleType type = (i % 2 == 0) ? VehicleType.CAR : VehicleType.TRUCK;
            spots.add(new ParkingSpot(i, type));
        }
    }

    public boolean park(Vehicle v) {
        for (ParkingSpot spot : spots) {
            if (spot.park(v)) {
                System.out.println(v.getType() + " parked at Floor " + floor + ", Spot " + spot.getId());
                return true;
            }
        }
        return false;
    }
}

public class ParkingLot {
    private static ParkingLot instance;
    private final List<Level> levels = new CopyOnWriteArrayList<>();

    private ParkingLot() {} // Private constructor for Singleton

    public static synchronized ParkingLot getInstance() {
        if (instance == null) instance = new ParkingLot();
        return instance;
    }

    public void addLevel(Level level) { levels.add(level); }

    public boolean parkVehicle(Vehicle v) {
        for (Level level : levels) {
            if (level.park(v)) return true;
        }
        System.out.println("Parking Full for " + v.getType());
        return false;
    }

    public static void main(String[] args) {
        ParkingLot lot = ParkingLot.getInstance();
        lot.addLevel(new Level(1, 4));
        lot.addLevel(new Level(2, 4));

        lot.parkVehicle(new Car("CAR-001"));
        lot.parkVehicle(new Truck("TRK-001"));
        lot.parkVehicle(new Car("CAR-002"));
        lot.parkVehicle(new Truck("TRK-002"));
        lot.parkVehicle(new Car("CAR-003")); // Should go to Floor 2
    }
}
`,
    concepts: [
      "Singleton Pattern (ParkingLot): Ensures a single point of truth for the entire parking system's state.",
      "Factory Pattern (Vehicle creation): Decouples the creation of different vehicle types (Car, Truck, Bike) from the main logic.",
      "Strategy Pattern (Pricing): Allows dynamic switching of pricing algorithms (hourly, flat, peak) without modifying the core system.",
      "Encapsulation & Abstraction: Hiding the internal spot management logic within Levels and Spots."
],
    tradeoffs: [
      "Centralized vs. Decentralized: A central controller (Singleton) is easy to manage but can become a bottleneck. Decentralized (per-level controllers) scales better but is harder to synchronize.",
      "Locking Granularity: Locking the entire ParkingLot for every park/unpark is safe but slow. Locking at the Level or Spot level is faster but more complex to implement correctly.",
      "Static vs. Dynamic Allocation: Static allocation (fixed spots per type) is simple. Dynamic allocation (any spot can be any type) maximizes space but requires complex tracking."
],
    interviewTips: [
      "Discuss how to handle concurrency when multiple vehicles try to park at once.",
      "Explain how to implement a dynamic pricing strategy (Strategy Pattern).",
      "Mention how to handle 'handicapped' or 'electric' spots."
],
    deepDive: `
## Parking Lot System Design Guide

### 1. Problem Statement
Design a system for a multi-floor parking lot that can manage different types of vehicles (Cars, Trucks, Motorbikes) and calculate parking fees based on duration and vehicle type.

### 2. Step-by-Step Workflow Diagram (Parking a Vehicle)
\`\`\`mermaid
graph TD
    Start([Vehicle Arrives at Entry]) --> Ticket[Generate Ticket & Timestamp]
    Ticket --> Find[Search for Free Spot across Levels]
    Find --> Found{Spot Found?}
    Found -- No --> Full[Display 'Parking Full' & Exit]
    Found -- Yes --> Reserve[Lock & Reserve Spot]
    Reserve --> Park[Vehicle Parks]
    Park --> Update[Update Level Availability & Dashboard]
    Update --> End([Parking Complete])
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Multiple floors and multiple entry/exit points.
    *   Support for different vehicle types.
    *   Real-time availability tracking.
    *   Automated ticket generation and payment.
*   **Non-Functional**:
    *   **High Availability**: The system should always be able to issue tickets.
    *   **Concurrency**: Multiple vehicles should be able to park/unpark simultaneously.

### 3. Class Diagram
\`\`\`mermaid
classDiagram
    class Vehicle {
        <<abstract>>
        +String licensePlate
        +VehicleType type
    }
    class Car {
    }
    class ParkingSpot {
        +int id
        +SpotType type
        +boolean isFree
        +park(Vehicle v)
        +unpark()
    }
    class Level {
        +int floor
        +List~ParkingSpot~ spots
        +findSpot(Vehicle v)
    }
    class ParkingLot {
        <<Singleton>>
        +List~Level~ levels
        +parkVehicle(Vehicle v)
    }
    Vehicle <|-- Car
    ParkingLot "1" *-- "many" Level
    Level "1" *-- "many" ParkingSpot
    ParkingSpot o-- Vehicle
\`\`\`

### 4. Core Components
*   **Vehicle**: Abstract base class for all vehicle types.
*   **ParkingSpot**: Represents a single spot. Knows its type and whether it's occupied.
*   **Level**: Manages a collection of spots on a specific floor.
*   **ParkingLot**: The central controller (Singleton) that manages all levels.

### 5. Detailed Execution Flow (LLD)

#### Parking Flow:
1.  **Entry**: A vehicle arrives at the entry gate.
2.  **Identification**: The system identifies the vehicle type (Car, Bike, Truck).
3.  **Search**: The \`ParkingLot\` (Singleton) iterates through its \`Levels\`.
4.  **Spot Allocation**: Each level checks its \`ParkingSpots\` to find the first free spot that matches the vehicle type.
5.  **Reservation**: Once a spot is found, it is marked as \`isFree = false\` and the vehicle is assigned to it.
6.  **Ticket Generation**: A ticket is issued with the entry timestamp, spot ID, and vehicle details.
7.  **Dashboard Update**: The available spot count for that level and vehicle type is decremented.

#### Unparking Flow:
1.  **Exit**: The vehicle arrives at the exit gate.
2.  **Ticket Validation**: The system scans the ticket to retrieve the entry time and spot ID.
3.  **Fee Calculation**: The \`PricingStrategy\` (Strategy Pattern) calculates the fee based on the duration (Current Time - Entry Time) and vehicle type.
4.  **Payment**: The user pays the fee.
5.  **Spot Release**: The \`ParkingSpot\` is marked as \`isFree = true\` and the vehicle reference is cleared.
6.  **Dashboard Update**: The available spot count is incremented.

### 6. Implementation Details
The system uses the **Singleton Pattern** for the \`ParkingLot\` class to ensure there's only one instance managing the state. The **Strategy Pattern** is often used for the \`PricingStrategy\` to allow for different calculation methods (e.g., hourly, flat rate, peak pricing).

### 6. Concurrency Handling
In a real-world scenario, we must use thread-safe collections or explicit locking (e.g., \`ReentrantLock\`) when searching for and reserving a spot to prevent two vehicles from taking the same spot.

### 7. Common Pitfalls
*   **Over-engineering**: Don't build a full database schema unless asked. Focus on the class relationships.
*   **Ignoring Vehicle Sizes**: Ensure a Truck doesn't fit in a Motorbike spot!
`,
    steps: [
      {
            "title": "Define Entities",
            "description": "Create Vehicle and ParkingSpot classes."
      },
      {
            "title": "Organize Structure",
            "description": "Group spots into Levels and Levels into a ParkingLot."
      },
      {
            "title": "Implement Logic",
            "description": "Add methods for finding spots and parking vehicles."
      },
      {
            "title": "Add Pricing",
            "description": "Implement a pricing strategy based on vehicle type and time."
      }
]
  },
  {
    id: "vending-machine",
    category: "Low-Level Design",
    title: "Vending Machine",
    description: "Design a vending machine that supports item selection, payment, and change return.",
    javaCode: `
import java.util.*;

/**
 * VENDING MACHINE: State Pattern implementation.
 */
interface VendingState {
    void insertCoin(VendingMachine machine, int amount);
    void selectItem(VendingMachine machine, String item);
    void dispense(VendingMachine machine);
}

class IdleState implements VendingState {
    public void insertCoin(VendingMachine machine, int amount) {
        machine.addBalance(amount);
        System.out.println("Inserted: \$" + amount + ". Total: \$" + machine.getBalance());
        machine.setState(new HasMoneyState());
    }
    public void selectItem(VendingMachine machine, String item) { System.out.println("Insert coin first"); }
    public void dispense(VendingMachine machine) { System.out.println("Nothing to dispense"); }
}

class HasMoneyState implements VendingState {
    public void insertCoin(VendingMachine machine, int amount) { 
        machine.addBalance(amount); 
        System.out.println("Added: \$" + amount + ". Total: \$" + machine.getBalance());
    }
    public void selectItem(VendingMachine machine, String item) {
        if (machine.getInventory().getOrDefault(item, 0) > 0) {
            machine.setSelectedItem(item);
            System.out.println("Item selected: " + item);
            machine.setState(new DispensingState());
        } else {
            System.out.println("Out of stock: " + item);
        }
    }
    public void dispense(VendingMachine machine) { System.out.println("Select item first"); }
}

class DispensingState implements VendingState {
    public void insertCoin(VendingMachine machine, int amount) { System.out.println("Wait, dispensing..."); }
    public void selectItem(VendingMachine machine, String item) { System.out.println("Wait, dispensing..."); }
    public void dispense(VendingMachine machine) {
        String item = machine.getSelectedItem();
        machine.getInventory().put(item, machine.getInventory().get(item) - 1);
        System.out.println("Dispensing: " + item);
        machine.setState(new IdleState());
    }
}

class VendingMachine {
    private VendingState state = new IdleState();
    private int balance = 0;
    private String selectedItem;
    private Map<String, Integer> inventory = new HashMap<>();

    public void setState(VendingState state) { this.state = state; }
    public void addBalance(int amount) { this.balance += amount; }
    public int getBalance() { return balance; }
    public void setSelectedItem(String item) { this.selectedItem = item; }
    public String getSelectedItem() { return selectedItem; }
    public Map<String, Integer> getInventory() { return inventory; }

    public void insertCoin(int amount) { state.insertCoin(this, amount); }
    public void selectItem(String item) { state.selectItem(this, item); }
    public void dispense() { state.dispense(this); }
}

public class VendingDemo {
    public static void main(String[] args) {
        VendingMachine vm = new VendingMachine();
        vm.getInventory().put("Coke", 2);
        vm.getInventory().put("Pepsi", 1);

        System.out.println("--- Transaction 1 ---");
        vm.insertCoin(5);
        vm.selectItem("Coke");
        vm.dispense();

        System.out.println("
--- Transaction 2 (Out of stock) ---");
        vm.insertCoin(5);
        vm.selectItem("Pepsi");
        vm.dispense();
        vm.insertCoin(5);
        vm.selectItem("Pepsi");
    }
}
`,
    concepts: [
      "State Pattern: Managing transitions between Idle, Selection, Payment, etc.",
      "Inventory Management: Tracking item counts and prices.",
      "Payment Processing: Handling coins, notes, or digital payments.",
      "Concurrency: Handling multiple simultaneous requests safely."
],
    tradeoffs: [
      "State Machine vs. If-Else: State pattern is more scalable but requires more classes.",
      "Hardware Integration: Real machines require complex sensor/motor drivers."
],
    interviewTips: [
      "Discuss how to handle 'Out of Stock' scenarios.",
      "Explain how to implement 'Refund' logic."
],
    deepDive: `
## Vending Machine Design Guide

### 1. Problem Statement
Design a software system for a physical vending machine that handles item selection, payment processing, inventory management, and change return while maintaining a consistent state.

### 2. Step-by-Step Workflow Diagram (State Machine)
\`\`\`mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> HasMoney: insertCoin()
    HasMoney --> HasMoney: insertCoin()
    HasMoney --> ItemSelected: selectItem()
    ItemSelected --> Dispensing: confirmPayment()
    ItemSelected --> Idle: cancel() / refund
    Dispensing --> Idle: dispenseComplete()
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Support multiple products with different prices.
    *   Accept various denominations of coins/notes.
    *   Return change to the user.
    *   Maintain inventory and handle "Out of Stock".
*   **Non-Functional**:
    *   **Reliability**: The machine should not lose money or items.
    *   **Concurrency**: Handle cases where multiple actions might happen (though usually sequential in a physical machine).

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant VM as VendingMachine
    participant S as State (HasMoney)
    participant I as Inventory
    
    U->>VM: selectItem("Coke")
    VM->>S: selectItem("Coke")
    S->>I: checkAvailability("Coke")
    I-->>S: Available
    S->>S: checkBalance(price)
    alt Sufficient Balance
        S->>VM: setState(Dispensing)
        VM->>I: reduceStock("Coke")
        VM-->>U: Dispense Item & Change
    else Insufficient
        S-->>U: Show Error
    end
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **State Initialization**: The machine starts in the \`IdleState\`.
2.  **Payment**: User inserts coins. The machine transitions to \`HasMoneyState\` and updates the \`balance\`.
3.  **Selection**: User selects an item. The machine checks the \`Inventory\` and the \`balance\`.
4.  **Dispensing**: If valid, the machine transitions to \`DispensingState\`, reduces the item count, and physically releases the item.
5.  **Change Return**: The machine calculates \`balance - price\`, returns the change, and resets the \`balance\` to zero.
6.  **Reset**: The machine returns to \`IdleState\`.

### 6. The State Pattern
The State pattern is the most crucial part of this design. Instead of a massive \`switch\` statement, each state (Idle, HasMoney, Dispensing) is a separate class implementing a \`State\` interface. This makes the code much cleaner and easier to extend (e.g., adding a "Maintenance" state).

### 7. Core Components
*   **VendingMachine**: The context class that holds the current state and inventory.
*   **State Interface**: Defines methods like \`insertCoin()\`, \`selectItem()\`, \`dispense()\`.
*   **Inventory**: Manages a map of \`Product -> Quantity\`.
*   **Coin/Note**: Enums representing accepted denominations.

### 8. Handling Edge Cases
*   **Out of Stock**: The \`selectItem\` method should check inventory and prevent transition if the item is unavailable.
*   **Insufficient Funds**: Prompt the user to add more money or cancel.
*   **Power Failure**: In a real system, the state should be persisted to non-volatile memory.
`,
    steps: [
      {
            "title": "Define States",
            "description": "Identify all possible states (Idle, Ready, Dispensing, etc.)."
      },
      {
            "title": "State Transitions",
            "description": "Map out how actions (insert coin, select item) change the state."
      },
      {
            "title": "Inventory",
            "description": "Implement a system to track items and their availability."
      },
      {
            "title": "Payment",
            "description": "Create logic for balance tracking and change calculation."
      }
]
  },
  {
    id: "snake-and-ladder",
    category: "Low-Level Design",
    title: "Snake & Ladder",
    description: "Design a multiplayer Snake and Ladder game with board, dice, and players.",
    javaCode: `
import java.util.*;

class Player {
    private String name;
    private int position;
    public Player(String name) { this.name = name; this.position = 0; }
    public String getName() { return name; }
    public int getPosition() { return position; }
    public void setPosition(int position) { this.position = position; }
}

class Board {
    private final int size;
    private final Map<Integer, Integer> jumps = new HashMap<>(); // Snakes and Ladders

    public Board(int size) { this.size = size; }
    public void addJump(int start, int end) { jumps.put(start, end); }
    public int getNewPosition(int current) {
        if (current > size) return current;
        return jumps.getOrDefault(current, current);
    }
    public int getSize() { return size; }
}

class Dice {
    private final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class Game {
    private final Board board;
    private final Dice dice;
    private final Queue<Player> players = new LinkedList<>();

    public Game(Board board, Dice dice, List<Player> playerList) {
        this.board = board;
        this.dice = dice;
        this.players.addAll(playerList);
    }

    public void play() {
        while (true) {
            Player current = players.poll();
            int roll = dice.roll();
            int nextPos = board.getNewPosition(current.getPosition() + roll);
            
            if (nextPos > board.getSize()) {
                // If roll exceeds board size, player stays at current position
                nextPos = current.getPosition();
            }
            
            current.setPosition(nextPos);
            System.out.println(current.getName() + " rolled " + roll + " and moved to " + nextPos);
            
            if (nextPos == board.getSize()) {
                System.out.println("--- " + current.getName() + " WINS! ---");
                break;
            }
            players.offer(current);
        }
    }

    public static void main(String[] args) {
        Board board = new Board(100);
        board.addJump(14, 7);   // Snake
        board.addJump(3, 22);   // Ladder
        board.addJump(99, 5);   // Snake
        board.addJump(70, 91);  // Ladder

        List<Player> players = Arrays.asList(new Player("Alice"), new Player("Bob"));
        Game game = new Game(board, new Dice(), players);
        game.play();
    }
}
`,
    concepts: [
      "Entity Design: Board, Player, Dice, Snake, Ladder.",
      "Game Loop: Managing turns and checking for win conditions.",
      "Randomness: Implementing a fair dice roll.",
      "Scalability: Supporting different board sizes and player counts."
],
    tradeoffs: [
      "Simplicity vs. Extensibility: Hardcoding board logic vs. using a configuration file.",
      "Concurrency: Handling multiple games on a single server."
],
    interviewTips: [
      "Discuss how to handle a player rolling three 6s in a row.",
      "Explain how to implement 'Jump' logic efficiently."
],
    deepDive: `
## Snake and Ladder Design Guide

### 1. Problem Statement
Design a multiplayer Snake and Ladder game that supports multiple players, a configurable board size, and various numbers of snakes and ladders.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Start Game] --> B[Player 1 Turn]
    B --> C[Roll Dice]
    C --> D[Calculate New Position]
    D --> E{Snake or Ladder?}
    E -- Snake --> F[Move Down]
    E -- Ladder --> G[Move Up]
    E -- Normal --> H[Stay at Position]
    F --> I{Winning Position?}
    G --> I
    H --> I
    I -- Yes --> J[Player Wins!]
    I -- No --> K[Next Player Turn]
    K --> B
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Initialize a board of size N x N.
    *   Add players to the game.
    *   Roll a dice (1-6).
    *   Handle snakes (move player back) and ladders (move player forward).
    *   Declare a winner when a player reaches the last cell.
*   **Non-Functional**:
    *   **Extensibility**: Easy to change board size, number of snakes, or number of dice.
    *   **Fairness**: Use a random number generator for dice rolls.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant P as Player
    participant G as Game
    participant B as Board
    participant D as Dice
    
    P->>G: playTurn()
    G->>D: roll()
    D-->>G: 5
    G->>B: getNewPosition(current, 5)
    B-->>G: 25 (Ladder at 15)
    G->>G: updatePlayerPosition(25)
    alt Winner?
        G-->>P: You Win!
    else
        G-->>P: Next Turn
    end
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Initialization**:
    *   Create a \`Board\` object with a specific size.
    *   Add \`Snake\` and \`Ladder\` objects to the board (stored in a Map: \`startPosition -> endPosition\`).
    *   Add \`Player\` objects to a queue to manage turns.
2.  **Turn Management**:
    *   Pop the next player from the queue.
    *   Roll the \`Dice\`.
3.  **Movement**:
    *   Calculate the new position: \`currentPosition + diceRoll\`.
    *   If the new position > board size, the player stays at the current position.
    *   Check if the new position has a snake or ladder. If so, update the position to the end of the snake/ladder.
4.  **Winning Condition**:
    *   If the player's position equals the board size, they are the winner.
5.  **Cycle**:
    *   If no winner, push the player back to the end of the queue.

### 6. Core Components
*   **Board**: Holds the cells and the positions of snakes and ladders.
*   **Player**: Represents a player with a name and current position.
*   **Snake/Ladder**: Represents a jump from one cell to another.
*   **Dice**: Provides a random number between 1 and 6.
*   **Game**: The main controller that manages the flow and turns.

### 7. Design Patterns Used
*   **Singleton**: The \`Dice\` can be a singleton.
*   **Strategy**: (Optional) Different dice rolling strategies (e.g., biased dice).
*   **Command**: (Optional) Each move could be a command to support undo/redo.

### 8. Handling Edge Cases
*   **Multiple Jumps**: What if a ladder leads to another ladder? (Usually, only one jump is allowed per turn).
*   **Infinite Loops**: Ensure a snake and ladder don't create a loop (e.g., Snake 10->5, Ladder 5->10).
`,
    steps: [
      {
            "title": "Board Setup",
            "description": "Initialize the board with snakes and ladders at specific positions."
      },
      {
            "title": "Player Queue",
            "description": "Use a Queue to manage the order of player turns."
      },
      {
            "title": "Dice Logic",
            "description": "Implement a Dice class with a roll() method."
      },
      {
            "title": "Move Logic",
            "description": "Calculate the new position and handle snake/ladder jumps."
      }
]
  },
  {
    id: "splitwise",
    category: "Low-Level Design",
    title: "Splitwise (Expense Sharing)",
    description: "Design a system to track and settle expenses between friends or groups.",
    javaCode: `
import java.util.*;

/**
 * SPLITWISE: Tracking and settling expenses.
 */
class User {
    String id, name;
    public User(String id, String name) { this.id = id; this.name = name; }
}

class ExpenseManager {
    // Map<PayerID, Map<OwerID, Amount>>
    private Map<String, Map<String, Double>> balanceSheet = new HashMap<>();
    private Map<String, User> users = new HashMap<>();

    public void addUser(User user) { users.put(user.id, user); }

    public void addExpense(double amount, String paidBy, List<String> owedBy) {
        double splitAmount = amount / owedBy.size();
        for (String ower : owedBy) {
            if (paidBy.equals(ower)) continue;

            // Update Payer's balance (someone owes them)
            Map<String, Double> balances = balanceSheet.computeIfAbsent(paidBy, k -> new HashMap<>());
            balances.put(ower, balances.getOrDefault(ower, 0.0) + splitAmount);

            // Update Ower's balance (they owe someone)
            Map<String, Double> reverseBalances = balanceSheet.computeIfAbsent(ower, k -> new HashMap<>());
            reverseBalances.put(paidBy, reverseBalances.getOrDefault(paidBy, 0.0) - splitAmount);
        }
    }

    public void showBalances() {
        for (String user1 : balanceSheet.keySet()) {
            for (Map.Entry<String, Double> entry : balanceSheet.get(user1).entrySet()) {
                if (entry.getValue() > 0) {
                    System.out.println(users.get(entry.getKey()).name + " owes " + 
                                       users.get(user1).name + ": " + entry.getValue());
                }
            }
        }
    }

    public static void main(String[] args) {
        ExpenseManager manager = new ExpenseManager();
        User u1 = new User("u1", "Alice");
        User u2 = new User("u2", "Bob");
        User u3 = new User("u3", "Charlie");
        
        manager.addUser(u1); manager.addUser(u2); manager.addUser(u3);

        manager.addExpense(300, "u1", Arrays.asList("u1", "u2", "u3"));
        manager.addExpense(50, "u2", Arrays.asList("u2", "u3"));

        manager.showBalances();
    }
}
`,
    concepts: [
      "Factory Pattern (Expense creation): Dynamically creates different types of expenses (Equal, Exact, Percent) based on input.",
      "Observer Pattern (Notify participants): Automatically notifies all involved users when a new expense is added or settled.",
      "Strategy Pattern (Split algorithms): Encapsulates different splitting logics to make the system extensible.",
      "Graph Algorithms (Simplify debts): Treating users as nodes and debts as directed edges to minimize transaction count."
],
    tradeoffs: [
      "Consistency vs. Availability: In a distributed Splitwise, we prefer Consistency (ACID) for financial transactions, even if it means slightly higher latency.",
      "Simplification Frequency: Simplifying debts on every transaction is computationally expensive ($O(N^2)$). Doing it periodically or on-demand is more efficient.",
      "Storage: Storing every single transaction history vs. only current balances. History is needed for auditing but increases storage costs significantly."
],
    interviewTips: [
      "Explain how to simplify debts using a min-heap or max-heap approach.",
      "Discuss how to handle multi-currency expenses.",
      "Mention how to implement 'Groups' and 'Activity Feed'."
],
    deepDive: `
## Splitwise (Expense Sharing) Design Guide

### 1. Problem Statement
Design an application to track shared expenses and minimize the number of transactions required to settle debts among a group of people.

### 2. Step-by-Step Workflow Diagram (Adding an Expense)
\`\`\`mermaid
graph TD
    Start([Add Expense Request]) --> Val[Validate Amount & Participants]
    Val --> Split[Apply Split Strategy: Equal/Exact/Percent]
    Split --> Calc[Calculate Individual Shares]
    Calc --> Update[Update Balance Sheet for each Participant]
    Update --> Notify[Notify Participants via Observer]
    Notify --> Simplify[Optional: Run Debt Simplification Algorithm]
    Simplify --> End([Expense Recorded])
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Add expenses and split them among multiple users.
    *   Support different split types (Equal, Exact, Percentage).
    *   View balances (who owes whom and how much).
    *   Simplify debts within a group.
*   **Non-Functional**:
    *   **Consistency**: Financial transactions must be accurate and consistent.
    *   **Scalability**: Handle a large number of users and expenses.
    *   **Availability**: Users should be able to view and add expenses at any time.

### 4. Sequence Diagram (Settling Debt)
\`\`\`mermaid
sequenceDiagram
    participant U1 as Debtor (User A)
    participant S as Splitwise Service
    participant U2 as Creditor (User B)
    participant DB as Database
    
    U1->>S: settleDebt(User B, \$50)
    S->>DB: Update balance(A, B, -50)
    DB-->>S: Success
    S->>U2: notifyPaymentReceived(User A, \$50)
    S-->>U1: Settlement Confirmed
\`\`\`

### 5. Class Diagram
\`\`\`mermaid
classDiagram
    class User {
        +String id
        +String name
    }
    class Expense {
        <<abstract>>
        +double amount
        +User paidBy
        +List~Split~ splits
    }
    class Split {
        <<abstract>>
        +User user
        +double amount
    }
    class ExpenseManager {
        +Map balanceSheet
        +addExpense()
        +showBalances()
    }
    Expense <|-- EqualExpense
    Split <|-- EqualSplit
    ExpenseManager o-- User
    ExpenseManager o-- Expense
\`\`\`

### 6. Core Logic: Debt Simplification
The most interesting part of Splitwise is simplifying debts. If A owes B \$10 and B owes C \$10, we can simplify it to A owes C \$10.

### 7. Detailed Execution Flow (LLD)
1.  **Expense Creation**: A user adds an expense, specifying the amount, the payer, and the participants.
2.  **Split Calculation**: Based on the chosen strategy (Equal, Exact, or Percentage), the system calculates how much each participant owes.
3.  **Balance Update**: The \`ExpenseManager\` updates the internal balance sheet. For each participant (other than the payer), it increments the amount they owe the payer.
4.  **Notification**: The system uses the **Observer Pattern** to notify all participants about the new expense.
5.  **Simplification**: Periodically or on-demand, the system runs a debt simplification algorithm to reduce the total number of transactions needed to settle all debts.

### 8. Implementation Details
We use a **Balance Sheet** (a nested Map) to track how much each user owes every other user. When an expense is added, we update the balances for all participants. The **Strategy Pattern** is used for different split types (Equal, Percentage, Exact Amount).

### 9. Advanced Algorithms
To minimize transactions, we can use a **Greedy Algorithm**:
1. Calculate the net balance for each user (Total Lent - Total Borrowed).
2. Separate users into two groups: Creditors (positive balance) and Debtors (negative balance).
3. Use a Max-Heap for Creditors and a Min-Heap for Debtors to settle the largest debts first.
`,
    steps: [
      {
            "title": "Define Users",
            "description": "Create a User class to track participants."
      },
      {
            "title": "Implement Splits",
            "description": "Create classes for different split types (Equal, Exact, etc.)."
      },
      {
            "title": "Add Expenses",
            "description": "Calculate individual shares and update the balance sheet."
      },
      {
            "title": "Simplify Debts",
            "description": "Run an algorithm to minimize the number of transactions for settlement."
      }
]
  },
  {
    id: "lru-cache",
    category: "Low-Level Design",
    title: "LRU Cache",
    description: "Least Recently Used (LRU) cache discards the least recently used items first.",
    javaCode: `
import java.util.HashMap;
import java.util.Map;

public class LRUCache<K, V> {
    private class Node {
        K key;
        V value;
        Node prev, next;
        Node(K key, V value) { this.key = key; this.value = value; }
    }

    private final int capacity;
    private final Map<K, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        head = new Node(null, null);
        tail = new Node(null, null);
        head.next = tail;
        tail.prev = head;
    }

    public V get(K key) {
        Node node = map.get(key);
        if (node == null) return null;
        moveToHead(node);
        return node.value;
    }

    public void put(K key, V value) {
        Node node = map.get(key);
        if (node != null) {
            node.value = value;
            moveToHead(node);
        } else {
            if (map.size() >= capacity) {
                map.remove(tail.prev.key);
                removeNode(tail.prev);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addNode(newNode);
        }
    }

    private void addNode(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addNode(node);
    }
}`,
    concepts: [
      "HashMap for O(1) Access: Provides fast lookup of cache entries by key.",
      "Doubly Linked List for O(1) Eviction: Maintains the order of usage, allowing fast removal and insertion at both ends.",
      "Eviction Policy: The strategy used to decide which item to remove when the cache is full (LRU, LFU, FIFO).",
      "Temporal Locality: The principle that items accessed recently are likely to be accessed again soon.",
      "Frequency of Access: The principle that items accessed more often are more valuable (LFU)."
],
    tradeoffs: [
      "Time vs. Space: LRU achieves O(1) time complexity for both get and put but requires O(N) extra space for the linked list nodes.",
      "LRU vs. LFU: LRU is better for temporal locality (recent access), while LFU (Least Frequently Used) is better for frequency-based access patterns. LFU is more complex to implement in O(1).",
      "Thread Safety: A standard LRU cache is not thread-safe. Using 'ConcurrentHashMap' and synchronized blocks or 'ReadWriteLock' adds overhead."
],
    interviewTips: [
      "Explain why Doubly Linked List is used over Single Linked List.",
      "Discuss thread-safety (Collections.synchronizedMap or ReentrantReadWriteLock).",
      "Mention LinkedHashMap in Java as a built-in alternative."
],
    deepDive: `
## LRU Cache Design Guide

### 1. Problem Statement
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. It should support \`get\` and \`put\` operations in \$O(1)\$ time.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    subgraph GET Operation
        G1[Request Key] --> G2{Key in Map?}
        G2 -- No --> G3[Return Null]
        G2 -- Yes --> G4[Move Node to Head of List]
        G4 --> G5[Return Value]
    end

    subgraph PUT Operation
        P1[Request Key, Value] --> P2{Key in Map?}
        P2 -- Yes --> P3[Update Value & Move to Head]
        P2 -- No --> P4{Cache Full?}
        P4 -- Yes --> P5[Remove Tail from List & Map]
        P4 -- No --> P6[Create New Node]
        P5 --> P6
        P6 --> P7[Add to Head & Map]
    end
\`\`\`

### 3. Requirements
*   **Functional**:
    *   \`get(key)\`: Retrieve value in O(1).
    *   \`put(key, value)\`: Insert or update value in O(1).
    *   **Eviction**: If capacity is reached, remove the least recently used item.
*   **Non-Functional**:
    *   **Efficiency**: Both operations must be O(1).
    *   **Thread Safety**: Standard implementation is not thread-safe.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant M as HashMap
    participant L as DoublyLinkedList
    
    C->>M: get(key)
    M-->>C: Node reference
    alt Node exists
        C->>L: moveNodeToHead(node)
        L-->>C: Success
    else Node doesn't exist
        C-->>C: Return null
    end
\`\`\`

### 5. Key Concepts in Detail

### Why Doubly Linked List + HashMap?

To achieve **O(1)** time complexity for both \`get\` and \`put\` operations, we combine two data structures:

1.  **HashMap**: Provides O(1) lookup. It stores the key and a reference to the corresponding node in the linked list.
2.  **Doubly Linked List**: Maintains the order of access. 
    *   The **Head** represents the Most Recently Used (MRU) item.
    *   The **Tail** represents the Least Recently Used (LRU) item.

### 6. Detailed Execution Flow (LLD)

#### GET Operation:
1.  **Search**: The system queries the \`HashMap\` for the given \`key\`.
2.  **Miss**: If the key is not found, return \`null\`.
3.  **Hit**: If the key is found:
    *   Retrieve the \`Node\` reference from the map.
    *   **Detach**: Remove the node from its current position.
    *   **Promote**: Insert the node at the **Head** (MRU).
    *   Return the \`node.value\`.

#### PUT Operation:
1.  **Search**: Check if the \`key\` already exists in the \`HashMap\`.
2.  **Update**: If it exists:
    *   Update the \`node.value\`.
    *   Perform the same **Detach** and **Promote** steps.
3.  **Insert**: If it's a new key:
    *   **Eviction Check**: If \`map.size() == capacity\`:
        *   Identify the node at the **Tail** (LRU).
        *   Remove the tail node from the list and map.
    *   **Creation**: Create a new \`Node(key, value)\`.
    *   **Addition**: Insert the new node at the **Head** and add it to the \`HashMap\`.

### 7. LRU vs. LFU Comparison

| Feature | LRU (Least Recently Used) | LFU (Least Frequently Used) |
| :--- | :--- | :--- |
| **Eviction Logic** | Discards the item that hasn't been used for the longest time. | Discards the item with the lowest access frequency. |
| **Focus** | Temporal Locality (Recency). | Frequency of Access (Popularity). |
| **Implementation** | HashMap + Doubly Linked List. | HashMap + Frequency Map + LinkedHashSet. |
| **Complexity** | O(1) for Get/Put. | O(1) for Get/Put (requires complex structure). |
| **Best For** | Scenarios where recent items are likely to be reused (e.g., web pages). | Scenarios where popular items stay popular (e.g., static assets). |

### 8. Conceptual Implementations

#### LRU (Least Recently Used)
Uses a **Doubly Linked List** to track recency. Every time an item is accessed, it's moved to the head. The tail is evicted when full.

#### LFU (Least Frequently Used)
Uses **Multiple Linked Lists** (one per frequency).
1.  **Values Map**: \`Map<Key, Value>\`
2.  **Frequency Map**: \`Map<Key, Integer>\`
3.  **Frequency Lists**: \`Map<Integer, LinkedHashSet<Key>>\`
4.  **Min Frequency**: An integer tracking the current lowest frequency.

When an item is accessed:
1.  Increment its frequency in the Frequency Map.
2.  Move the key from the old frequency list to the new frequency list.
3.  Update \`minFrequency\` if necessary.

### 9. Real-world Usage
*   **Database Buffers**: Storing frequently accessed disk blocks (LRU).
*   **Web Servers**: Caching static assets (LFU for long-term popularity).
*   **Operating Systems**: Page replacement algorithms (LRU).
`,
    steps: [
      {
            "title": "Lookup",
            "description": "Check if the key exists in the HashMap."
      },
      {
            "title": "Update Priority",
            "description": "If found, move the node to the head of the Doubly Linked List."
      },
      {
            "title": "Check Capacity",
            "description": "If new and full, remove the tail node from both list and map."
      },
      {
            "title": "Insert",
            "description": "Add the new node to the head and map."
      }
]
  },
  {
    id: "rate-limiter",
    category: "Low-Level Design",
    title: "Rate Limiter",
    description: "Design a system to control the rate of traffic sent or received by a network interface or a service.",
    javaCode: `
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

/**
 * 1. Token Bucket Algorithm
 * Allows bursts up to capacity. Refills at a constant rate.
 */
class TokenBucket {
    private final long capacity;
    private final long refillRate;
    private final AtomicLong tokens;
    private long lastRefillTimestamp;

    public TokenBucket(long capacity, long refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = new AtomicLong(capacity);
        this.lastRefillTimestamp = System.currentTimeMillis();
    }

    public synchronized boolean allow() {
        refill();
        if (tokens.get() > 0) {
            tokens.decrementAndGet();
            return true;
        }
        return false;
    }

    private void refill() {
        long now = System.currentTimeMillis();
        long tokensToAdd = ((now - lastRefillTimestamp) * refillRate) / 1000;
        if (tokensToAdd > 0) {
            tokens.set(Math.min(capacity, tokens.get() + tokensToAdd));
            lastRefillTimestamp = now;
        }
    }
}

/**
 * 2. Leaky Bucket Algorithm
 * Smooths out traffic. Requests leak at a constant rate.
 */
class LeakyBucket {
    private final int capacity;
    private final BlockingQueue<Integer> queue;

    public LeakyBucket(int capacity) {
        this.capacity = capacity;
        this.queue = new LinkedBlockingQueue<>(capacity);
    }

    public boolean allow() {
        return queue.offer(1); // Returns false if bucket is full
    }

    public void process() {
        // In a real system, a background thread would poll at a fixed rate
        queue.poll();
    }
}

/**
 * 3. Fixed Window Counter
 * Simple but has boundary issues.
 */
class FixedWindow {
    private final long windowSizeMs;
    private final long limit;
    private final Map<Long, AtomicLong> windows = new ConcurrentHashMap<>();

    public FixedWindow(long windowSizeMs, long limit) {
        this.windowSizeMs = windowSizeMs;
        this.limit = limit;
    }

    public boolean allow() {
        long windowKey = System.currentTimeMillis() / windowSizeMs;
        windows.putIfAbsent(windowKey, new AtomicLong(0));
        return windows.get(windowKey).incrementAndGet() <= limit;
    }
}

/**
 * 4. Sliding Window Log
 * Accurate but memory intensive.
 */
class SlidingWindowLog {
    private final long windowSizeMs;
    private final long limit;
    private final Queue<Long> timestamps = new ConcurrentLinkedQueue<>();

    public SlidingWindowLog(long windowSizeMs, long limit) {
        this.windowSizeMs = windowSizeMs;
        this.limit = limit;
    }

    public synchronized boolean allow() {
        long now = System.currentTimeMillis();
        while (!timestamps.isEmpty() && now - timestamps.peek() > windowSizeMs) {
            timestamps.poll();
        }
        if (timestamps.size() < limit) {
            timestamps.add(now);
            return true;
        }
        return false;
    }
}
`,
    concepts: [
      "Token Bucket Algorithm: A bucket with capacity C, refilled at rate R. Requests consume tokens. Allows bursts.",
      "Leaky Bucket Algorithm: Requests enter a queue and leak at a constant rate. Smooths out traffic but doesn't allow bursts.",
      "Fixed Window Counter: Simple count per time window. Suffers from 'boundary problem' where double traffic can occur at window edges.",
      "Sliding Window Log: Stores timestamps of all requests. Very accurate but memory-intensive for high traffic.",
      "Sliding Window Counter: Hybrid approach using weighted averages of current and previous windows. Balanced accuracy and memory."
],
    tradeoffs: [
      "Accuracy vs. Memory: Sliding Window Log is 100% accurate but uses O(N) memory. Fixed Window is O(1) memory but inaccurate at boundaries.",
      "Latency vs. Consistency: Local rate limiting is ultra-fast (nanoseconds) but inconsistent across nodes. Distributed (Redis) is consistent but adds network latency (milliseconds).",
      "Burstiness: Token Bucket allows for sudden spikes in traffic, which is good for user experience but can stress downstream services. Leaky Bucket enforces a strict constant rate."
],
    interviewTips: [
      "Discuss distributed rate limiting (Redis/Lua scripts).",
      "Mention race conditions in multi-threaded environments.",
      "Explain how to handle 429 Too Many Requests response."
],
    deepDive: `
## Rate Limiter Design Guide

### 1. Problem Statement
Design a system to control the rate of requests sent or received by a network interface. It helps prevent resource starvation and DoS attacks.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    Start([Request Arrives]) --> ID[Identify User/Client]
    ID --> Fetch[Fetch Bucket State from Redis/Cache]
    Fetch --> Refill[Calculate & Add New Tokens based on Time Elapsed]
    Refill --> Check{Tokens > 0?}
    Check -- Yes --> Consume[Decrement Token Count]
    Consume --> Save[Save Updated State]
    Save --> Allow([Allow Request])
    Check -- No --> Reject([Reject with 429 Error])
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Limit requests based on IP, User ID, or API Key.
    *   Return 429 Too Many Requests when limit exceeded.
*   **Non-Functional**:
    *   **Low Latency**: Must not slow down requests.
    *   **Scalability**: Must work in a distributed environment.

### 3. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant G as Gateway
    participant R as Rate Limiter
    participant S as Service
    
    C->>G: Request
    G->>R: checkLimit(userId)
    alt Limit Exceeded
        R-->>G: Reject
        G-->>C: 429 Too Many Requests
    else Limit OK
        R-->>G: Allow
        G->>S: Forward Request
        S-->>C: Response
    end
\`\`\`

### 4. Algorithms in Detail

*   **Token Bucket**: 
    *   **Mechanism**: A bucket holds tokens. Tokens are added at a fixed rate. Each request takes a token.
    *   **Pros**: Allows for bursts of traffic up to the bucket capacity. Simple to implement.
    *   **Cons**: Can stress downstream services during bursts.
*   **Leaky Bucket**: 
    *   **Mechanism**: Requests enter a queue (the bucket). The bucket "leaks" requests at a constant rate.
    *   **Pros**: Smooths out traffic, providing a predictable load on downstream services.
    *   **Cons**: Rejects requests if the queue is full, regardless of how much capacity the downstream has at that moment. Doesn't allow bursts.
*   **Fixed Window Counter**: 
    *   **Mechanism**: Divides time into fixed windows (e.g., 1 minute). A counter tracks requests per window.
    *   **Pros**: Memory efficient.
    *   **Cons**: Spikes at window boundaries can allow double the intended traffic (e.g., 100 requests at 0:59 and 100 at 1:01).
*   **Sliding Window Log**: 
    *   **Mechanism**: Stores a timestamp for every request. To check the limit, count timestamps within the last window.
    *   **Pros**: Very accurate, solves the boundary problem.
    *   **Cons**: Extremely memory-intensive as it stores every request timestamp.
*   **Sliding Window Counter**: 
    *   **Mechanism**: A hybrid of Fixed Window and Sliding Window Log. It uses the current window's count and a weighted percentage of the previous window's count.
    *   **Pros**: Solves the boundary problem with O(1) memory. Good balance of accuracy and efficiency.

### 5. Algorithm Comparison

| Algorithm | Burst Support | Memory Usage | Accuracy | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Token Bucket** | Yes | Low | High | General purpose, API rate limiting |
| **Leaky Bucket** | No | Low | High | Traffic shaping, constant load |
| **Fixed Window** | No | Very Low | Low | Simple limits, where accuracy isn't critical |
| **Sliding Window Log** | Yes | High | Very High | Critical limits, low traffic |
| **Sliding Window Counter** | Yes | Low | High | High traffic, distributed systems |

### 6. Distributed Rate Limiting
In a distributed system, use **Redis** with Lua scripts for atomic operations.

\`\`\`mermaid
graph LR
    A[Client] --> B[API Gateway]
    B --> C{Rate Limiter}
    C -- Allowed --> D[Internal Service]
    C -- Rejected --> E[429 Response]
    C <--> F[(Redis Central Store)]
\`\`\`

### 6. Detailed Execution Flow (LLD)

1.  **Request Reception**: The API Gateway or a Middleware intercepts the incoming request.
2.  **Key Extraction**: The system identifies the client using a unique key (e.g., \`userId\`, \`IP\`, or \`apiKey\`).
3.  **State Retrieval**: The Rate Limiter looks up the bucket state for that key. In a distributed system, this is a \`GET\` call to Redis.
4.  **Token Refill (Lazy)**: Instead of a background thread refilling all buckets, we calculate the tokens to add *on-demand*:
    *   \`time_elapsed = current_time - last_refill_time\`
    *   \`new_tokens = time_elapsed * refill_rate\`
    *   \`current_tokens = min(capacity, current_tokens + new_tokens)\`
5.  **Permission Check**:
    *   If \`current_tokens >= 1\`: Decrement tokens, update \`last_refill_time\`, and allow the request.
    *   If \`current_tokens < 1\`: Reject the request.
6.  **Response**: If rejected, return HTTP 429 with a \`Retry-After\` header.
`,
    steps: [
      {
            "title": "Identify User",
            "description": "Extract the unique identifier (IP, UserID) from the request."
      },
      {
            "title": "Check Limit",
            "description": "Query the rate limiter state for the given identifier."
      },
      {
            "title": "Update State",
            "description": "If allowed, decrement the token count or update the window log."
      },
      {
            "title": "Respond",
            "description": "Either forward the request or return a 429 error."
      }
]
  },
  {
    id: "notification-system",
    category: "Low-Level Design",
    title: "Notification System",
    description: "Design a system to send notifications via multiple channels (Email, SMS, Push).",
    javaCode: `
import java.util.*;

/**
 * NOTIFICATION SYSTEM: Strategy Pattern for multiple channels.
 */
enum Channel { EMAIL, SMS, PUSH }

interface NotificationProvider {
    void send(String user, String message);
}

class EmailProvider implements NotificationProvider {
    public void send(String user, String msg) { System.out.println("Email to " + user + ": " + msg); }
}

class SMSProvider implements NotificationProvider {
    public void send(String user, String msg) { System.out.println("SMS to " + user + ": " + msg); }
}

class NotificationService {
    private Map<Channel, NotificationProvider> providers = new HashMap<>();
    
    public void registerProvider(Channel c, NotificationProvider p) { providers.put(c, p); }
    
    public void notify(String user, String msg, List<Channel> channels) {
        for (Channel c : channels) {
            NotificationProvider p = providers.get(c);
            if (p != null) p.send(user, msg);
            else System.err.println("No provider for channel: " + c);
        }
    }

    public static void main(String[] args) {
        NotificationService service = new NotificationService();
        service.registerProvider(Channel.EMAIL, new EmailProvider());
        service.registerProvider(Channel.SMS, new SMSProvider());

        service.notify("Alice", "Your order has shipped!", Arrays.asList(Channel.EMAIL, Channel.SMS));
        service.notify("Bob", "New login detected", Collections.singletonList(Channel.PUSH));
    }
}
`,
    concepts: [
      "Strategy Pattern (Providers): Allows adding new notification channels (e.g., WhatsApp, Slack) without changing the core service logic.",
      "Observer Pattern (Subscribers): Users can subscribe to different types of alerts (e.g., billing, security, marketing).",
      "Queueing (Asynchronous sending): Decouples the application from slow or unreliable third-party APIs using message brokers like Kafka.",
      "Retry Mechanism: Implementing exponential backoff to handle transient failures in external delivery services."
],
    tradeoffs: [
      "Synchronous vs. Asynchronous: Synchronous is easier to debug but blocks the user. Asynchronous is highly scalable but requires complex tracking of delivery status.",
      "At-least-once vs. At-most-once: Notifications usually require 'At-least-once' delivery, which means we might send duplicates in rare cases but never lose a message.",
      "Centralized vs. Distributed Queues: Centralized (Redis) is fast for low volume. Distributed (Kafka) is necessary for high-throughput, multi-region delivery."
],
    interviewTips: [
      "Discuss how to handle rate limits of external providers (e.g., Twilio, SendGrid).",
      "Explain how to implement a priority queue for urgent notifications.",
      "Mention how to handle user preferences (opt-out)."
],
    deepDive: `
## Notification System Design Guide

### 1. Problem Statement
Build a scalable service that can deliver notifications to millions of users across various platforms like Email, SMS, and Mobile Push.

### 2. Step-by-Step Workflow Diagram (Notification Delivery)
\`\`\`mermaid
graph TD
    Start([App Triggers Notification]) --> Auth[Validate API Key & User Preferences]
    Auth --> Template[Fetch & Populate Message Template]
    Template --> Queue[Push to Message Queue - Kafka/RabbitMQ]
    Queue --> Worker[Worker Picks Message from Queue]
    Worker --> Provider{Call Provider API - Twilio/SendGrid}
    Provider -- Success --> Log[Update Delivery Status to 'Sent']
    Provider -- Failure --> Retry{Retry Policy?}
    Retry -- Yes --> Queue
    Retry -- No --> Dead[Move to Dead Letter Queue]
    Log --> End([End])
\`\`\`

### 3. Architecture Diagram
\`\`\`mermaid
graph TD
    A[App Server] --> B[Notification Service]
    B --> C{Channel Router}
    C --> D[Email Queue]
    C --> E[SMS Queue]
    C --> F[Push Queue]
    D --> G[Email Worker]
    E --> H[SMS Worker]
    F --> I[Push Worker]
    G --> J[SendGrid API]
    H --> K[Twilio API]
    I --> L[FCM / APNS]
\`\`\`

### 3. Core Components
*   **Notification Service**: The entry point for sending requests.
*   **Channel Router**: Decides which provider to use based on user preferences.
*   **Message Queues**: Decouples the service from slow external APIs.
*   **Workers**: Consume messages from queues and call external APIs.

### 4. Implementation Details
The system uses the **Strategy Pattern** to handle different notification channels. Each channel has its own provider implementation. To ensure reliability, we use **Message Queues** (like RabbitMQ or Kafka) to handle retries and prevent data loss.

### 5. Advanced Features
*   **Rate Limiting**: Prevent spamming users.
*   **Template Engine**: Manage dynamic content for emails and messages.
*   **Analytics**: Track delivery rates, open rates, and click-through rates.
`,
    steps: [
      {
            "title": "Receive Request",
            "description": "Validate the notification request and user details."
      },
      {
            "title": "Route Channel",
            "description": "Determine the appropriate channels based on user settings."
      },
      {
            "title": "Enqueue Message",
            "description": "Push the notification to a channel-specific message queue."
      },
      {
            "title": "Deliver",
            "description": "Workers pick up messages and call external provider APIs."
      }
]
  },
  {
    id: "logging-framework",
    category: "Low-Level Design",
    title: "Logging Framework (Enriched)",
    description: "Design a logging framework with different log levels and multiple outputs (Console, File, DB).",
    javaCode: `
import java.util.*;
import java.time.LocalDateTime;

/**
 * LOGGING FRAMEWORK: Singleton Logger with multiple appenders.
 */
enum LogLevel { DEBUG, INFO, WARN, ERROR }

interface LogAppender {
    void append(String message, LogLevel level);
}

class ConsoleAppender implements LogAppender {
    public void append(String message, LogLevel level) {
        System.out.println("[" + level + "] " + LocalDateTime.now() + " : " + message);
    }
}

class FileAppender implements LogAppender {
    public void append(String message, LogLevel level) {
        System.out.println("FILE LOG: [" + level + "] " + message);
    }
}

public class Logger {
    private static Logger instance;
    private final List<LogAppender> appenders = new ArrayList<>();
    private LogLevel threshold = LogLevel.INFO;

    private Logger() {}

    public static synchronized Logger getInstance() {
        if (instance == null) instance = new Logger();
        return instance;
    }

    public void addAppender(LogAppender appender) { appenders.add(appender); }
    public void setThreshold(LogLevel level) { this.threshold = level; }

    public void log(String message, LogLevel level) {
        if (level.ordinal() >= threshold.ordinal()) {
            for (LogAppender appender : appenders) {
                appender.append(message, level);
            }
        }
    }

    public static void main(String[] args) {
        Logger logger = Logger.getInstance();
        logger.addAppender(new ConsoleAppender());
        logger.addAppender(new FileAppender());
        
        logger.log("Application started", LogLevel.INFO);
        logger.log("Debugging connection...", LogLevel.DEBUG); // Won't show
        logger.setThreshold(LogLevel.DEBUG);
        logger.log("Debugging connection now visible", LogLevel.DEBUG);
        logger.log("Critical failure detected!", LogLevel.ERROR);
    }
}
`,
    concepts: [
      "Observer Pattern (Appenders)",
      "Singleton Pattern (Logger instance)",
      "Chain of Responsibility (Log Levels)",
      "Asynchronous Logging"
],
    tradeoffs: [
      "Synchronous: Simple, but slows down the application.",
      "Asynchronous: High performance, but might lose logs if the app crashes."
],
    interviewTips: [
      "Discuss the 'MDC' (Mapped Diagnostic Context) for distributed tracing.",
      "Explain how to handle log rotation and archiving.",
      "Mention the performance impact of string concatenation in logs."
],
    deepDive: `
## Logging Framework Design Guide

### 1. Problem Statement
Design a flexible and high-performance logging framework that allows applications to record events at different severity levels and output them to multiple destinations.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[App calls logger.log] --> B{Level >= Threshold?}
    B -- No --> C[Discard Message]
    B -- Yes --> D[Format Message]
    D --> E{Async?}
    E -- Yes --> F[Push to Queue]
    E -- No --> G[Call Appenders]
    F --> H[Background Worker]
    H --> G
    G --> I[Console]
    G --> J[File]
    G --> K[Database]
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Support multiple log levels (DEBUG, INFO, WARN, ERROR).
    *   Support multiple output destinations (Appenders).
    *   Support custom log formats (Layouts).
*   **Non-Functional**:
    *   **Performance**: Logging should not significantly slow down the application.
    *   **Reliability**: Logs should be preserved even if the application crashes (for certain levels).
    *   **Extensibility**: Easy to add new appenders or levels.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant A as Application
    participant L as Logger
    participant F as Filter
    participant AP as Appender
    
    A->>L: info("User logged in")
    L->>F: isLoggable(INFO)
    F-->>L: true
    L->>AP: append("User logged in")
    AP->>AP: writeToConsole()
    AP-->>L: Success
    L-->>A: Done
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Log Call**: The application calls a method like \`logger.info(message)\`.
2.  **Level Check**: The \`Logger\` checks if the requested level is enabled based on the current configuration.
3.  **Filtering**: Optional filters can be applied to further decide if the message should be logged (e.g., based on content).
4.  **Formatting**: The message is passed to a \`Layout\` or \`Formatter\` to be converted into a string (adding timestamps, thread info, etc.).
5.  **Appender Dispatch**: The formatted message is passed to all registered \`Appenders\`.
6.  **Output**: Each appender writes the message to its specific destination (Console, File, Socket, etc.).

### 6. Core Architecture

A logging framework typically consists of three main parts:
1.  **Logger**: The entry point for the application to record messages.
2.  **Log Level**: Filters messages based on severity (DEBUG < INFO < WARN < ERROR).
3.  **Appender/Handler**: Determines where the log goes (Console, File, Network).

### 7. The Observer Pattern

By using the Observer pattern, a single log message can be sent to multiple destinations simultaneously. The \`Logger\` acts as the subject, and \`Appenders\` are the observers.

### 8. Performance Optimization

Logging can be a major bottleneck.
*   **Lazy Evaluation**: Using \`logger.debug("Value: {}", () -> expensiveOp())\` prevents the expensive operation if DEBUG level is disabled.
*   **Async Logging**: Use an internal queue and a background thread to write logs, so the main application thread isn't blocked by I/O.

### 9. Configuration

Modern frameworks (like Log4j or Logback) use XML or JSON files to configure levels and appenders at runtime without changing code.
`,
    steps: [
      {
            "title": "Define Levels",
            "description": "Create an Enum for severity levels."
      },
      {
            "title": "Create Appenders",
            "description": "Define an interface for output destinations."
      },
      {
            "title": "Implement Logger",
            "description": "Create a central class to manage levels and appenders."
      },
      {
            "title": "Add Filtering",
            "description": "Implement logic to only log messages above the current threshold."
      }
]
  },
  {
    id: "file-system",
    category: "Low-Level Design",
    title: "Unix-like File System",
    description: "Design a basic file system with files, directories, and metadata.",
    javaCode: `
import java.util.*;

/**
 * COMPOSITE PATTERN: Treating files and directories uniformly.
 */
abstract class Entry {
    protected String name;
    protected Directory parent;
    protected long created;

    public Entry(String n, Directory p) {
        name = n; parent = p;
        created = System.currentTimeMillis();
    }
    public abstract int getSize();
    public String getName() { return name; }
    public String getFullPath() {
        if (parent == null) return name;
        return parent.getFullPath() + "/" + name;
    }
}

class File extends Entry {
    private String content;
    private int size;

    public File(String n, Directory p, int sz) {
        super(n, p); size = sz;
    }
    public int getSize() { return size; }
    public void setContent(String c) { content = c; size = c.length(); }
}

class Directory extends Entry {
    private List<Entry> contents = new ArrayList<>();

    public Directory(String n, Directory p) { super(n, p); }
    
    public int getSize() {
        int size = 0;
        for (Entry e : contents) size += e.getSize();
        return size;
    }
    
    public void addEntry(Entry e) { contents.add(e); }
    
    public void ls() {
        System.out.println("Contents of " + getFullPath() + ":");
        for (Entry e : contents) {
            String type = (e instanceof Directory) ? "[DIR]" : "[FILE]";
            System.out.println("  " + type + " " + e.getName() + " (" + e.getSize() + " bytes)");
        }
    }
}

public class FileSystemDemo {
    public static void main(String[] args) {
        Directory root = new Directory("root", null);
        Directory home = new Directory("home", root);
        root.addEntry(home);
        
        File readme = new File("readme.txt", home, 0);
        readme.setContent("Hello File System!");
        home.addEntry(readme);
        
        Directory bin = new Directory("bin", root);
        root.addEntry(bin);
        
        root.ls();
        home.ls();
        System.out.println("Total Size: " + root.getSize());
    }
}
`,
    concepts: [
      "Composite Design Pattern: Treating individual files and directories (composites) uniformly through a common interface.",
      "Inodes and Metadata: Storing administrative data (size, owner, permissions) separately from the actual file content.",
      "Hierarchical Structure: A tree-based organization where directories can contain other entries.",
      "Path Resolution: The process of navigating from the root to a specific entry using a string path."
],
    tradeoffs: [
      "Recursive vs. Iterative: Recursion is elegant for tree traversal but can cause StackOverflow for extremely deep structures. Iterative (using a Stack) is safer.",
      "Memory vs. Performance: Storing the full path in each entry speeds up 'getFullPath()' but consumes significant memory. Calculating it on the fly saves memory but is slower.",
      "Flat vs. Hierarchical: Flat systems (like S3) are easier to scale horizontally but lack the intuitive organization of hierarchical systems."
],
    interviewTips: [
      "Discuss how to implement 'find' or 'search' using DFS/BFS.",
      "Explain the difference between hard links and soft links.",
      "Mention how to handle file permissions (ACLs)."
],
    deepDive: `
## File System Design Guide

### 1. Problem Statement
Design a basic Unix-like file system that supports files, directories, and metadata management in a hierarchical structure.

### 2. Step-by-Step Workflow Diagram (Path Resolution)
\`\`\`mermaid
graph TD
    Start([Resolve Path: /a/b/c]) --> Split[Split Path into Components: a, b, c]
    Split --> Root[Start at Root Directory]
    Root --> Loop{More Components?}
    Loop -- Yes --> Find[Find Component in Current Directory]
    Find --> Found{Found?}
    Found -- No --> Error[Throw FileNotFoundException]
    Found -- Yes --> IsDir{Is Directory?}
    IsDir -- No --> CheckLast{Is Last Component?}
    CheckLast -- Yes --> ReturnFile([Return File])
    CheckLast -- No --> Error
    IsDir -- Yes --> Next[Set Current = Found Directory]
    Next --> Loop
    Loop -- No --> ReturnDir([Return Current Directory])
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Create, delete, and rename files and directories.
    *   Read and write file content.
    *   Calculate the size of a directory recursively.
    *   Resolve absolute and relative paths.
*   **Non-Functional**:
    *   **Efficiency**: Fast path resolution and metadata access.
    *   **Consistency**: Ensure the file system state is consistent after operations.

### 4. Sequence Diagram (Size Calculation)
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant D as Directory
    participant F as File
    
    C->>D: getSize()
    loop For each child
        alt Child is File
            D->>F: getSize()
            F-->>D: size
        else Child is Directory
            D->>D: getSize() (Recursive)
        end
    end
    D-->>C: totalSize
\`\`\`

### 5. Key Concepts in Detail

### 6. Detailed Execution Flow (LLD)

#### Path Resolution Flow (e.g., /home/user/file.txt):
1.  **Input**: A string path is provided.
2.  **Tokenization**: The path is split by the delimiter (e.g., \`/\`) into a list of components: \`["home", "user", "file.txt"]\`.
3.  **Traversal**:
    *   Start at the **Root** directory.
    *   For each component:
        *   Search the current directory's \`contents\` list for an entry with a matching name.
        *   If not found, throw a \`FileNotFoundException\`.
        *   If found and it's a directory, set it as the new "current" directory and continue.
        *   If found and it's a file, but there are more components left in the path, throw an error (cannot traverse into a file).
4.  **Result**: Return the final entry found.

#### Size Calculation Flow (Recursive):
1.  **Base Case**: If the entry is a \`File\`, return its stored \`size\`.
2.  **Recursive Step**: If the entry is a \`Directory\`:
    *   Initialize \`totalSize = 0\`.
    *   For each child entry in \`contents\`:
        *   Call \`child.getSize()\` recursively and add to \`totalSize\`.
    *   Return \`totalSize\`.

### 7. Directory Structure

A directory is essentially a collection of entries. This recursive definition allows for infinite nesting.
*   **Root**: The top-level directory with no parent.
*   **Leaf**: A file or an empty directory.

### 8. Metadata Management

Every entry stores metadata like:
*   **Name**: String identifier.
*   **Timestamps**: Created, Modified, Accessed.
*   **Permissions**: Read/Write/Execute bits.
*   **Size**: For files, it's the actual data size. For directories, it's often the sum of its children's sizes.

### 9. Path Resolution

To find a file at \`/home/user/docs/resume.pdf\`:
1. Start at the **Root**.
2. Find "home" in Root's children.
3. Find "user" in "home"'s children.
4. Continue until the target is found or an error occurs.
`,
    steps: [
      {
            "title": "Define Base",
            "description": "Create an abstract Entry class for shared properties."
      },
      {
            "title": "Implement File",
            "description": "Create a File class that stores actual data."
      },
      {
            "title": "Implement Directory",
            "description": "Create a Directory class that holds a list of entries."
      },
      {
            "title": "Add Logic",
            "description": "Implement recursive methods for size calculation and path resolution."
      }
]
  },
  {
    id: "spring-di-ioc",
    category: "Spring Boot",
    title: "Dependency Injection & IoC",
    description: "The core principle of Spring where the container manages object creation and dependency injection.",
    javaCode: `
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * SPRING DI & IOC: Decoupling components.
 */
interface MessageService { void send(String msg); }

@Component
@Qualifier("email")
class EmailService implements MessageService {
    public void send(String msg) { System.out.println("Email: " + msg); }
}

@Component
@Qualifier("sms")
class SmsService implements MessageService {
    public void send(String msg) { System.out.println("SMS: " + msg); }
}

@Service
public class NotificationManager {
    // 1. Constructor Injection (Recommended)
    private final MessageService emailService;
    
    // 2. Setter Injection
    private MessageService smsService;

    public NotificationManager(@Qualifier("email") MessageService emailService) {
        this.emailService = emailService;
    }

    @Autowired
    public void setSmsService(@Qualifier("sms") MessageService smsService) {
        this.smsService = smsService;
    }

    public void notify(String msg) {
        emailService.send(msg);
        smsService.send(msg);
    }
}
`,
    concepts: [
      "Inversion of Control: The framework manages the lifecycle of objects.",
      "Dependency Injection: Dependencies are 'injected' into a class rather than created by it.",
      "Bean: An object managed by the Spring IoC container."
],
    tradeoffs: [
      "Decoupling vs. Complexity: Makes code more testable and modular but adds framework overhead.",
      "Configuration: Requires metadata (annotations or XML) to define beans and dependencies."
],
    interviewTips: [
      "Explain the difference between Constructor, Setter, and Field injection.",
      "Discuss the different Bean Scopes (Singleton, Prototype, etc.)."
],
    deepDive: `
## Spring Dependency Injection & IoC Guide

### 1. Problem Statement
Decouple application components by transferring the responsibility of object creation and lifecycle management to a central container.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Configuration: Annotations/XML] --> B[ApplicationContext]
    B --> C[Bean Definition Reader]
    C --> D[Bean Factory]
    D --> E[Bean Post Processors]
    E --> F[Ready-to-use Beans]
    F --> G[Application Logic]
\`\`\`

### 3. Requirements
*   **Decoupling**: Classes should not instantiate their own dependencies.
*   **Testability**: Dependencies should be easily mockable.
*   **Lifecycle Management**: Support for initialization and destruction callbacks.
*   **Configuration Flexibility**: Support for multiple configuration formats.

### 4. Sequence Diagram (Bean Creation)
\`\`\`mermaid
sequenceDiagram
    participant AC as ApplicationContext
    participant BF as BeanFactory
    participant B as Bean
    
    AC->>BF: getBean("myService")
    BF->>BF: Check if instance exists
    alt Not exists
        BF->>B: Instantiate
        BF->>B: Inject Dependencies (@Autowired)
        BF->>B: Call PostConstruct
    end
    BF-->>AC: Bean Instance
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Container Startup**: The \`ApplicationContext\` is initialized, often triggered by \`SpringApplication.run()\`.
2.  **Component Scanning**: Spring scans the classpath for classes annotated with \`@Component\`, \`@Service\`, etc.
3.  **Bean Definition**: For each identified class, a \`BeanDefinition\` is created, describing its scope, dependencies, and lifecycle.
4.  **Dependency Resolution**: Spring analyzes the dependencies of each bean (e.g., constructor arguments or \`@Autowired\` fields).
5.  **Instantiation**: Beans are instantiated, usually in the order required by their dependencies.
6.  **Injection**: Dependencies are injected into the beans.
7.  **Post-Processing**: \`BeanPostProcessors\` are applied for additional customization (e.g., proxy creation for AOP).
8.  **Ready**: The beans are now fully initialized and ready for use by the application.

### 6. Core Concepts

Spring's core feature is its IoC container, which uses DI to manage application components. This leads to loosely coupled and highly testable code.

*   **Inversion of Control**: The framework manages the lifecycle of objects.
*   **Dependency Injection**: Dependencies are 'injected' into a class rather than created by it.
*   **Bean**: An object managed by the Spring IoC container.
`,
    steps: [
      {
            "title": "Inject Deps",
            "description": "Use @Autowired to tell Spring where to inject dependencies."
      },
      {
            "title": "Container Init",
            "description": "The ApplicationContext initializes and manages the beans at startup."
      }
]
  },
  {
    id: "bean-lifecycle",
    category: "Spring Boot",
    title: "Spring Bean Lifecycle",
    description: "The sequence of stages a Spring bean goes through from instantiation to destruction.",
    javaCode: `
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.BeanNameAware;
import org.springframework.stereotype.Component;

@Component
public class MyBean implements BeanNameAware {

    public MyBean() {
        System.out.println("1. Instantiation");
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("2. Populate Properties & Aware Interfaces: " + name);
    }

    @PostConstruct
    public void init() {
        System.out.println("3. Initialization (@PostConstruct)");
    }

    public void doWork() {
        System.out.println("4. Bean is Ready to Use");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("5. Destruction (@PreDestroy)");
    }
}
`,
    concepts: [
      "Instantiation: Creating the bean instance.",
      "Populate Properties: Injecting dependencies.",
      "Aware Interfaces: Giving the bean access to the Spring container (e.g., BeanNameAware).",
      "Initialization: Custom logic after properties are set (e.g., @PostConstruct).",
      "Destruction: Cleanup logic before the bean is removed (e.g., @PreDestroy)."
],
    tradeoffs: [
      "Pros: Fine-grained control over bean creation and cleanup. Decoupled initialization logic.",
      "Cons: Understanding the full lifecycle can be complex. Overuse of lifecycle hooks can make code harder to follow."
],
    interviewTips: [
      "Explain the difference between BeanPostProcessor and lifecycle annotations.",
      "What is the default scope of a Spring bean? (Singleton).",
      "How does the lifecycle differ for Prototype scoped beans? (Destruction is not managed by Spring)."
],
    deepDive: `
## Spring Bean Lifecycle Design Guide

### 1. The Lifecycle Flow
1.  **Instantiation**: Spring finds the bean definition and creates an instance.
2.  **Populate Properties**: Spring injects values and references into the bean's properties.
3.  **Aware Interfaces**: If the bean implements interfaces like \`BeanNameAware\` or \`ApplicationContextAware\`, Spring calls the corresponding methods.
4.  **BeanPostProcessor (Before Init)**: Spring calls \`postProcessBeforeInitialization()\` on all registered \`BeanPostProcessors\`.
5.  **Initialization**:
    *   Methods annotated with \`@PostConstruct\` are called.
    *   If \`InitializingBean\` is implemented, \`afterPropertiesSet()\` is called.
    *   Custom \`init-method\` defined in XML or \`@Bean\` is called.
6.  **BeanPostProcessor (After Init)**: Spring calls \`postProcessAfterInitialization()\`.
7.  **Ready**: The bean is ready for use.
8.  **Destruction**:
    *   Methods annotated with \`@PreDestroy\` are called.
    *   If \`DisposableBean\` is implemented, \`destroy()\` is called.
    *   Custom \`destroy-method\` is called.

### 2. Customizing the Lifecycle
You can use \`BeanPostProcessor\` to apply custom logic to all beans in the container, such as wrapping them in a proxy for AOP.
`,
    steps: [
      {
            "title": "Define Bean",
            "description": "Create a class and annotate it with @Component or define it in a @Configuration class."
      },
      {
            "title": "Add Init Logic",
            "description": "Use @PostConstruct for logic that needs to run after dependency injection."
      },
      {
            "title": "Add Cleanup Logic",
            "description": "Use @PreDestroy for closing resources or final logging."
      },
      {
            "title": "Monitor Lifecycle",
            "description": "Use logging to verify the order of execution during development."
      }
]
  },
  {
    id: "spring-annotations",
    category: "Spring Boot",
    title: "Spring Boot Annotations",
    description: "A deep dive into essential Spring Boot annotations for web, configuration, and dependency injection.",
    javaCode: `
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.http.*;
import jakarta.validation.Valid;
import java.util.*;

/**
 * SPRING BOOT ANNOTATIONS: Web, Config, and DI.
 */
@RestController
@RequestMapping("/api/users")
class UserController {

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Long id) {
        return new User(id, "John");
    }

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body("User created");
    }
}

@Configuration
class AppConfig {
    @Bean
    public List<String> defaultRoles() {
        return Arrays.asList("USER", "GUEST");
    }
}

@Service
class UserService {
    @Value("\${app.timeout:3000}")
    private int timeout;

    private final List<String> roles;

    // Constructor Injection
    public UserService(List<String> roles) {
        this.roles = roles;
    }

    @jakarta.annotation.PostConstruct
    public void init() {
        System.out.println("UserService initialized with timeout: " + timeout);
    }
}

class User {
    private Long id;
    private String name;
    public User() {}
    public User(Long id, String name) { this.id = id; this.name = name; }
    // Getters and Setters
}
`,
    concepts: [
      "Configuration: @Configuration, @Bean, @Value.",
      "Stereotypes: @Component, @Service, @Repository, @Controller.",
      "Web: @RestController, @RequestMapping, @GetMapping, @PostMapping.",
      "Injection: @Autowired, @Qualifier, @Primary."
],
    tradeoffs: [
      "Convenience vs. Magic: Annotations make code concise but can hide the underlying logic.",
      "Coupling: Ties your code to the Spring framework."
],
    interviewTips: [
      "Explain the difference between @Controller and @RestController.",
      "Discuss how @SpringBootApplication combines multiple annotations."
],
    deepDive: `
## Spring Boot Annotations Design Guide

### 1. Problem Statement
Simplify application configuration and development by using metadata (annotations) to define behavior, reducing the need for verbose XML or boilerplate code.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Annotation on Class/Method] --> B[Spring Context Scan]
    B --> C{Annotation Type?}
    C -- Stereotype --> D[Register as Bean]
    C -- Web --> E[Map to URL/Endpoint]
    C -- Config --> F[Load Properties/Beans]
    D --> G[Dependency Injection]
    E --> H[Handle Request]
    F --> I[Configure Context]
\`\`\`

### 3. Requirements
*   **Declarative**: Define "what" a component is, not "how" it's wired.
*   **Convention over Configuration**: Sensible defaults provided by annotations.
*   **Modularity**: Annotations allow for easy toggling of features (e.g., \`@EnableCaching\`).

### 4. Sequence Diagram (Request Handling)
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant DS as DispatcherServlet
    participant HM as HandlerMapping
    participant C as Controller (@RestController)
    
    U->>DS: HTTP GET /api/hello
    DS->>HM: Find handler for /api/hello
    HM-->>DS: MyController.sayHello
    DS->>C: sayHello(name)
    C-->>DS: "Hello, name"
    DS-->>U: HTTP 200 "Hello, name"
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Scanning**: At startup, Spring scans the packages specified in \`@ComponentScan\` (usually the package of the \`@SpringBootApplication\` class).
2.  **Metadata Extraction**: Spring's \`AnnotationMetadata\` reader extracts information from the bytecode of annotated classes.
3.  **Bean Registration**: Classes marked with \`@Component\`, \`@Service\`, etc., are registered as \`BeanDefinitions\`.
4.  **Endpoint Mapping**: Classes marked with \`@RestController\` and methods with \`@GetMapping\`, etc., are registered with the \`HandlerMapping\`.
5.  **Proxy Creation**: For annotations like \`@Transactional\`, Spring creates a proxy around the bean to handle cross-cutting concerns.
6.  **Runtime Execution**: When the application runs, Spring uses the gathered metadata to route requests, inject dependencies, and manage transactions.

### 6. Core Concepts

Annotations are the backbone of Spring Boot's 'convention over configuration' approach. They allow you to define beans, map web requests, and configure the application with minimal code.

*   **Stereotype Annotations**: Define the role of a class (\`@Component\`, \`@Service\`, \`@Repository\`, \`@Controller\`).
*   **Web Annotations**: Map HTTP requests to methods (\`@RequestMapping\`, \`@GetMapping\`, \`@PostMapping\`).
*   **DI Annotations**: Handle dependency injection (\`@Autowired\`, \`@Qualifier\`, \`@Primary\`).
`,
    steps: [
      {
            "title": "Stereotype",
            "description": "Mark your classes with appropriate stereotype annotations."
      },
      {
            "title": "Web Mapping",
            "description": "Use web annotations to map HTTP requests to controller methods."
      },
      {
            "title": "Config",
            "description": "Use configuration annotations to define external properties and beans."
      },
      {
            "title": "Auto-wiring",
            "description": "Use @Autowired to connect your components together."
      }
]
  },
  {
    id: "spring-profiles-config",
    category: "Spring Boot",
    title: "Profiles & Configuration Management",
    description: "Managing environment-specific configurations and externalizing properties in Spring Boot.",
    javaCode: `
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * 1. Type-safe Configuration Properties
 */
@Component
@ConfigurationProperties(prefix = "app.security")
class SecurityConfig {
    private String jwtSecret;
    private int tokenExpiration;
    // Getters and Setters
    public void setJwtSecret(String s) { this.jwtSecret = s; }
    public void setTokenExpiration(int e) { this.tokenExpiration = e; }
}

/**
 * 2. Profile-specific Bean
 */
@Component
@Profile("dev")
class DevDatabaseInitializer {
    public DevDatabaseInitializer() {
        System.out.println("Initializing H2 In-memory Database for Dev...");
    }
}

@Component
@Profile("prod")
class ProdDatabaseInitializer {
    public ProdDatabaseInitializer() {
        System.out.println("Connecting to Production PostgreSQL...");
    }
}

/**
 * 3. Using @Value for simple properties
 */
@Component
class ConfigDemo {
    @Value("\${app.name:DefaultApp}")
    private String appName;

    @Value("\${app.version}")
    private String version;
}

/*
# application-dev.yml
app:
  name: MyCoolApp-DEV
  security:
    jwtSecret: dev-secret-key
    tokenExpiration: 3600

# application-prod.yml
app:
  name: MyCoolApp-PROD
  security:
    jwtSecret: \${PROD_JWT_SECRET} # Loaded from Env Var
    tokenExpiration: 86400
*/
`,
    concepts: [
      "Profiles: Segregating parts of application configuration.",
      "@ConfigurationProperties: Type-safe mapping of hierarchical properties.",
      "Externalized Configuration: Loading config from YAML, Env Vars, or CLI args.",
      "Relaxed Binding: Flexible mapping of property names (kebab-case to camelCase)."
],
    tradeoffs: [
      "Pros: Clean separation of environments, secure handling of secrets, easy to automate deployments.",
      "Cons: Can become complex with many profiles, risk of missing properties in specific profiles."
],
    interviewTips: [
      "What is the order of precedence for Spring Boot configuration?",
      "How to activate a profile? (spring.profiles.active).",
      "Difference between @Value and @ConfigurationProperties.",
      "How to handle sensitive data in configuration?"
],
    deepDive: `
## Configuration Management Deep Dive

### 1. Configuration Precedence
Spring Boot uses a specific order to override properties. Some key ones (from highest to lowest):
1.  Command line arguments (\`--server.port=9000\`).
2.  Java System properties (\`-Dserver.port=9000\`).
3.  OS environment variables (\`SERVER_PORT=9000\`).
4.  Profile-specific properties (\`application-dev.yml\`).
5.  Default properties (\`application.yml\`).

### 2. @ConfigurationProperties vs @Value
*   \`@ConfigurationProperties\`: Supports relaxed binding, validation (\`@Validated\`), and is better for hierarchical data.
*   \`@Value\`: Better for simple, single values. Does not support relaxed binding.

### 3. Profile Expressions
You can use complex expressions like \`@Profile("!prod & (dev | test)")\`.
`,
    steps: [
      {
            "title": "Externalize Config",
            "description": "Move all hardcoded values to application.yml."
      },
      {
            "title": "Create Profiles",
            "description": "Define application-dev.yml and application-prod.yml for environment-specific settings."
      },
      {
            "title": "Use Type-safe Config",
            "description": "Map related properties to a class using @ConfigurationProperties."
      },
      {
            "title": "Secure Secrets",
            "description": "Use environment variables or a Secret Manager for production credentials."
      }
]
  },
  {
    id: "spring-exception-handling",
    category: "Spring Boot",
    title: "Spring Boot Exception Handling",
    description: "Centralized way to handle exceptions across the entire application using @ControllerAdvice and @ExceptionHandler.",
    javaCode: `
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.ErrorResponse;
import java.net.URI;
import java.time.Instant;

/**
 * SPRING EXCEPTION HANDLING: Global error management using ProblemDetail (Spring 6+).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Handling specific custom exceptions
    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFound(UserNotFoundException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, ex.getMessage());
        
        problemDetail.setTitle("User Not Found");
        problemDetail.setType(URI.create("https://api.app.com/errors/not-found"));
        problemDetail.setProperty("timestamp", Instant.now());
        
        return problemDetail;
    }

    // 2. Handling validation errors or generic exceptions
    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgs(IllegalArgumentException ex) {
        return ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST, "Invalid input: " + ex.getMessage());
    }

    // 3. Catch-all for unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleGlobalError(Exception ex) {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred");
        pd.setTitle("Internal Server Error");
        return ResponseEntity.status(500).body(pd);
    }
}

class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String msg) { super(msg); }
}
`,
    concepts: [
      "ControllerAdvice: Intercepts exceptions thrown by any controller.",
      "ExceptionHandler: Defines a method to handle a specific exception type.",
      "ResponseStatus: Sets the HTTP status code for the response.",
      "Error Details: Returning a structured JSON response for errors."
],
    tradeoffs: [
      "Pros: Clean separation of concerns, consistent error responses, reduced boilerplate in controllers.",
      "Cons: Can hide the root cause if not logged properly. Complex hierarchies of exceptions can be tricky to manage."
],
    interviewTips: [
      "What is the difference between @ExceptionHandler in a controller vs @ControllerAdvice?",
      "How to handle validation errors (MethodArgumentNotValidException)?",
      "Explain the use of ProblemDetail (introduced in Spring 6)."
],
    deepDive: `
## Spring Boot Exception Handling Design Guide

### 1. Why Centralized Handling?
In a microservices environment, it's crucial to have a consistent error format. Instead of every controller having try-catch blocks, \`@ControllerAdvice\` allows you to define a global "catch-all" for exceptions.

### 2. Implementation Patterns
*   **Custom Exceptions**: Create domain-specific exceptions (e.g., \`UserNotFoundException\`).
*   **Error Response Object**: Define a standard DTO for errors (timestamp, status, message, path).
*   **Ordered Handling**: Spring matches the most specific exception handler first.

### 3. Handling Validation Errors
When using \`@Valid\`, Spring throws \`MethodArgumentNotValidException\`. You can override \`handleMethodArgumentNotValid\` in \`ResponseEntityExceptionHandler\` to return specific field errors.
`,
    steps: [
      {
            "title": "Create Exception",
            "description": "Define a custom RuntimeException for your business case."
      },
      {
            "title": "Create Advice",
            "description": "Create a class annotated with @ControllerAdvice."
      },
      {
            "title": "Define Handler",
            "description": "Add a method with @ExceptionHandler for your custom exception."
      },
      {
            "title": "Return Response",
            "description": "Return a ResponseEntity with a structured body and appropriate HTTP status."
      }
]
  },
  {
    id: "spring-data-jpa",
    category: "Spring Boot",
    title: "Spring Data JPA & Hibernate",
    description: "Mastering data persistence with Spring Data JPA, including derived queries, JPQL, and transaction management.",
    javaCode: `
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Entity
@Table(name = "users")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String name;

    public User() {}
    public User(Long id, String name) { this.id = id; this.name = name; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    // 1. Derived Query Method
    List<User> findByNameContainingIgnoreCase(String name);

    // 2. JPQL Query
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
    List<User> findByEmailDomain(String domain);

    // 3. Native Query
    @Query(value = "SELECT * FROM users WHERE created_at > NOW() - INTERVAL '1 day'", nativeQuery = true)
    List<User> findRecentUsers();
}

@Service
class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void updateUser(Long id, String newName) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(newName);
        // No need to call save() due to dirty checking in @Transactional
    }
}
`,
    concepts: [
      "Entity Mapping: Mapping Java classes to DB tables.",
      "JpaRepository: Built-in CRUD and pagination support.",
      "Derived Queries: Queries generated from method names.",
      "JPQL: Object-oriented query language.",
      "Dirty Checking: Automatic update of entities within a transaction.",
      "N+1 Problem: Performance issue with lazy loading in collections."
],
    tradeoffs: [
      "Pros: Reduces boilerplate, database agnostic, easy to use.",
      "Cons: Can generate inefficient SQL if not careful, learning curve for complex mappings."
],
    interviewTips: [
      "Explain the N+1 problem and how to solve it (Join Fetch).",
      "Difference between L1 and L2 cache in Hibernate.",
      "What is the difference between save() and saveAndFlush()?",
      "How does @Transactional work? (Proxy pattern)."
],
    deepDive: `
## Spring Data JPA Deep Dive

### 1. Entity Lifecycle States
*   **Transient**: New object, not associated with a session.
*   **Persistent**: Associated with a session and has a DB identity.
*   **Detached**: Previously persistent, but session is closed.
*   **Removed**: Scheduled for deletion.

### 2. Handling the N+1 Problem
When you fetch a list of entities with a lazy-loaded collection, Hibernate might execute 1 query for the list and N queries for each collection.
**Solution**: Use \`JOIN FETCH\` in JPQL or \`EntityGraph\`.

### 3. Transaction Propagation
*   \`REQUIRED\` (Default): Join existing transaction or create new.
*   \`REQUIRES_NEW\`: Always create a new transaction, suspend existing.
`,
    steps: [
      {
            "title": "Define Entities",
            "description": "Use JPA annotations (@Entity, @Id, @Column) to map your domain."
      },
      {
            "title": "Create Repositories",
            "description": "Extend JpaRepository to get CRUD operations for free."
      },
      {
            "title": "Custom Queries",
            "description": "Use derived methods or @Query for complex data retrieval."
      },
      {
            "title": "Manage Transactions",
            "description": "Use @Transactional to ensure data integrity."
      }
]
  },
  {
    id: "spring-data-jpa-performance",
    category: "Spring Boot",
    title: "Spring Data JPA Performance",
    description: "Optimizing database access, solving the N+1 problem, and understanding JPA internals.",
    javaCode: `
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * JPA PERFORMANCE: Solving N+1 with Entity Graphs.
 */
@Entity
class Author {
    @Id @GeneratedValue int id;
    String name;
    @OneToMany(mappedBy = "author")
    List<Book> books;
}

@Entity
class Book {
    @Id @GeneratedValue int id;
    String title;
    @ManyToOne FetchType.LAZY
    Author author;
}

interface AuthorRepository extends JpaRepository<Author, Integer> {
    // 1. Solving N+1 with JOIN FETCH
    @Query("SELECT a FROM Author a JOIN FETCH a.books")
    List<Author> findAllWithBooks();

    // 2. Solving N+1 with EntityGraph
    @EntityGraph(attributePaths = {"books"})
    List<Author> findAll();
}
`,
    concepts: [
      "N+1 Problem: One query to fetch parents, then N queries to fetch children for each parent.",
      "FetchType.LAZY vs EAGER: Lazy is default for collections; Eager is default for single associations.",
      "Entity Graphs: Declarative way to specify which associations should be fetched eagerly.",
      "Batch Fetching: Using @BatchSize to fetch multiple collections in one query.",
      "First-Level Cache: The Persistence Context (Session) caches entities by ID within a transaction.",
      "Dirty Checking: JPA automatically detects changes to entities and flushes them to the DB."
],
    tradeoffs: [
      "Pros: High abstraction, reduces boilerplate, automatic transaction management.",
      "Cons: Easy to write inefficient queries, 'Magic' behavior can lead to performance traps."
],
    interviewTips: [
      "How to detect N+1 problems? (Enable SQL logging or use tools like Hibernate Statistics).",
      "What is the difference between getReferenceById() and findById()? (Proxy vs Database hit).",
      "When to use DTO Projections instead of Entities? (For read-only operations to reduce memory).",
      "Explain the 'Open Session in View' (OSIV) anti-pattern."
],
    deepDive: `
## Spring Data JPA Performance Deep Dive

### 1. The N+1 Problem
If you fetch 10 Authors and then access \`author.getBooks()\`, Hibernate will execute 1 query for authors and 10 queries for books.
**Solution**: Use \`JOIN FETCH\` in JPQL or \`@EntityGraph\`. This forces a single SQL JOIN.

### 2. DTO Projections
Fetching entire entities is expensive if you only need two columns. Use **Interface-based** or **Class-based** projections to fetch only the data you need.
\`\`\`java
interface AuthorSummary { String getName(); }
List<AuthorSummary> findByName(String name);
\`\`\`

### 3. Batching Writes
By default, Hibernate sends one \`INSERT\` per entity. Enable batching in properties:
\`spring.jpa.properties.hibernate.jdbc.batch_size=20\`
This significantly improves performance for bulk imports.
`,
    steps: [
      {
            "title": "Enable Logging",
            "description": "Set logging.level.org.hibernate.SQL=DEBUG to see generated queries."
      },
      {
            "title": "Use Lazy Loading",
            "description": "Always use FetchType.LAZY for collections to avoid massive data loads."
      },
      {
            "title": "Apply EntityGraphs",
            "description": "Use @EntityGraph for specific queries that need related data."
      },
      {
            "title": "Consider Projections",
            "description": "Use DTOs for read-heavy screens to bypass the Persistence Context overhead."
      }
]
  },
  {
    id: "spring-data-redis-pubsub",
    category: "Spring Boot",
    title: "Spring Data Redis & Pub/Sub",
    description: "Using Redis for high-performance caching and real-time messaging in Spring Boot.",
    javaCode: `
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

/**
 * SPRING DATA REDIS: Pub/Sub Configuration.
 */
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        return template;
    }

    @Bean
    public RedisMessageListenerContainer container(RedisConnectionFactory factory,
                                                   MessageListenerAdapter adapter) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(factory);
        container.addMessageListener(adapter, new ChannelTopic("chat-channel"));
        return container;
    }

    @Bean
    public MessageListenerAdapter adapter(ChatReceiver receiver) {
        return new MessageListenerAdapter(receiver, "receiveMessage");
    }
}

class ChatReceiver {
    public void receiveMessage(String message) {
        System.out.println("Received: " + message);
    }
}
`,
    concepts: [
      "RedisTemplate: The central class for interacting with Redis (OpsForValue, OpsForHash, etc.).",
      "Pub/Sub: A messaging pattern where senders (publishers) send messages to channels, and receivers (subscribers) listen.",
      "Redis Serializers: Converting Java objects to bytes (JDK, JSON, String).",
      "Lettuce vs Jedis: The two main Java clients for Redis (Lettuce is the default in Spring Boot).",
      "Caching: Using @Cacheable to automatically cache method results in Redis."
],
    tradeoffs: [
      "Pros: Extremely fast (in-memory), versatile (caching, messaging, locks), easy to scale.",
      "Cons: Data is lost if Redis crashes (unless persistence is enabled), adds another infrastructure dependency."
],
    interviewTips: [
      "Difference between Redis Pub/Sub and Kafka. (Redis is fire-and-forget; Kafka is log-based and persistent).",
      "How to handle serialization in RedisTemplate?",
      "What is the 'Cache Aside' pattern?",
      "Explain Redis eviction policies (LRU, LFU)."
],
    deepDive: `
## Spring Data Redis Deep Dive

### 1. Redis as a Cache
Spring Boot makes caching trivial with the \`@Cacheable\` annotation. When a method is called, Spring checks Redis first. If the key exists, it returns the value. If not, it runs the method and stores the result in Redis.

### 2. Redis Pub/Sub
Redis Pub/Sub is a lightweight messaging system. It is **not persistent**. If a subscriber is offline when a message is sent, they will never receive it. This makes it ideal for real-time notifications, chat applications, or broadcasting state changes across a cluster.

### 3. Serialization
By default, \`RedisTemplate\` uses JDK serialization, which produces unreadable binary data. For better interoperability, it's common to use \`StringRedisSerializer\` for keys and \`GenericJackson2JsonRedisSerializer\` for values.
`,
    steps: [
      {
            "title": "Add Dependency",
            "description": "Include spring-boot-starter-data-redis."
      },
      {
            "title": "Configure Template",
            "description": "Define a RedisTemplate bean with appropriate serializers."
      },
      {
            "title": "Enable Caching",
            "description": "Add @EnableCaching and use @Cacheable on your service methods."
      },
      {
            "title": "Implement Pub/Sub",
            "description": "Use RedisTemplate.convertAndSend() to publish and RedisMessageListenerContainer to subscribe."
      }
]
  },
  {
    id: "spring-aop",
    category: "Spring Boot",
    title: "Spring AOP",
    description: "Aspect-Oriented Programming (AOP) complements OOP by providing another way of thinking about program structure.",
    javaCode: `
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * SPRING AOP: Cross-cutting concerns (Logging, Security, Transactions).
 */
@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // 1. Pointcut: Matches all methods in services package
    @Pointcut("execution(* com.app.service.*.*(..))")
    public void serviceLayer() {}

    // 2. Before Advice: Runs before method execution
    @Before("serviceLayer()")
    public void logBefore() {
        logger.info("AOP: Method execution starting...");
    }

    // 3. AfterReturning Advice: Runs after successful execution
    @AfterReturning(pointcut = "serviceLayer()", returning = "result")
    public void logAfterSuccess(Object result) {
        logger.info("AOP: Method completed successfully. Result: {}", result);
    }

    // 4. AfterThrowing Advice: Runs if an exception is thrown
    @AfterThrowing(pointcut = "serviceLayer()", throwing = "ex")
    public void logError(Exception ex) {
        logger.error("AOP: Method threw exception: {}", ex.getMessage());
    }

    // 5. Around Advice: Full control over method execution
    @Around("serviceLayer()")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed(); // Proceed with actual method call
        long duration = System.currentTimeMillis() - start;
        
        logger.info("AOP: {} executed in {}ms", joinPoint.getSignature().getName(), duration);
        return result;
    }
}
`,
    concepts: [
      "Aspect: A modularization of a concern that cuts across multiple classes.",
      "Join Point: A point during the execution of a program (e.g., method call).",
      "Advice: Action taken by an aspect at a particular join point.",
      "Pointcut: A predicate that matches join points."
],
    tradeoffs: [
      "Clean Code vs. Debugging: Removes boilerplate (logging, security) but makes control flow harder to trace.",
      "Runtime Overhead: Proxies add a small latency to method calls."
],
    interviewTips: [
      "Explain the difference between JDK Dynamic Proxies and CGLIB.",
      "Discuss common use cases like @Transactional and @Cacheable."
],
    deepDive: `
## Spring AOP Design Guide

### 1. Problem Statement
Separate cross-cutting concerns (logging, security, transactions) from the core business logic to improve modularity and maintainability.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Method Call] --> B{Proxy Exists?}
    B -- Yes --> C[Invoke Advice: Before]
    C --> D[Invoke Target Method]
    D --> E[Invoke Advice: After/Around]
    E --> F[Return Result]
    B -- No --> D
\`\`\`

### 3. Requirements
*   **Modularity**: Cross-cutting concerns should be isolated in Aspects.
*   **Transparency**: Business logic should not be aware of the aspects being applied.
*   **Flexibility**: Easily apply or remove aspects using pointcut expressions.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant P as Proxy
    participant A as Aspect
    participant T as Target Service
    
    C->>P: callMethod()
    P->>A: beforeAdvice()
    A-->>P: return
    P->>T: callMethod()
    T-->>P: result
    P->>A: afterAdvice()
    A-->>P: return
    P-->>C: result
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Proxy Creation**: At startup, Spring identifies beans that match any pointcuts and creates a **Proxy** (using JDK Dynamic Proxy or CGLIB).
2.  **Method Interception**: When a client calls a method on the bean, they are actually calling the Proxy.
3.  **Advice Execution**:
    *   **@Before**: Runs before the target method.
    *   **@After**: Runs after the target method (regardless of outcome).
    *   **@Around**: The most powerful advice; it can control when (or if) the target method is executed using \`ProceedingJoinPoint.proceed()\`.
4.  **Target Invocation**: The proxy delegates the call to the actual target bean.
5.  **Result Return**: The result (or exception) is passed back through the proxy to the client.

### 6. Key Terminology
*   **Aspect**: A class containing the cross-cutting logic (e.g., \`LoggingAspect\`).
*   **Join Point**: A specific point in the application (in Spring AOP, always a method execution).
*   **Advice**: The action taken at a join point (Before, After, Around, etc.).
*   **Pointcut**: An expression that matches join points (e.g., "all methods in the service package").
*   **Weaving**: The process of linking aspects with other application types or objects to create an advised object. Spring does this at **runtime**.

### 7. Proxy Types
*   **JDK Dynamic Proxy**: Used if the target class implements at least one interface.
*   **CGLIB Proxy**: Used if the target class does not implement any interfaces (it creates a subclass of the target).

### 8. Common Use Cases
*   **Transaction Management**: \`@Transactional\` is implemented using AOP.
*   **Security**: Checking permissions before method execution.
*   **Caching**: Checking a cache before executing a method and storing the result after.
*   **Performance Monitoring**: Measuring method execution time.
`,
    steps: [
      {
            "title": "Define Aspect",
            "description": "Create a class annotated with @Aspect."
      },
      {
            "title": "Define Pointcut",
            "description": "Specify where the advice should be applied using expressions."
      },
      {
            "title": "Define Advice",
            "description": "Implement the logic (Before, After, Around) to run at the pointcut."
      },
      {
            "title": "Enable AOP",
            "description": "Ensure @EnableAspectJAutoProxy is present (auto-configured in Boot)."
      }
]
  },
  {
    id: "spring-aop-deep-dive",
    category: "Spring Boot",
    title: "Aspect Oriented Programming (AOP)",
    description: "Decoupling cross-cutting concerns like logging, security, and transactions from business logic.",
    javaCode: `
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.aspectj.lang.ProceedingJoinPoint;

/**
 * SPRING AOP: Logging Aspect.
 */
@Aspect
@Component
public class LoggingAspect {

    // 1. Pointcut: Defines WHERE the logic applies
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}

    // 2. Advice: Defines WHAT happens
    @Before("serviceMethods()")
    public void logBefore() {
        System.out.println("AOP: Method execution started...");
    }

    @Around("@annotation(LogExecutionTime)")
    public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - start;
        System.out.println(joinPoint.getSignature() + " executed in " + executionTime + "ms");
        return proceed;
    }
}

@interface LogExecutionTime {}
`,
    concepts: [
      "Aspect: A modularization of a concern that cuts across multiple classes (e.g., Transaction).",
      "Join Point: A point during program execution (e.g., method call).",
      "Advice: Action taken by an aspect at a particular join point (Before, After, Around).",
      "Pointcut: A predicate that matches join points.",
      "Weaving: Linking aspects with other application types to create an advised object.",
      "Proxy Pattern: Spring AOP uses JDK Dynamic Proxies or CGLIB to implement aspects."
],
    tradeoffs: [
      "Pros: Clean business logic, eliminates code duplication for cross-cutting concerns.",
      "Cons: Harder to debug (logic is 'hidden'), performance overhead of proxying, only works for Spring-managed beans."
],
    interviewTips: [
      "Difference between @Before, @After, and @Around advice.",
      "What is the difference between Spring AOP and AspectJ? (Spring AOP is runtime proxy-based; AspectJ is compile-time/load-time weaving).",
      "Why doesn't AOP work for private methods or internal calls? (Because proxies only intercept external calls).",
      "Explain the 'Self-Invocation' problem in Spring AOP."
],
    deepDive: `
## Spring AOP Deep Dive

### 1. The Problem
Imagine you need to log the execution time of 50 different methods. Without AOP, you'd add \`long start = ...\` to every method. This is "Code Tangling" and "Code Scattering".

### 2. How it Works (Proxies)
When you annotate a bean with an aspect, Spring doesn't give you the real bean. It gives you a **Proxy**.
*   **JDK Dynamic Proxy**: Used if the bean implements an interface.
*   **CGLIB**: Used if the bean doesn't implement an interface (subclassing).
When you call a method, the proxy intercepts it, runs the "Before" advice, calls the real method, and then runs the "After" advice.

### 3. Advice Types
*   **Before**: Runs before the method.
*   **AfterReturning**: Runs after the method completes successfully.
*   **AfterThrowing**: Runs if the method throws an exception.
*   **Around**: The most powerful. It can control whether the method even executes and can modify the return value.
`,
    steps: [
      {
            "title": "Define Aspect",
            "description": "Create a class annotated with @Aspect and @Component."
      },
      {
            "title": "Identify Pointcuts",
            "description": "Use execution expressions or custom annotations to target methods."
      },
      {
            "title": "Implement Advice",
            "description": "Write the logic (e.g., logging, timing) in @Before or @Around methods."
      },
      {
            "title": "Enable AOP",
            "description": "Ensure @EnableAspectJAutoProxy is present (enabled by default in Spring Boot)."
      }
]
  },
  {
    id: "springboot-conditional-annotations",
    category: "Spring Boot",
    title: "Conditional Annotations",
    description: "Deep dive into Spring's mechanism for conditional bean registration and auto-configuration.",
    javaCode: `
import org.springframework.boot.autoconfigure.condition.*;
import org.springframework.context.annotation.*;

@Configuration
public class ConditionalConfig {

    @Bean
    @ConditionalOnProperty(name = "feature.enabled", havingValue = "true")
    public MyFeature myFeature() {
        return new MyFeature();
    }

    @Bean
    @ConditionalOnClass(name = "com.mysql.cj.jdbc.Driver")
    public DatabaseService mysqlService() {
        return new MySqlService();
    }

    @Bean
    @ConditionalOnMissingBean(DatabaseService.class)
    public DatabaseService h2Service() {
        return new H2Service();
    }
}
`,
    concepts: [
      "Condition: The core interface for defining custom conditions.",
      "@ConditionalOnProperty: Check for environment properties.",
      "@ConditionalOnClass: Check for presence of a class on the classpath.",
      "@ConditionalOnMissingBean: Register a bean only if no other bean of that type exists.",
      "@ConditionalOnExpression: Use SpEL (Spring Expression Language) for complex logic.",
      "Auto-configuration: The magic behind Spring Boot, powered by these annotations."
],
    tradeoffs: [
      "Pros: Highly flexible configuration, enables 'starter' modules, reduces boilerplate.",
      "Cons: Can make it difficult to understand why a bean was (or wasn't) created; 'magic' behavior."
],
    interviewTips: [
      "How does Spring Boot decide which beans to create? (Using Conditionals).",
      "Difference between @ConditionalOnBean and @ConditionalOnMissingBean.",
      "What is the purpose of @ConditionalOnClass?",
      "How to debug conditional evaluation? (Use --debug or Actuator's /conditions endpoint)."
],
    deepDive: `
## Conditional Annotations Deep Dive

### 1. The Power of "If" in Configuration
Before Spring Boot, configuration was often static. Conditionals allow Spring to be dynamic. If you have the H2 driver on your classpath, Spring Boot automatically configures an H2 database. If you add MySQL, it switches to MySQL.

### 2. Common Annotations
*   **@ConditionalOnProperty**: Great for feature flags.
*   **@ConditionalOnClass**: Used by starters to only configure beans if the required library is present.
*   **@ConditionalOnMissingBean**: Allows users to provide their own implementation, which "overrides" the default one.

### 3. Custom Conditions
You can implement the \`Condition\` interface to create your own logic.
\`\`\`java
public class OnUnixCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        return System.getProperty("os.name").toLowerCase().contains("nix");
    }
}
\`\`\`
Then use it with \`@Conditional(OnUnixCondition.class)\`.
`,
    steps: [
      {
            "title": "Identify Logic",
            "description": "Determine the criteria for creating a bean (property, class, etc.)."
      },
      {
            "title": "Apply Annotation",
            "description": "Add the appropriate @ConditionalOn... annotation to your @Bean method."
      },
      {
            "title": "Test Scenarios",
            "description": "Verify bean creation by changing properties or classpath dependencies."
      },
      {
            "title": "Use Actuator",
            "description": "Check the /conditions endpoint to see the evaluation report at runtime."
      }
]
  },
  {
    id: "springboot-custom-starter",
    category: "Spring Boot",
    title: "Custom Spring Boot Starters",
    description: "Building reusable library modules that provide auto-configuration for Spring Boot applications.",
    javaCode: `
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;

/**
 * CUSTOM STARTER: Auto-configuration class.
 */
@AutoConfiguration
@ConditionalOnClass(MyService.class)
public class MyAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        return new MyService("Default Config");
    }
}

class MyService {
    private String config;
    public MyService(String config) { this.config = config; }
    public void hello() { System.out.println("Service: " + config); }
}

/*
# src/main/resources/META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
com.example.MyAutoConfiguration
*/
`,
    concepts: [
      "Auto-configuration: Automatically configuring beans based on the classpath.",
      "Conditionals: @ConditionalOnClass, @ConditionalOnProperty, @ConditionalOnMissingBean.",
      "Starter POM: A dependency descriptor that pulls in all necessary libraries.",
      "spring.factories / .imports: Files used by Spring Boot to find auto-configuration classes.",
      "ConfigurationProperties: Allowing users to customize the starter via application.yml."
],
    tradeoffs: [
      "Pros: Promotes code reuse across projects, simplifies setup for other developers.",
      "Cons: Can be complex to debug 'magic' configuration, requires careful management of dependencies."
],
    interviewTips: [
      "What are the two main components of a custom starter? (Auto-configure module and Starter module).",
      "Explain the role of @ConditionalOnMissingBean.",
      "Where does Spring Boot look for auto-configuration classes? (META-INF/spring/...).",
      "How do you allow users to override your starter's configuration?"
],
    deepDive: `
## Custom Starters Deep Dive

### 1. Why Build a Starter?
If you have a common library (e.g., a custom logging framework or a security module) used across 10 different microservices, a starter allows you to package the logic and its configuration into a single dependency.

### 2. The Magic of Conditionals
Conditionals are what make starters "smart".
*   \`@ConditionalOnClass\`: Only run if a specific class is present (e.g., a DB driver).
*   \`@ConditionalOnMissingBean\`: Only create a bean if the user hasn't provided their own. This allows for "default" behavior that can be easily overridden.

### 3. Naming Convention
*   **Official**: \`spring-boot-starter-*\`
*   **Third-party**: \`*-spring-boot-starter\` (e.g., \`mybatis-spring-boot-starter\`).
`,
    steps: [
      {
            "title": "Create Library",
            "description": "Implement the core logic and beans."
      },
      {
            "title": "Add Auto-configuration",
            "description": "Create a class with @AutoConfiguration and appropriate @Conditional annotations."
      },
      {
            "title": "Register Configuration",
            "description": "Add the class to the .imports file in META-INF."
      },
      {
            "title": "Create Starter POM",
            "description": "Create a separate module that depends on the library and other required starters."
      }
]
  },
  {
    id: "springboot-event-listeners",
    category: "Spring Boot",
    title: "Spring Event Listeners",
    description: "Implementing the Observer pattern within Spring Boot using ApplicationEvents for decoupled communication.",
    javaCode: `
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

/**
 * SPRING EVENTS: Decoupled communication.
 */
class OrderCreatedEvent extends ApplicationEvent {
    private final String orderId;
    public OrderCreatedEvent(Object source, String orderId) {
        super(source);
        this.orderId = orderId;
    }
    public String getOrderId() { return orderId; }
}

@Component
class OrderService {
    private final ApplicationEventPublisher publisher;
    public OrderService(ApplicationEventPublisher publisher) {
        this.publisher = publisher;
    }

    public void createOrder(String id) {
        System.out.println("Order created: " + id);
        publisher.publishEvent(new OrderCreatedEvent(this, id));
    }
}

@Component
class EmailListener {
    @EventListener
    @Async
    public void handleOrderCreated(OrderCreatedEvent event) {
        System.out.println("Sending email for order: " + event.getOrderId());
    }
}
`,
    concepts: [
      "ApplicationEvent: The base class for custom events.",
      "ApplicationEventPublisher: The interface used to fire events.",
      "@EventListener: Annotation to mark a method as a listener.",
      "@Async: Running listeners in a separate thread to avoid blocking the main flow.",
      "TransactionBound Events: Using @TransactionalEventListener to fire events only after a DB transaction commits.",
      "Generic Events: Using generics to handle multiple event types in one listener."
],
    tradeoffs: [
      "Pros: Loose coupling between services, easy to add new side effects without changing core logic.",
      "Cons: Can make the control flow harder to follow, risk of event loops if not careful."
],
    interviewTips: [
      "How to make an event listener asynchronous? (Use @Async and @EnableAsync).",
      "What is @TransactionalEventListener? (Ensures event is handled only after transaction success).",
      "Difference between Spring Events and Message Queues (Kafka/RabbitMQ). (Spring events are in-process; MQs are distributed).",
      "Can multiple listeners handle the same event? (Yes, and you can order them using @Order)."
],
    deepDive: `
## Spring Event Listeners Deep Dive

### 1. Decoupling with Events
In a typical service, you might need to: Save to DB, Send Email, Notify Analytics, and Update Cache. Putting all this in one method makes it bloated and hard to test. Events allow you to just "fire and forget" the \`OrderCreatedEvent\`.

### 2. Synchronous vs. Asynchronous
By default, Spring events are **synchronous**. The publisher waits for all listeners to finish. This is good for consistency but bad for latency. Using \`@Async\` moves the listener logic to a background thread pool.

### 3. Transactional Integrity
What if the DB save fails, but the email is already sent? \`@TransactionalEventListener\` solves this by allowing you to hook into the transaction lifecycle (e.g., \`BEFORE_COMMIT\`, \`AFTER_COMMIT\`, \`AFTER_ROLLBACK\`).
`,
    steps: [
      {
            "title": "Define Event",
            "description": "Create a class extending ApplicationEvent or a simple POJO."
      },
      {
            "title": "Publish Event",
            "description": "Inject ApplicationEventPublisher and call .publishEvent()."
      },
      {
            "title": "Create Listener",
            "description": "Annotate a method with @EventListener in a Spring-managed bean."
      },
      {
            "title": "Configure Async",
            "description": "Add @EnableAsync to your configuration if you want non-blocking listeners."
      }
]
  },
  {
    id: "spring-security",
    category: "Spring Boot",
    title: "Spring Security",
    description: "A powerful and highly customizable authentication and access-control framework.",
    javaCode: `
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Modern Spring Security Configuration (Spring Boot 3.x)
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> {})); // JWT support
            
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
`,
    concepts: [
      "Authentication: Who are you? (Username/Password, OAuth2, JWT).",
      "Authorization: What can you do? (Roles, Authorities).",
      "Filter Chain: A series of filters that process the request.",
      "CSRF Protection: Preventing Cross-Site Request Forgery."
],
    tradeoffs: [
      "Security vs. Complexity: Provides robust protection but has a steep learning curve.",
      "Performance: Security filters add some overhead to every request."
],
    interviewTips: [
      "Explain the difference between Role-Based and Permission-Based access control.",
      "Discuss how to implement JWT-based authentication in Spring Boot."
],
    deepDive: `
## Spring Security Design Guide

### 1. Problem Statement
Implement a robust and highly customizable authentication and access-control framework for Java applications.

### 2. Step-by-Step Workflow Diagram (Authentication)
\`\`\`mermaid
graph TD
    A[Request] --> B[Filter Chain]
    B --> C[AuthenticationFilter]
    C --> D[AuthenticationManager]
    D --> E[AuthenticationProvider]
    E --> F[UserDetailsService]
    F --> G[Database/LDAP]
    G --> F
    F --> E
    E --> D
    D --> C
    C --> H[SecurityContextHolder]
    H --> I[SuccessHandler]
\`\`\`

### 3. Requirements
*   **Authentication**: Verify who the user is (Username/Password, OAuth2, SAML).
*   **Authorization**: Verify what the user can do (RBAC, ABAC).
*   **Protection**: Guard against common attacks (CSRF, Session Fixation, Clickjacking).
*   **Flexibility**: Support for custom authentication mechanisms and storage.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant F as FilterChain
    participant AM as AuthenticationManager
    participant AP as AuthenticationProvider
    participant UD as UserDetailsService
    
    U->>F: POST /login
    F->>AM: authenticate(token)
    AM->>AP: authenticate(token)
    AP->>UD: loadUserByUsername(user)
    UD-->>AP: UserDetails
    AP-->>AM: Authentication (Authenticated)
    AM-->>F: Authentication
    F-->>U: 200 OK (Session/JWT)
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Filter Chain**: Spring Security is built on a chain of Servlet Filters. Each filter has a specific responsibility (e.g., CSRF protection, Logout, Authentication).
2.  **Authentication Entry Point**: When an unauthenticated user tries to access a protected resource, the \`AuthenticationEntryPoint\` is triggered (e.g., redirecting to a login page).
3.  **Authentication Manager**: The central interface for authentication. It delegates the actual work to one or more \`AuthenticationProviders\`.
4.  **Authentication Provider**: Handles specific types of authentication (e.g., \`DaoAuthenticationProvider\` for database-backed login).
5.  **User Details Service**: Fetches user data (username, password, authorities) from a data source.
6.  **Security Context**: Once authenticated, the \`Authentication\` object is stored in the \`SecurityContextHolder\`, making it available throughout the application.
7.  **Access Decision Manager**: When a user accesses a resource, this component checks their authorities against the required permissions for that resource.

### 6. Core Concepts
*   **Principal**: The currently authenticated user.
*   **Granted Authority**: A permission or role assigned to a user (e.g., \`ROLE_ADMIN\`).
*   **Security Filter Chain**: A list of filters that process every request.
*   **Method Security**: Using annotations like \`@PreAuthorize\` to secure individual service methods.

### 7. Common Vulnerabilities Handled
*   **CSRF (Cross-Site Request Forgery)**: Prevented using synchronized tokens.
*   **CORS (Cross-Origin Resource Sharing)**: Configurable to allow/deny requests from different domains.
*   **Session Fixation**: Spring Security can create a new session upon login to prevent this.

### 8. OAuth2 and JWT
Spring Security provides excellent support for modern authentication standards. It can act as an **OAuth2 Client**, **Resource Server**, or **Authorization Server**. JWTs are commonly used in stateless microservices to carry user identity and roles.
`,
    steps: [
      {
            "title": "Configure Filter",
            "description": "Define a SecurityFilterChain bean to customize security rules."
      },
      {
            "title": "User Details",
            "description": "Implement UserDetailsService to load user data from a database."
      },
      {
            "title": "Auth Provider",
            "description": "Configure how users are authenticated (e.g., DaoAuthenticationProvider)."
      },
      {
            "title": "Method Security",
            "description": "Use @PreAuthorize to secure individual service methods."
      }
]
  },
  {
    id: "spring-security-jwt-impl",
    category: "Spring Boot",
    title: "JWT Authentication Implementation",
    description: "Deep dive into implementing stateless authentication using JSON Web Tokens in Spring Security.",
    javaCode: `
import io.jsonwebtoken.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.http.*;
import java.util.*;

/**
 * 1. JWT Utility Class
 */
class JwtUtils {
    private String secret = "mySecretKey";
    
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

/**
 * 2. JWT Authentication Filter
 */
class JwtFilter extends OncePerRequestFilter {
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (jwtUtils.validateToken(token)) {
                String username = jwtUtils.getUsernameFromToken(token);
                // Set Authentication in SecurityContext
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(request, response);
    }
}
`,
    concepts: [
      "Statelessness: Server doesn't store session data; all info is in the token.",
      "JWT Structure: Header, Payload (Claims), and Signature.",
      "Signing: Using a secret key to ensure the token hasn't been tampered with.",
      "Bearer Token: The standard way to send JWTs in the Authorization header.",
      "Refresh Tokens: Long-lived tokens used to get new access tokens without re-login."
],
    tradeoffs: [
      "Pros: Scalable (no session sync needed), works well with microservices and mobile apps.",
      "Cons: Hard to revoke tokens before expiry, payload size increases with more claims."
],
    interviewTips: [
      "Where should you store JWTs on the client? (HttpOnly cookies are safer than LocalStorage).",
      "How do you revoke a JWT? (Blacklisting in Redis or using short-lived tokens with refresh tokens).",
      "What is the difference between JWS and JWE?",
      "What are the security risks of JWT? (XSS, CSRF, Algorithm 'none' attack)."
],
    deepDive: `
## JWT Implementation Deep Dive

### 1. The JWT Lifecycle
1.  Client sends credentials (username/password).
2.  Server validates and generates a signed JWT.
3.  Client stores JWT and sends it in the \`Authorization: Bearer <token>\` header for subsequent requests.
4.  Server validates the signature and extracts user info from the payload.

### 2. Security Best Practices
*   **Secret Key Management**: Never hardcode secrets. Use environment variables or a Vault.
*   **Short Expiry**: Keep access tokens short-lived (e.g., 15 mins) and use refresh tokens (e.g., 7 days).
*   **Algorithm Hardening**: Explicitly define the allowed signing algorithm to prevent "alg: none" attacks.

### 3. Revocation Strategies
Since JWTs are stateless, the server doesn't "know" about them. To revoke:
*   **Blacklisting**: Store revoked token IDs (jti) in Redis until they expire.
*   **Database Check**: Check a \`last_password_reset\` timestamp in the DB against the token's \`iat\` (Issued At) claim.
`,
    steps: [
      {
            "title": "Add Dependencies",
            "description": "Include jjwt (Java JWT) in your pom.xml."
      },
      {
            "title": "Create JwtUtils",
            "description": "Implement methods to generate, parse, and validate tokens."
      },
      {
            "title": "Implement Filter",
            "description": "Create a filter that extends OncePerRequestFilter to intercept and validate tokens."
      },
      {
            "title": "Configure Security",
            "description": "Add the JWT filter to the Spring Security filter chain and set session management to STATELESS."
      }
]
  },
  {
    id: "spring-security-oauth2-oidc",
    category: "Spring Boot",
    title: "OAuth2 & OpenID Connect (OIDC)",
    description: "Implementing modern delegated authorization and identity using Spring Security.",
    javaCode: `
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
class OAuth2SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            // 1. Act as an OAuth2 Client (Login with Google/GitHub)
            .oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("/dashboard")
            )
            // 2. Act as a Resource Server (Validate JWTs from an Auth Server)
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwkSetUri("https://auth-server/.well-known/jwks.json"))
            );
            
        return http.build();
    }
}

/*
# application.yml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: \${GOOGLE_CLIENT_ID}
            client-secret: \${GOOGLE_CLIENT_SECRET}
            scope: openid, profile, email
*/
`,
    concepts: [
      "OAuth2: Framework for delegated authorization (Access Tokens).",
      "OIDC (OpenID Connect): Identity layer on top of OAuth2 (ID Tokens).",
      "Authorization Code Flow: The most secure flow for web apps (uses a backend).",
      "Client ID & Secret: Credentials for your app to talk to the Auth Provider.",
      "Scopes: Permissions requested by the client (e.g., 'read:profile').",
      "JWKS (JSON Web Key Set): Public keys used to validate JWT signatures."
],
    tradeoffs: [
      "Pros: Offloads security to experts (Google/Okta), better UX (no new password), highly secure.",
      "Cons: Complex configuration, dependency on external providers, harder to test locally."
],
    interviewTips: [
      "Difference between OAuth2 and OIDC. (OAuth2 is for AuthZ; OIDC is for AuthN).",
      "Explain the Authorization Code Flow with PKCE.",
      "What is an ID Token vs an Access Token?",
      "What is the role of the 'State' parameter? (CSRF protection)."
],
    deepDive: `
## OAuth2 & OIDC Deep Dive

### 1. The Roles
*   **Resource Owner**: The User.
*   **Client**: Your Application.
*   **Authorization Server**: Google, Okta, Keycloak.
*   **Resource Server**: Your API (protected by tokens).

### 2. Authorization Code Flow
1.  User clicks "Login with Google".
2.  App redirects User to Google with \`client_id\` and \`redirect_uri\`.
3.  User authenticates with Google.
4.  Google redirects User back to App with an **Authorization Code**.
5.  App (Backend) exchanges the Code for an **Access Token** and **ID Token** using its \`client_secret\`.
6.  App uses the Access Token to call APIs.

### 3. Why OIDC?
OAuth2 only tells you "this user is allowed to do X". It doesn't tell you **who** the user is. OIDC adds the **ID Token** (a JWT), which contains user profile information (name, email, sub), standardizing identity across providers.
`,
    steps: [
      {
            "title": "Register App",
            "description": "Create a project in Google Cloud or GitHub and get your Client ID/Secret."
      },
      {
            "title": "Configure Spring",
            "description": "Add the registration details to your application.yml."
      },
      {
            "title": "Secure Endpoints",
            "description": "Define which paths require authentication and which are public."
      },
      {
            "title": "Extract Identity",
            "description": "Use @AuthenticationPrincipal to access the OIDC user details in your controllers."
      }
]
  },
  {
    id: "spring-webflux",
    category: "Spring Boot",
    title: "Spring Boot WebFlux (Reactive)",
    description: "Building non-blocking, event-driven applications using Project Reactor and Spring WebFlux.",
    javaCode: `
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.*;
import java.time.Duration;

@RestController
@RequestMapping("/api/reactive")
class ReactiveController {

    // 1. Returning a single item (Mono)
    @GetMapping("/user/{id}")
    public Mono<User> getUser(@PathVariable String id) {
        return Mono.just(new User(id, "User " + id))
                   .delayElement(Duration.ofMillis(100)); // Simulate async
    }

    // 2. Returning a stream of items (Flux)
    @GetMapping(value = "/stream", produces = "text/event-stream")
    public Flux<Long> getStream() {
        return Flux.interval(Duration.ofSeconds(1))
                   .take(10); // Emit 0 to 9 every second
    }

    // 3. Functional Style (Router Functions)
    /*
    @Bean
    public RouterFunction<ServerResponse> route(UserHandler handler) {
        return RouterFunctions.route(GET("/users"), handler::allUsers);
    }
    */
}

/**
 * Reactive Service Example
 */
class ReactiveService {
    public Flux<String> processData(Flux<String> input) {
        return input.map(String::toUpperCase)
                    .filter(s -> s.length() > 3)
                    .log(); // Useful for debugging reactive streams
    }
}

class User {
    private String id;
    private String name;
    public User(String id, String name) { this.id = id; this.name = name; }
    // Getters
}
`,
    concepts: [
      "Reactive Streams: Standard for asynchronous stream processing.",
      "Mono: Publisher that emits 0 or 1 element.",
      "Flux: Publisher that emits 0 to N elements.",
      "Backpressure: Mechanism for consumers to signal they are overwhelmed.",
      "Netty: The default non-blocking server for WebFlux."
],
    tradeoffs: [
      "Pros: High concurrency with few threads, better resource utilization for I/O bound apps.",
      "Cons: Higher complexity, 'infectious' (everything must be reactive), harder to debug stack traces."
],
    interviewTips: [
      "Difference between Spring MVC and WebFlux.",
      "What is the Event Loop model?",
      "How to handle blocking calls in a reactive pipeline? (publishOn/subscribeOn).",
      "What is Backpressure?"
],
    deepDive: `
## Spring WebFlux Deep Dive

### 1. The Reactive Manifesto
Reactive systems are Responsive, Resilient, Elastic, and Message Driven.

### 2. Project Reactor
Reactor is the underlying library for WebFlux. It provides two main types:
*   \`Mono<T>\`: For 0 or 1 result (like \`Optional\` or \`CompletableFuture\`).
*   \`Flux<T>\`: For 0 to N results (like \`Stream\`).

### 3. Threading Model
Unlike Spring MVC which uses a "Thread per Request" model, WebFlux uses a small number of threads (usually equal to CPU cores) to handle many concurrent connections using an Event Loop.
**CRITICAL**: Never block an Event Loop thread. Use \`Schedulers.boundedElastic()\` if you must call blocking legacy code.
`,
    steps: [
      {
            "title": "Choose WebFlux",
            "description": "Use WebFlux for high-concurrency, I/O intensive applications."
      },
      {
            "title": "Use Mono & Flux",
            "description": "Wrap your data in reactive types and use operators like map, flatMap, and filter."
      },
      {
            "title": "Avoid Blocking",
            "description": "Ensure all DB drivers and clients (e.g., WebClient) are also reactive."
      }
]
  },
  {
    id: "springboot-rsocket",
    category: "Spring Boot",
    title: "RSocket in Spring Boot",
    description: "Implementing high-performance, reactive, bi-directional communication using the RSocket protocol.",
    javaCode: `
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * RSOCKET CONTROLLER: Reactive communication.
 */
@Controller
public class RSocketController {

    // 1. Request-Response
    @MessageMapping("request-response")
    public Mono<String> requestResponse(String request) {
        return Mono.just("Response: " + request);
    }

    // 2. Fire-and-Forget
    @MessageMapping("fire-and-forget")
    public Mono<Void> fireAndForget(String request) {
        System.out.println("Received: " + request);
        return Mono.empty();
    }

    // 3. Request-Stream
    @MessageMapping("request-stream")
    public Flux<String> requestStream(String request) {
        return Flux.interval(java.time.Duration.ofSeconds(1))
                   .map(i -> "Stream item " + i + " for " + request);
    }
}
`,
    concepts: [
      "RSocket: A binary, polyglot, reactive protocol for L5/L6 networking.",
      "Interaction Models: Request-Response, Fire-and-Forget, Request-Stream, Channel (Bi-di).",
      "Backpressure: The ability for a consumer to signal to the producer how much data it can handle.",
      "Resumption: Automatically reconnecting and resuming a stream after a network failure.",
      "Leasing: A flow control mechanism where the server grants 'leases' to clients to send requests."
],
    tradeoffs: [
      "Pros: Extremely efficient (binary), built-in flow control, supports multiple interaction models, session resumption.",
      "Cons: Not as widely adopted as HTTP/gRPC, requires RSocket-compatible clients and infrastructure."
],
    interviewTips: [
      "What is RSocket and how does it differ from HTTP? (Binary, stateful, multiple interaction models).",
      "Explain the four interaction models of RSocket.",
      "What is 'Backpressure' in the context of RSocket?",
      "When would you choose RSocket over WebSockets?"
],
    deepDive: `
## RSocket Deep Dive

### 1. The Protocol
RSocket is a foundational protocol designed for the modern cloud. Unlike HTTP (which is request-response only), RSocket is **Message-Driven** and **Asynchronous**. It works over TCP, WebSockets, or Aeron.

### 2. Interaction Models
*   **Request-Response**: Standard 1-to-1 call.
*   **Fire-and-Forget**: Send data without waiting for a response (e.g., logging).
*   **Request-Stream**: One request, multiple responses (e.g., stock tickers).
*   **Channel**: Bi-directional streaming (e.g., real-time gaming).

### 3. Backpressure
This is the "Killer Feature". In HTTP, if a server is slow, the client just times out. In RSocket, the client can say "I can only handle 5 messages per second". The server will then buffer or slow down its production to match the client's capacity.
`,
    steps: [
      {
            "title": "Add Dependency",
            "description": "Include spring-boot-starter-rsocket."
      },
      {
            "title": "Define Controller",
            "description": "Use @MessageMapping to define your RSocket endpoints."
      },
      {
            "title": "Configure Server",
            "description": "Set the RSocket port in application.yml (e.g., spring.rsocket.server.port=7000)."
      },
      {
            "title": "Create Client",
            "description": "Use RSocketRequester to connect and send messages from other services."
      }
]
  },
  {
    id: "spring-actuator",
    category: "Spring Boot",
    title: "Spring Boot Actuator",
    description: "Provides production-ready features like health checks, metrics, and auditing to help you monitor and manage your application.",
    javaCode: `
// Dependency in pom.xml
// <dependency>
//     <groupId>org.springframework.boot</groupId>
//     <artifactId>spring-boot-starter-actuator</artifactId>
// </dependency>

// application.properties
// management.endpoints.web.exposure.include=health,info,metrics,prometheus

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {
    @Override
    public Health health() {
        boolean isServiceUp = checkExternalService();
        if (isServiceUp) {
            return Health.up().withDetail("External Service", "Available").build();
        }
        return Health.down().withDetail("External Service", "Not Available").build();
    }
    
    private boolean checkExternalService() { return true; }
}
`,
    concepts: [
      "Endpoints: Built-in URLs (/health, /metrics, /env) for monitoring.",
      "Micrometer Integration: Facade for collecting metrics and sending them to Prometheus, Grafana, etc.",
      "Custom Health Indicators: Define your own logic for what 'Healthy' means for your app."
],
    tradeoffs: [
      "Pros: Instant visibility into app internals. Standardized monitoring.",
      "Cons: Security risk if endpoints are exposed publicly without protection. Performance overhead if collecting too many metrics."
],
    interviewTips: [
      "How to secure actuator endpoints? (Spring Security).",
      "Difference between Liveness and Readiness probes."
],
    deepDive: `
## Spring Boot Actuator Design Guide

### 1. Key Endpoints
*   \`/health\`: Shows application health information.
*   \`/metrics\`: Shows various metrics (JVM memory, CPU, HTTP requests).
*   \`/env\`: Shows the current environment properties.
*   \`/loggers\`: Allows viewing and modifying log levels at runtime.
*   \`/prometheus\`: Exposes metrics in a format compatible with Prometheus.

### 2. Health Groups
You can group health indicators together (e.g., \`readiness\` and \`liveness\`) which is essential for Kubernetes deployments.

### 3. Custom Metrics
Use \`MeterRegistry\` to record custom business metrics:
\`\`\`java
@Autowired MeterRegistry registry;
public void orderPlaced() {
    registry.counter("orders.placed").increment();
}
\`\`\`
`,
    steps: [
      {
            "title": "Add Dependency",
            "description": "Include spring-boot-starter-actuator in your project."
      },
      {
            "title": "Configure Exposure",
            "description": "Set which endpoints should be visible via application.properties."
      },
      {
            "title": "Secure Endpoints",
            "description": "Use Spring Security to restrict access to sensitive monitoring data."
      },
      {
            "title": "Add Custom Metrics",
            "description": "Use Micrometer to track business-specific KPIs."
      }
]
  },
  {
    id: "springboot-observability",
    category: "Spring Boot",
    title: "Observability: Actuator & Micrometer",
    description: "Monitoring, tracing, and gathering metrics from your Spring Boot application in production.",
    javaCode: `
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Counter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
class OrderService {
    private final Counter orderCounter;

    public OrderService(MeterRegistry registry) {
        // 1. Custom Metric: Counting orders
        this.orderCounter = Counter.builder("orders.placed")
            .description("Total number of orders placed")
            .tag("region", "us-east")
            .register(registry);
    }

    public void placeOrder() {
        // Business logic...
        orderCounter.increment();
    }
}

/*
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: "health,info,metrics,prometheus"
  endpoint:
    health:
      show-details: always
  metrics:
    tags:
      application: "order-service"
*/
`,
    concepts: [
      "Actuator: Provides built-in endpoints for health, metrics, and environment info.",
      "Micrometer: A vendor-neutral metrics facade (like SLF4J but for metrics).",
      "Prometheus: A popular time-series database for storing metrics.",
      "Grafana: A visualization tool for creating dashboards from metrics.",
      "Distributed Tracing: Tracking requests across microservices (using Micrometer Tracing/Zipkin)."
],
    tradeoffs: [
      "Pros: Essential for production stability, quick incident response, performance bottleneck identification.",
      "Cons: Performance overhead (minimal but non-zero), security risk if endpoints are exposed publicly."
],
    interviewTips: [
      "How to secure Actuator endpoints? (Spring Security).",
      "What is the difference between a Counter, Gauge, and Timer in Micrometer?",
      "How do you implement a custom HealthIndicator?",
      "What is 'Log Aggregation' vs 'Metrics' vs 'Tracing'?"
],
    deepDive: `
## Spring Boot Observability Deep Dive

### 1. The Three Pillars
*   **Metrics**: Numeric data over time (CPU usage, request count).
*   **Logging**: Discrete events (Error messages, stack traces).
*   **Tracing**: The path of a single request through multiple services.

### 2. Micrometer & Prometheus
Micrometer collects data in a generic format. When you expose the \`/actuator/prometheus\` endpoint, it formats that data so Prometheus can "scrape" it. Prometheus then stores it as a time-series.

### 3. Custom Health Checks
You can create a class implementing \`HealthIndicator\` to add custom health checks (e.g., checking if a specific third-party API is reachable). This is used by Kubernetes to decide if your Pod is "Ready" or "Live".
`,
    steps: [
      {
            "title": "Add Dependencies",
            "description": "Include spring-boot-starter-actuator and micrometer-registry-prometheus."
      },
      {
            "title": "Expose Endpoints",
            "description": "Configure management.endpoints.web.exposure.include in application.yml."
      },
      {
            "title": "Create Metrics",
            "description": "Inject MeterRegistry and create Counters, Gauges, or Timers for business events."
      },
      {
            "title": "Visualize",
            "description": "Connect Prometheus to your app and Grafana to Prometheus."
      }
]
  },
  {
    id: "distributed-tracing-micrometer",
    category: "Spring Boot",
    title: "Distributed Tracing",
    description: "Tracking requests as they flow through multiple microservices to identify bottlenecks and failures.",
    javaCode: `
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import org.springframework.stereotype.Service;

/**
 * DISTRIBUTED TRACING: Manual observation with Micrometer.
 */
@Service
public class OrderService {
    private final ObservationRegistry registry;

    public OrderService(ObservationRegistry registry) {
        this.registry = registry;
    }

    public void createOrder() {
        Observation.createNotStarted("order.create", registry)
            .lowCardinalityKeyValue("orderType", "digital")
            .observe(() -> {
                // Business logic here
                System.out.println("Creating order...");
                callInventoryService();
            });
    }

    private void callInventoryService() {
        // Trace ID is automatically propagated via RestTemplate/WebClient
    }
}

/*
# application.yml
management:
  tracing:
    sampling:
      probability: 1.0 # Sample all requests (use lower in prod)
  zipkin:
    tracing:
      endpoint: http://localhost:9411/api/v2/spans
*/
`,
    concepts: [
      "Trace ID: A unique ID for the entire request journey across all services.",
      "Span ID: A unique ID for a specific operation within a single service.",
      "Context Propagation: Passing the Trace ID in HTTP headers (e.g., B3, W3C TraceContext).",
      "Sampling: Only tracing a percentage of requests to reduce performance overhead.",
      "Collector: A service (like Zipkin or Jaeger) that receives and stores trace data."
],
    tradeoffs: [
      "Pros: Essential for debugging microservices, identifies slow services in a chain, visualizes dependencies.",
      "Cons: Slight performance overhead, requires storage for traces, can be complex to set up across different technologies."
],
    interviewTips: [
      "What is the difference between a Trace and a Span?",
      "How is the Trace ID passed between services? (HTTP Headers).",
      "What is the role of Zipkin or Jaeger?",
      "Explain 'Sampling' and why it's used."
],
    deepDive: `
## Distributed Tracing Deep Dive

### 1. The Need for Tracing
In a monolith, a stack trace tells you everything. In microservices, a request might fail in Service D, but Service A just sees a "500 Internal Server Error". Distributed tracing allows you to see the entire path of the request.

### 2. Micrometer Tracing (Spring Boot 3)
In Spring Boot 2, we used **Spring Cloud Sleuth**. In Spring Boot 3, this has been moved to **Micrometer Tracing**.
*   It automatically intercepts \`RestTemplate\`, \`WebClient\`, and Feign calls.
*   It adds \`traceId\` and \`spanId\` to your logs automatically.

### 3. W3C TraceContext
This is the modern standard for trace headers. It uses the \`traceparent\` header (e.g., \`00-4bf92...-00\`). Using a standard ensures that if your Java service calls a Go service, the trace remains intact.
`,
    steps: [
      {
            "title": "Add Dependencies",
            "description": "Include micrometer-tracing and a bridge (e.g., micrometer-tracing-bridge-otel)."
      },
      {
            "title": "Add Exporter",
            "description": "Include an exporter to send traces to Zipkin or Jaeger."
      },
      {
            "title": "Configure Sampling",
            "description": "Set the sampling probability (e.g., 0.1 for 10% of traffic)."
      },
      {
            "title": "View Traces",
            "description": "Open the Zipkin/Jaeger UI to search for traces by ID or service name."
      }
]
  },
  {
    id: "springboot-batch",
    category: "Spring Boot",
    title: "Spring Batch Processing",
    description: "A robust framework for processing large volumes of data in batches with restartability and transaction management.",
    javaCode: `
import org.springframework.batch.core.*;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.*;
import org.springframework.context.annotation.*;
import org.springframework.transaction.PlatformTransactionManager;

/**
 * SPRING BATCH: Reader -> Processor -> Writer.
 */
@Configuration
class BatchConfig {

    @Bean
    public Job importUserJob(JobRepository jobRepository, Step step1) {
        return new JobBuilder("importUserJob", jobRepository)
                .start(step1)
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("step1", jobRepository)
                .<String, String>chunk(10, transactionManager)
                .reader(new ListItemReader<>(Arrays.asList("user1", "user2", "user3")))
                .processor(item -> item.toUpperCase())
                .writer(chunk -> System.out.println("Writing: " + chunk.getItems()))
                .build();
    }
}
`,
    concepts: [
      "Job: The entire batch process.",
      "Step: A sequential phase of a Job (usually Chunk-oriented).",
      "ItemReader: Logic to read data (File, DB, API).",
      "ItemProcessor: Logic to transform data.",
      "ItemWriter: Logic to save data.",
      "Chunk: A small subset of data processed together in one transaction.",
      "JobRepository: Persistence for job metadata (status, restart info)."
],
    tradeoffs: [
      "Pros: Handles massive data efficiently, built-in retry/skip logic, restartable from point of failure.",
      "Cons: High learning curve, overhead for small tasks, requires a database for metadata."
],
    interviewTips: [
      "What is the difference between Tasklet and Chunk-oriented processing?",
      "How does Spring Batch handle restarts?",
      "What is the role of JobParameters?",
      "How to scale Spring Batch? (Parallel steps, Partitioning, Remote Chunking)."
],
    deepDive: `
## Spring Batch Deep Dive

### 1. Chunk-Oriented Processing
The core of Spring Batch is the Chunk pattern. It reads items one by one until it reaches the \`chunk size\`. Then, it passes the entire list to the Writer. This ensures that database transactions are efficient and not held open for too long.

### 2. Restartability
Spring Batch stores the state of every job in a database (\`BATCH_JOB_EXECUTION\`, etc.). If a job fails at item 5,000 of 10,000, you can fix the issue and restart it. Spring Batch will know to skip the first 5,000 items and resume from the failure point.

### 3. Scaling Strategies
*   **Multi-threaded Step**: Process chunks in parallel within one JVM.
*   **Parallel Steps**: Run independent steps (e.g., Step A and Step B) at the same time.
*   **Partitioning**: Split the data into ranges (e.g., ID 1-1000, 1001-2000) and process each range in a separate thread or even a separate JVM.
`,
    steps: [
      {
            "title": "Define Reader",
            "description": "Choose a reader (JdbcPagingItemReader, FlatFileItemReader, etc.) for your source."
      },
      {
            "title": "Implement Processor",
            "description": "Add business logic to transform or validate each item."
      },
      {
            "title": "Configure Chunk",
            "description": "Set an appropriate chunk size based on your memory and transaction limits."
      },
      {
            "title": "Enable Metadata",
            "description": "Configure a DataSource for Spring Batch to store job execution history."
      }
]
  },
  {
    id: "springboot-native-graalvm",
    category: "Spring Boot",
    title: "GraalVM Native Images",
    description: "Compiling Spring Boot applications into native executables for instant startup and low memory footprint.",
    javaCode: `
/**
 * SPRING BOOT NATIVE CONFIGURATION
 */

/*
# 1. Add the GraalVM Native Build Tools plugin to pom.xml
# 2. Compile to native executable:
# ./mvnw native:compile -Pnative

# 3. Run the native binary:
# ./target/my-app
*/

// Note: Reflection, Proxies, and Resources need to be 
// configured for the native image compiler.
`,
    concepts: [
      "AOT (Ahead-of-Time) Compilation: Compiling the app to native code before running it.",
      "GraalVM: A high-performance JDK that supports native image generation.",
      "Instant Startup: Native images start in milliseconds compared to seconds for JVM apps.",
      "Low Memory: Native images use significantly less RAM as they don't need a full JVM.",
      "Static Analysis: The compiler analyzes the code to include only what is actually used.",
      "Reachability Metadata: Configuration files that tell GraalVM about reflection, proxies, and resources."
],
    tradeoffs: [
      "Pros: Perfect for Serverless (AWS Lambda) and Kubernetes, reduced cloud costs, improved security (smaller attack surface).",
      "Cons: Long build times, limited support for some libraries, harder to debug, no JIT optimizations at runtime."
],
    interviewTips: [
      "What is AOT compilation?",
      "Why is Spring Boot 3 better for native images? (Built-in AOT support).",
      "What are the limitations of native images? (Reflection and dynamic loading are difficult).",
      "How does native image startup compare to JVM startup?"
],
    deepDive: `
## GraalVM Native Images Deep Dive

### 1. The Shift to AOT
Traditionally, Java is JIT-compiled. The JVM starts, interprets bytecode, and then optimizes hot methods. This is slow. **Native Image** shifts this work to build time. The result is a standalone executable that contains the application, its dependencies, and a minimal "Substrate VM".

### 2. Spring Boot 3 & AOT
Spring Boot 3 was designed with native images in mind. It performs a "Build-time Analysis" of your beans and configuration, generating the necessary metadata for GraalVM automatically. This eliminates much of the manual configuration required in older versions.

### 3. The Tradeoff: Build Time vs. Run Time
Building a native image can take several minutes and requires a lot of RAM. However, the resulting binary starts instantly and uses ~50% less memory. This makes it ideal for **Scale-to-Zero** architectures where startup time is the most critical metric.
`,
    steps: [
      {
            "title": "Use Spring Boot 3",
            "description": "Ensure you are using the latest version for the best AOT support."
      },
      {
            "title": "Add Native Plugin",
            "description": "Add the 'native-maven-plugin' or 'native-gradle-plugin' to your build."
      },
      {
            "title": "Run AOT Tests",
            "description": "Test your app in native mode early, as some libraries may fail."
      },
      {
            "title": "Optimize for Cloud",
            "description": "Use native images for microservices that need to scale rapidly in Kubernetes."
      }
]
  },
  {
    id: "springboot-declarative-http-client",
    category: "Spring Boot",
    title: "Declarative HTTP Clients",
    description: "Using Spring Boot 3's new interface-based approach to define and consume REST APIs.",
    javaCode: `
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;

/**
 * DECLARATIVE HTTP CLIENT (Spring Boot 3)
 */
@HttpExchange("/users")
interface UserClient {
    @GetExchange("/{id}")
    User getUser(Long id);
}

@Configuration
class ClientConfig {
    @Bean
    UserClient userClient(WebClient.Builder builder) {
        WebClient webClient = builder.baseUrl("https://api.example.com").build();
        WebClientAdapter adapter = WebClientAdapter.create(webClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();
        return factory.createClient(UserClient.class);
    }
}

record User(Long id, String name) {}
`,
    concepts: [
      "HttpExchange: The base annotation for defining the API endpoint.",
      "GetExchange/PostExchange: Specialized annotations for HTTP methods.",
      "HttpServiceProxyFactory: The factory that generates the implementation of the interface at runtime.",
      "WebClient Integration: The underlying engine used to make the actual network calls.",
      "Type Safety: No more manual URL building or JSON parsing code."
],
    tradeoffs: [
      "Pros: Extremely clean and readable code, easy to test, reduces boilerplate, consistent with Spring's programming model.",
      "Cons: Requires Spring Boot 3+, slightly more setup than a simple RestTemplate call."
],
    interviewTips: [
      "How does the Declarative Client compare to Feign? (It's Spring's native alternative to Feign).",
      "What is the role of HttpServiceProxyFactory?",
      "Can you use these clients with synchronous code? (Yes, if the underlying WebClient is configured correctly).",
      "How to handle errors in declarative clients?"
],
    deepDive: `
## Declarative HTTP Clients Deep Dive

### 1. The Evolution
In the past, we used \`RestTemplate\` (imperative) or \`WebClient\` (fluent). While powerful, they required a lot of boilerplate for simple API calls. Spring Boot 3 introduced a declarative approach similar to **Retrofit** or **Feign**.

### 2. How it Works
You define an interface with annotations that describe the API. At startup, Spring uses reflection (or AOT in native mode) to create a proxy that implements this interface. When you call a method, the proxy translates it into a \`WebClient\` call.

### 3. Flexibility
Because it's built on top of \`WebClient\`, you get all its features for free:
*   Non-blocking I/O.
*   Built-in serialization/deserialization.
*   Easy integration with **Micrometer Tracing** for distributed tracing.
*   Custom filters and interceptors.
`,
    steps: [
      {
            "title": "Define Interface",
            "description": "Create an interface with @HttpExchange and method-level annotations."
      },
      {
            "title": "Configure WebClient",
            "description": "Create a WebClient bean with the base URL and any necessary security headers."
      },
      {
            "title": "Create Proxy",
            "description": "Use HttpServiceProxyFactory to generate the client bean."
      },
      {
            "title": "Inject and Use",
            "description": "Autowired the client into your services and call methods like standard Java methods."
      }
]
  },
  {
    id: "spring-testing",
    category: "Spring Boot",
    title: "Spring Boot Testing & JUnit 5",
    description: "Comprehensive testing strategies for Spring Boot applications using JUnit 5, Mockito, and AssertJ.",
    javaCode: `
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.web.client.TestRestTemplate;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.*;

/**
 * 1. Unit Testing with Mockito
 */
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUser() {
        User user = new User(1L, "John");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertThat(result.getName()).isEqualTo("John");
        verify(userRepository, times(1)).findById(1L);
    }
}

/**
 * 2. Slice Testing with @WebMvcTest
 */
@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void testHelloEndpoint() throws Exception {
        when(userService.getGreeting()).thenReturn("Hello World");

        mockMvc.perform(get("/api/hello"))
               .andExpect(status().isOk())
               .andExpect(content().string("Hello World"));
    }
}

/**
 * 3. Integration Testing with @SpringBootTest
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void testFullStack() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/data", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
`,
    concepts: [
      "JUnit 5: The modern testing framework for Java.",
      "Mockito: Mocking framework for isolating components.",
      "AssertJ: Fluent assertions for readable tests.",
      "@SpringBootTest: Full integration testing.",
      "@WebMvcTest: Testing only the web layer (Controller slice).",
      "@DataJpaTest: Testing only the persistence layer."
],
    tradeoffs: [
      "Unit Tests: Fast, isolated, but don't catch integration issues.",
      "Integration Tests: Catch wiring issues but are slow and require more setup.",
      "Slice Tests: Good balance between speed and coverage for specific layers."
],
    interviewTips: [
      "Explain the difference between @Mock and @MockBean.",
      "How do you test private methods? (Don't, test public behavior instead).",
      "What is the purpose of @TestConfiguration?",
      "How to handle database state in integration tests? (Testcontainers or H2)."
],
    deepDive: `
## Spring Boot Testing Deep Dive

### 1. The Testing Pyramid
A healthy test suite follows the pyramid: many unit tests, fewer integration tests, and even fewer E2E tests.

### 2. Mockito Essentials
*   **Stubbing**: Defining what a mock should return (\`when(...).thenReturn(...)\`).
*   **Verification**: Checking if a method was called (\`verify(mock).method()\`).
*   **Argument Captors**: Capturing arguments passed to mocks for further assertion.

### 3. Spring Boot Test Slices
Spring Boot provides "slices" to test parts of the application in isolation without starting the full context:
*   \`@WebMvcTest\`: Controllers, Filters, Interceptors.
*   \`@DataJpaTest\`: Repositories, Entity Manager.
*   \`@JsonTest\`: JSON serialization/deserialization.
`,
    steps: [
      {
            "title": "Unit Tests First",
            "description": "Write isolated unit tests for business logic using Mockito."
      },
      {
            "title": "Controller Slices",
            "description": "Use @WebMvcTest and MockMvc to verify REST endpoints."
      },
      {
            "title": "Persistence Slices",
            "description": "Use @DataJpaTest with an in-memory DB to verify repository queries."
      },
      {
            "title": "Integration Tests",
            "description": "Use @SpringBootTest for critical end-to-end flows."
      }
]
  },
  {
    id: "service-discovery-eureka",
    category: "Spring Boot",
    title: "Service Discovery (Eureka)",
    description: "Automatically detecting and managing service instances in a dynamic cloud environment.",
    javaCode: `
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * EUREKA SERVER (Registry)
 */
@SpringBootApplication
@EnableEurekaServer
class EurekaServerApp {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApp.class, args);
    }
}

/**
 * EUREKA CLIENT (Microservice)
 */
@SpringBootApplication
@EnableDiscoveryClient
class MyServiceApp {
    // This service will automatically register itself with the server
}

/*
# application.yml (Client)
spring:
  application:
    name: inventory-service
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
*/
`,
    concepts: [
      "Service Registry: A database of available service instances (e.g., Eureka Server).",
      "Registration: A service instance telling the registry its IP and Port on startup.",
      "Heartbeats: Periodic signals from instances to the registry to prove they are still alive.",
      "Client-Side Discovery: The client queries the registry and chooses an instance (e.g., Spring Cloud LoadBalancer).",
      "Server-Side Discovery: The client talks to a Load Balancer which queries the registry (e.g., AWS ELB).",
      "Self-Preservation: A Eureka feature where it stops expiring instances if it detects a network issue."
],
    tradeoffs: [
      "Pros: No hardcoded IPs, handles auto-scaling automatically, improves system resilience.",
      "Cons: Adds another infrastructure component to manage, potential for stale data if heartbeats are delayed."
],
    interviewTips: [
      "Difference between Client-Side and Server-Side discovery.",
      "What is Eureka 'Self-Preservation' mode?",
      "How does a service know where the Eureka server is? (Configured via URL).",
      "What happens if Eureka goes down? (Clients usually cache the registry locally, so they can still function for a while)."
],
    deepDive: `
## Service Discovery Deep Dive

### 1. The Problem
In a cloud environment, IP addresses are ephemeral. Services scale up and down. You cannot hardcode \`http://10.0.0.5:8080\` in your code. You need a way to say "Give me an instance of the 'Order Service'".

### 2. Eureka (Netflix)
Eureka is the most common registry in the Spring ecosystem.
*   **Registration**: When a service starts, it sends a POST request to Eureka with its metadata.
*   **Renewal**: Every 30 seconds, the service sends a heartbeat. If Eureka doesn't hear from it for 90 seconds, it removes the instance.
*   **Fetching**: Clients fetch the registry every 30 seconds and cache it locally.

### 3. Client-Side Load Balancing
With Spring Cloud, when you use \`@LoadBalanced RestTemplate\`, the client doesn't just call a URL. It:
1.  Looks at the hostname (e.g., \`inventory-service\`).
2.  Queries the local Eureka cache for all IPs of that service.
3.  Uses a load balancing algorithm (like Round Robin) to pick one.
4.  Makes the actual HTTP call.
`,
    steps: [
      {
            "title": "Setup Server",
            "description": "Create a Spring Boot app with @EnableEurekaServer."
      },
      {
            "title": "Enable Clients",
            "description": "Add the eureka-client dependency and @EnableDiscoveryClient to your microservices."
      },
      {
            "title": "Configure URLs",
            "description": "Ensure all clients point to the correct Eureka server URL."
      },
      {
            "title": "Monitor Dashboard",
            "description": "Use the Eureka UI (usually at port 8761) to see all registered instances."
      }
]
  },
  {
    id: "spring-cloud-config",
    category: "Spring Boot",
    title: "Spring Cloud Config",
    description: "Centralized configuration management for microservices across different environments.",
    javaCode: `
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

/**
 * CONFIG SERVER
 */
@SpringBootApplication
@EnableConfigServer
class ConfigServerApp {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApp.class, args);
    }
}

/*
# application.yml (Server)
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/my-org/config-repo
          search-paths: '{application}'

# application.yml (Client)
spring:
  config:
    import: "optional:configserver:http://localhost:8888"
  application:
    name: order-service
  profiles:
    active: dev
*/
`,
    concepts: [
      "Centralized Config: Storing all application properties in one place (usually a Git repo).",
      "Environment Specific: Different properties for dev, test, and prod profiles.",
      "Dynamic Refresh: Updating properties at runtime without restarting the service (@RefreshScope).",
      "Encryption: Storing sensitive data (passwords) in encrypted form in the config repo.",
      "Config Client: The microservice that fetches its properties from the server on startup."
],
    tradeoffs: [
      "Pros: Single source of truth, easy to manage 100+ services, secure management of secrets.",
      "Cons: Config server becomes a single point of failure (use multiple instances), adds complexity to the startup process."
],
    interviewTips: [
      "Why use a Config Server instead of application.yml in each service?",
      "How does @RefreshScope work?",
      "How to secure sensitive properties in Spring Cloud Config?",
      "What happens if the Config Server is down when a service starts?"
],
    deepDive: `
## Spring Cloud Config Deep Dive

### 1. The Need for Centralization
In microservices, managing 50 different \`application.yml\` files is impossible. If you need to change the database URL for all services, you'd have to commit and redeploy 50 times. With Config Server, you change it once in the Git repo.

### 2. How it Works
1.  **Config Server** connects to a Git repository (or Vault/S3).
2.  **Config Client** (Microservice) starts up.
3.  Client calls the Server: "I am 'order-service' with profile 'prod'. Give me my properties."
4.  Server fetches the relevant files (e.g., \`order-service-prod.yml\`) and returns them.
5.  Client injects these properties into its \`Environment\`.

### 3. Dynamic Refresh
If you change a property in Git, the client doesn't see it immediately. You can:
*   POST to \`/actuator/refresh\` on the client.
*   Use **Spring Cloud Bus** to broadcast a refresh event to all instances via Kafka/RabbitMQ.
Any bean annotated with \`@RefreshScope\` will be recreated with the new properties.
`,
    steps: [
      {
            "title": "Setup Git Repo",
            "description": "Create a repository to hold your YAML configuration files."
      },
      {
            "title": "Setup Server",
            "description": "Create a Spring Boot app with @EnableConfigServer pointing to the Git repo."
      },
      {
            "title": "Configure Clients",
            "description": "Add spring-cloud-starter-config and set the server URL in application.yml."
      },
      {
            "title": "Secure Secrets",
            "description": "Use JCE (Java Cryptography Extension) or HashiCorp Vault to encrypt sensitive values."
      }
]
  },
  {
    id: "spring-cloud-gateway",
    category: "Spring Boot",
    title: "Spring Cloud Gateway",
    description: "Building a powerful API Gateway for microservices with routing, filtering, and rate limiting.",
    javaCode: `
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 1. Java-based Route Configuration
 */
@Configuration
class GatewayConfig {
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r.path("/users/**")
                .filters(f -> f.addRequestHeader("X-Gateway-Auth", "True")
                               .circuitBreaker(c -> c.setName("userServiceCB")))
                .uri("lb://USER-SERVICE"))
            .route("order-service", r -> r.path("/orders/**")
                .uri("http://localhost:8081"))
            .build();
    }
}

/*
# 2. YAML-based Configuration
spring:
  cloud:
    gateway:
      routes:
        - id: product-service
          uri: lb://PRODUCT-SERVICE
          predicates:
            - Path=/products/**
          filters:
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-rate-limiter.burstCapacity: 20
*/
`,
    concepts: [
      "Route: The basic building block (ID, destination URI, predicates, filters).",
      "Predicate: A condition that must be met to match a route (e.g., Path, Header, Cookie).",
      "Filter: Logic to modify the request or response (e.g., AddHeader, Hystrix, RateLimiter).",
      "Dynamic Routing: Using Service Discovery (Eureka) to route to instances automatically.",
      "Reactive Foundation: Built on Spring WebFlux and Netty for high performance."
],
    tradeoffs: [
      "Pros: Centralized cross-cutting concerns, high performance, easy integration with Spring ecosystem.",
      "Cons: Single point of failure (needs HA), adds latency, complex to debug filter chains."
],
    interviewTips: [
      "Difference between Spring Cloud Gateway and Netflix Zuul. (Gateway is reactive/non-blocking, Zuul 1 is blocking).",
      "How to implement authentication in Gateway? (Global Filters or per-route filters).",
      "What is the 'lb://' prefix? (Load Balanced URI using Spring Cloud LoadBalancer).",
      "How to handle CORS in Gateway?"
],
    deepDive: `
## Spring Cloud Gateway Deep Dive

### 1. Why an API Gateway?
Instead of clients calling 20 different microservices, they call one Gateway. The Gateway handles:
*   **Routing**: Directing requests to the right service.
*   **Security**: Validating JWTs or API keys.
*   **Resilience**: Circuit breaking and retries.
*   **Observability**: Centralized logging and tracing.

### 2. Predicates & Filters
Predicates decide **if** a request matches a route. Filters decide **what** to do with the request/response. Filters can be "Pre" (before the request is sent) or "Post" (after the response is received).

### 3. Reactive Architecture
Unlike traditional gateways that use one thread per request, Spring Cloud Gateway uses a non-blocking, event-loop architecture. This allows it to handle thousands of concurrent connections with minimal resources.
`,
    steps: [
      {
            "title": "Add Dependencies",
            "description": "Include spring-cloud-starter-gateway in your project."
      },
      {
            "title": "Define Routes",
            "description": "Use YAML or Java DSL to define predicates and destination URIs."
      },
      {
            "title": "Apply Filters",
            "description": "Add logic for authentication, rate limiting, or header manipulation."
      },
      {
            "title": "Enable Discovery",
            "description": "Integrate with Eureka or Consul for dynamic service routing."
      }
]
  },
  {
    id: "spring-cloud-stream",
    category: "Spring Boot",
    title: "Spring Cloud Stream",
    description: "A framework for building highly scalable, event-driven microservices connected with shared messaging systems.",
    javaCode: `
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * SPRING CLOUD STREAM: Functional Programming Model.
 */
@Configuration
public class StreamConfig {

    // 1. Supplier (Producer): Sends data periodically
    @Bean
    public Supplier<String> produceMessage() {
        return () -> "New Event: " + System.currentTimeMillis();
    }

    // 2. Function (Processor): Transforms data
    @Bean
    public Function<String, String> processMessage() {
        return message -> message.toUpperCase();
    }

    // 3. Consumer (Sink): Receives data
    @Bean
    public Consumer<String> consumeMessage() {
        return message -> System.out.println("Received: " + message);
    }
}

/*
# application.yml
spring:
  cloud:
    stream:
      bindings:
        produceMessage-out-0:
          destination: my-topic
        processMessage-in-0:
          destination: my-topic
        processMessage-out-0:
          destination: processed-topic
        consumeMessage-in-0:
          destination: processed-topic
      binders:
        kafka:
          type: kafka
          environment:
            spring.cloud.stream.kafka.binder.brokers: localhost:9092
*/
`,
    concepts: [
      "Binder: The glue between the app and the messaging system (Kafka, RabbitMQ, Solace).",
      "Binding: The bridge between the app's code (Functions) and the messaging destination (Topics/Queues).",
      "Functional Model: Using Java 8 Suppliers, Functions, and Consumers to define logic.",
      "Consumer Groups: Ensuring only one instance of a service processes a message.",
      "Partitioning: Distributing data across multiple instances for scale."
],
    tradeoffs: [
      "Pros: Decouples code from messaging middleware, easy to switch binders, built-in retry/DLQ logic.",
      "Cons: Abstraction overhead, can be complex to debug binding issues, YAML configuration can be verbose."
],
    interviewTips: [
      "What is a Binder in Spring Cloud Stream?",
      "How do you handle retries and Dead Letter Queues (DLQ)?",
      "Explain the difference between a Supplier, Function, and Consumer in this context.",
      "How to implement partitioning in Spring Cloud Stream?"
],
    deepDive: `
## Spring Cloud Stream Deep Dive

### 1. The Abstraction
Spring Cloud Stream provides a unified way to talk to messaging systems. You write standard Java functions, and the framework handles the connection to Kafka or RabbitMQ. This makes your code "Middleware Neutral".

### 2. Functional Programming Model
Since version 3.0, Spring Cloud Stream favors the functional approach over the old \`@EnableBinding\` and \`@StreamListener\` annotations.
*   **Supplier**: Triggered by a poller (default 1s) to send data.
*   **Function**: Receives an input and returns an output.
*   **Consumer**: Receives an input and returns nothing.

### 3. Resilience Features
*   **Retries**: Automatically retries failed message processing.
*   **DLQ (Dead Letter Queue)**: If retries fail, the message is sent to a special topic for manual inspection.
*   **Error Handling**: Global and local error handlers can be defined to manage exceptions gracefully.
`,
    steps: [
      {
            "title": "Add Binder",
            "description": "Include the binder dependency (e.g., spring-cloud-stream-binder-kafka)."
      },
      {
            "title": "Write Functions",
            "description": "Implement business logic using Supplier, Function, or Consumer beans."
      },
      {
            "title": "Configure Bindings",
            "description": "Map your beans to destinations in application.yml."
      },
      {
            "title": "Set Consumer Groups",
            "description": "Always define a group ID to ensure load balancing across instances."
      }
]
  },
  {
    id: "circuit-breaker",
    category: "Spring Boot",
    title: "Circuit Breaker Pattern (Resilience4j)",
    description: "Preventing cascading failures in microservices by gracefully handling service unavailability.",
    javaCode: `
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Service
class InventoryService {
    @Autowired
    private RestTemplate restTemplate;

    // 1. Circuit Breaker with Fallback
    @CircuitBreaker(name = "inventoryService", fallbackMethod = "fallbackInventory")
    public String checkStock(String productId) {
        // This call might fail if the external service is down
        return restTemplate.getForObject("http://external-stock-api/check/" + productId, String.class);
    }

    // 2. Fallback Method (Must have same signature + Exception)
    public String fallbackInventory(String productId, Exception e) {
        System.out.println("Circuit Open! Falling back for product: " + productId);
        return "Stock status unknown (Cached/Default)";
    }
}

/*
# application.yml configuration
resilience4j.circuitbreaker:
  instances:
    inventoryService:
      registerHealthIndicator: true
      slidingWindowSize: 10
      permittedNumberOfCallsInHalfOpenState: 3
      slidingWindowType: COUNT_BASED
      minimumNumberOfCalls: 5
      waitDurationInOpenState: 5s
      failureRateThreshold: 50
      eventConsumerBufferSize: 10
*/
`,
    concepts: [
      "Closed State: Normal operation, requests flow through.",
      "Open State: Failure threshold reached, requests fail fast immediately.",
      "Half-Open State: Trial period to see if the service has recovered.",
      "Failure Rate Threshold: Percentage of failures required to trip the circuit.",
      "Sliding Window: The range of recent calls used to calculate the failure rate."
],
    tradeoffs: [
      "Pros: Prevents resource exhaustion (threads), improves system resilience, provides better UX via fallbacks.",
      "Cons: Adds complexity, requires careful tuning of thresholds to avoid false positives."
],
    interviewTips: [
      "Difference between Hystrix and Resilience4j. (Hystrix is deprecated, uses thread isolation; Resilience4j is modern, uses functional programming/decorators).",
      "What happens in the 'Half-Open' state?",
      "How do you monitor circuit breaker status? (Actuator + Prometheus/Grafana).",
      "What is Bulkheading? (Isolating resources to prevent one failure from taking down the whole system)."
],
    deepDive: `
## Circuit Breaker Deep Dive

### 1. The Cascading Failure Problem
In microservices, if Service A calls Service B, and B is slow or down, A's threads will hang waiting for a response. Eventually, A runs out of threads and crashes. This can ripple through the entire system.

### 2. State Machine Logic
*   **CLOSED**: Everything is fine.
*   **OPEN**: Too many errors! Stop calling the downstream service. Return a fallback or error immediately.
*   **HALF-OPEN**: After a timeout, let a few requests through. If they succeed, go back to CLOSED. If they fail, go back to OPEN.

### 3. Resilience4j vs Hystrix
Resilience4j is built on top of Vavr (functional library for Java) and is much more lightweight than Hystrix. It doesn't force a specific threading model and integrates perfectly with Spring Boot via AOP.
`,
    steps: [
      {
            "title": "Add Dependency",
            "description": "Include resilience4j-spring-boot3 in your pom.xml."
      },
      {
            "title": "Configure Thresholds",
            "description": "Define failure rates and window sizes in application.yml."
      },
      {
            "title": "Annotate Methods",
            "description": "Use @CircuitBreaker on methods that call external services."
      },
      {
            "title": "Implement Fallbacks",
            "description": "Provide logic to return default or cached data when the circuit is open."
      }
]
  },
  {
    id: "monolith-vs-microservices",
    category: "System Design",
    title: "Monolith vs Microservices",
    description: "Choosing the right architecture for your application's scale and complexity.",
    javaCode: `
/**
 * MONOLITH vs MICROSERVICES: Comparing in-memory vs network communication.
 */

// 1. Monolith: In-memory method calls (Fast, Reliable)
class MonolithApp {
    private InventoryService inventory = new InventoryService();

    public void checkout(String itemId) {
        // Direct method call
        if (inventory.checkStock(itemId)) {
            System.out.println("Monolith: Item in stock. Proceeding...");
        }
    }
}

// 2. Microservices: Network calls (Latency, Failure risk)
class OrderService {
    private String inventoryServiceUrl = "http://inventory-service/api/stock/";

    public void checkout(String itemId) {
        System.out.println("Microservice: Calling " + inventoryServiceUrl + itemId);
        try {
            // Simulated network call
            boolean inStock = simulateNetworkCall(itemId);
            if (inStock) System.out.println("Microservice: Item in stock.");
        } catch (Exception e) {
            System.out.println("Microservice: Network failure! Handling fallback...");
        }
    }

    private boolean simulateNetworkCall(String id) throws Exception {
        if (Math.random() < 0.1) throw new Exception("Timeout"); // 10% failure
        return true;
    }
}

class InventoryService {
    public boolean checkStock(String id) { return true; }
}

public class ArchitectureDemo {
    public static void main(String[] args) {
        System.out.println("--- Monolith Execution ---");
        new MonolithApp().checkout("item_1");

        System.out.println("
--- Microservices Execution ---");
        new OrderService().checkout("item_1");
    }
}
`,
    concepts: [
      "Monolith: Single codebase, single deployment unit, shared database.",
      "Microservices: Distributed system, independent deployment, polyglot persistence.",
      "Service Discovery: How services find each other (e.g., Eureka, Consul).",
      "Distributed Tracing: Tracking requests across service boundaries (e.g., Sleuth).",
      "Bounded Context: Defining clear boundaries for each service (DDD)."
],
    tradeoffs: [
      "Monolith Pros: Simple to develop, test, and deploy. Low latency (in-memory calls).",
      "Monolith Cons: Hard to scale specific parts. Long build/deploy times. Technology lock-in.",
      "Microservices Pros: Independent scaling. Faster deployments. Technology flexibility.",
      "Microservices Cons: Operational complexity. Network latency. Data consistency challenges."
],
    interviewTips: [
      "When is a Monolith better than Microservices? (Early stage, small team, low complexity).",
      "Explain the 'Distributed Monolith' anti-pattern.",
      "How do you handle shared libraries in Microservices?",
      "What is the 'Strangler Fig' pattern for migrating from Monolith to Microservices?"
],
    deepDive: `
## Monolith vs Microservices Deep Dive

### 1. The Monolith
A monolithic application is built as a single unit. All components are interconnected and interdependent.
*   **Best for**: Small teams, simple domains, and rapid prototyping.
*   **Challenge**: As the app grows, it becomes a "Big Ball of Mud," making it hard to understand and change.

### 2. Microservices
Microservices break the application into small, independent services that communicate over a network.
*   **Best for**: Large organizations, complex domains, and high-scale requirements.
*   **Challenge**: You trade code complexity for operational complexity. You now have to deal with network failures, service discovery, and distributed logging.

### 3. The Decision Matrix
| Feature | Monolith | Microservices |
| :--- | :--- | :--- |
| **Deployment** | Single unit | Independent |
| **Scaling** | Scale the whole app | Scale specific services |
| **Complexity** | Low (Internal) | High (Operational) |
| **Data** | Shared DB | Database per service |
| **Latency** | Low (In-memory) | High (Network) |
`,
    steps: [
      {
            "title": "Identify Boundaries",
            "description": "Use Domain-Driven Design to find natural service boundaries."
      },
      {
            "title": "Establish Communication",
            "description": "Decide on API protocols (REST, gRPC) and messaging (Kafka)."
      },
      {
            "title": "Automate CI/CD",
            "description": "Invest in robust automation for independent deployments."
      },
      {
            "title": "Implement Observability",
            "description": "Set up centralized logging and distributed tracing from day one."
      }
]
  },
  {
    id: "microservices-patterns",
    category: "System Design",
    title: "Microservices Patterns",
    description: "Essential patterns for building scalable and resilient microservices architectures.",
    javaCode: `
import java.util.*;

/**
 * MICROSERVICES PATTERNS: Saga Pattern (Choreography-based).
 */
class Order {
    String id;
    String status; // PENDING, CONFIRMED, CANCELLED
    public Order(String id) { this.id = id; this.status = "PENDING"; }
}

class OrderCreatedEvent { String orderId; public OrderCreatedEvent(String id) { this.orderId = id; } }
class PaymentFailedEvent { String orderId; public PaymentFailedEvent(String id) { this.orderId = id; } }

class OrderService {
    private Map<String, Order> orders = new HashMap<>();

    public void createOrder(String id) {
        Order order = new Order(id);
        orders.put(id, order);
        System.out.println("Order " + id + " created. Status: PENDING");
        // In a real app, publish OrderCreatedEvent to Kafka/RabbitMQ
    }

    public void handlePaymentFailed(PaymentFailedEvent event) {
        Order order = orders.get(event.orderId);
        if (order != null) {
            order.status = "CANCELLED";
            System.out.println("Compensating Transaction: Order " + event.orderId + " CANCELLED due to payment failure.");
        }
    }
}

class PaymentService {
    public void processPayment(OrderCreatedEvent event) {
        System.out.println("Processing payment for order: " + event.orderId);
        boolean success = false; // Simulate failure
        
        if (!success) {
            System.out.println("Payment failed for order: " + event.orderId);
            // Publish PaymentFailedEvent
        }
    }
}

public class SagaDemo {
    public static void main(String[] args) {
        OrderService orderService = new OrderService();
        PaymentService paymentService = new PaymentService();

        String orderId = "ORD-123";
        orderService.createOrder(orderId);
        
        // Simulate Event Bus flow
        OrderCreatedEvent createdEvent = new OrderCreatedEvent(orderId);
        paymentService.processPayment(createdEvent);
        
        // Simulate failure handling
        PaymentFailedEvent failedEvent = new PaymentFailedEvent(orderId);
        orderService.handlePaymentFailed(failedEvent);
    }
}
`,
    concepts: [
      "Saga Pattern: Managing distributed transactions across services.",
      "CQRS: Separating read and write models for performance.",
      "API Gateway: Central entry point for all client requests.",
      "Circuit Breaker: Preventing cascading failures (e.g., Resilience4j).",
      "Event Sourcing: Storing state changes as a sequence of events."
],
    tradeoffs: [
      "Pros: Independent scaling, technology diversity, improved fault isolation.",
      "Cons: Operational complexity, eventual consistency challenges, network latency."
],
    interviewTips: [
      "Explain the difference between Orchestration and Choreography in Sagas.",
      "How do you handle data consistency across microservices?",
      "When would you choose a Monolith over Microservices?",
      "Discuss the 'Sidecar' pattern in Service Mesh."
],
    deepDive: `
## Microservices Architecture Patterns

### 1. Saga Pattern
Distributed transactions are hard. Sagas manage them by breaking a business process into a series of local transactions. If one fails, compensating transactions are executed to undo previous steps.
*   **Choreography**: Services exchange events without a central coordinator.
*   **Orchestration**: A central service tells others what to do.

### 2. CQRS (Command Query Responsibility Segregation)
Separates the "Command" (Write) side from the "Query" (Read) side. This allows you to optimize the read database (e.g., using Elasticsearch or a denormalized SQL view) independently of the write database.

### 3. Circuit Breaker
Protects your system from failing downstream services. If a service is slow or failing, the circuit "opens," and subsequent calls fail fast or return a fallback, allowing the downstream service to recover.
`,
    steps: [
      {
            "title": "Decompose Domain",
            "description": "Identify bounded contexts using Domain-Driven Design (DDD)."
      },
      {
            "title": "Define Communication",
            "description": "Choose between Synchronous (REST/gRPC) or Asynchronous (Kafka/RabbitMQ)."
      },
      {
            "title": "Implement Resiliency",
            "description": "Add circuit breakers and retries for inter-service calls."
      },
      {
            "title": "Centralize Observability",
            "description": "Set up distributed tracing (Zipkin/Jaeger) and centralized logging."
      }
]
  },
  {
    id: "api-design-rest-graphql-grpc",
    category: "System Design",
    title: "API Design: REST vs GraphQL vs gRPC",
    description: "Comparing modern API architectural styles and choosing the right one for your system.",
    javaCode: `
/**
 * API DESIGN COMPARISON
 */

// 1. REST (Resource-based)
// GET /api/users/123
// Returns: { "id": 123, "name": "Alice", "email": "alice@example.com" }

// 2. GraphQL (Query-based)
// POST /graphql
// Query: { user(id: 123) { name } }
// Returns: { "data": { "user": { "name": "Alice" } } }

// 3. gRPC (Action-based / Protobuf)
/*
service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
}
message UserRequest { string id = 1; }
message UserResponse { string name = 1; }
*/
`,
    concepts: [
      "REST: Stateless, resource-oriented, uses standard HTTP methods (GET, POST, etc.).",
      "GraphQL: Client-specified queries, avoids over-fetching and under-fetching.",
      "gRPC: High-performance, binary protocol (Protobuf), supports streaming, built on HTTP/2.",
      "Over-fetching: Getting more data than you need.",
      "Under-fetching: Not getting enough data in one call (N+1 problem)."
],
    tradeoffs: [
      "REST: Simple, widely supported, easy caching, but can be chatty.",
      "GraphQL: Flexible, single endpoint, but complex to implement and hard to cache.",
      "gRPC: Fast, strictly typed, but requires special clients and is not browser-friendly."
],
    interviewTips: [
      "When to use gRPC over REST? (Internal microservices communication).",
      "How does GraphQL solve the N+1 problem? (Batching/DataLoader).",
      "What is Idempotency in REST? (GET, PUT, DELETE should be idempotent).",
      "Explain HTTP/2 features used by gRPC (Multiplexing, Header Compression)."
],
    deepDive: `
## API Design Deep Dive

### 1. REST: The Industry Standard
REST is easy to understand because it maps to the web's architecture. It's great for public APIs. However, it often suffers from "fixed responses"—if a mobile app only needs a user's name, it still has to download the entire user object.

### 2. GraphQL: The Client's Choice
GraphQL shifts power to the client. The client defines exactly what fields it needs. This is perfect for complex UIs where different screens need different data from the same resources. **Challenge**: It's harder to implement rate limiting and security at the field level.

### 3. gRPC: The Performance King
gRPC uses **Protocol Buffers** (binary) instead of JSON (text). It's much smaller and faster to parse. Because it uses HTTP/2, it supports bi-directional streaming. It's the go-to choice for internal microservices where performance and strict contracts are critical.
`,
    steps: [
      {
            "title": "Define Requirements",
            "description": "Choose REST for public APIs, GraphQL for flexible UIs, or gRPC for internal microservices."
      },
      {
            "title": "Design Schema",
            "description": "Create clear resources (REST), types (GraphQL), or messages (gRPC)."
      },
      {
            "title": "Handle Errors",
            "description": "Use standard HTTP codes (REST) or custom error structures (GraphQL/gRPC)."
      },
      {
            "title": "Version Your API",
            "description": "Use URL versioning (/v1/) or header versioning to manage changes."
      }
]
  },
  {
    id: "api-versioning-strategies",
    category: "System Design",
    title: "API Versioning Strategies",
    description: "Comparing different ways to evolve your API without breaking existing clients.",
    javaCode: `
/**
 * API VERSIONING STRATEGIES
 */

/*
1. URI Versioning: /api/v1/users
   - Simple, visible, but pollutes the URI space.

2. Header Versioning: X-API-Version: 1
   - Clean URIs, but harder to test in a browser.

3. Media Type (Content Negotiation): Accept: application/vnd.myapi.v1+json
   - Most "RESTful", but complex to implement and understand.

4. Query Parameter: /api/users?version=1
   - Easy to implement, but less common for major versions.
*/
`,
    concepts: [
      "Backward Compatibility: New versions shouldn't break old clients.",
      "Semantic Versioning (SemVer): Major.Minor.Patch (e.g., 2.1.0).",
      "Sunset Policy: Communicating when an old version will be deprecated and removed.",
      "Breaking Change: Renaming fields, removing endpoints, or changing data types.",
      "Non-breaking Change: Adding new fields or new optional endpoints."
],
    tradeoffs: [
      "URI: Easiest for developers and caching, but violates 'Cool URIs don't change'.",
      "Header: Keeps URIs clean and permanent, but requires custom client logic.",
      "Media Type: Very flexible, allows versioning per resource, but high complexity."
],
    interviewTips: [
      "Which versioning strategy does GitHub use? (Media Type).",
      "Which strategy does Stripe use? (Date-based headers).",
      "How to handle breaking changes in a microservices environment?",
      "What is 'API Versioning by Date'?"
],
    deepDive: `
## API Versioning Deep Dive

### 1. Why Version?
As your business grows, your data models change. You might rename \`userName\` to \`fullName\`. If you just change it, every mobile app and third-party integration will crash. Versioning allows you to support both old and new models simultaneously.

### 2. URI Versioning (The Industry Standard)
Most companies (Google, Twitter, Facebook) use URI versioning (\`/v1/\`, \`/v2/\`). It's easy to route at the Load Balancer level and easy for developers to see which version they are using.

### 3. Header Versioning
Used by companies like **Stripe**. They use a \`Stripe-Version\` header with a date (e.g., \`2023-10-16\`). This allows for very granular, incremental changes without constantly bumping a major version number.

### 4. Best Practices
*   **Default Version**: Always define what happens if no version is specified.
*   **Documentation**: Keep docs for all active versions.
*   **Deprecation**: Use the \`Deprecation\` and \`Sunset\` HTTP headers to warn clients.
`,
    steps: [
      {
            "title": "Identify Changes",
            "description": "Determine if a change is breaking or non-breaking."
      },
      {
            "title": "Select Strategy",
            "description": "Choose a strategy (URI is recommended for most cases)."
      },
      {
            "title": "Implement Routing",
            "description": "Configure your gateway or controller to route requests based on the version."
      },
      {
            "title": "Communicate",
            "description": "Notify users well in advance of deprecating old versions."
      }
]
  },
  {
    id: "api-gateway",
    category: "System Design",
    title: "API Gateway",
    description: "A server that acts as an API front-end, receives API requests, enforces throttling and security policies, and passes requests to the back-end service.",
    javaCode: `
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

/**
 * Spring Cloud Gateway Configuration
 */
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("order-service", r -> r.path("/orders/**")
                .filters(f -> f.addRequestHeader("X-Gateway-Source", "SpringCloudGateway")
                              .circuitBreaker(config -> config.setName("orderServiceCB")))
                .uri("lb://ORDER-SERVICE"))
            .route("user-service", r -> r.path("/users/**")
                .filters(f -> f.rewritePath("/users/(?<segment>.*)", "/api/v1/users/\${segment}"))
                .uri("http://user-service-cluster:8080"))
            .build();
    }
}

/**
 * Custom Global Filter for Authentication
 */
@Component
public class AuthFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}
`,
    concepts: [
      "Authentication & Authorization: Centralized security checks.",
      "Request Routing: Mapping requests to specific microservices.",
      "Rate Limiting: Protecting backends from traffic spikes.",
      "Protocol Translation: Converting between REST, gRPC, and WebSockets.",
      "Circuit Breaking: Preventing cascading failures in the system.",
      "Request/Response Transformation: Modifying headers or payloads on the fly."
],
    tradeoffs: [
      "Centralization vs. Latency: Adds a hop but simplifies backend logic.",
      "Single Point of Failure: Must be highly available (e.g., using multiple instances behind an LB).",
      "Complexity: Managing routing rules and filters can become complex as the system grows."
],
    interviewTips: [
      "Discuss the difference between an API Gateway and a Load Balancer.",
      "Explain how to implement 'BFF' (Backend for Frontend) pattern.",
      "Mention how to handle cross-origin resource sharing (CORS) at the gateway level."
],
    deepDive: `
## API Gateway Design Guide

### 1. Problem Statement
Design a central entry point for all client requests in a microservices architecture to handle cross-cutting concerns like routing, security, and rate limiting.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Client Request] --> B[API Gateway]
    B --> C{Auth & Security}
    C -- Valid --> D{Rate Limiter}
    D -- Allowed --> E[Request Router]
    E --> F[Service A]
    E --> G[Service B]
    E --> H[Service C]
    F --> I[Response Aggregator]
    G --> I
    H --> I
    I --> B
    B --> J[Client Response]
    C -- Invalid --> K[401 Unauthorized]
    D -- Throttled --> L[429 Too Many Requests]
\`\`\`

### 3. Requirements
*   **Security**: Centralized authentication (JWT, OAuth2) and SSL termination.
*   **Routing**: Dynamic routing to backend services based on URL paths or headers.
*   **Resilience**: Circuit breaking and retries to handle failing backends.
*   **Observability**: Centralized logging and metrics for all incoming traffic.
*   **Load Balancing**: Distributing traffic across multiple instances of a service.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant C as Client
    participant AG as API Gateway
    participant AS as Auth Service
    participant S as Backend Service
    
    C->>AG: GET /api/v1/orders
    AG->>AS: Validate Token
    AS-->>AG: Token Valid (User ID: 123)
    AG->>AG: Check Rate Limit
    AG->>S: Forward Request (with User ID header)
    S-->>AG: Order Data
    AG-->>C: JSON Response
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Request Reception**: The Gateway receives an HTTP request from a client (Web, Mobile, etc.).
2.  **Security Filter**: It validates the request's credentials (e.g., checking a JWT signature).
3.  **Throttling**: It checks if the client has exceeded their allowed request quota (Rate Limiting).
4.  **Path Mapping**: It uses a routing table to determine which microservice should handle the request (e.g., \`/orders/**\` -> \`Order-Service\`).
5.  **Request Transformation**: It might add or remove headers (e.g., stripping the \`Authorization\` header and adding an \`X-User-Id\` header).
6.  **Service Invocation**: It forwards the request to the backend service, often using a Load Balancer.
7.  **Response Aggregation**: If a request requires data from multiple services, the Gateway can call them in parallel and combine the results.
8.  **Error Handling**: If a backend is down, the Gateway can return a cached response or a friendly error message using a circuit breaker.

### 6. Key Features
*   **Protocol Translation**: Converting between external-facing REST/JSON and internal-facing gRPC or AMQP.
*   **Service Discovery Integration**: Automatically finding service instances using tools like Eureka or Consul.
*   **BFF (Backend for Frontend)**: Creating specific gateways for different client types (e.g., one for Mobile, one for Web) to optimize payloads.
*   **Caching**: Caching responses at the gateway level to reduce load on backend services.

### 7. Tradeoffs
*   **Pros**: Simplifies client code, centralized security, easy monitoring, reduced attack surface.
*   **Cons**: Can become a bottleneck, adds latency (extra hop), increased complexity in the infrastructure, single point of failure if not properly managed.

### 8. Popular Tools
*   **Spring Cloud Gateway**: Built on Spring 5, Project Reactor, and Spring Boot.
*   **Kong**: High-performance gateway built on Nginx.
*   **AWS API Gateway**: Fully managed service by Amazon.
*   **Apigee**: Enterprise-grade API management platform by Google Cloud.
`,
    steps: [
      {
            "title": "Entry Point",
            "description": "All client requests hit the Gateway first."
      },
      {
            "title": "Security",
            "description": "Validate JWT tokens or API keys."
      },
      {
            "title": "Routing",
            "description": "Determine which microservice should handle the request."
      },
      {
            "title": "Transformation",
            "description": "Modify headers or payloads as needed."
      },
      {
            "title": "Aggregation",
            "description": "Optionally combine results from multiple services into one response."
      }
]
  },
  {
    id: "load-balancing-strategies",
    category: "System Design",
    title: "Load Balancing Strategies",
    description: "Distributing incoming network traffic across multiple servers to ensure high availability and reliability.",
    javaCode: `
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 1. Weighted Round Robin Implementation
 */
class WeightedRoundRobin {
    private final List<Server> servers;
    private final AtomicInteger index = new AtomicInteger(0);

    public WeightedRoundRobin(List<Server> servers) {
        this.servers = new ArrayList<>();
        for (Server s : servers) {
            // Add server multiple times based on weight
            for (int i = 0; i < s.getWeight(); i++) {
                this.servers.add(s);
            }
        }
    }

    public Server getNext() {
        int i = index.getAndIncrement() % servers.size();
        return servers.get(i);
    }
}

/**
 * 2. Least Connections Implementation (Conceptual)
 */
class LeastConnections {
    private final List<Server> servers;

    public LeastConnections(List<Server> servers) { this.servers = servers; }

    public Server getNext() {
        return servers.stream()
            .min(Comparator.comparingInt(Server::getActiveConnections))
            .orElseThrow();
    }
}

class Server {
    private String id;
    private int weight;
    private int activeConnections;
    // Getters, Setters
}
`,
    concepts: [
      "Layer 4 vs Layer 7: Transport vs Application layer balancing.",
      "Health Checks: Monitoring server status to avoid routing to failed instances.",
      "Sticky Sessions: Ensuring a client always connects to the same server.",
      "Algorithms: Round Robin, Least Connections, IP Hash, Weighted Round Robin."
],
    tradeoffs: [
      "Round Robin: Simple, but doesn't account for server load or capacity.",
      "Least Connections: Better for long-lived connections, but more complex to track.",
      "IP Hash: Provides session persistence, but can lead to uneven distribution if many clients share an IP."
],
    interviewTips: [
      "Explain the difference between L4 and L7 load balancing.",
      "How do you handle a load balancer becoming a single point of failure? (Active-Passive setup).",
      "What is 'Global Server Load Balancing' (GSLB)?",
      "Discuss the pros and cons of hardware vs software load balancers."
],
    deepDive: `
## Load Balancing Deep Dive

### 1. Layer 4 (L4) vs Layer 7 (L7)
*   **Layer 4**: Operates at the transport level (TCP/UDP). It makes routing decisions based on IP addresses and ports. It's fast because it doesn't look at the packet content.
*   **Layer 7**: Operates at the application level (HTTP/HTTPS). It can make decisions based on URLs, cookies, or headers. It's more flexible but requires more CPU.

### 2. Algorithms
*   **Round Robin**: Sequentially sends requests to each server.
*   **Least Connections**: Sends requests to the server with the fewest active connections.
*   **IP Hash**: Uses the client's IP address to determine the server, ensuring the same client always goes to the same server.

### 3. High Availability
To avoid the load balancer itself being a single point of failure, you can use a secondary load balancer in an **Active-Passive** configuration with a shared Virtual IP (VIP).
`,
    steps: [
      {
            "title": "Assess Traffic",
            "description": "Determine the volume and type of traffic (HTTP, TCP, etc.)."
      },
      {
            "title": "Choose Algorithm",
            "description": "Select an algorithm based on server capacity and session requirements."
      },
      {
            "title": "Configure Health Checks",
            "description": "Set up endpoints for the LB to verify server health."
      },
      {
            "title": "Implement SSL Termination",
            "description": "Decide whether to decrypt SSL at the LB or the server."
      }
]
  },
  {
    id: "dns-system-design",
    category: "System Design",
    title: "DNS (Domain Name System)",
    description: "The phonebook of the internet, translating human-readable domain names into IP addresses.",
    javaCode: `
/**
 * DNS RESOLUTION STEPS
 */

/*
1. Browser Cache
2. OS Cache
3. Resolver (ISP)
4. Root Name Server
5. TLD Name Server (.com, .org)
6. Authoritative Name Server (e.g., ns1.google.com)
*/
`,
    concepts: [
      "Recursive Resolver: The server that does the legwork of finding the IP for you.",
      "Root Name Server: The first stop in the hierarchy; knows where the TLD servers are.",
      "TLD (Top-Level Domain): Servers for .com, .net, .org, etc.",
      "Authoritative Name Server: The final holder of the IP record for a domain.",
      "A Record: Maps a domain to an IPv4 address.",
      "CNAME: Maps a domain to another domain (Alias).",
      "TTL (Time to Live): How long a DNS record should be cached."
],
    tradeoffs: [
      "Pros: Human-readable names, allows IP addresses to change without affecting users.",
      "Cons: DNS propagation delay, single point of failure if not distributed, vulnerable to spoofing."
],
    interviewTips: [
      "What happens when you type 'google.com' in your browser? (DNS lookup is the first step).",
      "Difference between Recursive and Iterative queries.",
      "What is DNS Spoofing/Poisoning?",
      "How does Anycast improve DNS performance?"
],
    deepDive: `
## DNS Deep Dive

### 1. The Hierarchy
DNS is a distributed hierarchical database. No single server has all the records.
*   **Root (.):** 13 sets of servers globally.
*   **TLD (.com):** Managed by registries like Verisign.
*   **Authoritative:** Managed by your domain registrar or DNS provider (e.g., Route53).

### 2. DNS Caching
To avoid traversing the hierarchy for every request, DNS results are cached at multiple levels:
*   **Browser/OS**: Very short TTL.
*   **Resolver (ISP)**: Longer TTL. This is where most "DNS Propagation" issues occur when you change a record.

### 3. Load Balancing with DNS
DNS can return multiple IP addresses for a single domain (Round Robin DNS). It can also use **Geolocation DNS** to return the IP of the data center closest to the user.
`,
    steps: [
      {
            "title": "Register Domain",
            "description": "Purchase a domain from a registrar."
      },
      {
            "title": "Set Name Servers",
            "description": "Point your domain to your DNS provider's authoritative servers."
      },
      {
            "title": "Configure Records",
            "description": "Add A, CNAME, MX, and TXT records as needed."
      },
      {
            "title": "Set TTL",
            "description": "Use low TTL (e.g., 300s) during migrations and higher TTL (e.g., 86400s) for stability."
      }
]
  },
  {
    id: "cdn-edge-computing",
    category: "System Design",
    title: "CDN & Edge Computing",
    description: "Distributing content globally to reduce latency and offload traffic from origin servers.",
    javaCode: `
/**
 * CDN & EDGE COMPUTING CONCEPTS
 */

/*
1. Static Content: Images, JS, CSS, Videos.
2. Dynamic Content: Edge Side Includes (ESI), Lambda@Edge.
3. Push vs Pull:
   - Push: Origin pushes content to CDN (Good for large, infrequent updates).
   - Pull: CDN pulls content from origin on first request (Good for many small files).
*/
`,
    concepts: [
      "PoP (Points of Presence): Data centers located at the edge of the network.",
      "Edge Server: Servers within PoPs that cache and serve content.",
      "Latency: Reduced by serving content from a server physically closer to the user.",
      "Cache Invalidation: The process of removing stale content from the CDN (TTL, Purge).",
      "Edge Computing: Running logic (e.g., A/B testing, authentication) at the edge PoP."
],
    tradeoffs: [
      "Pros: Massive reduction in latency, high availability, reduced origin load.",
      "Cons: Cost, complexity of cache invalidation, potential for stale content."
],
    interviewTips: [
      "How does a CDN know which PoP to route a user to? (Anycast or DNS-based routing).",
      "What is a 'Cache Miss' vs 'Cache Hit'?",
      "Explain the 'Thundering Herd' problem in CDNs.",
      "When would you NOT use a CDN? (For highly personalized, frequently changing data)."
],
    deepDive: `
## CDN & Edge Computing Deep Dive

### 1. How it Works
When a user requests an image, the request is routed to the nearest **PoP**. If the image is in the **Edge Server's** cache (Hit), it's served immediately. If not (Miss), the Edge Server fetches it from the **Origin Server**, caches it, and then serves it.

### 2. Cache Invalidation Strategies
*   **TTL (Time to Live)**: Content expires automatically after a set time.
*   **Purge/Invalidate**: Manually telling the CDN to delete a specific URL.
*   **Versioning/Fingerprinting**: Changing the filename (e.g., \`style.v2.css\`) to force a fresh fetch.

### 3. Edge Computing (Serverless at Edge)
Modern CDNs (Cloudflare, AWS CloudFront) allow you to run code at the edge.
*   **Use Cases**: Image resizing on the fly, header manipulation, geolocation-based redirects, and basic authentication. This reduces the need for the request to ever reach your origin server.
`,
    steps: [
      {
            "title": "Identify Static Assets",
            "description": "Determine which files (images, CSS, JS) can be cached."
      },
      {
            "title": "Choose CDN Provider",
            "description": "Select a provider based on their PoP locations and features (e.g., Cloudflare, Akamai)."
      },
      {
            "title": "Configure TTL",
            "description": "Set appropriate cache durations for different types of content."
      },
      {
            "title": "Implement Purging",
            "description": "Set up a mechanism to invalidate the cache when content is updated."
      }
]
  },
  {
    id: "caching-strategies",
    category: "System Design",
    title: "Caching Strategies",
    description: "Improving system performance by storing frequently accessed data in a fast-access layer.",
    javaCode: `
import java.util.*;

/**
 * CACHING STRATEGIES: Cache-Aside and Write-Through patterns.
 */
class User {
    String id, name;
    public User(String id, String name) { this.id = id; this.name = name; }
}

class Database {
    private Map<String, User> data = new HashMap<>();
    public User find(String id) { 
        System.out.println("DB: Fetching " + id);
        return data.get(id); 
    }
    public void save(User user) { 
        System.out.println("DB: Saving " + user.id);
        data.put(user.id, user); 
    }
}

class Cache {
    private Map<String, User> storage = new HashMap<>();
    public User get(String id) { return storage.get(id); }
    public void put(String id, User user) { storage.put(id, user); }
}

public class CacheService {
    private Database db = new Database();
    private Cache cache = new Cache();

    // 1. Cache-Aside (Lazy Loading)
    public User getUserLazy(String id) {
        User user = cache.get(id);
        if (user != null) {
            System.out.println("Cache HIT for " + id);
            return user;
        }
        System.out.println("Cache MISS for " + id);
        user = db.find(id);
        if (user != null) cache.put(id, user);
        return user;
    }

    // 2. Write-Through
    public void saveUserWriteThrough(User user) {
        cache.put(user.id, user); // Write to cache
        db.save(user);            // Write to DB synchronously
    }

    public static void main(String[] args) {
        CacheService service = new CacheService();
        User u1 = new User("1", "Alice");
        
        System.out.println("--- Write Through ---");
        service.saveUserWriteThrough(u1);

        System.out.println("
--- Cache Aside ---");
        service.getUserLazy("1"); // Should be HIT
        service.getUserLazy("2"); // Should be MISS
    }
}
`,
    concepts: [
      "Cache-Aside: Application handles both cache and database.",
      "Write-Through: Data is written to cache and DB simultaneously.",
      "Write-Back: Data is written to cache first, then asynchronously to DB.",
      "Eviction Policies: LRU, LFU, FIFO, TTL.",
      "Cache Invalidation: The hardest problem in computer science."
],
    tradeoffs: [
      "Cache-Aside: Resilient to cache failure, but can have stale data.",
      "Write-Through: High consistency, but adds latency to write operations.",
      "Write-Back: Very fast writes, but risk of data loss if cache fails before flushing to DB."
],
    interviewTips: [
      "Explain the 'Thundering Herd' problem and how to solve it.",
      "What is 'Cache Stampede'?",
      "How do you handle cache invalidation in a distributed system?",
      "Compare Redis vs Memcached."
],
    deepDive: `
## Caching Strategies Deep Dive

### 1. Cache-Aside (Lazy Loading)
The most common pattern. The app checks the cache; if it's a miss, it loads from the DB and updates the cache.
*   **Pros**: Only requested data is cached.
*   **Cons**: First request is always a miss.

### 2. Write-Through
The application writes to the cache, and the cache synchronously writes to the database.
*   **Pros**: Cache is never stale.
*   **Cons**: Write latency is higher.

### 3. Write-Back (Write-Behind)
The application writes to the cache, which acknowledges immediately. The cache then flushes the data to the DB in the background.
*   **Pros**: Extremely fast writes.
*   **Cons**: Risk of data loss.

### 4. Cache Invalidation
Strategies include:
*   **TTL (Time To Live)**: Automatic expiration.
*   **Event-based**: Invalidate cache when DB is updated.
`,
    steps: [
      {
            "title": "Identify Hotspots",
            "description": "Find data that is read frequently but changes rarely."
      },
      {
            "title": "Select Pattern",
            "description": "Choose between Cache-Aside, Write-Through, or Write-Back."
      },
      {
            "title": "Define Eviction",
            "description": "Set a TTL and choose an eviction policy (e.g., LRU)."
      },
      {
            "title": "Monitor Hit Rate",
            "description": "Track cache hits vs misses to tune performance."
      }
]
  },
  {
    id: "distributed-caching-redis-cluster",
    category: "System Design",
    title: "Redis Cluster & Sharding",
    description: "Scaling Redis to handle terabytes of data and millions of requests per second using sharding and replication.",
    javaCode: `
/**
 * REDIS CLUSTER CONCEPTS
 */

/*
1. Hash Slots: Redis Cluster has 16,384 slots.
2. Sharding: Keys are mapped to slots using CRC16(key) mod 16384.
3. Node Roles: Each master has one or more replicas.
4. Gossip Protocol: Nodes communicate with each other to detect failures.
5. Client Redirection: If a client hits the wrong node, it gets a 'MOVED' error with the correct IP.
*/
`,
    concepts: [
      "Hash Slot: The unit of sharding in Redis. Every key belongs to exactly one slot.",
      "CRC16: The hashing algorithm used to distribute keys across slots.",
      "Master-Replica: Masters handle writes; replicas provide high availability and read scaling.",
      "Failover: If a master fails, a replica is promoted to master automatically.",
      "Gossip Protocol: Decentralized communication for cluster state management.",
      "Slot Migration: Moving slots between nodes to rebalance the cluster without downtime."
],
    tradeoffs: [
      "Pros: Linear scalability, high availability, no single point of failure.",
      "Cons: Multi-key operations are restricted (must be in the same slot), increased complexity for clients, potential for data loss during failover (asynchronous replication)."
],
    interviewTips: [
      "How many hash slots are in a Redis Cluster? (16,384).",
      "How does a client know which node to talk to? (Initial connection + MOVED redirects).",
      "What are 'Hash Tags'? (Forcing multiple keys into the same slot using {tag} syntax).",
      "Explain the Gossip protocol in Redis."
],
    deepDive: `
## Redis Cluster Deep Dive

### 1. Why Cluster?
A single Redis instance is limited by the RAM and CPU of one machine. A cluster allows you to spread data across hundreds of nodes, providing horizontal scalability.

### 2. Sharding Mechanism
Redis uses **Fixed Sharding** with 16,384 slots.
*   Node A: Slots 0 - 5000
*   Node B: Slots 5001 - 10000
*   Node C: Slots 10001 - 16383
When you set \`key1\`, Redis calculates \`CRC16("key1") % 16384\`. If the result is 300, it goes to Node A.

### 3. High Availability
Every master node in the cluster should have at least one replica. If Master A goes down, the other masters detect it via the **Gossip Protocol** and vote to promote Replica A to be the new master. This ensures the cluster stays online even if nodes fail.
`,
    steps: [
      {
            "title": "Determine Capacity",
            "description": "Estimate total RAM and throughput needed to decide the number of master nodes."
      },
      {
            "title": "Setup Replicas",
            "description": "Ensure each master has at least one replica in a different availability zone."
      },
      {
            "title": "Use Cluster Client",
            "description": "Use a cluster-aware client library (like Lettuce) that handles redirects automatically."
      },
      {
            "title": "Monitor Health",
            "description": "Track slot distribution and node health using 'CLUSTER NODES' command."
      }
]
  },
  {
    id: "database-indexing",
    category: "System Design",
    title: "Database Indexing & Optimization",
    description: "Deep dive into how databases store and retrieve data efficiently using indexes.",
    javaCode: `
import java.util.*;

/**
 * DATABASE INDEXING: Simulating how indexes speed up lookups.
 */
class User {
    int id;
    String email;
    String name;
    public User(int id, String email, String name) {
        this.id = id; this.email = email; this.name = name;
    }
    @Override
    public String toString() { return "User{id=" + id + ", email='" + email + "'}"; }
}

public class IndexSimulation {
    private List<User> table = new ArrayList<>();
    // Index: Email -> User reference
    private Map<String, User> emailIndex = new HashMap<>();

    public void insert(User user) {
        table.add(user);
        emailIndex.put(user.email, user); // Updating index
    }

    public User findByEmailWithIndex(String email) {
        long start = System.nanoTime();
        User user = emailIndex.get(email); // O(1)
        long end = System.nanoTime();
        System.out.println("Index Lookup Time: " + (end - start) + " ns");
        return user;
    }

    public User findByEmailWithoutIndex(String email) {
        long start = System.nanoTime();
        for (User user : table) { // O(n)
            if (user.email.equals(email)) {
                long end = System.nanoTime();
                System.out.println("Full Table Scan Time: " + (end - start) + " ns");
                return user;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        IndexSimulation db = new IndexSimulation();
        for (int i = 0; i < 10000; i++) {
            db.insert(new User(i, "user" + i + "@example.com", "Name" + i));
        }

        String searchEmail = "user9999@example.com";
        System.out.println("Searching for: " + searchEmail);
        
        db.findByEmailWithoutIndex(searchEmail);
        db.findByEmailWithIndex(searchEmail);
    }
}
`,
    concepts: [
      "B-Tree vs B+ Tree: The standard structure for relational database indexes.",
      "Clustered vs Non-Clustered Indexes: How data is physically stored.",
      "Composite Indexes: Indexing multiple columns (Left-most prefix rule).",
      "LSM Trees: Used in NoSQL databases (Cassandra, RocksDB) for high write throughput.",
      "Query Execution Plan: Analyzing how the DB executes a query."
],
    tradeoffs: [
      "Pros: Dramatically faster read queries, efficient sorting and grouping.",
      "Cons: Slower writes (INSERT/UPDATE/DELETE), increased disk space usage."
],
    interviewTips: [
      "Explain the 'Left-most prefix' rule for composite indexes.",
      "What is Index Covering? (When the index contains all data needed for the query).",
      "Difference between B-Tree and Hash Index.",
      "How do you identify slow queries? (Slow query logs, EXPLAIN)."
],
    deepDive: `
## Database Indexing Deep Dive

### 1. B+ Trees
Most relational databases use B+ Trees. Unlike B-Trees, B+ Trees store all data in the leaf nodes, and leaf nodes are linked together. This makes range scans extremely efficient.

### 2. Clustered Index
A clustered index determines the physical order of data in a table. A table can have only one clustered index (usually the Primary Key).

### 3. Composite Index Optimization
If you have an index on \`(A, B, C)\`, it can be used for queries on:
*   \`A\`
*   \`A, B\`
*   \`A, B, C\`
It **cannot** be used efficiently for queries on \`B\` or \`C\` alone.

### 4. LSM Trees (Log-Structured Merge-Tree)
LSM trees optimize for writes by appending data to an in-memory buffer (Memtable) and periodically flushing it to disk (SSTables). Background compaction merges these files.
`,
    steps: [
      {
            "title": "Analyze Queries",
            "description": "Identify the most frequent and slowest queries."
      },
      {
            "title": "Choose Columns",
            "description": "Select columns used in WHERE, JOIN, and ORDER BY clauses."
      },
      {
            "title": "Create Index",
            "description": "Apply the index and monitor performance."
      },
      {
            "title": "Review Execution Plan",
            "description": "Use EXPLAIN to verify the index is being used correctly."
      }
]
  },
  {
    id: "database-replication",
    category: "System Design",
    title: "Database Replication & High Availability",
    description: "Strategies for copying data across multiple servers to ensure data durability and system availability.",
    javaCode: `
import java.util.*;

/**
 * DATABASE REPLICATION: Simulating Master-Slave Sync.
 */
class DatabaseNode {
    private final String name;
    private final Map<String, String> data = new HashMap<>();

    public DatabaseNode(String name) { this.name = name; }
    public void write(String key, String value) { data.put(key, value); }
    public String read(String key) { return data.get(key); }
    public String getName() { return name; }
}

class ReplicationManager {
    private final DatabaseNode master;
    private final List<DatabaseNode> slaves;

    public ReplicationManager(DatabaseNode master, List<DatabaseNode> slaves) {
        this.master = master;
        this.slaves = slaves;
    }

    public void write(String key, String value) {
        System.out.println("Master: Writing " + key + "=" + value);
        master.write(key, value);

        // Asynchronous Replication to Slaves
        for (DatabaseNode slave : slaves) {
            new Thread(() -> {
                try { Thread.sleep(500); } catch (InterruptedException e) {} // Simulating lag
                slave.write(key, value);
                System.out.println(slave.getName() + ": Synced " + key);
            }).start();
        }
    }

    public String readFromSlave(int index, String key) {
        return slaves.get(index).read(key);
    }
}

public class ReplicationDemo {
    public static void main(String[] args) throws InterruptedException {
        DatabaseNode master = new DatabaseNode("Master-DB");
        List<DatabaseNode> slaves = Arrays.asList(new DatabaseNode("Slave-1"), new DatabaseNode("Slave-2"));
        ReplicationManager manager = new ReplicationManager(master, slaves);

        manager.write("user:1", "Alice");
        
        System.out.println("Immediate read from Slave-1: " + manager.readFromSlave(0, "user:1"));
        Thread.sleep(1000);
        System.out.println("Read from Slave-1 after sync: " + manager.readFromSlave(0, "user:1"));
    }
}
`,
    concepts: [
      "Master-Slave (Leader-Follower): Master handles writes, slaves handle reads.",
      "Multi-Master: Multiple nodes handle both reads and writes (complex conflict resolution).",
      "Synchronous vs Asynchronous Replication: Tradeoff between data safety and write latency.",
      "Quorum: Requiring a majority of nodes to agree on a write (used in Paxos/Raft).",
      "Read-after-Write Consistency: Ensuring a user sees their own updates immediately."
],
    tradeoffs: [
      "Pros: High availability (failover), read scalability, data redundancy.",
      "Cons: Replication lag, increased storage costs, complexity in handling network partitions."
],
    interviewTips: [
      "What is Replication Lag and how do you handle it?",
      "Difference between Statement-based and Row-based replication.",
      "How does a system elect a new master? (Consensus algorithms like Raft).",
      "What is the 'Split Brain' problem?"
],
    deepDive: `
## Database Replication Deep Dive

### 1. Master-Slave (Leader-Follower)
The most common pattern. All writes go to the Leader, which then propagates changes to Followers. Followers can serve read requests, scaling the read throughput.

### 2. Synchronous vs Asynchronous
*   **Synchronous**: Leader waits for all (or a quorum of) followers to confirm the write. High safety, high latency.
*   **Asynchronous**: Leader confirms write immediately and syncs later. Low latency, risk of data loss if Leader crashes before sync.

### 3. Quorum Reads/Writes
To ensure consistency in a distributed system, we use the formula: \`R + W > N\`, where N is the number of replicas. If you write to a majority and read from a majority, you are guaranteed to see the latest write.

### 4. Failover
When the master fails, a follower must be promoted. This involves:
1.  Detecting failure (heartbeats).
2.  Electing a new leader (consensus).
3.  Reconfiguring the system to point to the new leader.
`,
    steps: [
      {
            "title": "Choose Topology",
            "description": "Use Master-Slave for read-heavy apps or Multi-Master for write-heavy, multi-region apps."
      },
      {
            "title": "Configure Sync Mode",
            "description": "Decide on async for performance or semi-sync for a balance of safety and speed."
      },
      {
            "title": "Implement Failover",
            "description": "Use tools like Orchestrator or Sentinel to automate master promotion."
      },
      {
            "title": "Monitor Lag",
            "description": "Set up alerts for high replication lag to prevent stale reads."
      }
]
  },
  {
    id: "database-sharding",
    category: "System Design",
    title: "Database Sharding & Partitioning",
    description: "Scaling databases horizontally by distributing data across multiple machines.",
    javaCode: `
import java.util.*;

/**
 * DATABASE SHARDING: Distributing data across multiple "nodes".
 */
class User {
    String id, name;
    public User(String id, String name) { this.id = id; this.name = name; }
}

class Shard {
    private Map<String, User> storage = new HashMap<>();
    public void save(User u) { storage.put(u.id, u); }
    public User get(String id) { return storage.get(id); }
}

public class ShardManager {
    private final List<Shard> shards;
    private final int totalShards;

    public ShardManager(int count) {
        this.totalShards = count;
        this.shards = new ArrayList<>();
        for (int i = 0; i < count; i++) shards.add(new Shard());
    }

    // Sharding Strategy: Key-Based (Modulo)
    private int getShardIndex(String id) {
        return Math.abs(id.hashCode() % totalShards);
    }

    public void saveUser(User user) {
        int index = getShardIndex(user.id);
        System.out.println("Routing " + user.id + " to Shard " + index);
        shards.get(index).save(user);
    }

    public User getUser(String id) {
        int index = getShardIndex(id);
        return shards.get(index).get(id);
    }

    public static void main(String[] args) {
        ShardManager manager = new ShardManager(3); // 3 Shards
        
        manager.saveUser(new User("user_1", "Alice"));
        manager.saveUser(new User("user_2", "Bob"));
        manager.saveUser(new User("user_3", "Charlie"));
        manager.saveUser(new User("user_4", "David"));

        System.out.println("Retrieved: " + manager.getUser("user_1").name);
    }
}
`,
    concepts: [
      "Horizontal Partitioning (Sharding): Splitting rows into different tables/databases.",
      "Vertical Partitioning: Splitting columns into different tables.",
      "Sharding Key: The column used to determine data distribution.",
      "Consistent Hashing: Minimizing data movement during rebalancing.",
      "Hot Shards: When one shard receives significantly more traffic than others."
],
    tradeoffs: [
      "Pros: Unlimited horizontal scaling, improved performance, smaller failure blast radius.",
      "Cons: Complex joins across shards, distributed transaction challenges, rebalancing overhead."
],
    interviewTips: [
      "How do you choose a good sharding key?",
      "Explain the 'Celebrity Problem' in sharding.",
      "What are the challenges of performing a 'JOIN' across shards?",
      "How does Consistent Hashing work?"
],
    deepDive: `
## Database Sharding Deep Dive

### 1. Why Shard?
When a single database server can no longer handle the load (CPU, RAM, or Disk I/O), sharding allows you to distribute the data across multiple nodes.

### 2. Sharding Strategies
*   **Key-Based (Hash)**: Use a hash function on the sharding key. Good for even distribution but hard to add nodes.
*   **Range-Based**: Group data by ranges (e.g., A-M, N-Z). Easy to implement but can lead to hot shards.
*   **Directory-Based**: A lookup service tracks where each piece of data lives. Flexible but adds a single point of failure.

### 3. Challenges
*   **Cross-Shard Joins**: Almost impossible to do efficiently. Data should be denormalized or joined at the application layer.
*   **Distributed Transactions**: Requires 2PC (Two-Phase Commit) or Sagas, which are complex and slow.
`,
    steps: [
      {
            "title": "Analyze Data Growth",
            "description": "Determine when a single node will reach its limits."
      },
      {
            "title": "Select Sharding Key",
            "description": "Choose a key that ensures even data distribution."
      },
      {
            "title": "Implement Routing",
            "description": "Build or use a proxy to route queries to the correct shard."
      },
      {
            "title": "Plan for Rebalancing",
            "description": "Design a strategy for adding shards without downtime."
      }
]
  },
  {
    id: "database-isolation-levels",
    category: "System Design",
    title: "Database Isolation Levels",
    description: "Understanding how databases handle concurrent transactions and the anomalies that can occur.",
    javaCode: `
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;

/**
 * SPRING TRANSACTION ISOLATION LEVELS
 */
class TransactionService {

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void processOrder() {
        // Default for most databases (PostgreSQL, SQL Server)
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void generateReport() {
        // Default for MySQL (InnoDB)
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void criticalUpdate() {
        // Highest isolation, lowest performance
    }
}
`,
    concepts: [
      "Read Uncommitted: Can read data that hasn't been committed yet (Dirty Reads).",
      "Read Committed: Can only read committed data. Prevents Dirty Reads.",
      "Repeatable Read: Ensures that if you read a row twice in a transaction, it hasn't changed. Prevents Non-repeatable Reads.",
      "Serializable: The highest level. Transactions are executed as if they were sequential. Prevents Phantom Reads.",
      "Dirty Read: Reading data from an uncommitted transaction.",
      "Non-repeatable Read: A row changes between two reads in the same transaction.",
      "Phantom Read: New rows are added by another transaction between two queries."
],
    tradeoffs: [
      "Pros: Higher isolation prevents data anomalies and ensures consistency.",
      "Cons: Higher isolation levels significantly reduce concurrency and performance due to locking."
],
    interviewTips: [
      "What is the default isolation level in MySQL? (Repeatable Read).",
      "What is the default isolation level in PostgreSQL? (Read Committed).",
      "Explain the difference between a Non-repeatable Read and a Phantom Read.",
      "How does MVCC (Multi-Version Concurrency Control) help with isolation?"
],
    deepDive: `
## Database Isolation Levels Deep Dive

### 1. The Anomalies
*   **Dirty Read**: Transaction A updates a row but hasn't committed. Transaction B reads the updated row. If A rolls back, B has "dirty" data.
*   **Non-repeatable Read**: Transaction A reads a row. Transaction B updates that row and commits. Transaction A reads the row again and sees a different value.
*   **Phantom Read**: Transaction A reads a set of rows matching a criteria. Transaction B inserts a new row matching that criteria and commits. Transaction A reads again and sees a "phantom" row.

### 2. Isolation Levels vs. Anomalies
| Level | Dirty Read | Non-repeatable Read | Phantom Read |
| :--- | :---: | :---: | :---: |
| Read Uncommitted | Possible | Possible | Possible |
| Read Committed | No | Possible | Possible |
| Repeatable Read | No | No | Possible |
| Serializable | No | No | No |

### 3. MVCC (Multi-Version Concurrency Control)
Modern databases use MVCC to provide isolation without heavy locking. Instead of locking a row for reading, the DB keeps multiple versions of the row. A transaction sees a "snapshot" of the data as it existed when the transaction started. This allows readers to never block writers and vice versa.
`,
    steps: [
      {
            "title": "Assess Requirements",
            "description": "Choose the lowest isolation level that meets your consistency needs to maximize performance."
      },
      {
            "title": "Use Read Committed",
            "description": "Use for most general-purpose applications to prevent dirty reads."
      },
      {
            "title": "Use Repeatable Read",
            "description": "Use when you need consistent results for multiple reads of the same rows (e.g., reports)."
      },
      {
            "title": "Use Serializable",
            "description": "Use only for critical financial or inventory updates where absolute consistency is required."
      }
]
  },
  {
    id: "lsm-trees-vs-btrees",
    category: "System Design",
    title: "LSM Trees vs B-Trees",
    description: "Understanding the fundamental data structures behind modern databases and their performance tradeoffs.",
    javaCode: `
import java.util.*;

/**
 * LSM TREE SIMULATION: Write-optimized storage.
 */
class LsmTree {
    private final Map<String, String> memtable = new TreeMap<>();
    private final List<Map<String, String>> ssTables = new ArrayList<>();
    private final int FLUSH_THRESHOLD = 3;

    public void put(String key, String value) {
        memtable.put(key, value);
        if (memtable.size() >= FLUSH_THRESHOLD) {
            System.out.println("Memtable full. Flushing to SSTable...");
            ssTables.add(new TreeMap<>(memtable));
            memtable.clear();
        }
    }

    public String get(String key) {
        // 1. Check Memtable (Fastest)
        if (memtable.containsKey(key)) return memtable.get(key);
        
        // 2. Check SSTables in reverse order (Newest first)
        for (int i = ssTables.size() - 1; i >= 0; i--) {
            if (ssTables.get(i).containsKey(key)) return ssTables.get(i).get(key);
        }
        return null;
    }
}

public class DatabaseStructureDemo {
    public static void main(String[] args) {
        LsmTree db = new LsmTree();
        db.put("u1", "Alice");
        db.put("u2", "Bob");
        db.put("u3", "Charlie"); // Triggers flush
        db.put("u1", "Alice Updated");

        System.out.println("Get u1: " + db.get("u1"));
        System.out.println("Get u2: " + db.get("u2"));
    }
}
`,
    concepts: [
      "B-Tree: Balanced tree structure, optimized for reads and range queries (used in MySQL, PostgreSQL).",
      "LSM Tree (Log-Structured Merge-Tree): Write-optimized structure using Memtables and SSTables (used in Cassandra, RocksDB).",
      "Memtable: In-memory buffer for writes.",
      "SSTable (Sorted String Table): Immutable on-disk files.",
      "Compaction: Merging SSTables to remove duplicates and deleted items."
],
    tradeoffs: [
      "B-Trees: Fast reads (O(log N)), slow writes (random I/O), fragmentation issues.",
      "LSM Trees: Fast writes (sequential I/O), slow reads (may check multiple files), write amplification."
],
    interviewTips: [
      "Which DB uses which? (B-Tree: Relational DBs; LSM: NoSQL/Big Data DBs).",
      "What is Write Amplification?",
      "How do LSM trees handle deletes? (Using 'Tombstones').",
      "Why are LSM trees better for SSDs? (Sequential writes reduce wear and are faster)."
],
    deepDive: `
## LSM Trees vs B-Trees Deep Dive

### 1. B-Trees: The Read King
B-Trees are the gold standard for relational databases. They maintain a sorted structure on disk that allows for \`O(log N)\` reads and range scans. However, every write requires updating a specific page on disk, which leads to **Random I/O**. As the DB grows, these random writes become a bottleneck.

### 2. LSM Trees: The Write King
LSM trees turn random writes into **Sequential I/O**.
1.  **Writes** go to an in-memory **Memtable** (usually a SkipList or TreeMap).
2.  When the Memtable is full, it's flushed to disk as a sorted **SSTable**.
3.  **Reads** must check the Memtable and then multiple SSTables. To speed this up, LSM trees use **Bloom Filters**.

### 3. Compaction
Because SSTables are immutable, we eventually get many files. **Compaction** runs in the background, merging sorted files (similar to Merge Sort) and discarding old versions of keys. This is where "Write Amplification" happens—the same data is written multiple times during its lifecycle.
`,
    steps: [
      {
            "title": "Choose B-Tree",
            "description": "Use for read-heavy applications requiring strong consistency and complex range queries."
      },
      {
            "title": "Choose LSM",
            "description": "Use for write-heavy applications (logging, time-series, high-throughput ingestion)."
      },
      {
            "title": "Tune Compaction",
            "description": "Adjust compaction strategies (Leveled vs Size-Tiered) to balance read/write performance."
      },
      {
            "title": "Use Bloom Filters",
            "description": "Always use Bloom filters with LSM trees to minimize unnecessary disk reads."
      }
]
  },
  {
    id: "consistency-models",
    category: "System Design",
    title: "Consistency Models & CAP Theorem",
    description: "Understanding the tradeoffs between consistency, availability, and partition tolerance in distributed systems.",
    javaCode: `
import java.util.*;
import java.util.concurrent.*;

/**
 * CONSISTENCY MODELS: Simulating Eventual Consistency with replication lag.
 */
class Node {
    private Map<String, String> storage = new ConcurrentHashMap<>();
    public void put(String k, String v) { storage.put(k, v); }
    public String get(String k) { return storage.get(k); }
}

public class DistributedStore {
    private Node primary = new Node();
    private List<Node> replicas = Arrays.asList(new Node(), new Node());
    private ExecutorService executor = Executors.newFixedThreadPool(2);

    public void write(String key, String value) {
        System.out.println("Writing to Primary: " + key + " = " + value);
        primary.put(key, value);
        
        // Asynchronous replication (Eventual Consistency)
        for (Node replica : replicas) {
            executor.submit(() -> {
                try {
                    Thread.sleep(100); // Simulate network lag
                    replica.put(key, value);
                    System.out.println("Replica updated: " + key);
                } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            });
        }
    }

    public void read(String key) {
        System.out.println("Read from Primary: " + primary.get(key));
        for (int i = 0; i < replicas.size(); i++) {
            System.out.println("Read from Replica " + i + ": " + replicas.get(i).get(key));
        }
    }

    public static void main(String[] args) throws InterruptedException {
        DistributedStore store = new DistributedStore();
        store.write("status", "ACTIVE");

        System.out.println("--- Reading immediately (Stale data likely) ---");
        store.read("status");

        Thread.sleep(200); // Wait for replication

        System.out.println("
--- Reading after lag (Consistent data) ---");
        store.read("status");
        
        store.executor.shutdown();
    }
}
`,
    concepts: [
      "CAP Theorem: Consistency, Availability, Partition Tolerance (Pick two).",
      "PACELC Theorem: Extension of CAP for latency vs consistency.",
      "Strong Consistency: All reads return the most recent write.",
      "Eventual Consistency: Replicas will eventually converge to the same state.",
      "Quorum: Ensuring a majority of nodes agree on a value (R + W > N)."
],
    tradeoffs: [
      "Strong Consistency: High reliability, but higher latency and lower availability during partitions.",
      "Eventual Consistency: High availability and low latency, but risk of reading stale data.",
      "Availability vs Latency: The core tradeoff in PACELC."
],
    interviewTips: [
      "Explain CAP theorem with a real-world example (e.g., DNS vs RDBMS).",
      "What is the difference between CAP and PACELC?",
      "How does Amazon's DynamoDB handle consistency?",
      "What is a 'Quorum' and how do you calculate it?"
],
    deepDive: `
## Consistency Models Deep Dive

### 1. CAP Theorem
In a distributed system, you can only have two of the following:
*   **Consistency**: Every read receives the most recent write or an error.
*   **Availability**: Every request receives a (non-error) response.
*   **Partition Tolerance**: The system continues to operate despite network failures.
*   *Note: In the real world, you MUST choose Partition Tolerance, so the choice is between CP and AP.*

### 2. PACELC Theorem
CAP only applies when there is a partition. PACELC adds:
*   **If there is a Partition (P)**: Choose between Availability (A) and Consistency (C).
*   **Else (E)**: Choose between Latency (L) and Consistency (C).

### 3. Consistency Levels
*   **Strong**: Linearizability. Very expensive.
*   **Causal**: Ensures related events are seen in the same order.
*   **Eventual**: The most common for high-scale systems (e.g., Cassandra, DynamoDB).
`,
    steps: [
      {
            "title": "Define Requirements",
            "description": "Determine if your app can tolerate stale data."
      },
      {
            "title": "Choose CAP Profile",
            "description": "Decide between CP (e.g., Zookeeper) or AP (e.g., Cassandra)."
      },
      {
            "title": "Configure Quorum",
            "description": "Set Read and Write quorum values (R, W, N)."
      },
      {
            "title": "Handle Conflicts",
            "description": "Implement Last-Write-Wins or Vector Clocks for merge conflicts."
      }
]
  },
  {
    id: "pacelc-theorem",
    category: "System Design",
    title: "PACELC Theorem",
    description: "An extension of the CAP theorem that describes the tradeoffs between latency and consistency even when there are no partitions.",
    javaCode: `
/**
 * PACELC THEOREM CONCEPTS
 */

// P (Partition) -> A (Availability) or C (Consistency)
// Else (No Partition) -> L (Latency) or C (Consistency)

/*
Examples:
1. DynamoDB: PA/EL (Available during partition, Latency-optimized otherwise)
2. Cassandra: PA/EL (Configurable, but usually optimized for availability/latency)
3. MongoDB: PA/EC (Consistency-optimized)
4. VoltDB: PC/EC (Strict consistency)
*/
`,
    concepts: [
      "P (Partition): If there is a partition, do we choose Availability (A) or Consistency (C)?",
      "E (Else): If there is NO partition, do we choose Latency (L) or Consistency (C)?",
      "PA/EL: During partition, prioritize Availability; otherwise, prioritize Latency.",
      "PC/EC: During partition, prioritize Consistency; otherwise, prioritize Consistency.",
      "PA/EC: During partition, prioritize Availability; otherwise, prioritize Consistency."
],
    tradeoffs: [
      "Latency vs Consistency: Even in a healthy network, replicating data to all nodes adds latency.",
      "Availability vs Consistency: The classic CAP tradeoff during network failures."
],
    interviewTips: [
      "What does the 'E' and 'L' in PACELC stand for? (Else, Latency).",
      "How does PACELC improve upon CAP? (CAP only handles the partition case; PACELC handles the normal case too).",
      "Which category does Amazon DynamoDB fall into? (PA/EL).",
      "Why is PACELC important for modern cloud databases?"
],
    deepDive: `
## PACELC Theorem Deep Dive

### 1. Beyond CAP
The CAP theorem is often criticized because network partitions are rare. Most of the time, the system is running normally. PACELC addresses what happens during these "normal" times.

### 2. The "Else" Case
If the network is fine (Else), you still have a choice:
*   **Latency (L)**: Return the result as soon as one node has it. Replicate to others asynchronously.
*   **Consistency (C)**: Wait for all nodes to acknowledge the write before returning. This ensures all subsequent reads see the latest data but increases latency.

### 3. Real-World Systems
*   **Cassandra**: Usually PA/EL. It's designed for high availability and low latency.
*   **HBase**: Usually PC/EC. It prioritizes consistency above all else.
*   **DynamoDB**: PA/EL by default (eventual consistency), but can be configured for PC/EC (strong consistency).
`,
    steps: [
      {
            "title": "Identify Partition Strategy",
            "description": "Decide if your app should stay up (A) or stay consistent (C) during a network failure."
      },
      {
            "title": "Identify Normal Strategy",
            "description": "Decide if your app should be fast (L) or consistent (C) during normal operation."
      },
      {
            "title": "Choose Database",
            "description": "Select a database that aligns with your PACELC requirements (e.g., Cassandra for PA/EL)."
      }
]
  },
  {
    id: "consistent-hashing",
    category: "System Design",
    title: "Consistent Hashing",
    description: "A special kind of hashing such that when a hash table is resized, only K/n keys need to be remapped on average.",
    javaCode: `
import java.util.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * CONSISTENT HASHING: Minimizing remapping during scaling.
 */
class ConsistentHash {
    private final SortedMap<Long, String> circle = new TreeMap<>();
    private final int numberOfReplicas;

    public ConsistentHash(int numberOfReplicas, Collection<String> nodes) {
        this.numberOfReplicas = numberOfReplicas;
        for (String node : nodes) {
            add(node);
        }
    }

    public void add(String node) {
        for (int i = 0; i < numberOfReplicas; i++) {
            circle.put(hash(node + ":" + i), node);
        }
    }

    public void remove(String node) {
        for (int i = 0; i < numberOfReplicas; i++) {
            circle.remove(hash(node + ":" + i));
        }
    }

    public String get(String key) {
        if (circle.isEmpty()) return null;
        long hash = hash(key);
        if (!circle.containsKey(hash)) {
            SortedMap<Long, String> tailMap = circle.tailMap(hash);
            hash = tailMap.isEmpty() ? circle.firstKey() : tailMap.firstKey();
        }
        return circle.get(hash);
    }

    private long hash(String key) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest(key.getBytes());
            // Use first 8 bytes for a long hash
            long res = 0;
            for (int i = 0; i < 8; i++) {
                res <<= 8;
                res |= (bytes[i] & 0xFF);
            }
            return res;
        } catch (NoSuchAlgorithmException e) {
            return key.hashCode();
        }
    }
}

public class ConsistentHashDemo {
    public static void main(String[] args) {
        List<String> nodes = Arrays.asList("Node-A", "Node-B", "Node-C");
        ConsistentHash ch = new ConsistentHash(3, nodes);

        System.out.println("Key 'user_123' mapped to: " + ch.get("user_123"));
        System.out.println("Key 'order_456' mapped to: " + ch.get("order_456"));

        System.out.println("
--- Adding Node-D ---");
        ch.add("Node-D");
        System.out.println("Key 'user_123' now mapped to: " + ch.get("user_123"));
    }
}
`,
    concepts: [
      "Hash Ring: A logical circle representing the hash space.",
      "Virtual Nodes: Multiple points on the ring for a single physical node to ensure even distribution.",
      "Data Partitioning: Distributing data across multiple servers.",
      "Replication: Storing copies of data on clockwise successor nodes."
],
    tradeoffs: [
      "Pros: Minimal data movement during scaling, handles server failures gracefully.",
      "Cons: Complexity in implementation, potential for hotspotting if virtual nodes are not used correctly."
],
    interviewTips: [
      "Why not use 'hash(key) % n'? (Because adding/removing a node remaps almost all keys).",
      "What is the purpose of virtual nodes? (To balance the load and handle heterogeneous server capacities).",
      "Which real-world systems use this? (Cassandra, DynamoDB, Memcached, Akamai CDN)."
],
    deepDive: `
## Consistent Hashing Deep Dive

### 1. The Problem with Simple Hashing
In a traditional distributed system, you might use \`server = hash(key) % n\`. If you add a server (\`n+1\`), almost every key maps to a different server, causing a massive "cache miss" storm or data migration.

### 2. The Hash Ring Solution
Consistent hashing maps both servers and keys to a large integer range (e.g., 0 to 2^32-1) arranged in a circle. A key is assigned to the first server it encounters moving clockwise on the ring.

### 3. Virtual Nodes (VNodes)
To prevent uneven distribution (where one server gets much more data than others), we map each physical server to multiple "virtual" locations on the ring. This averages out the distribution and allows us to assign more virtual nodes to more powerful servers.
`,
    steps: [
      {
            "title": "Map Nodes to Ring",
            "description": "Hash each server (and its virtual replicas) onto the circular hash space."
      },
      {
            "title": "Map Keys to Ring",
            "description": "Hash the incoming key onto the same space."
      },
      {
            "title": "Find Successor",
            "description": "Move clockwise from the key's hash to find the first available server node."
      },
      {
            "title": "Handle Scaling",
            "description": "When a node is added, only the keys between the new node and its counter-clockwise neighbor are remapped."
      }
]
  },
  {
    id: "bloom-filter",
    category: "System Design",
    title: "Bloom Filter",
    description: "A space-efficient probabilistic data structure used to test whether an element is a member of a set.",
    javaCode: `
import java.util.BitSet;
import java.util.function.Function;

/**
 * BLOOM FILTER: Probabilistic membership test.
 */
class BloomFilter<T> {
    private final BitSet bitSet;
    private final int size;
    private final Function<T, Integer>[] hashFunctions;

    public BloomFilter(int size, Function<T, Integer>... hashFunctions) {
        this.size = size;
        this.bitSet = new BitSet(size);
        this.hashFunctions = hashFunctions;
    }

    public void add(T element) {
        for (Function<T, Integer> h : hashFunctions) {
            int hash = Math.abs(h.apply(element)) % size;
            bitSet.set(hash);
        }
    }

    public boolean mightContain(T element) {
        for (Function<T, Integer> h : hashFunctions) {
            int hash = Math.abs(h.apply(element)) % size;
            if (!bitSet.get(hash)) {
                return false; // Definitely not in set
            }
        }
        return true; // Might be in set (False Positive possible)
    }
}

public class BloomFilterDemo {
    public static void main(String[] args) {
        // Simple Bloom Filter with 2 hash functions
        BloomFilter<String> filter = new BloomFilter<>(100, 
            s -> s.hashCode(), 
            s -> s.hashCode() * 31
        );

        filter.add("apple");
        filter.add("banana");

        System.out.println("Contains 'apple'? " + filter.mightContain("apple")); // true
        System.out.println("Contains 'cherry'? " + filter.mightContain("cherry")); // false (usually)
    }
}
`,
    concepts: [
      "Probabilistic: Can have False Positives, but never False Negatives.",
      "Space Efficiency: Uses much less memory than a HashSet or HashMap.",
      "Hash Functions: Multiple independent hash functions map an element to multiple bits.",
      "No Deletion: Standard Bloom filters don't support deleting elements (use Counting Bloom Filter instead)."
],
    tradeoffs: [
      "Pros: Extremely fast, constant space regardless of element size.",
      "Cons: False positives, cannot remove items, requires tuning of size and number of hash functions."
],
    interviewTips: [
      "What is a False Positive in a Bloom Filter?",
      "Can a Bloom Filter have False Negatives? (No).",
      "How do you choose the size and number of hash functions? (Based on desired error rate).",
      "Real-world uses: Google Chrome (malicious URLs), Apache Cassandra (avoiding disk lookups), Medium (avoiding showing same post)."
],
    deepDive: `
## Bloom Filter Deep Dive

### 1. How it Works
A Bloom filter is a bit array of size \`m\`. When an element is added, it is hashed \`k\` times, and the bits at those \`k\` indices are set to 1. To check for existence, you hash the element \`k\` times and check if all those bits are 1.

### 2. The "Definitely Not" Guarantee
If any of the \`k\` bits are 0, the element is **definitely not** in the set. If all are 1, the element **might** be in the set (another element or combination of elements could have set those same bits).

### 3. Optimization in Databases
Databases like Cassandra or BigTable use Bloom filters to avoid expensive disk reads. Before checking the disk for a key, they check the Bloom filter. If it says "not present," the database skips the disk read entirely.
`,
    steps: [
      {
            "title": "Initialize BitSet",
            "description": "Choose a size `m` based on the expected number of elements and error rate."
      },
      {
            "title": "Define Hash Functions",
            "description": "Use multiple independent hash functions (e.g., MurmurHash, CityHash)."
      },
      {
            "title": "Add Elements",
            "description": "Set bits at all hashed indices to 1."
      },
      {
            "title": "Query Elements",
            "description": "Check if all bits at hashed indices are 1. If any is 0, return false."
      }
]
  },
  {
    id: "distributed-id-generation",
    category: "System Design",
    title: "Distributed ID Generation",
    description: "Designing a system to generate unique, sortable IDs across a distributed cluster without a central bottleneck.",
    javaCode: `
import java.util.concurrent.atomic.AtomicLong;

/**
 * SNOWFLAKE ID GENERATOR: Simplified logic.
 * [Timestamp (41 bits)] | [Machine ID (10 bits)] | [Sequence (12 bits)]
 */
class SnowflakeIdGenerator {
    private final long machineId;
    private final long epoch = 1609459200000L; // Jan 1, 2021
    private long lastTimestamp = -1L;
    private long sequence = 0L;

    public SnowflakeIdGenerator(long machineId) {
        this.machineId = machineId;
    }

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();
        
        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & 4095; // 12 bits
            if (sequence == 0) {
                timestamp = waitNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }
        
        lastTimestamp = timestamp;
        
        return ((timestamp - epoch) << 22) | (machineId << 12) | sequence;
    }

    private long waitNextMillis(long lastTimestamp) {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= lastTimestamp) {
            timestamp = System.currentTimeMillis();
        }
        return timestamp;
    }
}

public class IdGenDemo {
    public static void main(String[] args) {
        SnowflakeIdGenerator gen = new SnowflakeIdGenerator(1);
        for (int i = 0; i < 5; i++) {
            System.out.println("Generated ID: " + gen.nextId());
        }
    }
}
`,
    concepts: [
      "UUID: 128-bit random IDs. Unique but not sortable and large (bad for DB indexes).",
      "Snowflake (Twitter): 64-bit IDs. Time-ordered, unique, and compact.",
      "Ticket Server (Flickr): Central DB with auto-increment. Simple but a single point of failure.",
      "Database Auto-increment: Simple but hard to scale across multiple databases.",
      "Entropy: The randomness required to ensure uniqueness."
],
    tradeoffs: [
      "Snowflake: Highly scalable, time-ordered, but requires clock synchronization (NTP).",
      "UUID: Decentralized, no coordination needed, but poor DB performance due to random insertion."
],
    interviewTips: [
      "Why are random UUIDs bad for B-Tree indexes? (Causes frequent page splits and fragmentation).",
      "How does Snowflake handle clock drift?",
      "Explain the bit-distribution of a Snowflake ID.",
      "What is the 'Ticket Server' approach?"
],
    deepDive: `
## Distributed ID Generation Deep Dive

### 1. The Requirements
*   **Uniqueness**: No two IDs should be the same.
*   **Sortability**: IDs should be roughly ordered by time (K-ordered).
*   **Performance**: High throughput (millions of IDs per second).
*   **Availability**: No single point of failure.

### 2. Snowflake Algorithm (Twitter)
Snowflake generates 64-bit IDs:
*   **1 bit**: Unused (sign bit).
*   **41 bits**: Timestamp (milliseconds since epoch). Provides ~69 years of IDs.
*   **10 bits**: Machine ID (Worker ID). Supports up to 1024 nodes.
*   **12 bits**: Sequence number. Allows 4096 IDs per millisecond per node.

### 3. UUID vs. Snowflake
UUIDs are great for distributed systems where no coordination is possible. However, because they are random, inserting them into a clustered index (like MySQL's primary key) is extremely slow because it forces the database to reorder data on disk. Snowflake IDs are time-ordered, so they always append to the end of the index, making them much faster.
`,
    steps: [
      {
            "title": "Define Epoch",
            "description": "Choose a custom start date to maximize the lifespan of your 41-bit timestamp."
      },
      {
            "title": "Assign Machine IDs",
            "description": "Use Zookeeper or Etcd to dynamically assign unique machine IDs to your nodes."
      },
      {
            "title": "Handle Clock Drift",
            "description": "If the system clock moves backward, the generator should wait or throw an error."
      },
      {
            "title": "Optimize Storage",
            "description": "Store 64-bit IDs as BIGINT in your database for maximum efficiency."
      }
]
  },
  {
    id: "snowflake-id",
    category: "System Design",
    title: "Distributed ID Generator (Snowflake)",
    description: "Generates unique, time-ordered 64-bit IDs across a distributed system without a central coordinator.",
    javaCode: `
public class SnowflakeIdGenerator {
    private final long workerId;
    private final long datacenterId;
    private long sequence = 0L;
    private long lastTimestamp = -1L;

    // Bit allocation: 1 (unused) | 41 (timestamp) | 5 (datacenter) | 5 (worker) | 12 (sequence)
    public SnowflakeIdGenerator(long workerId, long datacenterId) {
        this.workerId = workerId;
        this.datacenterId = datacenterId;
    }

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();
        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & 4095;
            if (sequence == 0) timestamp = waitNextMillis(lastTimestamp);
        } else {
            sequence = 0L;
        }
        lastTimestamp = timestamp;
        return ((timestamp - 1288834974657L) << 22) | (datacenterId << 17) | (workerId << 12) | sequence;
    }

    private long waitNextMillis(long lastTimestamp) {
        long timestamp = System.currentTimeMillis();
        while (timestamp <= lastTimestamp) timestamp = System.currentTimeMillis();
        return timestamp;
    }
}
`,
    concepts: [
      "Time-Ordered: IDs are roughly sorted by time, which is good for DB indexing (B-Trees).",
      "No Central Coordinator: Each worker generates IDs independently.",
      "Bit Masking: Using bitwise operations to pack multiple pieces of info into a 64-bit long."
],
    tradeoffs: [
      "Pros: High throughput, low latency, unique IDs across clusters.",
      "Cons: Clock skew can cause duplicate IDs if not handled. Dependency on system clock."
],
    interviewTips: [
      "How to handle clock drift/skew?",
      "Why is 41 bits used for timestamp? (Gives ~69 years of IDs)."
],
    deepDive: `
## Snowflake ID Design Guide

### 1. Bit Structure (64 bits)
*   **1 bit**: Unused (sign bit).
*   **41 bits**: Timestamp in milliseconds (relative to a custom epoch).
*   **5 bits**: Datacenter ID (up to 32 datacenters).
*   **5 bits**: Worker/Machine ID (up to 32 workers per datacenter).
*   **12 bits**: Sequence number (up to 4096 IDs per millisecond per worker).

### 2. Workflow
1.  **Get Current Time**: Retrieve the current millisecond.
2.  **Check Sequence**: If it's the same millisecond as the last ID, increment the sequence.
3.  **Wait if Needed**: If the sequence overflows (reaches 4096), wait for the next millisecond.
4.  **Compose ID**: Use bitwise OR and SHIFT to combine timestamp, IDs, and sequence.

### 3. Clock Skew Mitigation
If the system clock moves backward, the generator should throw an error or wait until the clock catches up to \`lastTimestamp\`.
`,
    steps: [
      {
            "title": "Define Epoch",
            "description": "Choose a starting point in time for your 41-bit timestamp."
      },
      {
            "title": "Assign IDs",
            "description": "Assign unique Datacenter and Worker IDs to each instance."
      },
      {
            "title": "Implement nextId",
            "description": "Use synchronized method to handle sequence and timestamp logic."
      },
      {
            "title": "Handle Clock Skew",
            "description": "Add checks to detect and handle backward clock movements."
      }
]
  },
  {
    id: "distributed-lock",
    category: "System Design",
    title: "Distributed Lock (Redis & Redlock)",
    description: "Ensuring mutual exclusion across multiple nodes in a distributed system using Redis.",
    javaCode: `
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * DISTRIBUTED LOCK: Simulating a Redis-based Lock.
 */
class RedisDistributedLock {
    private final Map<String, String> redisStorage = new HashMap<>();
    private final String lockKey;
    private final String requestId;

    public RedisDistributedLock(String lockKey) {
        this.lockKey = lockKey;
        this.requestId = UUID.randomUUID().toString();
    }

    /**
     * SET lock_key request_id NX PX 30000
     * NX: Only set if not exists
     * PX: Set expiry in milliseconds
     */
    public boolean tryLock() {
        if (!redisStorage.containsKey(lockKey)) {
            redisStorage.put(lockKey, requestId);
            System.out.println("Lock acquired by: " + requestId);
            return true;
        }
        System.out.println("Lock acquisition failed for: " + requestId);
        return false;
    }

    public void unlock() {
        // In real Redis, this must be an atomic Lua script to check requestId
        if (requestId.equals(redisStorage.get(lockKey))) {
            redisStorage.remove(lockKey);
            System.out.println("Lock released by: " + requestId);
        }
    }
}

public class DistributedLockDemo {
    public static void main(String[] args) {
        RedisDistributedLock lock1 = new RedisDistributedLock("resource_1");
        RedisDistributedLock lock2 = new RedisDistributedLock("resource_1");

        if (lock1.tryLock()) {
            try {
                // Critical Section
                lock2.tryLock(); // Should fail
            } finally {
                lock1.unlock();
            }
        }
        
        lock2.tryLock(); // Should succeed now
    }
}
`,
    concepts: [
      "Mutual Exclusion: Only one process can hold the lock at a time.",
      "Deadlock Prevention: Using TTL (Time-to-Live) so locks eventually expire.",
      "Fault Tolerance: Redlock algorithm for multi-node Redis clusters.",
      "Atomic Release: Ensuring a process only releases its own lock (using unique IDs).",
      "Fencing Token: A monotonic counter to handle delayed requests after lock expiry."
],
    tradeoffs: [
      "Pros: Simple to implement with Redis, high performance.",
      "Cons: Clock drift can break Redlock, complex to handle long-running tasks that exceed TTL."
],
    interviewTips: [
      "What is the Redlock algorithm?",
      "How do you handle a process that crashes while holding a lock? (TTL).",
      "Why is 'SETNX' not enough for a production lock? (Need atomic TTL and unique IDs).",
      "What are Fencing Tokens?"
],
    deepDive: `
## Distributed Lock Deep Dive

### 1. Why Distributed Locks?
In a single JVM, you use \`synchronized\` or \`ReentrantLock\`. In a distributed system with multiple JVMs, you need a central authority like Redis or Zookeeper to manage the lock state.

### 2. The Redlock Algorithm
Proposed by Redis creator Antirez, Redlock involves:
1.  Getting the current time.
2.  Trying to acquire the lock in N Redis nodes (e.g., 5) sequentially.
3.  The lock is acquired if it's held in a majority (e.g., 3) and the time elapsed is less than the lock validity time.

### 3. The Fencing Token Problem
If a process holds a lock, but hits a long GC pause, the lock might expire and be given to another process. When the first process wakes up, it might perform a write, causing data corruption.
**Solution**: Use a **Fencing Token** (a version number that increases with every lock acquisition). The storage layer (e.g., DB) should reject any write with a token lower than the last seen.
`,
    steps: [
      {
            "title": "Acquire Lock",
            "description": "Use SET with NX and PX options to acquire the lock atomically."
      },
      {
            "title": "Set Expiry",
            "description": "Always set a TTL to prevent deadlocks if the process crashes."
      },
      {
            "title": "Use Unique ID",
            "description": "Store a unique request ID as the value to ensure only the owner can release the lock."
      },
      {
            "title": "Atomic Release",
            "description": "Use a Lua script to check the ID and delete the key in one atomic operation."
      }
]
  },
  {
    id: "leader-election-consensus",
    category: "System Design",
    title: "Leader Election & Consensus",
    description: "How distributed systems agree on a single source of truth or a leader node using algorithms like Raft and Paxos.",
    javaCode: `
/**
 * LEADER ELECTION CONCEPTS (Raft)
 */

/*
1. Follower: Passive state, just responds to requests.
2. Candidate: Seeking to become the leader.
3. Leader: Handles all client requests and replicates logs.

Election Process:
- If a Follower doesn't hear from a Leader, it becomes a Candidate.
- It increments its 'Term' and votes for itself.
- It asks other nodes for votes.
- If it gets a majority, it becomes the Leader.
*/
`,
    concepts: [
      "Consensus: Achieving agreement among distributed nodes on a single data value.",
      "Raft: A modern, understandable consensus algorithm (used by Etcd, Consul).",
      "Paxos: The classic, more complex consensus algorithm (used by Google Spanner).",
      "Quorum: The minimum number of votes required to make a decision (usually N/2 + 1).",
      "Split Brain: A failure state where two nodes believe they are the leader.",
      "Term: A logical clock used to detect stale leaders."
],
    tradeoffs: [
      "Pros: Ensures strong consistency (Linearizability), high availability (as long as a majority is up).",
      "Cons: High latency (requires multiple network round trips), complex to implement correctly."
],
    interviewTips: [
      "What is the 'Split Brain' problem and how to prevent it? (Use Quorums and Fencing tokens).",
      "Explain the three states of a node in Raft.",
      "Difference between Raft and Paxos. (Raft is more modular and easier to understand).",
      "What happens if the leader fails?"
],
    deepDive: `
## Leader Election & Consensus Deep Dive

### 1. The Need for a Leader
In many distributed systems (like databases or task schedulers), you need one node to be "in charge" to prevent conflicts. If two nodes both try to assign the same task, you have a problem.

### 2. Raft Algorithm
Raft divides time into **Terms**. Each term starts with an election.
*   **Heartbeats**: The leader sends periodic heartbeats to followers.
*   **Election Timeout**: If a follower doesn't receive a heartbeat within a random timeout (e.g., 150-300ms), it starts an election.
*   **Log Replication**: Once a leader is elected, it accepts client commands, appends them to its log, and replicates them to followers. A command is only "committed" once it's on a majority of nodes.

### 3. Split Brain & Quorum
If a network partition occurs, you might end up with two groups of nodes. If both groups elect a leader, you have a "Split Brain". By requiring a **Quorum** (majority), only one group (the one with more than half the nodes) can successfully elect a leader, preventing the split.
`,
    steps: [
      {
            "title": "Choose Algorithm",
            "description": "Use Raft for most modern applications due to its simplicity."
      },
      {
            "title": "Set Timeouts",
            "description": "Use randomized election timeouts to prevent multiple nodes from starting elections at the same time."
      },
      {
            "title": "Implement Fencing",
            "description": "Use 'Fencing Tokens' (increasing IDs) to ensure that stale leaders cannot perform writes."
      },
      {
            "title": "Use Etcd/Zookeeper",
            "description": "Don't implement consensus from scratch; use proven tools like Etcd or Zookeeper."
      }
]
  },
  {
    id: "gossip-protocol",
    category: "System Design",
    title: "Gossip Protocol (Epidemic Protocol)",
    description: "A decentralized peer-to-peer communication protocol for spreading information in a large-scale distributed system.",
    javaCode: `
import java.util.*;
import java.util.concurrent.*;

/**
 * GOSSIP PROTOCOL: Simulating decentralized state propagation.
 */
class Node {
    private final String id;
    private final Map<String, Integer> state = new ConcurrentHashMap<>();
    private final List<Node> peers = new ArrayList<>();

    public Node(String id) { this.id = id; }
    public void addPeer(Node peer) { peers.add(peer); }
    
    public void updateState(String key, int version) {
        state.put(key, version);
        System.out.println("Node " + id + " updated " + key + " to v" + version);
    }

    public void gossip() {
        if (peers.isEmpty()) return;
        // Pick a random peer to gossip with
        Node peer = peers.get(ThreadLocalRandom.current().nextInt(peers.size()));
        peer.receiveGossip(new HashMap<>(state));
    }

    public void receiveGossip(Map<String, Integer> incomingState) {
        incomingState.forEach((key, version) -> {
            state.merge(key, version, Math::max);
        });
    }

    public void printState() {
        System.out.println("Node " + id + " state: " + state);
    }
}

public class GossipDemo {
    public static void main(String[] args) throws InterruptedException {
        Node n1 = new Node("A");
        Node n2 = new Node("B");
        Node n3 = new Node("C");

        n1.addPeer(n2);
        n2.addPeer(n3);
        n3.addPeer(n1);

        n1.updateState("config_v1", 1);

        // Simulate gossip rounds
        for (int i = 0; i < 5; i++) {
            n1.gossip();
            n2.gossip();
            n3.gossip();
        }

        n1.printState();
        n2.printState();
        n3.printState();
    }
}
`,
    concepts: [
      "Decentralization: No central server; every node is equal.",
      "Scalability: Communication overhead grows logarithmically with system size.",
      "Fault Tolerance: The system continues to work even if many nodes fail.",
      "Eventual Consistency: Information eventually reaches all nodes.",
      "Anti-Entropy: Periodically comparing states to fix discrepancies."
],
    tradeoffs: [
      "Pros: Highly resilient, no single point of failure, easy to scale.",
      "Cons: Not suitable for strong consistency, high network traffic if not tuned."
],
    interviewTips: [
      "Where is Gossip Protocol used? (Cassandra for cluster membership, Consul for health checks, Redis Cluster).",
      "What is the infection rate? (How fast information spreads).",
      "Difference between Push, Pull, and Push-Pull gossip.",
      "How does it handle node failures? (Nodes stop gossiping, and others eventually mark them as down)."
],
    deepDive: `
## Gossip Protocol Deep Dive

### 1. The Epidemic Analogy
Gossip protocols are inspired by how viruses spread in a population. A node with new information "infects" a few random neighbors. Those neighbors then infect others, leading to exponential spread.

### 2. Convergence Time
In a system of \`N\` nodes, if each node gossips with a random peer every second, the information will reach all nodes in \`O(log N)\` rounds. This makes it incredibly efficient for massive clusters.

### 3. Use Cases
*   **Cluster Membership**: Keeping track of which nodes are alive.
*   **Failure Detection**: Detecting when a node has stopped responding.
*   **Metadata Propagation**: Spreading configuration changes or routing tables.
`,
    steps: [
      {
            "title": "Select Neighbors",
            "description": "Each node periodically picks a random set of peers to communicate with."
      },
      {
            "title": "Exchange State",
            "description": "Nodes exchange their local state (e.g., versioned data or heartbeats)."
      },
      {
            "title": "Merge State",
            "description": "Nodes resolve conflicts by taking the latest version (e.g., highest timestamp or counter)."
      },
      {
            "title": "Repeat",
            "description": "The process continues indefinitely, ensuring the system stays in sync."
      }
]
  },
  {
    id: "asynchronous-messaging",
    category: "System Design",
    title: "Asynchronous Messaging (Kafka & RabbitMQ)",
    description: "Decoupling services and improving scalability using message brokers and event-driven patterns.",
    javaCode: `
import java.util.*;
import java.util.concurrent.*;

/**
 * ASYNCHRONOUS MESSAGING: Simulating a Message Broker (Pub/Sub).
 */
class MessageBroker {
    private final Map<String, List<Consumer>> topics = new ConcurrentHashMap<>();

    public void subscribe(String topic, Consumer consumer) {
        topics.computeIfAbsent(topic, k -> new CopyOnWriteArrayList<>()).add(consumer);
    }

    public void publish(String topic, String message) {
        if (topics.containsKey(topic)) {
            for (Consumer consumer : topics.get(topic)) {
                // In a real system, this would be asynchronous
                new Thread(() -> consumer.receive(message)).start();
            }
        }
    }
}

interface Consumer {
    void receive(String message);
}

class EmailService implements Consumer {
    public void receive(String message) {
        System.out.println("EmailService: Sending email for event -> " + message);
    }
}

class AnalyticsService implements Consumer {
    public void receive(String message) {
        System.out.println("AnalyticsService: Recording analytics for event -> " + message);
    }
}

public class MessagingDemo {
    public static void main(String[] args) {
        MessageBroker broker = new MessageBroker();
        
        broker.subscribe("user-signup", new EmailService());
        broker.subscribe("user-signup", new AnalyticsService());

        System.out.println("--- Publishing 'user-signup' event ---");
        broker.publish("user-signup", "User{id=101, email='test@example.com'}");
    }
}
`,
    concepts: [
      "Producer/Consumer: Decoupling the sender from the receiver.",
      "Topics & Queues: Pub/Sub (one-to-many) vs Point-to-Point (one-to-one).",
      "Consumer Groups: Scaling consumers to process messages in parallel (Kafka).",
      "Dead Letter Queue (DLQ): Handling messages that cannot be processed after multiple retries.",
      "Idempotency: Ensuring that processing the same message multiple times has the same effect as once."
],
    tradeoffs: [
      "Pros: Improved scalability, fault tolerance (buffering), and service decoupling.",
      "Cons: Increased complexity (distributed tracing, eventual consistency), potential for message lag."
],
    interviewTips: [
      "Difference between Kafka and RabbitMQ. (Kafka is log-based, high throughput; RabbitMQ is queue-based, complex routing).",
      "How to ensure 'at-least-once' vs 'exactly-once' delivery?",
      "What is a Rebalance in Kafka?",
      "How do you handle message ordering? (Partition keys in Kafka)."
],
    deepDive: `
## Asynchronous Messaging Deep Dive

### 1. Why Messaging?
In a synchronous system (REST), if the receiver is down, the sender fails. In an asynchronous system, the broker buffers the message, allowing the receiver to process it when it's back up.

### 2. Kafka: The Distributed Log
Kafka treats messages as an append-only log. Consumers track their position (offset) in the log. This allows multiple consumers to read the same data at their own pace and even "replay" old messages.

### 3. RabbitMQ: The Smart Broker
RabbitMQ uses exchanges and bindings to route messages to specific queues based on complex rules (routing keys, headers). It's excellent for complex workflows and task distribution.

### 4. Reliability Patterns
*   **Retry with Exponential Backoff**: Wait longer between each retry.
*   **DLQ**: If retries fail, move the message to a special queue for manual inspection.
`,
    steps: [
      {
            "title": "Choose a Broker",
            "description": "Select Kafka for high-throughput streaming or RabbitMQ for complex routing."
      },
      {
            "title": "Define Schema",
            "description": "Use Avro or Protobuf to define message formats and ensure compatibility."
      },
      {
            "title": "Implement Idempotency",
            "description": "Ensure consumers can handle duplicate messages safely (e.g., using unique event IDs)."
      },
      {
            "title": "Monitor Lag",
            "description": "Track the gap between production and consumption to ensure the system is keeping up."
      }
]
  },
  {
    id: "distributed-transactions-2pc-saga",
    category: "System Design",
    title: "Distributed Transactions: 2PC vs Saga",
    description: "Managing data consistency across multiple services and databases in a distributed system.",
    javaCode: `
/**
 * DISTRIBUTED TRANSACTIONS COMPARISON
 */

// 1. Two-Phase Commit (2PC)
/*
Phase 1: Prepare
Coordinator -> Service A: "Can you commit?" (A locks resources)
Coordinator -> Service B: "Can you commit?" (B locks resources)

Phase 2: Commit/Rollback
If both say YES: Coordinator -> Services: "COMMIT!"
If any says NO: Coordinator -> Services: "ROLLBACK!"
*/

// 2. Saga Pattern (Choreography)
/*
Service A: Process Order -> Publish "OrderCreated"
Service B: (Listens) Process Payment -> Publish "PaymentSuccess"
If Service B fails: Publish "PaymentFailed"
Service A: (Listens) Cancel Order (Compensating Transaction)
*/
`,
    concepts: [
      "ACID: Atomicity, Consistency, Isolation, Durability (Traditional DBs).",
      "BASE: Basically Available, Soft state, Eventual consistency (Distributed systems).",
      "2PC (Two-Phase Commit): Synchronous, strong consistency, blocking.",
      "Saga Pattern: Asynchronous, eventual consistency, compensating transactions.",
      "TCC (Try-Confirm-Cancel): A variant of 2PC implemented at the application level."
],
    tradeoffs: [
      "2PC: Strong consistency but low throughput and high risk of deadlocks/blocking.",
      "Sagas: High scalability and availability but complex to implement and only eventual consistency."
],
    interviewTips: [
      "Why is 2PC rarely used in microservices? (Blocking, single point of failure at coordinator).",
      "What is a Compensating Transaction in a Saga?",
      "Difference between Orchestration and Choreography in Sagas.",
      "What is the 'Dual Write' problem?"
],
    deepDive: `
## Distributed Transactions Deep Dive

### 1. The Challenge
In a monolith, you have one database and one transaction. In microservices, an "Order" might involve the Order DB, Inventory DB, and Payment API. How do you ensure they all succeed or all fail?

### 2. Two-Phase Commit (2PC)
2PC uses a central coordinator. It's "Atomic" but "Blocking". If the coordinator or any service hangs during the "Prepare" phase, all services stay locked, leading to a system-wide halt. It doesn't scale well for high-volume web apps.

### 3. Saga Pattern
Sagas embrace **Eventual Consistency**. A Saga is a sequence of local transactions. Each local transaction updates the database and publishes an event. If a step fails, the Saga executes **Compensating Transactions** to undo the previous successful steps.
*   **Choreography**: Services talk to each other via events (Decentralized).
*   **Orchestration**: A central "Saga Manager" tells each service what to do (Centralized).
`,
    steps: [
      {
            "title": "Assess Consistency",
            "description": "Choose 2PC only if strong consistency is strictly required and volume is low."
      },
      {
            "title": "Design Sagas",
            "description": "Identify the sequence of local transactions and their corresponding undo (compensating) actions."
      },
      {
            "title": "Choose Saga Style",
            "description": "Use Choreography for simple flows and Orchestration for complex business logic."
      },
      {
            "title": "Handle Idempotency",
            "description": "Ensure all services can handle duplicate events safely."
      }
]
  },
  {
    id: "event-sourcing-cqrs",
    category: "System Design",
    title: "Event Sourcing & CQRS",
    description: "Architectural patterns for building highly scalable, auditable, and performant distributed systems.",
    javaCode: `
/**
 * EVENT SOURCING & CQRS CONCEPTS
 */

/*
1. Event Sourcing: Store the state as a sequence of events.
   - Event: "OrderCreated", "ItemAdded", "PaymentProcessed".
   - Current State: Replayed from the event log.

2. CQRS (Command Query Responsibility Segregation):
   - Command Side: Handles writes (updates state).
   - Query Side: Handles reads (optimized for UI).
*/

// Example Event
record OrderCreatedEvent(String orderId, String userId, long timestamp) {}

// Command Handler
class OrderCommandHandler {
    public void handle(CreateOrderCommand cmd) {
        // 1. Validate
        // 2. Persist Event to Event Store
        // 3. Publish Event
    }
}
`,
    concepts: [
      "Event Store: An append-only database that stores the sequence of events (e.g., EventStoreDB, Kafka).",
      "Projection: A process that listens to events and updates a read-optimized database (e.g., ElasticSearch).",
      "Snapshot: Periodically saving the current state to avoid replaying thousands of events.",
      "Command: An intent to change state (can be rejected).",
      "Event: A fact that has happened (cannot be changed).",
      "Eventual Consistency: The read side may be slightly behind the write side."
],
    tradeoffs: [
      "Pros: Perfect audit log, high performance (append-only writes), flexible read models, time-travel debugging.",
      "Cons: High complexity, eventual consistency challenges, hard to handle schema changes in events."
],
    interviewTips: [
      "Difference between a Command and an Event.",
      "What is a 'Projection' in CQRS?",
      "How to handle 'Read Your Own Writes' in an eventually consistent system?",
      "When would you NOT use Event Sourcing? (For simple CRUD applications)."
],
    deepDive: `
## Event Sourcing & CQRS Deep Dive

### 1. Event Sourcing
Instead of storing the *current* state of an object (e.g., \`status = 'SHIPPED'\`), you store all the **Events** that led to that state. This gives you a 100% accurate audit trail and allows you to reconstruct the state at any point in time.

### 2. CQRS
CQRS splits the application into two parts:
*   **Command Side**: Optimized for high-throughput writes. It only cares about validating and persisting events.
*   **Query Side**: Optimized for complex reads. It uses "Projections" to build specialized views of the data (e.g., a dashboard view in Redis).

### 3. The Synergy
Event Sourcing and CQRS are often used together. The Event Store acts as the source of truth for the Command side, and events are asynchronously propagated to the Query side to update the read models. This allows you to scale reads and writes independently.
`,
    steps: [
      {
            "title": "Identify Events",
            "description": "Define the business events that change the state of your system."
      },
      {
            "title": "Setup Event Store",
            "description": "Choose a database that supports append-only logs and event subscriptions."
      },
      {
            "title": "Build Projections",
            "description": "Create background workers that listen to events and update read-optimized databases."
      },
      {
            "title": "Implement Snapshots",
            "description": "Save the state every N events to keep reconstruction time low."
      }
]
  },
  {
    id: "rate-limiting-algorithms",
    category: "System Design",
    title: "Rate Limiting Algorithms",
    description: "Techniques to control the rate of traffic sent or received by a network interface or service.",
    javaCode: `
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;

/**
 * TOKEN BUCKET ALGORITHM: Simple implementation.
 */
class TokenBucket {
    private final long capacity;
    private final long refillRate; // tokens per second
    private AtomicLong currentTokens;
    private long lastRefillTimestamp;

    public TokenBucket(long capacity, long refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.currentTokens = new AtomicLong(capacity);
        this.lastRefillTimestamp = System.nanoTime();
    }

    public synchronized boolean tryConsume() {
        refill();
        if (currentTokens.get() > 0) {
            currentTokens.decrementAndGet();
            return true;
        }
        return false;
    }

    private void refill() {
        long now = System.nanoTime();
        long tokensToAdd = (now - lastRefillTimestamp) * refillRate / 1_000_000_000;
        if (tokensToAdd > 0) {
            currentTokens.set(Math.min(capacity, currentTokens.get() + tokensToAdd));
            lastRefillTimestamp = now;
        }
    }
}

public class RateLimiterDemo {
    public static void main(String[] args) throws InterruptedException {
        TokenBucket bucket = new TokenBucket(5, 1); // 5 capacity, 1 per sec

        for (int i = 0; i < 10; i++) {
            System.out.println("Request " + i + ": " + (bucket.tryConsume() ? "Allowed" : "Denied"));
            Thread.sleep(200);
        }
    }
}
`,
    concepts: [
      "Token Bucket: Tokens are added at a fixed rate; requests consume tokens. Allows bursts.",
      "Leaky Bucket: Requests enter a bucket and are processed at a fixed rate. Smooths traffic.",
      "Fixed Window: Counts requests in fixed time windows (e.g., 1 min). Suffer from boundary spikes.",
      "Sliding Window Log: Tracks timestamps of requests. Very accurate but memory-intensive.",
      "Sliding Window Counter: Hybrid approach using weighted averages of previous and current windows."
],
    tradeoffs: [
      "Token Bucket: Good for bursts, but can overwhelm downstream if burst is too large.",
      "Leaky Bucket: Ensures constant output rate, but delays requests even if capacity is available.",
      "Fixed Window: Simple to implement but allows 2x traffic at window boundaries."
],
    interviewTips: [
      "Which algorithm is used by Amazon/Stripe? (Token Bucket).",
      "How do you implement rate limiting in a distributed system? (Redis + Lua scripts for atomicity).",
      "What is the difference between Throttling and Rate Limiting?",
      "How to handle '429 Too Many Requests' on the client side? (Exponential backoff)."
],
    deepDive: `
## Rate Limiting Deep Dive

### 1. Why Rate Limit?
*   **Security**: Prevent DoS/DDoS attacks and brute-forcing.
*   **Cost Control**: Limit usage of expensive third-party APIs.
*   **Fairness**: Prevent a single user from starving others of resources.

### 2. Distributed Rate Limiting
In a cluster, local rate limiting isn't enough. You need a central store like **Redis**.
*   **Race Conditions**: Use Redis Lua scripts to ensure \`GET\` and \`SET\` operations are atomic.
*   **Performance**: Use local caching (L1) with periodic sync to Redis (L2) to reduce network overhead.

### 3. Sliding Window Counter
This is the most common production algorithm. It calculates the rate as:
\`count = current_window_count + previous_window_count * (overlap_percentage)\`
This provides a smooth rate without the boundary spikes of Fixed Window.
`,
    steps: [
      {
            "title": "Choose Algorithm",
            "description": "Use Token Bucket for bursty traffic or Leaky Bucket for smooth traffic."
      },
      {
            "title": "Select Store",
            "description": "Use in-memory for single nodes or Redis for distributed systems."
      },
      {
            "title": "Implement Headers",
            "description": "Return X-RateLimit-Limit and X-RateLimit-Remaining headers to clients."
      },
      {
            "title": "Handle Rejection",
            "description": "Return HTTP 429 with a Retry-After header."
      }
]
  },
  {
    id: "api-security-owasp",
    category: "System Design",
    title: "API Security (OWASP Top 10)",
    description: "Protecting your backend APIs from the most common security vulnerabilities and attacks.",
    javaCode: `
/**
 * API SECURITY BEST PRACTICES
 */

/*
1. Broken Object Level Authorization (BOLA):
   - Don't just check if user is logged in.
   - Check if user OWNS the resource (e.g., /api/orders/123).

2. Mass Assignment:
   - Use DTOs! Don't map request JSON directly to Entities.
   - Prevents users from setting 'isAdmin: true' in a profile update.

3. Rate Limiting:
   - Prevent DoS and brute-force attacks.

4. Injection:
   - Use Prepared Statements (JPA/Hibernate handles this).
   - Sanitize all inputs.
*/
`,
    concepts: [
      "BOLA (Broken Object Level Authorization): The #1 API risk. Accessing data of other users via ID manipulation.",
      "BFLA (Broken Function Level Authorization): Accessing administrative functions without proper roles.",
      "Mass Assignment: Binding client input to internal objects without filtering.",
      "Improper Assets Management: Leaving old API versions (v1) exposed and unpatched.",
      "Lack of Resources & Rate Limiting: Vulnerability to DoS attacks.",
      "Injection: SQL, NoSQL, or Command injection via unsanitized input."
],
    tradeoffs: [
      "Pros: Protects user data, prevents financial loss, ensures compliance (GDPR, PCI).",
      "Cons: Adds development overhead, can impact performance (security checks), complex to implement correctly."
],
    interviewTips: [
      "What is BOLA and how to prevent it? (Check ownership on every request).",
      "Explain the risk of 'Mass Assignment'.",
      "How to prevent SQL injection in Java? (Use JPA or PreparedStatement).",
      "What is the difference between Authentication and Authorization?"
],
    deepDive: `
## API Security Deep Dive

### 1. BOLA (The ID Attack)
If an API is \`/api/users/get-details?id=100\`, an attacker might try \`id=101\`. If the server returns data for user 101 without checking if the *current* user is allowed to see it, that's BOLA.
**Fix**: Always query using the current user's ID: \`SELECT * FROM orders WHERE id = ? AND user_id = ?\`.

### 2. Mass Assignment
If your \`User\` entity has an \`isAdmin\` field, and you use \`ObjectMapper.update(user, requestJson)\`, an attacker can send \`{"isAdmin": true}\` in their profile update request.
**Fix**: Use specific DTOs for updates that only include allowed fields.

### 3. Security Headers
Always return standard security headers:
*   **Content-Security-Policy**: Prevents XSS.
*   **Strict-Transport-Security (HSTS)**: Forces HTTPS.
*   **X-Content-Type-Options**: Prevents MIME sniffing.
`,
    steps: [
      {
            "title": "Use DTOs",
            "description": "Never expose your database entities directly to the API."
      },
      {
            "title": "Check Ownership",
            "description": "Verify that the authenticated user has permission to access the specific resource ID."
      },
      {
            "title": "Implement Rate Limiting",
            "description": "Use a gateway or filter to limit requests per user/IP."
      },
      {
            "title": "Scan Regularly",
            "description": "Use tools like OWASP ZAP or Snyk to find vulnerabilities in your code and dependencies."
      }
]
  },
  {
    id: "service-mesh-sidecar",
    category: "System Design",
    title: "Service Mesh & Sidecar Pattern",
    description: "Managing service-to-service communication, security, and observability using a dedicated infrastructure layer.",
    javaCode: `
/**
 * SERVICE MESH CONCEPTS
 */

/*
1. Control Plane: Manages configuration and policies (e.g., Istiod).
2. Data Plane: Intercepts network traffic (e.g., Envoy Proxy).
3. Sidecar: A proxy container running alongside every service instance.
*/

// Example Sidecar Logic (Conceptual)
/*
App -> Request -> Sidecar (Envoy)
Sidecar:
  - Check mTLS
  - Check Rate Limit
  - Collect Metrics
  - Route to Destination Sidecar
Destination Sidecar -> Request -> Destination App
*/
`,
    concepts: [
      "Sidecar Pattern: Deploying a helper proxy alongside each service to handle networking.",
      "mTLS (Mutual TLS): Automatic encryption and identity verification between services.",
      "Traffic Splitting: Routing a percentage of traffic to a new version (Canary).",
      "Circuit Breaking: Automatically failing fast if a downstream service is unhealthy.",
      "Observability: Automatic collection of distributed traces and metrics without changing app code."
],
    tradeoffs: [
      "Pros: Offloads networking logic from the app, consistent security/observability across all languages.",
      "Cons: Increased latency (extra network hop), high operational complexity, significant resource overhead (CPU/RAM for proxies)."
],
    interviewTips: [
      "What is a Service Mesh? (An infrastructure layer for service-to-service communication).",
      "Explain the Sidecar pattern.",
      "Difference between a Service Mesh and an API Gateway. (Gateway is North-South; Mesh is East-West).",
      "What are the components of Istio? (Envoy, Istiod)."
],
    deepDive: `
## Service Mesh Deep Dive

### 1. The Challenge
In microservices, every service needs: Retries, Timeouts, Circuit Breakers, mTLS, and Tracing. Implementing this in every service (and every language) is a nightmare.

### 2. The Solution: Sidecar Proxy
A Service Mesh (like **Istio** or **Linkerd**) injects a proxy (like **Envoy**) into every pod. The application doesn't know the proxy exists. It just makes a request to "Service B", and the proxy intercepts it.
*   **East-West Traffic**: Traffic between services inside the cluster.
*   **North-South Traffic**: Traffic entering or leaving the cluster (handled by API Gateway).

### 3. Control Plane vs. Data Plane
*   **Data Plane**: The collection of sidecar proxies that handle the actual traffic.
*   **Control Plane**: The "brain" that tells the proxies how to behave (e.g., "Service A can only talk to Service B").
`,
    steps: [
      {
            "title": "Install Mesh",
            "description": "Deploy a service mesh like Istio or Linkerd to your Kubernetes cluster."
      },
      {
            "title": "Inject Sidecars",
            "description": "Enable automatic sidecar injection for your namespaces."
      },
      {
            "title": "Define Policies",
            "description": "Use YAML to define mTLS, circuit breakers, and retry logic."
      },
      {
            "title": "Monitor Traffic",
            "description": "Use tools like Kiali or Grafana to visualize the service graph and health."
      }
]
  },
  {
    id: "microservices-deployment-strategies",
    category: "System Design",
    title: "Deployment Strategies",
    description: "Comparing different ways to release new versions of microservices with minimal downtime and risk.",
    javaCode: `
/**
 * DEPLOYMENT STRATEGIES CONCEPTS
 */

/*
1. Rolling Update: Gradually replace old instances with new ones.
2. Blue-Green: Deploy new version to a separate environment, then flip traffic.
3. Canary: Release to a small subset of users first, then scale up.
4. A/B Testing: Run two versions simultaneously to measure user behavior.
*/
`,
    concepts: [
      "Rolling Update: The default in Kubernetes. Zero downtime but two versions run simultaneously.",
      "Blue-Green: Instant rollback, no version overlap, but requires 2x resources.",
      "Canary: Best for risk mitigation. Detect issues early with real traffic.",
      "Shadow Deployment: New version receives real traffic but doesn't send responses to users (testing only).",
      "Feature Toggles: Decoupling deployment from release using flags."
],
    tradeoffs: [
      "Rolling: Simple, resource-efficient, but hard to handle breaking API changes.",
      "Blue-Green: Safe, easy rollback, but expensive and complex to manage DB migrations.",
      "Canary: Very safe, but requires sophisticated monitoring and traffic routing."
],
    interviewTips: [
      "Which strategy is best for a critical financial system? (Blue-Green or Canary).",
      "How do you handle database migrations during a Blue-Green deployment?",
      "What is the role of a Load Balancer in these strategies?",
      "Difference between Deployment and Release."
],
    deepDive: `
## Deployment Strategies Deep Dive

### 1. Rolling Update
Kubernetes replaces pods one by one. If you have 10 pods, it might take down 2 and start 2 new ones. **Challenge**: Your system must handle "Version Skew" where some requests hit v1 and some hit v2.

### 2. Blue-Green Deployment
You have two identical environments: **Blue** (Current) and **Green** (New). You deploy to Green, test it, and then change the Load Balancer to point to Green. If anything goes wrong, you flip back to Blue. **Challenge**: Database changes must be backward compatible.

### 3. Canary Release
Named after the "canary in a coal mine". You route 5% of traffic to the new version. You monitor error rates and latency. If they look good, you move to 25%, 50%, and finally 100%. This is the gold standard for high-scale systems like Netflix or Facebook.
`,
    steps: [
      {
            "title": "Choose Strategy",
            "description": "Select a strategy based on your resource budget and risk tolerance."
      },
      {
            "title": "Automate",
            "description": "Use CI/CD tools (Jenkins, GitLab CI, ArgoCD) to manage the deployment process."
      },
      {
            "title": "Monitor Closely",
            "description": "Implement robust health checks and alerting to detect failures during rollout."
      },
      {
            "title": "Plan Rollbacks",
            "description": "Always have a clear, automated path to revert to the previous version."
      }
]
  },
  {
    id: "url-shortener",
    category: "System Design",
    title: "URL Shortener (TinyURL)",
    description: "Design a service that generates short aliases for long URLs.",
    javaCode: `
import java.util.HashMap;
import java.util.Map;

public class URLShortener {
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int BASE = ALPHABET.length();
    private Map<String, String> shortToLong = new HashMap<>();
    private Map<String, String> longToShort = new HashMap<>();
    private long counter = 1000000000L; // Start with a large number for consistent length

    public String shorten(String longUrl) {
        if (longToShort.containsKey(longUrl)) return longToShort.get(longUrl);
        
        String shortUrl = encode(counter++);
        shortToLong.put(shortUrl, longUrl);
        longToShort.put(longUrl, shortUrl);
        return "http://tiny.url/" + shortUrl;
    }

    public String expand(String shortUrl) {
        String key = shortUrl.replace("http://tiny.url/", "");
        return shortToLong.getOrDefault(key, "URL Not Found");
    }

    private String encode(long num) {
        StringBuilder sb = new StringBuilder();
        while (num > 0) {
            sb.append(ALPHABET.charAt((int) (num % BASE)));
            num /= BASE;
        }
        return sb.reverse().toString();
    }

    public static void main(String[] args) {
        URLShortener service = new URLShortener();
        String short1 = service.shorten("https://google.com/very/long/path/to/resource");
        String short2 = service.shorten("https://github.com/openai/gpt-3");
        
        System.out.println("Shortened 1: " + short1);
        System.out.println("Shortened 2: " + short2);
        System.out.println("Expanded 1: " + service.expand(short1));
    }
}
`,
    concepts: [
      "Base62 Encoding",
      "Key Generation Service (KGS)",
      "Distributed ID Generation (Snowflake)",
      "Caching (Redis)",
      "Database Sharding"
],
    tradeoffs: [
      "Encoding on the fly: Simple but needs unique ID source.",
      "Pre-generating keys: Faster but needs to handle key exhaustion.",
      "SQL vs NoSQL: SQL for ACID, NoSQL for high throughput/scalability."
],
    interviewTips: [
      "Discuss how to handle 100 million requests per day.",
      "Explain the benefit of using 301 vs 302 redirect.",
      "Mention how to prevent URL guessing/scraping."
],
    deepDive: `
## URL Shortener (TinyURL) Design Guide

### 1. Problem Statement
Design a service that generates short aliases for long URLs and redirects users to the original URL when they access the alias.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[Long URL] --> B{Already Shortened?}
    B -- Yes --> C[Return Existing Short URL]
    B -- No --> D[Generate Unique ID]
    D --> E[Base62 Encode ID]
    E --> F[Save to DB & Cache]
    F --> G[Return Short URL]
\`\`\`

### 3. Requirements
*   **Functional**:
    *   Generate a unique short alias for a given long URL.
    *   Redirect users to the original URL with minimal latency.
    *   Support custom aliases (optional).
*   **Non-Functional**:
    *   **High Availability**: The service must be up 100% of the time.
    *   **Low Latency**: Redirection should be near-instant.
    *   **Scalability**: Handle millions of new URLs and billions of clicks.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant S as Shortener Service
    participant C as Cache (Redis)
    participant D as Database (NoSQL)
    
    U->>S: Access tiny.url/abc123
    S->>C: Get long_url for abc123
    alt Cache Hit
        C-->>S: long_url
    else Cache Miss
        S->>D: Query long_url for abc123
        D-->>S: long_url
        S->>C: Set abc123 -> long_url
    end
    S-->>U: HTTP 302 Redirect to long_url
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Request Reception**: The service receives a long URL via a POST request.
2.  **Deduplication**: Check if the URL already exists in the database to avoid duplicate aliases.
3.  **ID Generation**:
    *   A unique 64-bit integer is generated (e.g., using a central counter or Snowflake ID).
4.  **Encoding**: The integer is converted to a Base62 string (using characters \`a-z, A-Z, 0-9\`).
5.  **Persistence**: The mapping \`short_id -> long_url\` is saved in a NoSQL database (like Cassandra or DynamoDB) for high write throughput.
6.  **Caching**: The mapping is also stored in Redis with an LRU eviction policy to speed up redirects.
7.  **Response**: The short URL is returned to the client.

### 6. The Core Requirement

Map a long URL (e.g., \`https://very-long-domain.com/path/to/resource?query=123\`) to a short alias (e.g., \`https://tiny.url/abc123\`).

### 7. ID Generation

The key challenge is generating a unique, short ID for every URL.
*   **Base62 Encoding**: Using \`[a-z, A-Z, 0-9]\` gives 62 possible characters. A 7-character string can represent \$62^7 approx 3.5\$ trillion unique IDs.
*   **Counter-based**: Use a global counter and convert the number to Base62.
*   **Distributed Counter**: In a distributed system, a single counter is a bottleneck. Use **Zookeeper** or a **Key Generation Service (KGS)** to provide ranges of IDs to different app servers.

### 8. System Components

1.  **API Gateway**: Handles incoming requests and rate limiting.
2.  **Application Server**: Handles encoding/decoding logic.
3.  **Database**: Stores the mapping \`short_id -> long_url\`. NoSQL (like Cassandra) is often preferred for its write scalability.
4.  **Cache**: Stores frequently accessed mappings to reduce DB load.

### 9. Redirects

*   **301 (Permanent)**: Browser caches the redirect. Reduces server load but makes analytics harder.
*   **302 (Temporary)**: Browser always asks the server. Better for analytics but higher server load.
`,
    steps: [
      {
            "title": "Receive URL",
            "description": "Client sends a long URL to the service."
      },
      {
            "title": "Generate ID",
            "description": "Get a unique numeric ID from KGS and encode it to Base62."
      },
      {
            "title": "Store Mapping",
            "description": "Save the mapping in the database and cache."
      },
      {
            "title": "Return Alias",
            "description": "Send the short URL back to the client."
      }
]
  },
  {
    id: "chat-system",
    category: "System Design",
    title: "Real-time Chat System",
    description: "Design a scalable chat application like WhatsApp or Slack.",
    javaCode: `
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * CHAT SYSTEM: WebSocket-like message handling.
 */
class Message {
    String senderId, receiverId, content;
    long timestamp;
    public Message(String s, String r, String c) {
        this.senderId = s; this.receiverId = r; this.content = c;
        this.timestamp = System.currentTimeMillis();
    }
}

public class ChatServer {
    private Map<String, String> userStatus = new ConcurrentHashMap<>(); // Online/Offline

    public void onMessage(Message msg) {
        System.out.println("Message from " + msg.senderId + " to " + msg.receiverId + ": " + msg.content);
        
        if (isUserOnline(msg.receiverId)) {
            deliverRealTime(msg);
        } else {
            storeAndNotify(msg);
        }
    }

    private boolean isUserOnline(String userId) { return userStatus.containsKey(userId); }

    private void deliverRealTime(Message msg) {
        System.out.println("Delivering via WebSocket to " + msg.receiverId);
    }

    private void storeAndNotify(Message msg) {
        System.out.println("User offline. Storing in DB and sending Push Notification to " + msg.receiverId);
    }

    public static void main(String[] args) {
        ChatServer server = new ChatServer();
        server.userStatus.put("u1", "online");

        server.onMessage(new Message("u2", "u1", "Hey Alice!"));
        server.onMessage(new Message("u1", "u3", "Hi Charlie, you there?"));
    }
}
`,
    concepts: [
      "WebSockets (Bi-directional communication): Provides full-duplex communication channels over a single TCP connection, essential for real-time chat.",
      "Long Polling (Fallback): A technique where the server holds the request open until new data is available, used when WebSockets are not supported.",
      "Message Sequencing (Vector Clocks): Ensuring messages are displayed in the correct order even if they arrive out of sequence due to network issues.",
      "Presence Service: A real-time service that tracks user online/offline status and 'last seen' timestamps.",
      "Last Seen / Read Receipts: Features that improve user engagement by providing feedback on message status."
],
    tradeoffs: [
      "WebSocket vs. HTTP: WebSockets are better for latency but harder to scale (stateful). HTTP is easier to scale (stateless) but has higher overhead for real-time.",
      "SQL vs. NoSQL: SQL is good for complex queries (search) but hard to scale for billions of messages. NoSQL (Cassandra) is excellent for high-write throughput and horizontal scaling.",
      "Client-side vs. Server-side Storage: Client-side (SQLite) allows offline access but is hard to sync. Server-side is easy to sync but requires constant internet."
],
    interviewTips: [
      "Discuss how to handle 1 billion users and 100 billion messages per day.",
      "Explain how to implement 'End-to-End Encryption'.",
      "Mention how to handle message ordering in a distributed environment."
],
    deepDive: `
## Real-time Chat System Design Guide

### 1. Problem Statement
Design a scalable, low-latency chat system that supports one-on-one and group messaging with real-time delivery and message persistence.

### 2. Step-by-Step Workflow Diagram
\`\`\`mermaid
graph TD
    A[User A sends Message] --> B[Load Balancer]
    B --> C[Chat Server]
    C --> D{User B Online?}
    D -- Yes --> E[Push via WebSocket]
    D -- No --> F[Store in DB & Push Notification]
    C --> G[Message Service]
    G --> H[Message Store: NoSQL]
    G --> I[Search Index: ElasticSearch]
\`\`\`

### 3. Requirements
*   **Functional**:
    *   One-on-one and group chat.
    *   Online/Offline status (Presence).
    *   Message history and persistence.
    *   Push notifications for offline users.
*   **Non-Functional**:
    *   **Low Latency**: Real-time delivery is critical.
    *   **Scalability**: Support millions of concurrent users.
    *   **Reliability**: No message loss.

### 4. Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant A as User A
    participant S as Chat Server
    participant P as Presence Service
    participant B as User B
    
    A->>S: Send Message to B
    S->>P: Is B Online?
    P-->>S: Yes (Server 2)
    S->>S: Store Message in DB
    S->>B: Deliver via WebSocket (Server 2)
    B-->>S: Delivery Ack
    S-->>A: Sent Ack
\`\`\`

### 5. Detailed Execution Flow (LLD)
1.  **Connection**: Users establish a persistent **WebSocket** connection with a chat server.
2.  **Sending**: When User A sends a message, it's sent over the WebSocket to the server.
3.  **Processing**: The server assigns a unique ID and timestamp to the message.
4.  **Persistence**: The message is asynchronously saved to a NoSQL database (like Cassandra) for high write throughput.
5.  **Routing**: The server checks the **Presence Service** to find which server User B is connected to.
6.  **Delivery**: The message is forwarded to User B's server (via a message queue like Redis Pub/Sub) and then delivered over User B's WebSocket.
7.  **Acknowledgment**: Delivery and read receipts are sent back through the same path.

### 6. Core Components

1.  **Chat Server**: Maintains WebSocket connections and handles message routing.
2.  **Presence Service**: Tracks which users are online and which server they are connected to.
3.  **Message Service**: Handles message persistence and retrieval.
4.  **Notification Service**: Sends push notifications to offline users.

### 7. Real-time Communication

We use **WebSockets** for bi-directional, low-latency communication. Unlike HTTP, WebSockets allow the server to push data to the client instantly.

### 8. Scalability and Availability

*   **Horizontal Scaling**: Chat servers are stateless (except for the WebSocket connections) and can be scaled out.
*   **Redis Pub/Sub**: Used to communicate between different chat server instances.
*   **NoSQL Database**: Cassandra or HBase is used for storing billions of messages efficiently.

### 9. Message Ordering

In a distributed system, message ordering is tricky. We use a combination of server-side timestamps and sequence numbers to ensure messages appear in the correct order for all participants.
`,
    steps: [
      {
            "title": "Establish Connection",
            "description": "Client connects to a WebSocket server via a Load Balancer."
      },
      {
            "title": "Send Message",
            "description": "Message is sent to the server, timestamped, and saved to the database."
      },
      {
            "title": "Route Message",
            "description": "Chat service finds the recipient's active connection and delivers the message."
      },
      {
            "title": "Handle Offline",
            "description": "If the recipient is disconnected, store the message and send a push notification."
      }
]
  },
  {
    id: "search-engine-inverted-index",
    category: "System Design",
    title: "Search Engine Internals",
    description: "Understanding how search engines like Elasticsearch and Lucene index and search massive amounts of text.",
    javaCode: `
import java.util.*;

/**
 * INVERTED INDEX: Simple implementation.
 */
class InvertedIndex {
    // Word -> List of Document IDs
    private Map<String, Set<Integer>> index = new HashMap<>();

    public void addDocument(int id, String text) {
        String[] words = text.toLowerCase().split("W+");
        for (String word : words) {
            index.computeIfAbsent(word, k -> new HashSet<>()).add(id);
        }
    }

    public Set<Integer> search(String query) {
        return index.getOrDefault(query.toLowerCase(), Collections.emptySet());
    }
}

public class SearchDemo {
    public static void main(String[] args) {
        InvertedIndex idx = new InvertedIndex();
        idx.addDocument(1, "Java is a programming language");
        idx.addDocument(2, "Spring Boot is a Java framework");
        
        System.out.println("Search 'Java': " + idx.search("Java"));
        System.out.println("Search 'Framework': " + idx.search("framework"));
    }
}
`,
    concepts: [
      "Inverted Index: A mapping from words to the documents that contain them.",
      "Tokenization: Splitting text into individual words (tokens).",
      "Normalization: Converting tokens to a standard form (lowercase, removing punctuation).",
      "Stemming/Lemmatization: Reducing words to their root form (e.g., 'running' -> 'run').",
      "TF-IDF: A statistical measure used to evaluate how important a word is to a document in a collection.",
      "Segment: A self-contained, immutable sub-index in Lucene/Elasticsearch."
],
    tradeoffs: [
      "Pros: Ultra-fast full-text search, supports complex queries (fuzzy, wildcard, proximity).",
      "Cons: High memory and disk usage for indexes, indexing can be slow for large documents."
],
    interviewTips: [
      "How does an Inverted Index work?",
      "What is TF-IDF? (Term Frequency - Inverse Document Frequency).",
      "Explain the difference between a 'Term' and a 'Field' in search.",
      "How does Elasticsearch handle distributed search? (Sharding and Replication)."
],
    deepDive: `
## Search Engine Internals Deep Dive

### 1. The Inverted Index
In a traditional DB, you search for a row and find its columns. In a search engine, you search for a **Term** and find the **Documents** that contain it. This is exactly like the index at the back of a textbook.

### 2. Scoring (Relevance)
Search engines don't just find documents; they rank them.
*   **TF (Term Frequency)**: How many times does the word appear in *this* document?
*   **IDF (Inverse Document Frequency)**: How common is this word across *all* documents? (Rare words like 'Java' are more important than common words like 'the').

### 3. Segments & Merging
Elasticsearch (via Lucene) writes data into immutable **Segments**. As you add more data, more segments are created. Periodically, the engine merges small segments into larger ones to keep search performance high. This is similar to how **LSM Trees** work.
`,
    steps: [
      {
            "title": "Tokenize Input",
            "description": "Break the text into individual words and remove stop words (a, an, the)."
      },
      {
            "title": "Normalize Terms",
            "description": "Apply lowercase and stemming to ensure 'Running' matches 'run'."
      },
      {
            "title": "Build Index",
            "description": "Map each term to the ID of the document it was found in."
      },
      {
            "title": "Calculate Scores",
            "description": "Use TF-IDF or BM25 to rank the results for a given query."
      }
]
  },
  {
    id: "quadtrees-system-design",
    category: "System Design",
    title: "Quadtrees (Location-Based Services)",
    description: "A tree data structure used to partition a two-dimensional space by recursively subdividing it into four quadrants.",
    javaCode: `
import java.util.*;

/**
 * QUADTREE: Spatial partitioning for "Nearby" searches.
 */
class Point {
    double x, y;
    String data;
    public Point(double x, double y, String data) { this.x = x; this.y = y; this.data = data; }
}

class QuadTree {
    private final int CAPACITY = 4;
    private List<Point> points = new ArrayList<>();
    private QuadTree nw, ne, sw, se;
    private double x, y, w, h; // Boundary

    public QuadTree(double x, double y, double w, double h) {
        this.x = x; this.y = y; this.w = w; this.h = h;
    }

    public boolean insert(Point p) {
        if (!contains(p)) return false;
        if (points.size() < CAPACITY && nw == null) {
            points.add(p);
            return true;
        }
        if (nw == null) subdivide();
        return nw.insert(p) || ne.insert(p) || sw.insert(p) || se.insert(p);
    }

    private void subdivide() {
        double hw = w / 2; double hh = h / 2;
        nw = new QuadTree(x, y, hw, hh);
        ne = new QuadTree(x + hw, y, hw, hh);
        sw = new QuadTree(x, y + hh, hw, hh);
        se = new QuadTree(x + hw, y + hh, hw, hh);
    }

    private boolean contains(Point p) {
        return p.x >= x && p.x < x + w && p.y >= y && p.y < y + h;
    }

    public void query(double qx, double qy, double qw, double qh, List<Point> found) {
        if (!intersects(qx, qy, qw, qh)) return;
        for (Point p : points) {
            if (p.x >= qx && p.x < qx + qw && p.y >= qy && p.y < qy + qh) found.add(p);
        }
        if (nw != null) {
            nw.query(qx, qy, qw, qh, found); ne.query(qx, qy, qw, qh, found);
            sw.query(qx, qy, qw, qh, found); se.query(qx, qy, qw, qh, found);
        }
    }

    private boolean intersects(double qx, double qy, double qw, double qh) {
        return !(qx > x + w || qx + qw < x || qy > y + h || qy + qh < y);
    }
}

public class QuadTreeDemo {
    public static void main(String[] args) {
        QuadTree qt = new QuadTree(0, 0, 100, 100);
        qt.insert(new Point(10, 10, "Cafe A"));
        qt.insert(new Point(12, 15, "Cafe B"));
        qt.insert(new Point(80, 80, "Restaurant C"));

        List<Point> nearby = new ArrayList<>();
        qt.query(0, 0, 20, 20, nearby);
        System.out.println("Nearby places (0,0 to 20,20):");
        nearby.forEach(p -> System.out.println("- " + p.data));
    }
}
`,
    concepts: [
      "Spatial Partitioning: Dividing 2D space into manageable regions.",
      "Recursive Subdivision: Each node has exactly four children (NW, NE, SW, SE).",
      "Range Query: Efficiently finding all points within a specific rectangle.",
      "Dynamic Scaling: Adding more detail (smaller quadrants) where point density is high.",
      "Geohashing: An alternative approach using string prefixes for spatial indexing."
],
    tradeoffs: [
      "Pros: Extremely fast for 2D range searches, memory efficient for sparse data.",
      "Cons: Rebuilding the tree for moving objects (e.g., Uber cars) can be expensive, 3D requires Octrees."
],
    interviewTips: [
      "How does Uber find nearby drivers? (Quadtrees or Geohashing).",
      "Difference between Quadtrees and Geohashing. (Quadtrees are tree-based; Geohashing is a flat string-based index).",
      "How to handle moving objects in a Quadtree? (Delete and re-insert or use a grid-based approach).",
      "What is an Octree? (3D version of a Quadtree)."
],
    deepDive: `
## Quadtrees Deep Dive

### 1. The "Nearby" Problem
If you have 1 million restaurants and want to find those within 1km of a user, a linear scan (\`O(N)\`) is too slow. You need a spatial index.

### 2. How Quadtrees Work
A Quadtree starts with a single bounding box. If the number of points in a box exceeds a capacity, it splits into 4 smaller equal-sized boxes. This continues recursively. In dense areas (like NYC), the tree will be deep with many small boxes. In sparse areas (like a desert), the tree will be shallow.

### 3. Querying
To find points in a range, you check if the range intersects a quadrant. If it doesn't, you skip that entire branch of the tree. This reduces the search space from \`O(N)\` to \`O(log N)\`.

### 4. Real-World Alternatives
*   **Geohashing**: Converts (lat, lon) into a string. Points close to each other have similar prefixes. Great for Redis/NoSQL indexing.
*   **Google S2**: Uses Hilbert Curves to map 2D space to 1D, providing even better locality than Geohashing.
`,
    steps: [
      {
            "title": "Define Boundary",
            "description": "Set the initial 2D area for the entire system."
      },
      {
            "title": "Insert Points",
            "description": "Recursively find the correct quadrant and split if capacity is exceeded."
      },
      {
            "title": "Range Search",
            "description": "Traverse only the quadrants that intersect with the search area."
      },
      {
            "title": "Handle Updates",
            "description": "For moving objects, periodically update their position in the tree."
      }
]
  },
  {
    id: "system-design-nearby-friends-geospatial",
    category: "System Design",
    title: "Nearby Friends (Geospatial)",
    description: "Designing a system to find and notify users about friends who are physically close to them.",
    javaCode: `
/**
 * GEOSPATIAL SEARCH CONCEPTS
 */

/*
1. Geohash: Dividing the world into a grid of cells, each with a unique string ID.
2. Quadtree: A tree data structure where each node has exactly four children, used to partition 2D space.
3. Google S2: A library that maps the sphere to a 1D Hilbert curve.
4. Redis Geo: Built-in support for geospatial indexes using sorted sets.
*/
`,
    concepts: [
      "Geohash: A hierarchical spatial data structure which subdivides space into buckets of grid shape.",
      "Quadtree: Efficiently finding points within a radius by recursively dividing the map into four quadrants.",
      "Spatial Index: A specialized index for multidimensional data (e.g., R-Tree, GiST).",
      "Proximity Query: 'Find all points within X miles of coordinate (lat, lon)'.",
      "Pub/Sub: Used to broadcast location updates to interested friends."
],
    tradeoffs: [
      "Pros: Enables real-time location-based features, highly engaging for users.",
      "Cons: High write volume (constant location updates), privacy concerns, complex to scale geospatial queries."
],
    interviewTips: [
      "How would you store millions of user locations? (Redis Geo or PostGIS).",
      "Explain Geohash and how it helps with proximity search.",
      "How to handle the 'Edge Case' where a friend is just across the boundary of a grid cell?",
      "What is the difference between a Quadtree and a Geohash?"
],
    deepDive: `
## Nearby Friends Deep Dive

### 1. The Challenge
You have millions of users. Every user updates their location every 30 seconds. You need to find which of their hundreds of friends are within 5 miles. A simple SQL \`WHERE distance < 5\` is too slow (O(N)).

### 2. Geohashing
Geohash converts a 2D coordinate into a string.
*   Longer string = smaller area.
*   Users in the same area share the same prefix.
*   **Search**: Find all users whose Geohash starts with the same prefix as yours.

### 3. Quadtrees
A Quadtree is a memory-resident data structure. If a quadrant has too many users, it splits into 4 smaller quadrants.
*   **Search**: Traverse the tree to find the leaf nodes that intersect with your search radius.
*   **Update**: When a user moves, you might need to move them from one node to another in the tree.

### 4. Scaling
*   **Write Path**: Use a fast, in-memory store like **Redis** to handle the high volume of location updates.
*   **Read Path**: Use **Pub/Sub**. When User A moves, find their friends and push a notification to them if they are now "nearby".
`,
    steps: [
      {
            "title": "Choose Indexing",
            "description": "Select Geohash for simplicity or Quadtree/S2 for more precision."
      },
      {
            "title": "Handle Updates",
            "description": "Use a high-throughput buffer (Kafka) to process location updates asynchronously."
      },
      {
            "title": "Implement Search",
            "description": "Use Redis Geo commands (GEOADD, GEORADIUS) for fast proximity lookups."
      },
      {
            "title": "Manage Privacy",
            "description": "Allow users to opt-out or use 'fuzzy' locations for privacy."
      }
]
  },
  {
    id: "vector-databases-ai",
    category: "System Design",
    title: "Vector Databases & AI",
    description: "How vector databases enable semantic search and Retrieval-Augmented Generation (RAG) for AI applications.",
    javaCode: `
/**
 * VECTOR DATABASE CONCEPTS
 */

/*
1. Embeddings: Converting text/images into high-dimensional vectors (arrays of floats).
2. Vector Space: Storing vectors in a space where "similar" items are close together.
3. Similarity Search: Finding the "Nearest Neighbors" (k-NN) using Cosine Similarity or Euclidean Distance.
4. RAG (Retrieval-Augmented Generation):
   - User Query -> Embedding -> Vector Search -> Context -> LLM -> Answer.
*/
`,
    concepts: [
      "Embedding: A numerical representation of data that captures its meaning.",
      "Vector Database: Optimized for storing and querying high-dimensional vectors (e.g., Pinecone, Milvus, Weaviate).",
      "ANN (Approximate Nearest Neighbor): Algorithms like HNSW or IVF that find similar vectors quickly without checking every single one.",
      "Cosine Similarity: A common metric for measuring the angle between two vectors.",
      "Metadata Filtering: Combining vector search with traditional attribute filtering (e.g., 'find similar products where price < 100')."
],
    tradeoffs: [
      "Pros: Enables semantic search (searching by meaning, not just keywords), essential for LLM applications.",
      "Cons: High computational cost for embeddings, complex to manage at scale, eventual consistency in some ANN algorithms."
],
    interviewTips: [
      "What is a Vector Embedding?",
      "Why can't we use traditional SQL for vector search? (Standard indexes don't work for multi-dimensional distance).",
      "Explain the RAG architecture.",
      "What is HNSW (Hierarchical Navigable Small World)?"
],
    deepDive: `
## Vector Databases Deep Dive

### 1. The Problem with Keywords
Traditional search engines (Elasticsearch) look for exact word matches. If you search for "feline", you might miss documents about "cats". Vector databases solve this by representing words as **Embeddings** in a high-dimensional space where "cat" and "feline" are mathematically close.

### 2. How it Works
1.  **Ingestion**: Convert your documents into vectors using an embedding model (like OpenAI's \`text-embedding-3\`).
2.  **Storage**: Store these vectors in a specialized database.
3.  **Query**: Convert the user's query into a vector and find the "Nearest Neighbors" in the database.

### 3. RAG (Retrieval-Augmented Generation)
LLMs have a "knowledge cutoff" and can hallucinate. RAG fixes this:
*   Search the vector DB for relevant facts.
*   Pass those facts to the LLM as "context".
*   The LLM generates an answer based *only* on the provided facts.
`,
    steps: [
      {
            "title": "Choose Model",
            "description": "Select an embedding model (OpenAI, HuggingFace, etc.)."
      },
      {
            "title": "Generate Embeddings",
            "description": "Process your data and generate vectors for each chunk."
      },
      {
            "title": "Index Vectors",
            "description": "Store and index the vectors in a database like Pinecone or Milvus."
      },
      {
            "title": "Implement Search",
            "description": "Create a service that converts queries to vectors and performs a similarity search."
      }
]
  },
  {
    id: "system-design-ad-click-aggregator",
    category: "System Design",
    title: "Ad Click Aggregator",
    description: "Designing a high-scale system to count and aggregate ad clicks in real-time with exactly-once semantics.",
    javaCode: `
/**
 * AD CLICK AGGREGATOR CONCEPTS
 */

/*
1. Ingestion: High-throughput stream (Kafka).
2. Processing: Stream processing engine (Flink, Spark Streaming).
3. Windowing: Aggregating clicks over time windows (e.g., 1 minute).
4. Exactly-Once: Ensuring clicks are neither lost nor double-counted.
5. Storage: Time-series database (InfluxDB, Druid) or NoSQL (Cassandra).
*/
`,
    concepts: [
      "Stream Processing: Processing data as it arrives, rather than in batches.",
      "Tumbling Window: Non-overlapping time windows (e.g., 00:00-00:01, 00:01-00:02).",
      "Sliding Window: Overlapping windows (e.g., last 5 minutes, updated every 1 minute).",
      "Watermarking: Handling late-arriving data in a stream.",
      "Idempotency: Ensuring that processing the same click twice has the same effect as once.",
      "Kappa Architecture: A stream-only architecture that handles both real-time and historical data."
],
    tradeoffs: [
      "Pros: Real-time insights for advertisers, handles massive scale (billions of clicks).",
      "Cons: Extremely complex to ensure 'Exactly-Once' delivery, high infrastructure cost, difficult to handle late data."
],
    interviewTips: [
      "How to handle duplicate clicks? (Use a unique ClickID and an idempotent sink).",
      "What is the difference between Event Time and Processing Time?",
      "How to scale the aggregator? (Partition by AdID in Kafka).",
      "Explain 'Watermarking' in stream processing."
],
    deepDive: `
## Ad Click Aggregator Deep Dive

### 1. The Scale
Ad systems like Google or Facebook handle millions of clicks per second. You cannot write every click directly to a database. You must aggregate them in memory first.

### 2. The Pipeline
1.  **Client**: User clicks an ad. Request goes to a Load Balancer.
2.  **Ingestion**: A fleet of web servers receives the click and produces a message to **Kafka**.
3.  **Aggregation**: A **Flink** job reads from Kafka. It groups clicks by \`AdID\` and \`Minute\`.
4.  **Storage**: Every minute, Flink flushes the counts to a database like **Cassandra** or **ClickHouse**.

### 3. Exactly-Once Semantics
This is the hardest part. If a worker fails after counting a click but before committing to Kafka, the click might be counted twice.
**Solution**: Use Flink's **Two-Phase Commit** sink or ensure the database update is **Idempotent** (e.g., \`SET count = 10 WHERE version = 5\`).
`,
    steps: [
      {
            "title": "Partition Data",
            "description": "Partition Kafka topics by AdID to ensure all clicks for an ad go to the same worker."
      },
      {
            "title": "Define Windows",
            "description": "Choose a windowing strategy (Tumbling is best for simple counting)."
      },
      {
            "title": "Handle Late Data",
            "description": "Use watermarks to decide how long to wait for delayed clicks before closing a window."
      },
      {
            "title": "Ensure Idempotency",
            "description": "Use a unique transaction ID for every flush to the database."
      }
]
  },
  {
    id: "java-performance-tuning",
    category: "Performance & Scalability",
    title: "Performance Tuning & JIT",
    description: "Optimizing JVM performance through garbage collection tuning, JIT compilation, and profiling.",
    javaCode: `
/**
 * JVM PERFORMANCE FLAGS
 */

/*
1. Heap Size: -Xms512m -Xmx2g
2. GC Selection: -XX:+UseG1GC or -XX:+UseZGC
3. JIT Logging: -XX:+PrintCompilation
4. Profiling: Use JVisualVM or JProfiler
*/

public class PerformanceDemo {
    public static void main(String[] args) {
        // Simulating a hot loop to trigger JIT
        long start = System.currentTimeMillis();
        for (int i = 0; i < 100_000_000; i++) {
            compute(i);
        }
        System.out.println("Time: " + (System.currentTimeMillis() - start) + "ms");
    }

    private static int compute(int i) {
        return i * i;
    }
}
`,
    concepts: [
      "JIT (Just-In-Time): Compiles bytecode to native machine code at runtime for 'hot' methods.",
      "C1 vs C2 Compiler: C1 is for quick startup; C2 is for long-term optimization.",
      "Inlining: JIT replaces a method call with the actual method body to reduce overhead.",
      "Escape Analysis: Determining if an object can be allocated on the stack instead of the heap.",
      "GC Tuning: Adjusting pause times vs throughput (G1, ZGC, Shenandoah).",
      "Safepoints: Points where all threads stop for GC or other JVM tasks."
],
    tradeoffs: [
      "Pros: Significant performance gains, automatic memory management.",
      "Cons: 'Warm-up' time required for JIT, GC pauses can cause latency spikes, complex to tune."
],
    interviewTips: [
      "What is the difference between -Xms and -Xmx?",
      "Explain 'Stop-the-World' pauses.",
      "How does JIT know which methods are 'hot'? (Counters for method calls and loops).",
      "What is 'Tiered Compilation'?"
],
    deepDive: `
## Performance Tuning Deep Dive

### 1. The JIT Compiler
Java starts by interpreting bytecode. As methods are called frequently, the JIT compiler identifies them as "hot" and compiles them to highly optimized native code. This is why Java performance often improves after a few minutes of running.

### 2. Modern Garbage Collectors
*   **G1 (Garbage First)**: The default since Java 9. Good balance of throughput and predictable pause times.
*   **ZGC / Shenandoah**: Ultra-low latency collectors (pauses < 1ms) regardless of heap size. Great for massive heaps (terabytes).

### 3. Profiling & Monitoring
*   **JFR (Java Flight Recorder)**: Low-overhead data collection built into the JVM.
*   **Flame Graphs**: Visual representation of where CPU time is being spent.
*   **Heap Dumps**: Analyzing memory leaks using tools like Eclipse MAT.
`,
    steps: [
      {
            "title": "Set Heap Size",
            "description": "Set -Xms and -Xmx to the same value to avoid heap resizing overhead."
      },
      {
            "title": "Select GC",
            "description": "Use -XX:+UseZGC if low latency is critical."
      },
      {
            "title": "Profile First",
            "description": "Never tune without data. Use JFR or a profiler to find the actual bottleneck."
      },
      {
            "title": "Monitor Safepoints",
            "description": "Check if 'Stop-the-World' pauses are too frequent or too long."
      }
]
  },
  {
    id: "docker-kubernetes-basics",
    category: "Performance & Scalability",
    title: "Docker & Kubernetes for SDE3",
    description: "Core concepts of containerization and orchestration for modern backend engineers.",
    javaCode: `
import java.util.*;

/**
 * DOCKER & KUBERNETES: Simulating a simple Pod Scheduler.
 */
class Pod {
    String id, status;
    public Pod(String id) { this.id = id; this.status = "PENDING"; }
}

class Scheduler {
    private List<String> nodes = Arrays.asList("Node-1", "Node-2", "Node-3");
    private Map<String, String> podAssignments = new HashMap<>();

    public void schedule(Pod pod) {
        // Simple Round-Robin Scheduling
        String node = nodes.get(podAssignments.size() % nodes.size());
        podAssignments.put(pod.id, node);
        pod.status = "RUNNING";
        System.out.println("Scheduled Pod " + pod.id + " to " + node);
    }
}

public class K8sSimulation {
    public static void main(String[] args) {
        Scheduler scheduler = new Scheduler();
        
        System.out.println("--- Deploying 5 Replicas ---");
        for (int i = 1; i <= 5; i++) {
            scheduler.schedule(new Pod("pod-v1-" + i));
        }
    }
}

/*
# Dockerfile Example
FROM openjdk:17
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
*/
`,
    concepts: [
      "Containerization: Packaging code with its dependencies (Docker).",
      "Images vs Containers: Blueprints vs running instances.",
      "Pods: The smallest deployable units in Kubernetes.",
      "Services: Stable networking for a set of Pods (ClusterIP, NodePort, LoadBalancer).",
      "ConfigMaps & Secrets: Managing configuration and sensitive data."
],
    tradeoffs: [
      "Pros: Environment consistency, easy scaling, efficient resource usage.",
      "Cons: Learning curve, operational overhead, networking complexity."
],
    interviewTips: [
      "Difference between a Container and a Virtual Machine.",
      "How does a Pod differ from a Container?",
      "Explain the 'Sidecar' container pattern.",
      "What is a 'Liveness' vs 'Readiness' probe?"
],
    deepDive: `
## Docker & Kubernetes Essentials

### 1. Why Containers?
Containers solve the "it works on my machine" problem. They use OS-level virtualization (namespaces and cgroups in Linux) to isolate processes.

### 2. Kubernetes (K8s) Architecture
*   **Control Plane**: Manages the cluster (API Server, Scheduler, etcd).
*   **Nodes**: Worker machines where containers run.
*   **Kubelet**: Agent running on each node to manage containers.

### 3. Key K8s Resources
*   **Deployment**: Manages the desired state of Pods (e.g., "I want 3 replicas").
*   **Service**: Provides a single IP/DNS name to access a group of Pods.
*   **Ingress**: Manages external access to services (HTTP/HTTPS).
`,
    steps: [
      {
            "title": "Containerize App",
            "description": "Write a Dockerfile and build the image."
      },
      {
            "title": "Define Resources",
            "description": "Write K8s YAML manifests for Deployment and Service."
      },
      {
            "title": "Configure Probes",
            "description": "Add health checks (Liveness/Readiness) to your manifests."
      },
      {
            "title": "Deploy & Scale",
            "description": "Use kubectl to apply manifests and scale replicas."
      }
]
  }
];
