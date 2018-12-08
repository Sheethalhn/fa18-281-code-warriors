### Kong API Configuration

The docker container running on the EC2 Instances doesn't have admin port open to configure the kong apis. So we executed all the commands from the docker bash of kong.


## Kong Curl Commands

### Kong API Configuration

The docker container running on the EC2 Instances doesn't have admin port open to configure the kong apis. So we executed all the commands from the docker bash of kong.


## Kong Curl Commands

**kong-add-api**

    curl -X POST \
        http://localhost:8001/apis \
        -H 'Content-Type: application/json' \
        -d '{ \
        "name": "scapi", \
        "request_path": "/scapi", \
        "strip_request_path": "true", \
        "preserve_host": "true", \
        "upstream_url": "<Shopping-cart-ELB>:8080/" }'
    
     curl -X POST \
        http://localhost:8001/apis \
        -H 'Content-Type: application/json' \
        -d '{ \
        "name": "bookapi", \
        "request_path": "/bookapi", \
        "strip_request_path": "true", \
        "preserve_host": "true", \
        "upstream_url": "<Book-ELB>:8080/" }'
    
    curl -X POST \
        http://localhost:8001/apis \
        -H 'Content-Type: application/json' \
        -d '{ \
        "name": "transapi", \
        "request_path": "/transapi", \
        "strip_request_path": "true", \
        "preserve_host": "true", \
        "upstream_url": "<Transaction-ELB>:8080/" }'
    
    curl -X POST \
          http://localhost:8001/apis \
          -H 'Content-Type: application/json' \
          -d '{ \
          "name": "userapi", \
          "request_path": "/userapi", \
          "strip_request_path": "true", \
          "preserve_host": "true", \
          "upstream_url": "<User-ELB>:8080/" }'
          
    curl -X POST \
            http://localhost:8001/apis \
            -H 'Content-Type: application/json' \
            -d '{ \
            "name": "invapi", \
            "request_path": "/invapi", \
            "strip_request_path": "true", \
            "preserve_host": "true", \
            "upstream_url": "<Inventory-ELB>:8080/" }'      
            
            
  **kong-add-auth**
  
    curl -X POST \
        http://localhost:8001/apis/scapi/plugins \
        -H 'content-type: multipart/form-data;' \
        -F name=key-auth
        
     curl -X POST \
          http://localhost:8001/apis/bookapi/plugins \
          -H 'content-type: multipart/form-data;' \
          -F name=key-auth     

     curl -X POST \
          http://localhost:8001/apis/transapi/plugins \
          -H 'content-type: multipart/form-data;' \
          -F name=key-auth


     curl -X POST \
          http://localhost:8001/apis/userapi/plugins \
          -H 'content-type: multipart/form-data;' \
          -F name=key-auth     


     curl -X POST \
          http://localhost:8001/apis/invapi/plugins \
          -H 'content-type: multipart/form-data;' \
          -F name=key-auth    
        
**kong-add-client**

    curl -X POST \
        http://localhost:8001/consumers/ \
        -H 'content-type: multipart/form-data;' \
        -F username=apiclient

**kong-add-apikey**

    curl -X POST \
        http://localhost:8001/consumers/apiclient/key-auth \
        -H 'Content-Type: text/plain'
        
        
**Result of Add API-key**

    {
        "key":"7d833d215308491aa2a60d18a83d61f1",
        "consumer_id":"9ea0fec1-76fb-4d2b-968b-af021e844721",
        "created_at":1543806620000,
        "id":"04a77b5e-dc64-4106-91b3-3fc5ebc7bf66"
    }

