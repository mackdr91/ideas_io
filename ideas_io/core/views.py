import logging
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q
from django.core.exceptions import ValidationError

from .serializers import IdeaSerializer
from .models import Idea

logger = logging.getLogger(__name__)

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
        try:
            ideas = Idea.objects.all().order_by('-created_at')
            serializer = IdeaSerializer(ideas, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error retrieving ideas: {str(e)}")
            return Response(
                {"error": "Failed to retrieve ideas"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'POST':
        try:
            logger.info(f"Received POST request with data: {request.data}")
            serializer = IdeaSerializer(data=request.data)
            if serializer.is_valid():
                idea = serializer.save()
                logger.info(f"Successfully created idea with ID: {idea.id}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            logger.error(f"Validation error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            logger.error(f"Validation error: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Error creating idea: {str(e)}")
            return Response(
                {"error": "Failed to create idea"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
        idea = Idea.objects.get(slug=slug)
    except Idea.DoesNotExist:
        logger.error(f"Idea with slug {slug} not found")
        return Response(
            {"error": "Idea not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error retrieving idea: {str(e)}")
        return Response(
            {"error": "Failed to retrieve idea"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    if request.method == 'GET':
        serializer = IdeaSerializer(idea)
        return Response(serializer.data)

    elif request.method == 'PUT':
        try:
            serializer = IdeaSerializer(idea, data=request.data)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"Successfully updated idea with slug: {slug}")
                return Response(serializer.data)
            logger.error(f"Validation error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error updating idea: {str(e)}")
            return Response(
                {"error": "Failed to update idea"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == 'DELETE':
        try:
            idea.delete()
            logger.info(f"Successfully deleted idea with slug: {slug}")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Error deleting idea: {str(e)}")
            return Response(
                {"error": "Failed to delete idea"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET'])
def search_ideas(request) -> Response:
    """
    Search for ideas by title
    """
    try:
        search = request.GET.get('search', '')
        ideas = Idea.objects.filter(
            Q(title__icontains=search) |
            Q(description__icontains=search)
        ).order_by('-created_at')
        serializer = IdeaSerializer(ideas, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error searching ideas: {str(e)}")
        return Response(
            {"error": "Failed to search ideas"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )