/*
	Inventory API in Go
	Uses MongoDB
*/

package main

/*import (
    	"gopkg.in/mgo.v2/bson"
)*/

type BooksCount struct {
	BooksCount []struct {
		BookId     string  `json:"bookId" bson:"_id,omitempty"`
		BookCount  int     `json:"bookCount"  bson:"bookCount"`
	} `json:"books"`
}
