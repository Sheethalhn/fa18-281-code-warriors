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
	"github.com/rs/cors"
)

var mongodb_server = "localhost"
var mongodb_database = "Bookstore"
var mongodb_collection = "books"

//var mongodb_server string

//var mongodb_database string

//var mongodb_collection string

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	
	//mongodb_server = os.Getenv("MONGO_SERVER")
	//mongodb_database = os.Getenv("MONGO_DB")
	//mongodb_collection = os.Getenv("MONGO_COLLECTION")
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
	mx.HandleFunc("/books", getAllBooksHandler(formatter)).Methods("GET")
	mx.HandleFunc("/book/", getBookByIdsHandler(formatter)).Methods("GET")
}

func getAllBooksHandler(formatter *render.Render) http.HandlerFunc{
	return func(w http.ResponseWriter, req *http.Request) {	
		setDefaultHeaders(w)	
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
			return
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)
			var books []Books
			err = c.Find(bson.M{}).All(&books)
			if err != nil {
				log.Fatal(err)
			}
		fmt.Println("All Books are :", books)
		formatter.JSON(w, http.StatusOK, books)
	}
}

func getBookByIdsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setDefaultHeaders(w)	
		var bookIds []string = strings.Split(req.URL.Query().Get("bookIds"),",")
		fmt.Println("bookIds", bookIds )

		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        var result []Books
		oids := make([]bson.ObjectId, len(bookIds))
		for i := range bookIds {
		  oids[i] = bson.ObjectIdHex(bookIds[i])
		}
		query := bson.M{"_id": bson.M{"$in": oids}}
		fmt.Println("query",query)
		err = c.Find(query).All(&result)
		rawjson, err := json.Marshal(result)
		var bookResults string = string(rawjson) 
		if err == nil {
			if bookResults != "null" {
				fmt.Println("Book Details:", result )
				formatter.JSON(w, http.StatusOK, result)
			} else {
				fmt.Println("Book Details:", result )
				formatter.JSON(w, http.StatusOK, "Book Details Not available")
			}
		} else {
			log.Fatal(err)
		}
	}
}

// Helper Functions
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

func setDefaultHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0")
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Vary", "Accept-Encoding")
}