package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	//"log"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"github.com/rs/cors"
	//"gopkg.in/mgo.v2/bson"
    	
)

var mongodb_server = "mongodb://admin:admin12345@ds117834.mlab.com:17834/bookstore"
var mongodb_database = "bookstore"
var mongodb_collection = "users"
var mongodb_collection1 = "users1"


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
	mx.HandleFunc("/login", loginHandler(formatter)).Methods("POST")
	mx.HandleFunc("/signup", signupHandler(formatter)).Methods("POST")
	
}

func signupHandler(formatter *render.Render) http.HandlerFunc{
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
		h := session.DB(mongodb_database).C(mongodb_collection1)
		// 	var books []Books
		// 	err = c.Find(bson.M{}).All(&books)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}
		// fmt.Println("All Books are :", books)
		// formatter.JSON(w, http.StatusOK, books)
		decoder := json.NewDecoder(req.Body)

		var user Users
		err2 := decoder.Decode(&user)
		if err2 != nil {
		panic(err2)
		}

		UserName := user.UserName
		Password := user.Password
		FirstName := user.FirstName
		LastName := user.LastName
		fmt.Println(UserName)
		fmt.Println(Password)

		
		
		

		count, err4 := c.Find(&Users1{UserName: UserName}).Count()
		fmt.Println(err4)
		if count > 0 {
			formatter.JSON(w, http.StatusOK, "false")
		}
		if count == 0{
			
		err1 := c.Insert(&Users{UserName: UserName, Password: Password, FirstName: FirstName, LastName: LastName})

			if err1 != nil {
				panic(err1)
			}
		fmt.Println(err1)

		err3 := h.Insert(&Users1{UserName: UserName})

			if err3 != nil {
				panic(err3)
			}
		fmt.Println(err3)
		
		formatter.JSON(w, http.StatusOK, "true")
		}

	 }

}

func loginHandler(formatter *render.Render) http.HandlerFunc{
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
		//h := session.DB(mongodb_database).C(mongodb_collection1)
		// 	var books []Books
		// 	err = c.Find(bson.M{}).All(&books)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}
		// fmt.Println("All Books are :", books)
		// formatter.JSON(w, http.StatusOK, books)
		decoder := json.NewDecoder(req.Body)

		var user Users
		err2 := decoder.Decode(&user)
		if err2 != nil {
		panic(err2)
		}

		UserName := user.UserName
		Password := user.Password
		fmt.Println(UserName)
		fmt.Println(Password)

		
		result := Users{}
		err3 := c.Find(&Users{UserName: UserName, Password: Password}).One(&result)
		fmt.Println(err3)
		fmt.Println(result)
		if err3 != nil {
		formatter.JSON(w, http.StatusOK, "false")
		}
		if err3 == nil{
			formatter.JSON(w, http.StatusOK, "true")	
		}

		
		
		

		
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