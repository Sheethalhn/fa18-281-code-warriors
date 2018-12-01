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
        "github.com/rs/cors"
)

var mongodb_server = "localhost"
var mongodb_database = "Bookstore"
var mongodb_collection = "books"


// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	     formatter := render.New(render.Options{
		          IndentJSON: true,
	})
	corsObj := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
        AllowedHeaders: []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
        })

	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
        n.Use(corsObj)
	n.UseHandler(mx)
	return n
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/viewinventory", viewInventoryHandler(formatter)).Methods("POST")
	mx.HandleFunc("/updateinventory", updateInventoryHandler(formatter)).Methods("POST")
}

func viewInventoryHandler(formatter *render.Render) http.HandlerFunc{
	return func(w http.ResponseWriter, req *http.Request) {	
                setDefaultHeaders(w)

		decoder := json.NewDecoder(req.Body)
		var count BooksCount
		err := decoder.Decode(&count)
		if err != nil {
				panic(err)
		}
		defer req.Body.Close()

		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close() 
        session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		var output []bson.ObjectId

		for i :=0;i<len(count.BooksCount);i++ {
			type test struct  { Count int `json:"bookCount" bson:"bookCount"` }
			var final test
			err = c.Find(bson.M{"_id" : count.BooksCount[i].BookId}).Select(bson.M{"_id":0,"bookCount": 1}).One(&final)
			if err != nil {
                panic(err)
        }
			if final.Count < count.BooksCount[i].BookCount {
					output = append(output,count.BooksCount[i].BookId)
			}   
		 }

 		fmt.Println("Book Details:", output)
		formatter.JSON(w, http.StatusOK, output) 
	}
}

func updateInventoryHandler(formatter *render.Render) http.HandlerFunc{
	return func(w http.ResponseWriter, req *http.Request) {	
                setDefaultHeaders(w)
		decoder := json.NewDecoder(req.Body)
		var count BooksCount
		err := decoder.Decode(&count)
		if err != nil {
				panic(err)
		}
		defer req.Body.Close()

		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close() 
        session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)


		for i :=0;i<len(count.BooksCount);i++ {
			type test struct  { Count int `json:"bookCount" bson:"bookCount"` }
			var final test
			err = c.Find(bson.M{"_id" : count.BooksCount[i].BookId}).Select(bson.M{"_id":0,"bookCount": 1}).One(&final)	
			
			query := bson.M{"_id" : count.BooksCount[i].BookId}
			change := bson.M{"$set": bson.M{ "bookCount" : final.Count-count.BooksCount[i].BookCount}}
			err = c.Update(query, change)
			if err != nil {
                panic(err)
        	}  
		 }


	}
}
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
                setDefaultHeaders(w)
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}


func setDefaultHeaders(w http.ResponseWriter) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.Header().Set("Vary", "Accept-Encoding")
	}
