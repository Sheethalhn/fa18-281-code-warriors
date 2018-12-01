package main

import (
    "gopkg.in/mgo.v2/bson"	
)


type Transaction struct {
	ID  bson.ObjectId `json:"id" bson:"_id"`
	BookId  string `json:"bookid" bson:"bookid"`
}
