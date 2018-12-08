## Week 1

### Project Research

1. Read articles on micro service architecture to understand more about requirement of the project
2. Research on MongoDB sharding techniques and partition tolerance properties
3. Learning Go language using Tour of go and other hands on tutorials
4. Exploring AWS lambda and amazon gateway and figuring out how different it is from using kong gateway 

Agile Core value -Simplicity

Trying to start with basics keeping simple design in mind as everyone is new to Go language,cloud techniques as well as microservice architecture style development.Decided to learn the foundation topics before diving into complex architecture

## Week 2  

1.Team decided to go ahead with Bookstore app development  
2.I choose to work on Inventory management API part using Mongo DB as the database  
3.Spent more time on learning structure of Go programming  
4.Tried some configuration changes on mongo cluster to tune availability levels  
5.Read articles on good sharding techniques and criteria to choose sharding key in mongo  

Agile Core value -Simplicity  

This is still second week and team is yet to actually start coding in GO.So kept our achictecture design simple with a basic flow between API's.Team decided to develop basic go code first and check connectivity between our API's and then go ahead with further exception handling scenarios and concurrency control.  

## Week 3

1.Discussed with team regarding the micro service architecture implementation  
2.Decided UI theme for project and discussed basic UI flow to make sure of requirements  
3.I took up payment screen to implement as part of UI development  
4.Need to spend more time on understanding microservice API implementation   
5.We decided to shard user transaction data based on user id   

Agile Core value -Simplicity  

While developing Go API we are trying to keep it as simple as possible since its our first attempt with GO and microservice architecture.Decided on simple UI design with minimalistic features required.Goal is to make app work end to end before diving into depth of concurrency in GO  

## Week 4  

1.Completed  Inventory Go API development with /viewinventory and /updateinventory routes to check if books are available in required quantity and if available update the count and create successfull transaction.  
2.Completed payment page development with API calls  
3.Did Unit testing with integrating with front end code  
4.Did  integration testing with team to make sure our micro services are working as expected  
5.Need to focus more on deployment and scaling part in the last week of project submission  

Agile Core value -Simplicity  

As decided we have built a simple yet complete SAAS app successfully which is working as expected on integration.Though there were few issues while integrating we could change it without much effort since team kept their API's simple to understand and extend.  
    
## Week 5  

1.This is the last week of project and we concentrated more on architecture ,scaling and deployment part of the app   
2.Deployed GO API on docker in two instances in private subnet   
3.Successfull VPC pairing with Book DB VPC to access books database.  
4.Load balancer ,Kong gatway configurations with api key configurations for Kong  
5.Successfully deployed and tested inventory microservice with rest of the API and books app is working like expected

Agile Core value -Simplicity

As we had decided at the beginning of this project  we sticked on with our goals to learn one step at a time ,keep it simple and strong principle and successfully built a micro service architecture which we had visualized.It has been a good learning experience which made us learn and implement concepts of cloud and nosql efficiently
