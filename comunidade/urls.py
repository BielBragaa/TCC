from django.urls import path
from . import views

urlpatterns = [
    path("api/postagens/", views.postagens_api, name="postagens_api"),
    path("api/anuncios/", views.anuncios_api, name="anuncios_api"),
    path('', views.comunidade_page, name='comunidade_page'),
]
