/*
	Books API in Go
	Riak KV
*/

package main

import (
	"fmt"
	"log"
	"net/http"
	"io/ioutil"
	"time"
	"strings"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	//"github.com/satori/go.uuid"
)

/* Riak REST Client */
var debug = true
var server1 = "http://18.144.10.130:8098"
var server2 = "http://54.241.154.152:8098"
var server3 = "http://54.219.141.144:8098" 
var server4 = "http://35.166.183.128:8098"
var server5 = "http://35.161.230.225:8098" 

type Client struct {
	Endpoint string
	*http.Client
}

var tr = &http.Transport{
	MaxIdleConns:       10,
	IdleConnTimeout:    30 * time.Second,
	DisableCompression: true,
}

func NewClient(server string) *Client {
	return &Client{
		Endpoint:  	server,
		Client: 	&http.Client{Transport: tr},
	}
}

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

// Init Database Connections
func init() {

	// Riak KV Setup	
	c1 := NewClient(server1)
	msg, err := c1.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server1: ", msg)		
	}

	c2 := NewClient(server2)
	msg, err = c2.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server2: ", msg)		
	}

	c3 := NewClient(server3)
	msg, err = c3.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server3: ", msg)		
	}
	
	c4 := NewClient(server4)
	msg, err = c4.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server4: ", msg)		
	}

	c5 := NewClient(server5)
	msg, err = c5.Ping( )
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Riak Ping Server5: ", msg)		
	}
	
}

func (c *Client) Ping() (string, error) {
	resp, err := c.Get(c.Endpoint + "/ping" )
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return "Ping Error!", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/ping => " + string(body)) }
	return string(body), nil
}

func (c *Client) GetBooks() ([]books, error) {
	var book_nil []book
	
	resp, err := c.Get(c.Endpoint + "/buckets/books/keys/allbooks" )
	if err != nil {
		fmt.Println("[RIAK DEBUG] " + err.Error())
		return book_nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if debug { fmt.Println("[RIAK DEBUG] GET: " + c.Endpoint + "/buckets/books/keys/allbooks" + " => " + string(body)) }
	
	var book_array []book
	if err := json.Unmarshal([]byte(body), &book_array); err != nil {
		fmt.Println("[RIAK DEBUG] JSON unmarshaling failed: %s", err)
		return book_nil, err
	}
	return book_array, nil
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/books", bookStatusHandler(formatter)).Methods("GET")
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

// API Get Book Status - Concurrent
func bookStatusHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		
			c1 := make(chan []book)
    		c2 := make(chan []book)
    		c3 := make(chan []book)
    		c4 := make(chan []book)
    		c5 := make(chan []book)
    	
			go GetBooksServer1(c1)
			go GetBooksServer2(c2) 
			go GetBooksServer3(c3) 
			go GetBooksServer4(c4) 
			go GetBooksServer5(c5) 
			
			var books []book
		  	select {
			    case books = <-c1:
			        fmt.Println("Received Server1: ", books)
			    case books = <-c2:
			        fmt.Println("Received Server2: ", books)
			    case books = <-c3:
			        fmt.Println("Received Server3: ", books)
			    case books = <-c4:
			        fmt.Println("Received Server4: ", books)
			    case books = <-c5:
			        fmt.Println("Received Server5: ", books)
		    }

			if books[0] == (book{}) {
				formatter.JSON(w, http.StatusBadRequest, "")
			} else {
				fmt.Println( "List of Books: ", books )
				formatter.JSON(w, http.StatusOK, books)
			}
	}
}

func GetBooksServer1(chn chan<- []book) {
	
	var books_nil []book
	c := NewClient(server1)
	books, err := c.GetBooks()
	if err != nil {
		chn <- books_nil
	} else {
		fmt.Println( "Server1: ", books)
		chn <- books
	}
}

func GetBooksServer2(chn chan<- []book) {
	
	var books_nil []book
	c := NewClient(server2)
	books, err := c.GetBooks()
	if err != nil {
		chn <- books_nil
	} else {
		fmt.Println( "Server2: ", books)
		chn <- books
	}
}

func GetBooksServer3(chn chan<- []book) {
	
	var books_nil []book
	c := NewClient(server3)
	books, err := c.GetBooks()
	if err != nil {
		chn <- books_nil
	} else {
		fmt.Println( "Server3: ", books)
		chn <- prds
	}
}

func GetBooksServer4(chn chan<- []book) {
	
	var books_nil []book
	c := NewClient(server4)
	books, err := c.GetBooks()
	if err != nil {
		chn <- books_nil
	} else {
		fmt.Println( "Server4: ", books)
		chn <- books
	}
}

func GetBooksServer5(chn chan<- []book) {
	
	var books_nil []book
	c := NewClient(server5)
	books, err := c.GetBooks()
	if err != nil {
		chn <- books_nil
	} else {
		fmt.Println( "Server5: ", books)
		chn <- books
	}
}
