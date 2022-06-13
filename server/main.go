package main

import (
	"picture-service/controllers" //add this

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {

	router := gin.Default()

	router.Use(CORSMiddleware())

	router.POST("/file", controllers.FileUpload())
	router.POST("/remote", controllers.RemoteUpload())
	router.GET("/image", controllers.GetImages())
	router.GET("/find/:name", controllers.GetSimilarPosts())
	router.GET("/user/image", controllers.GetAllConcretePublications())
	router.PUT("/user", controllers.UpdateUserInfo())

	authRoutes := router.Group("auth")
	{
		authRoutes.POST("/register", controllers.CreateUser)
		authRoutes.POST("/login", controllers.Login)
	}

	router.Run("localhost:5000")
}
