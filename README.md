
# Task Manager - Web Application For task Management

Task Manager is a robust and secure task management application that allows users to manage their projects and tasks efficiently. With features like JWT-based authentication, password encryption using bcrypt, and a user-friendly dashboard, it offers a seamless experience for organizing tasks.



## Features

**Authentication:**
- Users can register and log in securely using their credentials. The signup and login flows ensure a smooth and user-friendly experience.
- User sessions are managed using JSON Web Tokens (JWT), ensuring secure and stateless authentication.
- User passwords are hashed using bcrypt for robust security, ensuring sensitive data is never stored in plain text.
- Users can log out securely, terminating their session and ensuring no unauthorized access to the dashboard.
<img width="1432" alt="Screenshot 2025-01-04 at 4 45 07 PM" src="https://github.com/user-attachments/assets/006e3bff-d892-40ce-a26b-b1b7c4da2432" />


**Dashboard:**
- A **dynamic sidebar** allows users to:
 - View all their projects in a list.
 - Add new projects with a simple form.
 - Switch between projects seamlessly.
- On selecting a project, the main content area displays all the tasks associated with that project.
- The dashboard is fully responsive and adapts to various screen sizes for a consistent user experience across devices.
<img width="1430" alt="Screenshot 2025-01-04 at 4 49 32 PM" src="https://github.com/user-attachments/assets/229f68af-ea64-4d7a-91cb-eefdfe193dbf" />


**Project Management:**
- Users can create new projects with a unique   name and manage tasks within each project.
- Projects are displayed in an organized list within the sidebar for easy access.
- Users can remove unwanted projects, cleaning up their workspace efficiently.
<img width="1435" alt="Screenshot 2025-01-04 at 4 50 11 PM" src="https://github.com/user-attachments/assets/d712ae10-205b-4c5d-ab5f-81de82770916" />


**Task Management:**
- Tasks can be categorized into:  1)  To Do: Tasks yet to be started. 2) In Progress: Tasks currently being worked on. 3) Completed: Tasks that are finished.
 - Each task includes buttons to change its category dynamically. For instance: Move a task from **To Do** to **In Progress**. Move a task from **In Progress** to **Completed**.
  - Tasks are rendered under their respective categories in real time, ensuring an intuitive and interactive user experience.
   - Users can add new tasks to any selected project by specifying a title, description, and initial category.asks can be updated or edited, and their status (category) can be modified with a simple click.
   - <img width="1433" alt="Screenshot 2025-01-04 at 4 51 13 PM" src="https://github.com/user-attachments/assets/14eb412c-7454-4409-bdc3-f9f34814b824" />

**Dynamic User Interface**
 - The application dynamically updates the UI as users add or modify tasks and projects.
 - The layout ensures tasks are visually organized under their respective categories, making it easy to track progress at a glance.
   <img width="1437" alt="Screenshot 2025-01-04 at 4 51 34 PM" src="https://github.com/user-attachments/assets/94cb818d-abe8-4564-a1d9-53ac5d246401" />

   **Logout Functionality**
 - Users can log out of their account, ensuring that unauthorized individuals cannot access their data if they leave the application open.
  - The session token is invalidated upon logout, further enhancing security.









## Structure
<img width="692" alt="Screenshot 2025-01-04 at 4 52 40 PM" src="https://github.com/user-attachments/assets/c2e2e228-a086-4657-b778-06c253545aec" />

## Tech Stack

**Frontend:** 
 - React: Dynamic, fast UI rendering and component-based architecture.
  - TailwindCSS: Modern Designing ,Eliet UI
  - JavaScript:Modern, efficient language for frontend and backend logic.

**Backend:** 
 - Node.js: Fast, event-driven server for handling client requests.
  - Express: Simplifies route handling and API creation.
   - JWT (JSON Web Token): Secure authentication and session management with tokens.
    - bcrypt: Hashes passwords for secure storage and protection.

**Database:**
 - MongoDB: NoSQL database for flexible, scalable data storage.
  - Mongoose: Simplifies interactions with MongoDB using schemas.
 
 

 

 
## Installation

Clone the Repository:

```bash
  git clone https://github.com/sandeepyadav-24/task-manager.git
```

Navigate to the project directory:
```bash
cd Task-Manager
```
Install Dependencies:
```bash
 npm install
```
Set up environment variables:
- Rename .env.example to .env.
 - Add your MongoDB URI and JWT secret.


Start the Backend :
```bash
 cd server
 nodemon index.js
```

Start the Frontend:
```bash
 cd client
 npm run dev
```

This will start the application on http://localhost:5173.



    
## Screenshots
**Landing Page**
<img width="1433" alt="Screenshot 2025-01-04 at 5 44 51 PM" src="https://github.com/user-attachments/assets/22a3b295-3b83-41f2-9852-12e2790b966c" />

**DashBoard** 
<img width="1435" alt="Screenshot 2025-01-04 at 4 55 08 PM" src="https://github.com/user-attachments/assets/1c86a996-35bb-47d0-b0c7-8c715abde1c7" />


**Add New Project**
<img width="1440" alt="Screenshot 2025-01-04 at 4 54 44 PM" src="https://github.com/user-attachments/assets/174f6f47-0a8f-4715-9b5e-c5e2aebf0d57" />

**Add New Task**
<img width="1437" alt="Screenshot 2025-01-04 at 4 55 21 PM" src="https://github.com/user-attachments/assets/03e2ee1b-289c-47e7-a642-ef6dd9c10aa9" />


**Task**
<img width="1433" alt="Screenshot 2025-01-04 at 4 55 39 PM" src="https://github.com/user-attachments/assets/96fde4a2-8509-4bfe-9ebd-32e6150dc6ed" />






