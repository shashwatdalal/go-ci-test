package main

import (
	"fmt"
	"time"
)

func main() {
	go func() {
		for {
			printText("sheep")
		}
	}()

}
func printText(s string) {
	fmt.Println(s)
	time.Sleep(500)
}
