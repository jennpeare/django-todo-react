from rest_framework import serializers

from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    # the thing you'll actually have access to
    class Meta:
        model = Todo
        fields = ("id", "title", "description", "completed", "priority", "due_date")
