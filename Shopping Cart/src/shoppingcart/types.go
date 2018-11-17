/*
	Shopping Cart API in Go
	Uses MongoDB
*/

package main

type Cart struct {
	UserId string `json:"userId"`

	Books []struct {
		BookId     string  `json:"bookId"`
		BookName   string  `json:"bookName"`
		BookDescription string `json:"bookDescription"`
		BookCount  int     `json:"bookCount"`
		BookPrice float64 `json:"price"`
		Amount float64 `json:"amount"`
	} `json:"books"`
	
	TotalAmount float64 `json:"total"`
}

var orders map[string] Cart
