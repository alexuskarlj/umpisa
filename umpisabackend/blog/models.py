from django.db import models

class BlogPost(models.Model):
    author = models.CharField(max_length=255)
    content = models.TextField()
    time_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author
