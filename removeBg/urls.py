from django.urls import path
from removeBg.views import home,get_img

urlpatterns=[
    path('home/',home,name='home'),
    path('remove/',get_img,name='get_img')
]