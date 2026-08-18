from django.urls import path
from removeBg.views import home

urlpatterns=[
    path('home/',home,name='home'),
]