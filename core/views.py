from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import IdeaSerializer
from .models import Idea

from django.db.models import Q

# Create your views here.


@api_view(['GET', 'POST'])
def ideas(request) -> Response:
    """
    GET: Retrieve all ideas
    POST: Create a new idea

    Parameters:
        request (Request): The request object

    Returns:
        Response: The response object
    """
    if request.method == 'GET':
        # Retrieve all ideas
        ideas = Idea.objects.all() # Query the Idea model to get all ideas
        serializer = IdeaSerializer(ideas, many=True) # Serialize the ideas
        return Response(serializer.data) # Return the serialized data

    elif request.method == 'POST':
        # Create a new idea
        serializer = IdeaSerializer(data=request.data) # Deserialize the request data
        if serializer.is_valid(): # Check if the deserialized data is valid
            serializer.save() # Save the idea
            return Response(serializer.data, status=status.HTTP_201_CREATED) # Return the serialized data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # Return the errors


@api_view(['GET', 'PUT', 'DELETE'])
def idea_detail(request, slug) -> Response:
    """
    GET: Retrieve a specific idea
    PUT: Update an existing idea
    DELETE: Delete an existing idea

    Parameters:
        request (Request): The request object
        slug (str): The slug of the idea to be retrieved/updated/deleted

    Returns:
        Response: The response object
    """
    try:
        idea = Idea.objects.get(slug=slug) # Query the Idea model to get the idea with the given slug
    except Idea.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) # Return a 404 status code if the idea does not exist

    if request.method == 'GET':
        # Retrieve a specific idea
        serializer = IdeaSerializer(idea) # Serialize the idea
        return Response(serializer.data) # Return the serialized data

    elif request.method == 'PUT':
        # Update an existing idea
        serializer = IdeaSerializer(idea, data=request.data) # Deserialize the request data
        if serializer.is_valid(): # Check if the deserialized data is valid
            serializer.save() # Save the idea
            return Response(serializer.data) # Return the serialized data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # Return the errors

    elif request.method == 'DELETE':
        # Delete an existing idea
        idea.delete() # Delete the idea
        return Response(status=status.HTTP_204_NO_CONTENT) # Return a 204 status code


@api_view(['GET'])
def search_ideas(request) -> Response:
    """
    Search for ideas by title
    """
    query = request.query_params.get("search")
    ideas = Idea.objects.filter(Q(title__icontains=query) | Q(description__icontains=query) | Q(category__icontains=query))
    serializer = IdeaSerializer(ideas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)