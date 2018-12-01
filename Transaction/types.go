package main

import (
    "gopkg.in/mgo.v2/bson"	
)

type Book struct {
	BookId  string `json:"bookid" bson:"bookid"`
	Qty int `json:"qty" bson:"qty"`
	Price int `json:"price" bson:"price"`
}
type Transaction struct {
	ID  bson.ObjectId `json:"id" bson:"_id"`
	UserID  string `json:"userid" bson:"userid"`
	MyBooks []Book `json:"books" bson:"books"`
	TotalAmt  int `json:"total" bson:"total"`
}


