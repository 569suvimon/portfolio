# Architecture

## Overview

This project follows a layered architecture to separate UI, business logic,
and data access.

```text
Component
    ↓
Hook
    ↓
Service
    ↓
fetchWrapper
    ↓
Backend
```

## Responsibilities

Component : Render UI and handle user interactions 
Hook :  Manage application workflows 
Service :  Communicate with backend APIs 
fetchWrapper :  Handle authentication, requests, and error handling 
Backend :  Business logic and data 

## Design Principles

- Single Responsibility
- Separation of Concerns
- Reusable and Testable
- Low Coupling
- Consistent Feature Structure

## Benefits

- Easy to maintain
- Easy to extend
- Easy to test
- Clear responsibility for each layer