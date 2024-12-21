from django.urls import path
import core.views as views

urlpatterns = [
    path('ideas/', views.ideas, name='ideas'),
    path('ideas/<slug:slug>/', views.idea_detail, name='idea_detail'),
    path('search/', views.search_ideas, name='search_ideas'),

]

# ENDPOINTS
# http://127.0.0.1:8000/api/v1/ideas/
# http://127.0.0.1:8000/api/v1/ideas/<slug:slug>/
# http://127.0.0.1:8000/api/v1/search/?search=idea

