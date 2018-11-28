package main
 
import (
	"fmt"
	"net/http"
 
	"github.com/gorilla/mux"
)
 
func GetTransaction(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "not implemented yet !")
}
 
func CreateTransaction(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "not implemented yet !")
}
 

 
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/getTransactionByUser/{id}", GetTransaction).Methods("GET")
	r.HandleFunc("/movies", CreateTransaction).Methods("POST")
	
	http.ListenAndServe(":3000", r)
	
	
}