/*
	Shopping Cart API in Go
	Uses MongoDB
*/

package main

type Cart struct {
	CartId string `json:"id"`
	UserID string `json:"userId"`

	Books []struct {
		BookId     string  `json:"bookId"`
		BookName   string  `json:"bookName"`
		BookCount  int     `json:"bookCount"`
		BookDescription string `json:"bookDescription"`
		BookPrice float64 `json:"price"`
		Amount float64 `json:"amount"`
	} `json:"books"`

	Total float64 `json:"total"`
}

var orders map[string] Cart
