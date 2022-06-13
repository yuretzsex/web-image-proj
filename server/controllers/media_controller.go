package controllers

import (
	"net/http"
	"picture-service/dtos"
	"picture-service/models"
	"picture-service/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetImages() gin.HandlerFunc {
	return func(c *gin.Context) {

		res := services.Mgr.GetPublication()

		c.JSON(
			http.StatusOK,
			res)
	}
}

func FileUpload() gin.HandlerFunc {
	return func(c *gin.Context) {

		// Upload.
		formFile, _, err := c.Request.FormFile("image")

		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				dtos.MediaDto{
					StatusCode: http.StatusInternalServerError,
					Message:    "error",
					Data:       map[string]interface{}{"data": "Select a file to upload"},
				})
			return
		}

		uploadUrl, err := services.NewMediaUpload().FileUpload(models.File{File: formFile})

		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				dtos.MediaDto{
					StatusCode: http.StatusInternalServerError,
					Message:    "error",
					Data:       map[string]interface{}{"data": "Error uploading file"},
				})
			return
		}

		// Get values from Data Form.
		title := c.Request.FormValue("title")
		description := c.Request.FormValue("description")

		uid, _ := strconv.ParseUint(c.Request.FormValue("user_id"), 10, 32)

		services.Mgr.AddPublication(&models.Publication{Url: uploadUrl, Title: title, Description: description, UserID: uid})

		c.JSON(
			http.StatusOK,
			dtos.MediaDto{
				StatusCode: http.StatusOK,
				Message:    "success",
				Data:       map[string]interface{}{"data": uploadUrl, "title": title, "description": description},
			})
	}
}

func RemoteUpload() gin.HandlerFunc {
	return func(c *gin.Context) {
		var url models.Url

		//validate the request body
		if err := c.BindJSON(&url); err != nil {
			c.JSON(
				http.StatusBadRequest,
				dtos.MediaDto{
					StatusCode: http.StatusBadRequest,
					Message:    "error",
					Data:       map[string]interface{}{"data": err.Error()},
				})
			return
		}

		uploadUrl, err := services.NewMediaUpload().RemoteUpload(url)
		if err != nil {
			c.JSON(
				http.StatusInternalServerError,
				dtos.MediaDto{
					StatusCode: http.StatusInternalServerError,
					Message:    "error",
					Data:       map[string]interface{}{"data": "Error uploading file"},
				})
			return
		}

		services.Mgr.AddPublication(&models.Publication{Url: uploadUrl, Title: url.Title, Description: url.Description, UserID: url.UserID})

		c.JSON(
			http.StatusOK,
			dtos.MediaDto{
				StatusCode: http.StatusOK,
				Message:    "success",
				Data:       map[string]interface{}{"data": uploadUrl},
			})
	}
}
