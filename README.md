To run this project 
open terminal

For backend:
cd server
first create a default admin account on mongodb compass on loacl machine by doing nodemon seed.js.
After this open new terminal and do nodemon index.js .
This will start the server at http://localhost:4000. 
The PORT can be changed but then the PORT number has to be changed everywhere. 
Also the mongodb compass is required to store the data on local machine. Online server is not used. 


For frontend:
cd client 
npm run dev 
The deployment server will start at http://localhost:5173

To load data :
Connect to local Mongodb compass server.

The default admin created using nodemon seed.js has

    username : admin
    password : adminpassword

Login using above and create users , books and other things as required for sample data.

The SALT used is 10 for hashing the password.
