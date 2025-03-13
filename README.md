# spacebar

## summary

capstone project: social media site
application: node express, postgres, prisma

## version
v.0.001

## notes
URL: https://spacebar-express.onrender.com/

## todo

- basically need to work on frontend, then prioritize next feature set (??)
- admin role (moderate features)
- stretch goals.. ??

## completions
- last login, edit profile backend routes
- (many not listed here, see frontend)
- updated getAllComments (returns user id, name)
- - route (like)
- routes (post, comment)
- initial test for route (posts) successful
- added generic error-handling middleware (app.js)
- JWT authentication middleware for protected routes
- route (profile): GET /api/auth/me (protected)
- route (login): POST /api/auth/login
- route (register): POST /api/auth/register
- route (health): GET /api/health/database/connect
- route (health): GET /api/health/database/migration
- route (health): GET /api/health/cors
