# Virtual Event Manager

## Overview
A platform to manage and host virtual events seamlessly. This project provides features for event creation, user management, and real-time notifications, making it easier to organize and participate in virtual events.

## Features
- **User Management**:
  - User registration and authentication
  - Role-based access control (Admin/User)
- **Event Management**:
  - Create, update, and delete events (Admin only)
  - RSVP and attendee tracking
- **Notifications**:
  - Email notifications for event registration
- **Integration**:
  - Integration with video conferencing tools (future improvement)

## Tech Stack
- **Frontend**: React, TypeScript (not implemented yet)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS (future improvement)
- **Deployment**: Docker, AWS

## Folder Structure
```
virtual-event-manager/
├── controllers/          # Business logic for users and events
├── middlewares/          # Authentication and authorization logic
├── models/               # Mongoose schemas for User and Event
├── routes/               # API route definitions
├── util/                 # Utility functions (e.g., email sending)
├── messageTemplates/     # Email templates
├── public/               # Static assets (future use)
├── app.js                # Entry point for the application
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## API Endpoints
### User Routes
- **POST** `/users/register` - Register a new user
- **POST** `/users/login` - Login a user and return a JWT token

### Event Routes
- **GET** `/events` - Get all events
- **POST** `/events` - Create a new event (Admin only)
- **PUT** `/events/:id` - Update an event (Admin only)
- **DELETE** `/events/:id` - Delete an event (Admin only)
- **POST** `/events/:id/register` - Register for an event

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/virtual-event-manager.git
   ```
2. Navigate to the project directory:
   ```bash
   cd virtual-event-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory and add the following:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWTSECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## Usage
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Future Improvements
- Add support for multiple languages (i18n).
- Implement advanced analytics for event organizers.
- Enable payment gateway integration for paid events.
- Add AI-based recommendations for event attendees.
- Build a frontend using React and TypeScript.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork.
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.