package main

import (
    "gopkg.in/mgo.v2/bson"	
)

type Book struct {
	BookId  string `json:"bookid" bson:"bookid"`
	BookName  string `json:"bookname" bson:"bookname"`
	Qty int `json:"qty" bson:"qty"`
	Price float64 `json:"price" bson:"price"`
}
type Transaction struct {
	ID  bson.ObjectId `json:"id" bson:"_id"`
	UserID  string `json:"userid" bson:"userid"`
	MyBooks []Book `json:"books" bson:"books"`
	TotalAmt  float64 `json:"totalamount" bson:"totalamount"`
}


