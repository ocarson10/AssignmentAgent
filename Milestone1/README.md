# Assignment Agent

## Group N: Milestone 1

| Pages              | Status | Wireframe |
|--------------------|--------|-----------|
| Login              | 70%    | wireframe |
| Assignment Tracker | 70%    | wireframe |
| GPA Popup          | 70%    | wireframe |
| Class List         | 70%    | wireframe |
| Calendar           | 0%     | wireframe |

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
