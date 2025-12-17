# Password Reset Backend

A secure and robust Node.js backend application for user authentication and password reset functionality using JWT tokens and email verification.

## Features

- **User Registration**: Secure user registration with password hashing
- **User Login**: JWT-based authentication system
- **Password Reset**: Email-based password reset with token verification
- **Email Integration**: Automated email sending for password reset links
- **Security**: Bcrypt password hashing and JWT token management

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Nodemailer**: Email service integration
- **CORS**: Cross-Origin Resource Sharing enabled

## Project Structure

```
Password-Reset-Backend/
├── Controllers/
│   └── authController.js    # Authentication logic (register, login, forgot/reset password)
├── Database/
│   └── dbConfig.js           # MongoDB connection configuration
├── Models/
│   └── userModel.js          # User schema and model
├── Routes/
│   └── authRoute.js          # Authentication routes
├── Utils/
│   └── mailer.js             # Email sending utility
├── index.js                  # Application entry point
├── package.json              # Project dependencies
└── .env                      # Environment variables (not tracked)
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Password-Reset-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Complete API Documentation
For detailed API documentation with examples and testing capabilities, visit:
[Postman API Documentation](https://documenter.getpostman.com/view/45894584/2sB3dVNSf9)

### Endpoints

#### 1. Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Success Response**: `201 Created`
```json
{
  "message": "User registered successfully",
  "data": { /* user data */ }
}
```

#### 2. Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Success Response**: `200 OK`
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "role": "user"
}
```

#### 3. Forgot Password
- **URL**: `/api/auth/forgot-password`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "john@example.com"
}
```
- **Success Response**: `200 OK`
```json
{
  "message": "Password reset email sent"
}
```

#### 4. Reset Password
- **URL**: `/api/auth/reset-password/:id/:token`
- **Method**: `POST`
- **Parameters**:
  - `id`: User ID
  - `token`: JWT reset token
- **Body**:
```json
{
  "password": "newSecurePassword123"
}
```
- **Success Response**: `200 OK`
```json
{
  "message": "Password reset successful",
  "data": { /* updated user data */ }
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/password-reset` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `EMAIL_USER` | Email address for sending emails | `noreply@example.com` |
| `EMAIL_PASS` | Email password/app password | `your_email_password` |

## Security Features

- Password hashing using bcrypt with salt rounds
- JWT token-based authentication
- Token expiration for password reset (1 hour)
- Protected routes requiring authentication
- Input validation and error handling

## Development

### Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon (auto-restart)

### Testing the API

You can test the API endpoints using:
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- cURL commands

Example cURL request:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## Password Reset Flow

1. User clicks "Forgot Password" and enters their email
2. Backend generates a JWT token valid for 1 hour
3. Email with reset link is sent to user (format: `http://localhost:5173/reset-password/:id/:token`)
4. User clicks the link and enters a new password
5. Backend verifies the token and updates the password
6. User can now login with the new password

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (invalid credentials, user exists, etc.)
- `404`: Not Found (user not found)
- `500`: Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Goutham Balaji P S**

## Acknowledgments

- Express.js documentation
- MongoDB/Mongoose documentation
- JWT.io for JWT resources
- Nodemailer for email functionality
