# User Authentication with Minimal File Handling
This project demonstrates a simple program that performs user authentication using JWT (JSON Web Tokens) and includes minimal file handling operations.

# Authentication vs. Authorization
Authentication: Proves who you are (e.g., login using username and password).

Authorization: Determines what you can do (e.g., "Admins can delete posts").

# Authentication Methods
# 1. Stateful Authentication
How It Works:

User submits credentials (username/password).

Server verifies credentials.

Server creates a session (stores session data in memory or database).

Server sends session ID to client (usually in a cookie).

Client includes session ID in subsequent requests.

Server validates session ID on each request.

Characteristics:

Server maintains session state.

Session data stored server-side (memory, Redis, database).

# 2. Stateless Authentication
How It Works:

User submits credentials.

Server verifies credentials.

Server generates a signed token (JWT) containing user claims.

Server sends the token to the client.

Client includes the token in subsequent requests (header or cookie).

Server validates the token signature and extracts claims.

Characteristics:

No server-side session storage.

Scales easily for distributed systems.

# Token Storage Options (for JWT)
# A. Cookies (Most Secure for Websites)
How: Server sends token in an HttpOnly cookie.

✅ Pros: Auto-sent with requests, blocks XSS.

❌ Cons: Vulnerable to CSRF (fix with SameSite flag).

Best For: Web apps in browsers.

# B. Local Storage (Easy but Risky)
How: JavaScript saves & reads token manually.

✅ Pros: Persists after refresh, easy to use.

❌ Cons: Hackable via XSS attacks.

Best For: Simple apps where security isn’t critical.

# C. In-Memory (Safest but Temporary)
How: Token stored in JavaScript memory (not persisted).

✅ Pros: No theft risk (disappears on refresh).

❌ Cons: Users must log in often.

Best For: Banking and high-security apps.

