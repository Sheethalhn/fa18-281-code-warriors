/*
	Shopping Cart API in Go (Version 3)
	Uses MongoDB
*/

package main

import (
	"fmt"
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
	mx.HandleFunc("/viewcart/{userid}", shoppingCartHandler(formatter)).Methods("GET")
	mx.HandleFunc("/addcart/{userid}", shoppingCartAddHandler(formatter)).Methods("POST")
	mx.HandleFunc("/addbooktocart/{userid}", shoppingCartAddBookHandler(formatter)).Methods("POST")
	mx.HandleFunc("/updatecart/{userid}", shoppingCartUpdateHandler(formatter)).Methods("POST")
	mx.HandleFunc("/clearcart/{userid}", shoppingCartRemoveHandler(formatter)).Methods("POST")
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
		rawjson, err := json.Marshal(result)
		var cart string = string(rawjson) 
		if err == nil {
			if cart != "null" {
				fmt.Println("Shopping Cart Details:", result )
				formatter.JSON(w, http.StatusOK, result)
			} else {
				fmt.Println("Shopping Cart Details:", result )
				formatter.JSON(w, http.StatusOK, "Cart Empty")
			}
		} else {
			log.Fatal(err)
		}
	}
}

// API Add Shopping Cart
func shoppingCartAddHandler(formatter *render.Render) http.HandlerFunc {
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

		var newCart Cart
		newCart.UserId = userid
		err = c.Insert(newCart)

		if err == nil {
			formatter.JSON(w, http.StatusOK, newCart)
		} 
	}
}

// API Update Shopping Cart
func shoppingCartUpdateHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var userid string = params["userid"]
		var newCart Cart
		decoder := json.NewDecoder(req.Body)
		err := decoder.Decode(&newCart)
		newCart.UserId = userid

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
		query := bson.M{"userid" : userid}
        change := bson.M{"$set": bson.M{ "books" : newCart.Books}}
        err = c.Update(query, change)
        if err != nil {
                log.Fatal(err)
		}
		formatter.JSON(w, http.StatusOK, "Successfully Updated")
	  }
	}

// API Remove Cart Handler
func shoppingCartRemoveHandler(formatter *render.Render) http.HandlerFunc {
  return func(w http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	var userid string = params["userid"]
	var clearBooks Books
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
		query := bson.M{"userid" : userid}
        change := bson.M{"$set": bson.M{ "books" : clearBooks}}
        err = c.Update(query, change)
        if err != nil {
                log.Fatal(err)
        }
	}
}


// API Add Book Shopping Cart
func shoppingCartAddBookHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var userid string = params["userid"]
		var newCart Cart
		decoder := json.NewDecoder(req.Body)
		err := decoder.Decode(&newCart)
		cartItems := newCart.Books
		fmt.Println("newCart", newCart )

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		var result bson.M
		err = c.Find( bson.M {"userid" : userid}).One(&result)
		// rawjson, err := json.Marshal(result)
		// var results string = string(rawjson) 
        if err == nil {
			fmt.Println("Shopping Cart Details:", result)
			c.Update(bson.M{"userid": userid}, bson.M{"$push": bson.M{"books": cartItems[0]}})			
		}
	  }
	}
