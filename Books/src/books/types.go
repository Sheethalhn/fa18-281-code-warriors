/*
	Books API in Go
	Uses MongoDB
*/

package main

import (
    	"gopkg.in/mgo.v2/bson"
)

type Books struct {
	Id bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	BookName string `json:"bookName" bson:"bookName"` 
	BookDesc string `json:"bookDesc" bson:"bookDesc"` 
	Author string `json:"author" bson:"author"`
	Price float64 `json:"price" bson:"price"`
	BookCount int `json:"bookCount" bson:"bookCount"`
	BookImage string `json:"bookimg" bson:"bookimg"`
}
