### X-Axis Scaling: Horizontal duplication

Each microservice of the Service Oriented Architecture (SOA) can be scaled independently from one another. We have set this up with initial setup of 2 EC2 instance running docker containers of our GO API backend.

### Y-Axis: Functional or Service Splits

The entire system will consist of a set of microservices that expose 
Solution: microservices
- Service 0: API Compositor (Kong)
  - Compose API interfaces of other microservices.
- Service 1: User Backend
  - User Login/SignUp
  - User Preferences
- Service 2: Inventory Backend
  - Book Store Information with books count.
- Service 3: Books Backend
  - Adding Books to application
  - Retrieving all the book Information
  - Retrieves Particular Book Information
- Service 4: Shopping Cart Backend
  - Adding Books to Cart
  - Viewing All the books added to Cart Information
  - Deleting Cart Information
- Service 5: Transaction Backend
  - User Transaction Details
  - Create Transaction History

### Z-Axis: Lookup Oriented Split

Multiple database clusters along with different sharding techniques applying application logics to distribute requests among the shards.

Not essential to all backends.

