# Assignment Agent

### What works (description of your features) and what doesn't work (any known issues)
Our app opens up to a login page. No matter what page you try to navigate to, if you’re not logged in, it will always redirect the user to the login page. Here, you can login if you have an account, or sign up if you don’t. After logging in and finishing your session, you can also use the button at the top of the app to sign back out.

On our Class List page, you have the ability to add classes by entering their title and how many credit hours they are. After creating a class, it will be displayed in a card on the page. Then, you can create an assignment type for the class, which will display in the card, as well as show what percent of your final grade in the class it is. You can also delete classes (as long as there’s no associated assignments, which we’ll get into when discussing the Tracker page), and you can delete assignment types within classes.

On our Tracker page, a table of all the assignments the user has created are displayed, along with what class the assignment’s for, the name of the assignment, the type of assignment (e.g. homework), the due date, the grade you received (if completed), and its current status (not started, in progress, or completed). You can use the “Add Assignment” button to create a new assignment for the table. If you’ve made a mistake, you can select the checkbox to the left of each table entry and select either Edit or Delete Assignment. If your table is too cluttered to keep up with all of your assignments, you can filter the table by classes, so you’re only shown assignments for that specific class. There’s also a Grades button at the top right where you can see your calculated grades for all of your classes based on your inputted grades for your assignments. Your grade number only displays if your assignment type percentages for the class add up to 100. In order to clearly see when all of your assignments are due, you can click the Calendar icon next to Grades to be shown a calendar that displays all of your assignments on the day they’re due.

### A brief description of your authentication and authorization processes. What techniques are you using? What data is being stored where and how? How are you making sure users only access what they are allowed to?
We’re using Token-based Authentication using JSON Web Tokens. Once a user logs in, our middleware generates a token using an API Secret Key (which is stored in .env and never pushed to version control) in order to authenticate the user and authorize them to view the data relevant to their account. They are only able to see the data that they themselves have inputted, including classes, assignments, and grades. All of our user data is being stored in our SQL database, and it includes a user ID, their first name, last name, username, a hashed password, and a unique salt. When a new user is created, their password is hashed with a randomly generated salt. Users are only able to access their own information because all of the pages display information based on the currently signed in user. There’s no way for the web pages to display any other user’s data. Also, if you’re not logged in, all web pages automatically redirect you to the login page.

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
![ER Diagram](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupN/blob/main/Images/er-diagram.png)

## Group N: Milestone 2

| Pages                   | Status | Wireframe |
|-------------------------|--------|-----------|
| Login                   | 100%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20Login.jpg) |
| Assignment Tracker      | 100%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20All%20Classes.jpg) |
| Grades Popup            | 100%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20GPA.jpg)|
| Class List              | 100%    | [wireframe](../Proposal/Wireframes/Desktop%20-%20Add%20Classes.png) |
| Calendar (Stretch Goal) | 100%     | [wireframe](../Proposal/Wireframes/Desktop%20-%20Calendar.jpg)|

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
| DELETE    | /assignments/:assignmentId/delete     | Deletes assignment with the given id |
| DELETE    | /assignmentTypes/:assignmentTypeName/:classId/delete    | Deletes assignment type with the given assignment type name and class id |
| DELETE    | /classes/:id     | Deletes class with the given id |
| PUT    | /assignments   |Edits the assignment selected. Assignment id is passed in through req.body |

### Team Member Contributions

#### [Olivia Carson]
- Offline functionality
- Making PWA installable
- calculating final grade
- Calendar Page
- edit and deleting assignments (bug fixes)
- Collaborated on README


#### [Austin Heyward]
- Adding Assignment Types
- Deleting Assignment Types
- Some updates to content
- Delete Class
- Bug fixes on all of the above
- Collaborated on README

### [Mico Guevarra]
- edit and deleting assignments

#### Milestone Effort Contribution

Milestone   | Olivia Carson| Austin Heyward | Mico Guevarra
----------- | ------------- | ------------- | --------------
Milestone 1 | 50%            | 25%            | 25%
Milestone 2 | 33.3%            | 33.3%            | 33.3%
Final       | 50%            | 45%            | 5%
----------- | ------------- | ------------- | --------------
TOTAL:      | 133.3%      | 103.3%      | 63.3%
