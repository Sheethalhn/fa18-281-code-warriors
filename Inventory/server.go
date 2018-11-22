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
