package main

import (
    "gopkg.in/mgo.v2/bson"	
)

type Book struct {
	BookId  string `json:"bookid" bson:"bookid"`
}
type Transaction struct {
	ID  bson.ObjectId `json:"id" bson:"_id"`
	MyBooks  []Book `json:"books" bson:"books"`
}


