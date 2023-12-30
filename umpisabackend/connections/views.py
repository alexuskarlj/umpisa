
from rest_framework import generics
from .models import Connection
from .serializers import ConnectionSerializer

class ConnectionListCreateView(generics.ListCreateAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

class ConnectionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
