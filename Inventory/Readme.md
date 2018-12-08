# Book Inventory API [Sheethal Halandur Nagaraja]

Check inventory count 

After User login to system and adds book to cart and clicks on Purchase ,we are checking if we have available number of books in the database.If yes user is successfully directed to payment or else message is displayed that books are not available  
 
 Input is list of books object with Id and count of each book and output is list of Book Ids which are not available in required quantity  
 
 Route:   /viewinventory  
 Method : POST  
 Content-Type: application/json  
 Request Body:  
 {  
     "books" :  
   [{  
       "bookId" : ObjectId,  
       "bookCount":Number  
   }]  
}  

 Response:  
     Success:  
         {  
         response_code: 200,  
         success: boolean,  
         data: {  
           books : {  
             [bookid : Number]  
             }  
           }  
         }  
