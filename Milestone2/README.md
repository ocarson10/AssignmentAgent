# Assignment Agent

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

- 

#### [Austin Heyward]

- User Authentication
- Refactored database to include user IDs and get data based on user ID
- Having the frontend show user specific information rather than all classes/assignments
- Updated Tracker.js to not load unless a user has been loaded in (fixed some problems with page population)
- README

#### [Mico Guevarra]

- 


#### Milestone Effort Contribution

| Olivia Carson | Austin Heyward| Mico Guevarra |
| ------------- | ------------- | ------------- |
|               |               |               |
