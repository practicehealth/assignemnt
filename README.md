# Healthcare app

a patient dashboard with their appointments login and signup and their records 

### Note
### Instructions:

- In .env of server folder:
PORT=1234
- if 
MONGOURI=`mongodb://${process.env.db_username}:${process.env.db_password}@ac-9d7nftr-shard-00-00.rczoqnd.mongodb.net:27017,ac-9d7nftr-shard-00-01.rczoqnd.mongodb.net:27017,ac-9d7nftr-shard-00-02.rczoqnd.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-7wup0e-shard-0&authSource=admin&retryWrites=true&w=majority`

### Credentials 
username : iamevans
password : horcrux
### add this to also in the .env of server
SESSION_SECRET="iykyk"

- In .env of client folder:
VITE_BACKEND_URL="http://localhost:1234"



