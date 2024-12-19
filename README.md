# Ecommerce-MERN






->sudo docker-compose up --build





____________auth-service_______backend-auth________

**Relationships Between the Parts:**

1. **`server.js`**:
   * Utilizes **`express`** to establish the server.
   * Connects to the MongoDB database with **`connectDB`**.
   * Handles authentication routes through **`authRoutes`**.

2. **`authRoutes.js`**:
   * Defines routes for user registration and login.
   * Secures protected access via **`AuthController`** methods and **`authMiddleware`**.

3. **`authController.js`**:
   * Manages the registration and login processes.
   * Utilizes methods from **`authService.js`** for functionality.

4. **`authService.js`**:
   * Interacts with the **`User`** model to manage user information.
   * Utilizes **`bcrypt`** for password hashing.
   * Employs **`jwt`** for token generation.

5. **`User.js`**:
   * Defines the user data structure.
   * Contains methods for password hashing and validation.

6. **`authMiddleware.js`**:
   * Verifies JWT tokens.
   * Ensures routes are protected against unauthorized access.

_____END_______auth-service_______backend-auth______END_______# Ecommerce-MERN-APP