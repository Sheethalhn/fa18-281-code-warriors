/*
	Shopping Cart API in Go
	Uses MongoDB
*/

package main

type Cart struct {
	UserId string `json:"userId"`

	Books []struct {
		BookId     string  `json:"bookId"`
		BookCount  int     `json:"bookCount"`
	} `json:"books"`
}

type Books[] struct {
	BookId     string  
	BookCount  int    
}