# Assignment Agent

### What works (description of your features) and what doesn't work (any known issues)

### A brief description of your authentication and authorization processes. What techniques are you using? What data is being stored where and how? How are you making sure users only access what they are allowed to?
### A list of all the pages in your app, how to navigate them, and the offline functionality they provide, if any
| Pages                   | Navigation | Offline Functionality |
|-------------------------|------------|-----------------------|
| Login                   |  /    | If the user tries to login or create a user while offline, they will be redirected to the offline page until they reconnect to the internet |
| Assignment Tracker      | /tracker   | If the user has gone offline after loggin in, they will be able to view the table of assignments, along with their grades for each class. If they try to add, edit, or delete any assignments, they will be redirected to the offline page until they reconnect to the internet. |
| Class List              | /classlist   | If the user has gone offline after loggin in, they will be able to view each class they have added, along with the assignment types for each class. If they try to add, edit, or delete any classes or assignment types, they will be redirected to the offline page until they reconnect to the internet. |
| Calendar                | /calendar    | If the user has gone offline after loggin in, they can view the assignments in a calendar. Each assignment is labled by class and assignment name and has the time the assignment is due. The dot next to each assigment represents the progress on that assignment (Not Started = red, In Progress = yellow, Completed = green|

### A description of your caching strategy and why you chose it
  When it comes to caching for offline functionality, we used the CacheStorage interface within our service worker to cache all of our pages and images within our application. Since we have a React application, we were able to cache the page routes (/ , /tracker, / classlist, /calendar, /offline) and when the user is online, the data from those pages will populate once the user logs in. If a user has gone offline and tries to navigate to a page, the proper data will be available to view for the current user. The user will not be able to preform any actions such as adding, edititing, or deleting assignments, classes and assignment types until the user is back online. If they try to preform these actions offline, the user will be sent to an offline page. This strategy allows the user to still view all of their assignments, classes, and grades but waits until a user in back online to preform any actions on them.
### An ER diagram of your final database schema
## Group N: Milestone 2

| Pages                   | Status | Wireframe |
|-------------------------|--------|-----------|
| Login                   | 95%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20Login.jpg) |
| Assignment Tracker      | 80%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20All%20Classes.jpg) |
| GPA Popup               | 70%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20GPA.jpg)|
| Class List              | 80%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20Add%20Classes.png) |
| Calendar (Stretch Goal) | 0%     | [wireframe](../Proposal/Wireframes/Desktop%20-%20Calendar.jpg)|

| Method | Route                             | Description                                    |
|--------|-----------------------------------|------------------------------------------------|
| POST   | /users/login                      | Login the user                                 |
| POST   | /users/logout                     | Logout the user                                |
| POST   | /users                            | Create a new user and returns the object       |
| GET    | /users                            | Retrieves array of all users                   |
| GET    | /users/:userId                    | Retrieves a user by ID                         |
| GET    | /users/current                    | Retrieves the currently logged in user         |
| GET    | /assignments                      | Retrieves array of all assignments             |
| GET    | /assignments/:assignmentId        | Retrieves an assignment by ID                  |
| GET    | /assignments/class/:classId       | Retrieves assignments from a specific class    |
| POST   | /assignments                      | Creates a new assignment                       |
| POST   | /assignment-types                 | Gets all assignment types                      |
| GET    | /classes                          | Retrieves array of all classes                 |
| GET    | /classes/:id                      | Retrieves a class by it's ID                   |
| GET    | /classes/:classId/assignment-types| Retrieves assignment types by class ID         |
| POST   | /classes                          | Creates a new class                            |
| GET    | /assignments/class/:classCode     | Retrieves all assignments for a specific class |

### Team Member Contributions

#### [Olivia Carson]

- Database connection
- Added Routes and DAOs for User, Assignment, Class, and Assignment Type
- Updated Frontend API to show database information
- Implemented User Sign Up form

#### [Austin Heyward]

- User Authentication
- Refactored database to include user IDs and get data based on user ID
- Having the frontend show user specific information rather than all classes/assignments
- Updated Tracker.js to not load unless a user has been loaded in (fixed some problems with page population)
- README

#### [Mico Guevarra]

- Wrote new API routes for adding a class and adding assignment
- Worked on forms for adding a class and adding an assignment

#### Milestone Effort Contribution

| Olivia Carson | Austin Heyward| Mico Guevarra |
| ------------- | ------------- | ------------- |
| 33%           | 33%           | 33%           |
