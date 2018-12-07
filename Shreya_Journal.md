# Book Managing API [Shreya Shah]

## Week 1

### Project Research
1. Understanding the requirements, architecture of the project through the article  https://www.infoq.com/articles/jepsen. 
2. Research on the nosql db(allowing AP) to be used.( Using MongoDB for the project) 
3. Understanding partition tolerance with MongoDB and its configuration. 
4. Exploring Aws Lambda and figuring out how different it is from using kong gateway

**Agile Core value - Courage**

Courage is all about taking challenge and working on tough problems. Our Team decided to develop end-to-end microservice architecture which was very new for all and also developing GO APIs understanding mongodb cluster and communicating with the same.

## Week 2

### MongoDB cluster setup with replicaset configuration
1. Research on the nosql db(allowing AP) to be used.
2. Initial setup to run goapi.
3. Method for connecting mongoDB using mgo. 
4. As Team decided to go ahead with Bookstore app development, I am working on Book Management APIs
5. Set a common VPC for all the Ec2 instances.
6. Studied some articles to tune mongodb configuration sometimes CP and sometimes AP. 

**Agile Core value - Courage**

As this the second week, team is configuring their mongodb 5 cluster and developing apis to communicate with other features of the application. What we all have done previously is always used single database with all the collection in it. First time team is developing different database with different collection and will communicate only through apis. That too with mongodb replication set with 5 cluster instances.

## Week 3

### Understanding the Mgo package of Go and how it picks the primary.
1. Research on the mgo package and configuration with GO.
2. Dial and DialInfo methods for Mongo Cluster replica set.
3. Setup Mongo Cluster and created sample Go API to check this mgo setting.
4. Created Actual GO api which is Book APIs and configured this mgo package
5. As we are implementing Microservice strategy, the Go backend and database will be different for each team member.

**Agile Core value - Courage**

Team decided to deploy the Go API into docker containers. SO another big challenge team is taking because the servers are in private network and running on docker containers with load balancers on the top of it.

## Week 4

### Created Frontend For Book API
1. As per microservices architecture, developed the frontend for displaying books.
2. Created a page for displaying book details based on the selected books.
3. Provided Routing paths for Viewcart and adding books to the cart.
3. Integrated all the GO apis to get the dynamic content on the webpage.
4. Calling my own books Mongo cluster for fetching the records.

## Week 5

### VPC Peering Research for connecting VPC in different account.
1. As Inventory and Books Collection is common, Inventory GO APIs are in different VPC and Books database is in different VPC which is my VPC.
2. Figured out way to connect VPC of different account and communicate between them.
3. Followed the steps provided by aws for VPC peering and and tested in GO APIs whether database is getting connected.
4. Successfully able to communicate between VPC.

**Agile Core value - Courage**

After developing and setting up this entire stack, Team realized that one of the apis uses common database. Now the challenge was that database is in different VPC and also in private network and in different account of Amazon. I took the challenge and successfully able to peer the VPCs and took the courage to maintain the stack intact.
