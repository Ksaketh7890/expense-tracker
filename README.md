# expense-tracker
Expense Tracker

Welcome to the Expense Tracker Application! 
This project is designed to help you manage your finances effectively by allowing you to track your incomes and expenses, view your transaction history, analyze your monthly expenses.

The tech stack used for this project is :
1) react (for frontend)
2) css (for styling the frontend)
3) node js (for backend)
4) express (for creating server and handling routes)
5) mongodb (for database)

We have built a login page, for user authentication. This will navigate to the user's portal.

The dashboard shows the total income of the user, total expenses of the user, their latest transactions and a pie chart showing income vs expenses

The logged in user data credentials will be stored in a users table and passwords are hashed to make it secure.
The home page is being built and also the home page route is protected using jwt and using local storage to store it.


To execute the project :

1)clone the repo to your local machine using the link in github.
2)open two terminals preferrably in vscode.
3)use command "cd backend" in one terminal and "cd frontend" in other terminal.
4)similarly use command "npm i" for frontend terminal and "npm i" for backend terminal(installs packages from package.json).
5)Install mongodb follow the steps from the below links 
                  for Windows : https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
                  for Mac :   https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
6)After installing open a seperate terminal(not in vscode) and run the command "mongod" to start the database server.
7)Your database will automatically run on port 27017 if not then configure expense-tracker\backend\db\db.js file and change the configuration.
8)After successfully running the database server run the command "npm start" on both the backend and frontend terminals in your vscode.
9)You will be redirected to localhost:3000 which contains a login page, sign up first and then login with your credentials to start using your application.