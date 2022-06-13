package controllers

import (
	"net/http"
	"picture-service/dtos"
	"picture-service/helper"
	"picture-service/services"

	"github.com/gin-gonic/gin"
)

func CreateUser(ctx *gin.Context) {

	var registerDTO dtos.RegisterDTO
	errDTO := ctx.ShouldBind(&registerDTO)

	if errDTO != nil {
		response := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	registerDTO.Password, _ = helper.HashPassword(registerDTO.Password)

	createdUser := services.Mgr.CreateUser(registerDTO)
	token, _ := helper.CreateToken(createdUser)
	response := helper.BuildResponse(true, "OK!", token)
	ctx.JSON(http.StatusCreated, response)
}

func Login(ctx *gin.Context) {
	var loginDTO dtos.LoginDTO
	errDTO := ctx.ShouldBind(&loginDTO)
	if errDTO != nil {
		response := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	u := services.Mgr.FindUser(loginDTO.Email)

	if helper.CheckPasswordHash(loginDTO.Password, u.Password) {
		generatedToken, _ := helper.CreateToken(u)

		response := helper.BuildResponse(true, "OK!", generatedToken)
		ctx.JSON(http.StatusOK, response)
		return
	}

	response := helper.BuildErrorResponse("Please check again your credential", "Invalid Credential", helper.EmptyObj{})
	ctx.AbortWithStatusJSON(http.StatusUnauthorized, response)
}
