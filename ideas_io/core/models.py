from django.utils.text import slugify # For generating slugs
from django.utils.crypto import get_random_string # For generating random strings
from django.db import models # For creating models

# Create your models here.
class Idea(models.Model):

    # Choices for the category field
    CATEGORY = (
        ("General", "General"),
        ("Tech", "Tech"),
        ("Business", "Business"),
        ("Other", "Other")
    )


    title = models.CharField(max_length=200) # Title of the idea
    description = models.TextField() # Description of the idea
    category = models.CharField(max_length=200, choices=CATEGORY) # Category of the idea
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True) # Unique slug for each idea
    created_at = models.DateTimeField(auto_now_add=True) # Automatically set the creation time
    updated_at = models.DateTimeField(auto_now=True) # Automatically set the update time


    def __str__(self) -> str: # Override the default string representation
        return self.title


    def save(self, *args, **kwargs) -> None:
        """
        Overridden save method to auto-generate a slug for the Idea model
        based on the title. If the generated slug already exists, a random
        string is appended to the end of the slug to ensure uniqueness.
        """
        if not self.slug:
            # Generate a slug based on the title
            slug_base = slugify(self.title)
            slug = slug_base
            # Check if the generated slug already exists
            if Idea.objects.filter(slug=slug).exists():
                # If it does, append a random string to the slug
                slug = f"{slug_base}-{get_random_string(5)}"
            self.slug = slug
        return super(Idea, self).save(*args, **kwargs) # Call the original save method
