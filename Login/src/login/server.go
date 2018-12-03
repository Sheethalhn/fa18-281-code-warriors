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
	"gopkg.in/mgo.v2/bson"
    	
)

var mongodb_server = "mongodb://admin:cmpe281@10.0.1.94:27017,10.0.1.149:27017,10.0.1.141:27017,10.0.6.165:27017,10.0.6.82:27017"
var mongodb_database = "bookstore"
var mongodb_collection = "users"

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
	mx.HandleFunc("/login", loginHandler(formatter)).Methods("POST")
	mx.HandleFunc("/signup", signupHandler(formatter)).Methods("POST")
	mx.HandleFunc("/getUserById", getUserHandler(formatter)).Methods("POST")
	
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
		
		decoder := json.NewDecoder(req.Body)
		var user Users
		err1 := decoder.Decode(&user)
		if err1 != nil {
		panic(err1)
		}
		UserName := user.UserName
		Password := user.Password
		FirstName := user.FirstName
		LastName := user.LastName
		fmt.Println(UserName)
		fmt.Println(Password)

		result := Users{}
		err3 := c.Find(bson.M{"username": UserName}).One(&result)
		fmt.Println(err3)
		if (result.UserName != "")  {
			formatter.JSON(w, http.StatusOK, "false")
		}
		if (result.UserName == ""){
			
		err4 := c.Insert(&Users{UserName: UserName, Password: Password, FirstName: FirstName, LastName: LastName})

			if err4 != nil {
				panic(err4)
			}
		fmt.Println(err4)
		
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
		
		decoder := json.NewDecoder(req.Body)

		var user Users
		err1 := decoder.Decode(&user)
		if err1 != nil {
		panic(err1)
		}

		UserName := user.UserName
		Password := user.Password
		fmt.Println(UserName)
		fmt.Println(Password)

		
		result := Users{}
		err2 := c.Find(bson.M{"username": UserName}).One(&result)
		fmt.Println(err2)
		fmt.Println("result")
		fmt.Println(result)
		 if(result.Password == Password){
		 	formatter.JSON(w, http.StatusOK, "true")
		 }
		 if(result.Password != Password){
		 	formatter.JSON(w, http.StatusOK, "false")	
		 }
		
	 }

}

func getUserHandler(formatter *render.Render) http.HandlerFunc{
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
		
		decoder := json.NewDecoder(req.Body)

		var user Users
		err1 := decoder.Decode(&user)
		if err1 != nil {
		panic(err1)
		}

		UserName := user.UserName
		Password := user.Password
		fmt.Println(UserName)
		fmt.Println(Password)

		
		result := Users{}
		err2 := c.Find(bson.M{"username": UserName}).One(&result)
		fmt.Println(err2)
		fmt.Println("result")
		fmt.Println(result)
		 if(result.Password == Password){
		 	formatter.JSON(w, http.StatusOK, result)
		 }
		 if(result.Password != Password){
		 	formatter.JSON(w, http.StatusOK, "false")	
		 }
		
	 }

}

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