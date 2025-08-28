🧠 Tasteorama Backend
Tasteorama is a RESTful API designed for a culinary web application that allows users to create, save, manage, and explore recipes. Built with Node.js and Express, it provides secure authentication, structured data handling, and a developer-friendly interface.

🚀 Key Features
- 🔐 Authentication
- User registration, login, token refresh, and logout
- JWT-based authentication with cookie support
- Protected routes for authorized users only
- 
- 🍲 Recipe Management
- Create, view, update, and delete recipes
- Save personal recipes and mark favorites
- Filter recipes by category, region, and ingredients
- 
- 🗂️ Categories & Ingredients
- Retrieve available categories and ingredient lists
- Use filters to refine recipe searches
- 
- 👤 User Operations
- Get current user info
- Manage subscriptions and favorites
- 
- 📚 API Documentation
- Swagger UI available at /api-docs
- Fully documented endpoints, request bodies, and responses

🛠️ Technologies Used
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Swagger UI for documentation
- Pino for logging
- dotenv, cookie-parser, cors

 🌐 Core API Endpoints
| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| POST   | /api/auth/register    | Register a new user             |
| POST   | /api/auth/login       | Log in                          |
| GET    | /api/recipes/my       | Get user's own recipes          |
| POST   | /api/recipes          | Create a new recipe             |
| GET    | /api/categories       | Get recipe categories           |
| GET    | /api/ingredients      | Get available ingredients       |
| GET    | /api/currentUser      | Get current user information    |
