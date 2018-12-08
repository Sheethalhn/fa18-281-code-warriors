# Transaction Managing API [Divyank Shukla]

## Week 1

### Project Research
1. Made sure to understand all the requirements and scope for our idea 
2. Narrowed down database as mongodb to leverage it's CP property.
3. Finalized ReactJS and researched about it for front-end development.

Agile Core value - Feedback <br>
Tried to ensure that we are constantly communicating reviews of each other's work to make project better each week.

## Week 2

### Set up the mongodb cluster
1. Diving deep into the mongo cluster management
2. Initial cluster to run in same AZ  
3. Trying to connect mongo from go

Agile Core value - Feedback <br>
We made sure that cluster management techniques are proper for everyone discussing the strategies in meeting. Feedback helped us improve each other's work

## Week 3

### Set up Go and successfully communicate to mongodb
1. Set up all the APIs for transaction management in GO
2. Made all structs type required for model to insert data objects in mongodb
3. Resolved cors issue so that api can be accessed without any issue from other microservices.
4. Developed frontend in reactjs for transaction part
4. Now working on connecting to mongocluster instead of individual mongo node.

Agile Core value - Feedback <br>
We realised the continuous value of feedback this week while integrating apis. we realised that without effective feedback of work which we did individually, we could not successfully overcome the sync issues.

## Week 4

### Integrate MongoDB cluster to front-end deployed on Heroku
1. Deployed the integrated frontend on Heroku
2. Added kong on backend as an extra layer of security
3. Started working on integration with team
4. Deployed load balancer to manage 2 goapi backend servers

Agile Core value - Feedback <br>
Ensured continuous feedback flowing in team while integration so as to keep improving

## Week 5

### Implemented MongoDB sharding to scale on Z-axis 
1. Started spinning up 2 mongodb shard server replicasets of 3 nodes each and 1 config replicaset.
2. Added mongos router query server to act as a central point of contact for all mongodb queries
3. Started working on integration with team
4. Integrated 3 mongo clusters, kong, jumpbox and load balancer for go apis server
5. Did a integration testing on all microservices to ensure smooth flow

Agile Core value - Feedback <br>
Feedback each other's work , positive and constructive reviews helped us resolve all our integration issues