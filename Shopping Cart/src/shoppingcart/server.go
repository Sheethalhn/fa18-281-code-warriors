/*
	Shopping Cart API in Go (Version 3)
	Uses MongoDB
*/

package main

import (
	"fmt"
	"math"
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

// MongoDB Config
var mongodb_server = "localhost"
var mongodb_database = "Bookstore"
var mongodb_collection = "shoppingcart"

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.UseHandler(mx)
	return n
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/get_shoppingcart/{userid}", shoppingCartHandler(formatter)).Methods("GET")
	mx.HandleFunc("/addbook_cart/{userid}", shoppingCartAddBookHandler(formatter)).Methods("POST")
	mx.HandleFunc("/removebook_cart", shoppingCartRemoveBookHandler(formatter)).Methods("DELETE")
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// API Fetch Shopping Cart Handler
func shoppingCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var userid string = params["userid"]
		fmt.Println("userid", userid )

		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        var result bson.M
        err = c.Find( bson.M {"userid" : userid}).One(&result)
        if err != nil {
                log.Fatal(err)
        }
        fmt.Println("Shopping Cart Details:", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}


// curl localhost:5000/addbook_cart/1 
// API Add Book to Shopping Cart
func shoppingCartAddBookHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var userid string = params["userid"]
		var newCart Cart
		decoder := json.NewDecoder(req.Body)
		err := decoder.Decode(&newCart)
		newCart.UserId = userid
		cartItems := newCart.Books
		fmt.Println("newCart", newCart )
		var totalAmount float64

		for i := 0; i < len(cartItems); i++ {
			cartItems[i].Amount = calculateAmount(cartItems[i].BookCount, cartItems[i].BookPrice)
			totalAmount += cartItems[i].Amount
		}

		totalAmount = math.Ceil(totalAmount*100) / 100
		newCart.TotalAmount = totalAmount
		reqbody, _ := json.Marshal(newCart)

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		var result bson.M
		err = c.Find( bson.M {"userid" : userid}).One(&result)
		rawjson, err := json.Marshal(result)
		var books string = string(rawjson) 
        if books != "null" {
			fmt.Println("Shopping Cart Details:", books)
			if err == nil {
				var totalAmount1 float64
				for key, value := range result {
					if key == "totalamount" {
					// fmt.Fprintf(w, "Type = %v", value) // <--- Type = float64
					var value1 float64 = float64(value.(float64))
					totalAmount1 = newCart.TotalAmount + value1
					fmt.Println(totalAmount1) // <--- Type = float64
					}
				}
				c.Update(bson.M{"userid": userid}, bson.M{"$push": bson.M{"books": cartItems[0]}, "$set": bson.M{ "totalamount" : totalAmount1}})	
			}		
		} else {
			err = c.Insert(newCart)
			if err != nil {
				formatter.JSON(w, http.StatusOK, reqbody)
			} 
		}
	  }
	}

// Calculate amount
func calculateAmount(count int, rate float64) float64 {
	total := float64(count) * rate
	total = math.Ceil(total*100) / 100
	return total
}


// API Remove Cart Handler
func shoppingCartRemoveBookHandler(formatter *render.Render) http.HandlerFunc {
  return func(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
    var uuid string = params["cartid"]
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
		err = c.Remove(bson.M{"CartId": uuid})
		if err != nil {
			formatter.JSON(w, http.StatusOK, err)
	  }
	}
}
