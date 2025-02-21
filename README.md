# spacebar

## summary

capstone project: social media site
application: node express, postgres, prisma

## version
v.0.001

## notes
URL: https://spacebar-express.onrender.com/

## todo

- frontend: register (form)
- frontend: login (form)
- frontend: profile page
- frontend: deployment, integration test
- review next objectives (primary features: posts, newsfeed)

## completions
- initial test for route (posts) successful
- added generic error-handling middleware (app.js)
- JWT authentication middleware for protected routes
- route (profile): GET /api/auth/me (protected)
- route (login): POST /api/auth/login
- route (register): POST /api/auth/register
- route (health): GET /api/health/database/connect
- route (health): GET /api/health/database/migration
- route (health): GET /api/health/cors
