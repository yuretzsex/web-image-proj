package services

import (
	"picture-service/dtos"
	"picture-service/helper"
	"picture-service/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type DbManager interface {
	AddPublication(item *models.Publication)
}

type manager struct {
	db *gorm.DB
}

var Mgr manager

func init() {
	db, err := gorm.Open(sqlite.Open("imagesdb1.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schemas
	_ = db.AutoMigrate(&models.Publication{}, &models.User{})

	Mgr = manager{db: db}
}

func (mgr *manager) AddPublication(item *models.Publication) {
	mgr.db.Create(item)
}

func (mgr *manager) GetPublication() []models.Publication {
	var images []models.Publication
	mgr.db.Find(&images)
	return images
}

func (mgr *manager) GetUserByID(id uint) models.User {
	var user models.User
	user.ID = id
	mgr.db.Find(&user)
	return user
}

func (mgr *manager) GetConcretePublications(id uint64) []models.Publication {
	var images []models.Publication
	mgr.db.Where("user_id = ?", id).Find(&images)
	return images
}

func (mgr *manager) CreateUser(user dtos.RegisterDTO) models.User {
	userToCreate := models.User{Nickname: user.Name, Email: user.Email, Password: user.Password}

	mgr.db.Create(&userToCreate)

	return userToCreate
}

func (mgr *manager) FindUser(email string) models.User {
	tmp := models.User{}
	mgr.db.First(&tmp, "email = ?", email)

	return tmp
}

func (mgr *manager) UpdateUser(user models.User) models.User {
	tmp := user
	mgr.db.First(&tmp)

	tmp.Email = user.Email
	tmp.Nickname = user.Nickname
	res, _ := helper.HashPassword(user.Password)
	if len(user.Password) >= 5 {
		tmp.Password = res
	}

	mgr.db.Save(&tmp)

	return tmp
}
