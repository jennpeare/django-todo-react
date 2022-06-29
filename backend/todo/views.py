from django.shortcuts import render
from rest_framework import filters, viewsets

from .models import Todo
from .serializers import TodoSerializer

# Create your views here.


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description"]
