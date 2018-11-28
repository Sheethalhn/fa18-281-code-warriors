package main

import (
    	
)

type Users struct {
	UserName  string `json:"username" bson:"username"`
	Password  string `json:"password" bson:"password"`
	FirstName string `json:"firstname" bson:"firstname"`
	LastName  string `json:"lastname" bson:"lastname"`
}

type Users1 struct {
	UserName  string `json:"username" bson:"username"`
	
}
