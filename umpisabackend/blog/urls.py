from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.BlogPostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', views.BlogPostUpdateView.as_view(), name='post-update'),
    path('posts/<int:pk>/delete/', views.BlogPostDeleteView.as_view(), name='post-delete'),
]
