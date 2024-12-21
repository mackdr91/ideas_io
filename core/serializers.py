from rest_framework import serializers # For creating serializers
from .models import Idea # Importing the Idea model

# Creating a serializer for the Idea model
class IdeaSerializer(serializers.ModelSerializer):
    class Meta: # Meta class for the serializer
        model = Idea # Model for the serializer
        fields = ['id', 'title', 'description', 'category', 'slug', 'created_at', 'updated_at'] # Fields to include in the serializer