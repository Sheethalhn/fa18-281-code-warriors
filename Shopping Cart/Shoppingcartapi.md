# Shopping Cart API


*  Fetch Booklist from Shopping Cart

        Once User logged in, User can view the books which have been previously added to the Shopping Cart
        
        Route:   /get_shoppingcart?userid=<userid>
        Method : GET
        Content-Type: application/json
        Request Params:
        {
            userid: Number,
            password: String
        }

        Response:
            Success:
                {
                response_code: 200,
                success: boolean,
                message: “Booklist received successfully”,
                data: {
                  books : {
                    bookid : Number,
                    bookname : String,
                    bookdescription : String,
                    price : Double
                    }
                  }
                }

        
*  Add Books to Shopping Cart

        User can select and add books to the Shopping Cart
        
        Route:   /addbook_cart
        Method : POST
        Content-Type: application/json
        Request Params:
        {
            userid: Number,
            bookid : Number,
            bookname : String,
            bookdescription : String,
            price : Double
        }

        Response:
        Success:
        {
            response_code: 200,
            success: boolean,
            message: “Book added successfully to Shopping Cart”,
        }

*  Remove Books from Shopping Cart

        User can remove books from Shopping Cart
        
        Route:   /removebook_fromcart?bookid=<bookid>
        Method : DELETE
        Content-Type: application/json
        Request Params:
        {
            userid: Number,
            bookid: Number
        }

        Response:
        Success:
        {
            response_code: 200,
            success: boolean,
            message: “Book removed successfully from Shopping Cart”
        }
