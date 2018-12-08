# Book Managing API [Shreya Shah]

*  Fetch All Books From the Database

        Once User logged in, User can view the books which are present in the database.
        
        Route:   /books
        Method : GET
        Content-Type: application/json

        Response:
            Success:
                {
                response_code: 200,
                success: boolean,
                message: “Booklist received successfully”,
                data: {
                    [
                      {
                          "bookId": "5c043358ecbfd9b1f56295ef",
                          "bookName": "The Alchemist",
                          "bookDesc": "A fable about following your dreams. The Alchemist (Portuguese: O Alquimista) is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.[1][2] An allegorical novel, The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
                          "author": "Paulo Coelho",
                          "price": 6.5,
                          "bookCount": 5,
                          "bookImg": "img1.jpg"
                      },
                      {
                          "bookId": "5c04371f762035d73147e45b",
                          "bookName": "The Da Vinci Code",
                          "bookDesc": "The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It follows symbologist Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ having been a companion to Mary Magdalene.",
                          "author": "Dan Brown",
                          "price": 11.29,
                          "bookCount": 5,
                          "bookImg": "img2.jpg"
                      }
                  ]
               }
               

*  Get Books By Multiple Book IDs

        User can retrive multiple Book details by IDs
        
        Route:   //book/<bookIds>
        Method : GET
        Content-Type: application/json
        Request Params:
        {
            bookIds: String,
        }

        Response:
        Success:
        {
            response_code: 200,
            success: boolean,
            message: “Book retrieved successfully”
            data:
            	{
                          "bookId": "5c043358ecbfd9b1f56295ef",
                          "bookName": "The Alchemist",
                          "bookDesc": "A fable about following your dreams. The Alchemist (Portuguese: O Alquimista) is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller.[1][2] An allegorical novel, The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
                          "author": "Paulo Coelho",
                          "price": 6.5,
                          "bookCount": 5,
                          "bookImg": "img1.jpg"
                 }
        }

