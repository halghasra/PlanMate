# PlanMate
This is a project created for module (Project: Java and Web Application Development) for IU International University of Applied Science. 

## Problem Statement:
The modern world is fast-paced and demanding, and it's becoming increasingly difficult to keep track of personal, work, and family tasks. People are often juggling multiple calendars, making it hard to see everything in one place. This can lead to missed appointments, confusion, and stress.

Our project aims to solve this problem by creating a comprehensive and user-friendly personal scheduling app. This app will allow users to combine all of their tasks and appointments into one calendar, giving them a clear and organized view of their schedule. With the ability to create, view, delete, and move events, users can easily keep track of their busy lives.

In addition, users will be able to categorize their tasks, set reminders and notifications, and view their calendar in various ways, such as by day, week, month, or year. The app will handle overlapping time slots and conflicting appointments in an intuitive and user-friendly manner, ensuring a seamless and stress-free scheduling experience.

## Features

- Combine tasks, appointments, and events in a single, organized calendar.
- Categorize events to easily distinguish between different types of activities.
- Set reminders and notifications to ensure you never miss an important event.
- View your calendar by day, week, month, or year to match your preferred planning style.
- Handle overlapping time slots and conflicting appointments seamlessly.

## Target User Groups:
The target user group for this personal scheduling app will be individuals and small businesses who require a simple and efficient way to manage their schedules. This includes busy professionals, students, and entrepreneurs who need to keep track of appointments, tasks, and events.

## Benefits of Using the Application:
By using this personal scheduling app, individuals and small businesses will be able to streamline their schedule management and increase their productivity. The app will provide an easy-to-use interface for adding and organizing events, appointments, and tasks, and will also allow users to set reminders and notifications to ensure they never miss a scheduled event. Additionally, the app will be accessible from anywhere, so users can manage their schedules on-the-go.

## Technology Stack:
### Front-end:
- ReactJS: Used for building the user interface of the application.
- Material-UI: Used for the design and styling of the overall components.
- Bootstrap 5: Used for the design of the Calendar component (it doesn't support MUI).

### Back-end:
- Firebase Authentication: Used for secure user authentication and authorisation.
- Firebase Firestore: NoSQL database used for storing calendar events and user data.

### Hosting:
- Firebase Hosting: Used to host the front-end of the web application, providing a reliable and scalable hosting solution.


## High-level Architecture Diagram:
![image](https://user-images.githubusercontent.com/26522841/236644072-138b8814-c6b5-43dc-886f-1e45ee70de44.png)

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository using `git clone https://github.com/halghasra/PlanMate.git`.
2. Navigate to the project directory using  `cd PlanMate`.
3. Install project dependencies using `npm install`.
4. Configure Firebase by adding your Firebase project credentials in `src/firebase.js`.
5. Start the development server using `npm start`.
6. Your application should now be running at `http://localhost:3000`.

Feel free to visit my [live demo](https://planmate-3edb8.web.app) and start managing your schedule efficiently with PlanMate!

## Test Cases

### User Registration

**Test Case:** Verify that a user can successfully register an account.

**Steps:**
1. Open the registration page.
2. Fill in valid user registration details.
3. Click the "Register" button.
4. Check if the user is redirected to the home page.
5. Verify that the user's profile is created in the database.

### User Login

**Test Case:** Verify that a registered user can log in.

**Steps:**
1. Open the login page.
2. Enter valid login credentials.
3. Click the "Login" button.
4. Check if the user is redirected to the home page.

### Add Event

**Test Case:** Verify that a user can add a new event to the calendar.

**Steps:**
1. Log in as a registered user.
2. Navigate to the calendar page.
3. Click on a date to open the "Add Event" popup.
4. Fill in event details (title, date, time, etc.).
5. Click the "Create" button.
6. Verify that the event is displayed on the calendar.

### Edit Event

**Test Case:** Verify that a user can edit an existing event.

**Steps:**
1. Log in as a registered user.
2. Navigate to the calendar page.
3. Click on an existing event to open the "Edit Event" popup.
4. Modify event details (e.g., title, date, time).
5. Click the "Save" button.
6. Verify that the event's details are updated on the calendar.

### Delete Event

**Test Case:** Verify that a user can delete an existing event.

**Steps:**
1. Log in as a registered user.
2. Navigate to the calendar page.
3. Click on an existing event to open the "Edit Event" popup.
4. Click the "Delete" button.
5. Verify that the event is removed from the calendar.

### Move Event

**Test Case:** Verify that a user can move an existing event between time blocks

**Steps:**
1. Log in as a registered user.
2. Navigate to the calendar page.
3. Click and hold an existing event.
4. Drag the event into a different day block.
5. Verify that the event is moved to the new block.


### Extend/Reduce Event

**Test Case:** Verify that a user can extend or reduce an existing event.

**Steps:**
1. Log in as a registered user.
2. Navigate to the calendar page.
3. Move the mouse to any far end of an existing event
4. The mouse pointer will change into a sideway arrow
5. Click and move your mouse to expand or reduce the event.
6. Verify that the event is expanded or reduced based on the user choice.

## Test Data

For each of the above test cases, you can use the following test data:

### User Registration

Test Data: Name: John Wick, Email: johnwick@example.com, Password: Test123!

### User Login

Test Data: Email: johnwick@example.com, Password: Test123!

### Add Event

Test Data: Event Title: Meeting with Client, Date: July 10, 2023, Time: 3:00 PM - 4:00 PM

### Edit Event

Test Data: Event Title: Updated Meeting, Date: July 15, 2023, Time: 2:30 PM - 3:30 PM

### Delete Event

Test Data: Event Title: Event to Delete, Date: July 20, 2023, Time: 10:00 AM - 11:00 AM

## Test Cases

<!-- Existing User Note -->
**Note:** For testing purposes, you can use the existing account with the following credentials, which is prefilled with test data:
- Email: user5@sample.com
- Password: password123
