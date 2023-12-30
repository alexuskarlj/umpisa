from django.urls import path
from .views import ConnectionListCreateView, ConnectionRetrieveUpdateDestroyView

urlpatterns = [
    path('connections/', ConnectionListCreateView.as_view(), name='connection-list'),
    path('connections/<int:pk>/', ConnectionRetrieveUpdateDestroyView.as_view(), name='connection-detail'),
]
