/*
	Gumball API in Go (Version 3)
	Uses MongoDB and RabbitMQ
	(For use with Kong API Key)
*/

package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/streadway/amqp"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

// MongoDB Config
var mongodb_server = "localhost"
var mongodb_database = "Booksmart"
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
	mx.HandleFunc("/removebook_cart/{cartid}", shoppingCartRemoveBookHandler(formatter)).Methods("DELETE")
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
		var userid string = params["userid"]
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        var result bson.M
        err = c.Find( bson.M{"$and": [bson.M {bson.M {"UserId" : userid}, bson.M{"OrderStatus": "Order Placed"} } ] } ).All(&result)
        if err != nil {
                log.Fatal(err)
        }
        fmt.Println("Shopping Cart Details:", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}

// API Add Book to Shopping Cart
func shoppingCartAddBookHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		var userid string = params["userid"]
		var newCart Cart
		uuid, _ := uuid.NewV4()
		decoder := json.NewDecoder(req.Body)
		err := decoder.Decode(&newCart)

		newCart.CartId = uuid.String()
		newCart.UserId = userid
		newCart.OrderStatus = "Order Placed"

		cartItems := newCart.Items

		var totalAmount float64

		for i := 0; i < len(cartItems); i++ {
			cartItems[i].Amount = calculateAmount(cartItems[i].BookCount, cartItems[i].BookPrice)
			totalAmount += cartItems[i].Amount
		}

		totalAmount = math.Ceil(totalAmount*100) / 100
		newCart.Total = totalAmount

		reqbody, _ := json.Marshal(newCart)

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
		if orders == nil {
			orders = make(map[string]Cart)
		}
		orders[uuid1.String()] = reqbody
		err = c.Insert(reqbody)
		if err != nil {
			formatter.JSON(w, http.StatusOK, reqbody)
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
func removeCartHandler(formatter *render.Render) http.HandlerFunc {
  return func(w http.ResponseWriter, req *http.Request) {
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
