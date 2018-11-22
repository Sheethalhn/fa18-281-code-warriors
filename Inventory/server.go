package main

import (
	"fmt"
	"strings"
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
	mx.HandleFunc("/inventory/{bookids}", getInventoryHandler(formatter)).Methods("GET")
	mx.HandleFunc("/inventory/{bookids}", updateInventoryHandler(formatter)).Methods("POST")
}

func getInventoryHandler(formatter *render.Render) http.HandlerFunc{
	return func(w http.ResponseWriter, req *http.Request) {	
	var bookIds []string = strings.Fields(req.URL.Query().Get("bookIds"))
	fmt.Println("bookIds", bookIds )

	session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        var result bool
		oids := make([]bson.ObjectId, len(bookIds))
		for i := range bookIds {
		  oids[i] = bson.ObjectIdHex(bookIds[i])
		}
		query := bson.M{"_id": bson.M{"$in": bookIds}}
		err = c.Find(query).All(&result)
		rawjson, err := json.Marshal(result)
		var bookResults string = string(rawjson) 
		if err == nil {
				formatter.JSON(w, http.StatusOK, result)
		} else {
			log.Fatal(err)
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
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}
