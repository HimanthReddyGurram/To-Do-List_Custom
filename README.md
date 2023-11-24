# customToDoList
A website where different users can add their to-do items and can delete them after they have done that.
We can create new users and each to-do list will be custom to the users.
(This website has a backend so the data doesnot get lost when refreshing websites or servers.)

## Technologies
* Bootstrap
  - CSS
* Javascript
  - ejs
* Node.js
  - Express.js
* MongoDB
  - Mongoose

## How to use
To clone and run this application, you'll need Git, Node.js (which comes with npm) and MongoDB installed on your computer. 
Start your mongoDB process on some terminal preferably Hyper.

If you do not have mongodb, you can get it from [https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

To start working on your project right away, follow these commands.

From your command line:
```bash
# Clone this repository
git clone https://github.com/HimanthReddyGurram/To-Do-List_Custom.git

# Go into the repository
$ cd To-Do-List_Custom.git

# Install dependencies
npm install

#Run the app
nodemon app.js
```
The output will be "Server started on port 3000"

## User Interface
* You can now add custom items for you to do and can check-them off when done.
* You can create new user by clicking on add item.
* There is a dropdown menu where we can check every user added and just by clicking on them we can switch to that user.
