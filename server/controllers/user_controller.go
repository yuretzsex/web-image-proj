package controllers

import (
	"fmt"
	"net/http"
	"picture-service/helper"
	"picture-service/models"
	"picture-service/services"

	"github.com/gin-gonic/gin"
)

func GetSimilarPosts() gin.HandlerFunc {
	return func(c *gin.Context) {

		arr := services.Mgr.GetPublication()
		var filtered_arr []models.Publication
		name := []rune(c.Param("name"))

		for _, s := range arr {
			if helper.Levenshtein(name, []rune(s.Title)) <= 3 {
				filtered_arr = append(filtered_arr, s)
			}
		}

		c.JSON(
			http.StatusOK,
			filtered_arr)
	}
}

func UpdateUserInfo() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User
		_ = c.BindJSON(&user)
		res := services.Mgr.UpdateUser(user)

		c.JSON(
			http.StatusOK,
			res)

	}

}

func GetAllConcretePublications() gin.HandlerFunc {
	return func(c *gin.Context) {

		uid, _ := helper.ExtractTokenID(c.Request)

		fmt.Println(uid)

		arr := services.Mgr.GetConcretePublications(uid)

		c.JSON(
			http.StatusOK,
			arr)
	}
}
