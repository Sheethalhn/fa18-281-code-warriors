package main

import (
    "gopkg.in/mgo.v2/bson"	
)

type Users struct {
	Id  bson.ObjectId `json:"id" bson:"_id,omitempty"`
	UserName  string `json:"username" bson:"username"`
	Password  string `json:"password" bson:"password"`
	FirstName string `json:"firstname" bson:"firstname"`
	LastName  string `json:"lastname" bson:"lastname"`
}

type Users1 struct {
	UserName  string `json:"username" bson:"username"`
	
}
