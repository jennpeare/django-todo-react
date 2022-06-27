from django.contrib import admin

from .models import Todo


# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "completed", "priority", "due_date")


# Register your models here
admin.site.register(Todo, TodoAdmin)
