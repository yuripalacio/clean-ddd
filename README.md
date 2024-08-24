# Project focus on DDD and Clean Architecture

This project was developed based on the concepts of Domain-Driven Design (DDD) and Clean Architecture.
The goal is to demonstrate my knowledge of these concepts and show how to implement them without relying on any framework, making it easily adaptable to other projects with minimal changes.
Afterward, I will create another project that integrates this one with NestJS, database access, and more.
Through this, I aim to highlight the "magic" of DDD and Clean Architecture.

## The project
This project was built to help schools create lessons (classes) and allow students to enroll in them.
Although the business rules are relatively simple, the focus is on demonstrating how to develop the project using DDD and Clean Architecture principles.
The following features will be possible:
- Create, fetch, delete, and update a lesson;
- Enroll in a class and delete an enrollment.

Entities:
- Lesson
- Instructor
- Student
- Enrollment
- Attachment
- Notification

Domains:
- Event
- Notification

## DDD (Domain-Driven Design)
DDD is a methodology focused on translating real customer problems into software solutions, prioritizing clear communication and a common pattern among all parties involved in the project.
Unlike Clean Architecture, DDD is not directly related to code, tools, or frameworks. Instead, it focuses on understanding the domain—that is, the specific knowledge area of the problem the software aims to solve.
A crucial aspect of DDD is collaboration with Domain Experts, individuals who have a deep understanding of the problem, to develop a Ubiquitous Language.

The objective of DDD is to create software that faithfully reflects business needs, ensuring that the design and communication are consistent and understandable for everyone involved.
In short, DDD is a powerful approach to software design, helping to align technical development with real client needs, from conception to implementation.

## Clean Architecture
Clean Architecture focuses on decoupling the application layers, allowing different parts of the code to be independent and easily interchangeable.
The structure consists of concentric layers, where the inner layers (use cases and entities) are protected by the outer layers (infrastructure and interface).
This separation ensures that the core of the application does not have direct dependencies on details like frameworks or databases, allowing for flexibility, such as changing the database or framework without side effects on the rest of the code.

The key lesson of Clean Architecture is to ensure that dependencies follow the correct direction, as represented by the arrows in the diagram so that each layer can evolve independently from the others.

![clean-architecture](https://th.bing.com/th/id/OIP.B7LkQDyDqLN3rRSrNYkETAHaFc?rs=1&pid=ImgDetMain)

## Functional Error Handling
This technique uses functions to return the result of an operation, which can be *either* a success or an error, encapsulated in an `Either` type object.
This object contains two possibilities: `Right` (success) or `Left` (error).
Instead of using `throw`, which can abruptly interrupt the program flow, Functional Error Handling allows functions to return errors in a more controlled manner, ensuring that the program flow continues predictably and that errors are handled explicitly.

Advantages:
- Flow Control: Avoids the abrupt interruption of execution flow caused by exceptions.
- Standardization: Facilitates standardization in error handling with a consistent interface for success and failure.
- Flexibility: Easily distinguishes between error types and provides appropriate responses, such as different HTTP status codes.
- Strong Typing: With TypeScript support, ensures that functions adhere to expected return types, increasing code safety and predictability.

## Aggregates And Watched Lists
In DDD, an *aggregate* represents a group of related entities managed together, such as an `Order` and its `OrderItems`. These entities are saved simultaneously, ensuring consistency.

A *Watched List* is a pattern used to track changes in a list, like adding or removing attachments in a lesson. Instead of deleting and recreating everything during an edit, the `WatchedList` tracks what was added, removed, or updated.
This allows the application to perform only the necessary database operations, optimizing performance.

In summary, aggregates ensure entities that depend on each other are managed as a unit, while the watched list helps efficiently handle changes in related data without unnecessary operations.

## Domain Events with Pub/Sub
Domain events are a pattern used in software development, especially within DDD, to manage communication between different subdomains or bounded contexts without tightly coupling them. In a monolithic architecture, while everything exists within the same codebase, it is still essential to maintain independence between different subdomains. Domain events enable this by decoupling the execution logic and ensuring that when something significant happens in one subdomain (like a purchase being made), other subdomains (like invoicing) can react to it without direct dependencies.

This pattern helps keep the system modular and allows different parts of the application to evolve independently. In the example discussed, a notification subdomain is being introduced to handle alerts related to various activities. This subdomain will listen to domain events, such as a new reply being posted or a response being marked as the best, and trigger notifications accordingly.

In this project, Pub/Sub (Publish/Subscription) is used to decouple different parts of a system. For instance, when a new enrollment is created, instead of directly calling the notification service (which would cause tight coupling), the enrollment creation event is published.
This event is added to a data structure with a flag indicating whether it's ready for processing.
Subscribers, like the notification service, listen for these events and act only when they are marked as ready.
This ensures that the notification is sent only after the enroll creation process is fully complete, avoiding premature notifications in case of errors.

This approach decouples the components, allowing independent evolution of different parts of the system without causing errors or tight dependencies.

By [Yuri Palacio](https://www.linkedin.com/in/yuri-palacio/) :wave:
