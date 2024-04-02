# Assignment Agent

## Group N: Milestone 1

| Pages              | Status | Wireframe |
|--------------------|--------|-----------|
| Login              | 70%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20Login.jpg) |
| Assignment Tracker | 70%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20All%20Classes.jpg) |
| GPA Popup          | 70%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20GPA.jpg)|
| Class List         | 70%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20Add%20Classes.png) |
| Calendar           | 0%     | [wireframe](../Proposal/Wireframes/Desktop%20-%20Calendar.jpg)|

| Method | Route                         | Description                                    |
|--------|-------------------------------|------------------------------------------------|
| POST   | /login                        | Send username and password to server           |
| POST   | /register                     | Create a new user and returns the object       |
| GET    | /users                        | Retrieves array of all users                   |
| GET    | /users/:userId                | Retrieves a user by ID                         |
| GET    | /assignments                  | Retrieves array of all assignments             |
| GET    | /assignments/:assignmentId    | Retrieves an assignment by ID                  |
| POST   | /assignments                  | Creates a new assignment                       |
| GET    | /classes                      | Retrieves array of all classes                 |
| GET    | /classes/:classCode           | Retrieves a class by class code                |
| POST   | /classes                      | Creates a new class                            |
| GET    | /assignments/class/:classCode | Retrieves all assignments for a specific class |

### Team Member Contributions

#### [Olivia Carson]

- Assignment Tracker Frontend with GPA popup and Add/Edit Assignment Funtionality
- Asssignment Tracker Routes and mock data
- Set up of basic React Application

#### [Austin Heyward]

- Attended office hours to sort out a VM issue
- Login Frontend
- Login API Routes
- README

#### [Mico Guevarra]

- Class List Wireframe
- Class List Frontend with Add Class popup


#### Milestone Effort Contribution

| Olivia Carson | Austin Heyward| Mico Guevarra |
| ------------- | ------------- | ------------- |
| 50%           | 25%           | 25%           |
