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

var mongodb_server = "localhost"
var mongodb_database = "Bookstore"
var mongodb_collection = "books"


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
	mx.HandleFunc("/viewinventory", viewInventoryHandler(formatter)).Methods("POST")
	mx.HandleFunc("/updateinventory", updateInventoryHandler(formatter)).Methods("POST")
}

func viewInventoryHandler(formatter *render.Render) http.HandlerFunc{
	return func(w http.ResponseWriter, req *http.Request) {	

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
		
		oids := make([]bson.ObjectId, len(count.BooksCount))
		for i :=0;i<len(count.BooksCount);i++ {
		  oids[i] = bson.ObjectIdHex(count.BooksCount[i].BookId)
		}
		var output []string

		for i :=0;i<len(count.BooksCount);i++ {
			var result struct{ count int `bson:"bookCount"` }
			err = c.Find(bson.M{"_id": oids[i]}).Select(bson.M{"_id":0,"bookCount": 1}).One(&result)
			
			fmt.Println(result.count)
			if result.count < count.BooksCount[i].BookCount {
					output = append(output,count.BooksCount[i].BookId)
			}
		 }

		fmt.Println("Book Details:", output)

	
	}
}

func updateInventoryHandler(formatter *render.Render) http.HandlerFunc{
	return func(w http.ResponseWriter, req *http.Request) {	

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
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}
