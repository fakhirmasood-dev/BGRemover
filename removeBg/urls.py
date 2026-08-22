from django.urls import path
from removeBg.views import home,get_img,get_url,send_url_processd_img

urlpatterns=[
    path('home/',home,name='home'),
    path('remove/',get_img,name='get_img'),
    path('url/',get_url,name='url'),
    path('get_url_processed_image/',send_url_processd_img,name='get_url_processd_image')
]