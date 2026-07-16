# Authentication Flow

## Overview

Handles user authentication using JWT access and refresh tokens.

```text
Login
  ↓
Backend
  ↓
Access Token
Refresh Token
  ↓
Auth Store
  ↓
Authenticated User
```

## Responsibilities

- Authenticate users
- Store JWT tokens
- Restore session
- Refresh expired access tokens

## Benefits

- Secure authentication
- Persistent login
- Centralized authentication flow