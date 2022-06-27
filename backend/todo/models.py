from django.db import models
from this import d


# Create your models here.
class Priorities(models.IntegerChoices):
    LOW = 0, "Low"
    MEDIUM = 1, "Medium"
    HIGH = 2, "High"


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    priority = models.IntegerField(choices=Priorities.choices, default=Priorities.LOW)
    due_date = models.DateField(null=True, blank=True)

    def _str_(self):
        return self.title
