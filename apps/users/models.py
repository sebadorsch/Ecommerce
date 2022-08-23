from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import os


class UserAccountManager(BaseUserManager):
	""" class User Manager """

	def create_user(self, email, password=None, **kwargs):
		""" create new User """
		if not email:
			raise ValueError('User must have an email')

		email = self.normalize_email(email)
		user = self.model(email=email, **kwargs)

		user.set_password(password)
		user.save()

		return user

	def create_superuser(self, email, password=None, **kwargs):
		""" create new SuperUser """
		user = self.create_user(email=email, password=password, **kwargs)

		user.is_superuser = True
		user.is_staff = True
		user.save()

		return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
	""" class User modified to log with email """

	email = models.EmailField(max_length=255, unique=True)
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	objects = UserAccountManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']

	class Meta:
		verbose_name, verbose_name_plural = u'User', u'Users'

	def __str__(self):
		return self.email

	def get_first_name(self):
		return self.first_name

	def get_last_name(self):
		return self.last_name

	def get_full_name(self):
		return f"{self.first_name} {self.last_name}"
