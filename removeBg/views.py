from django.shortcuts import render
import json
from django.core.files.storage import FileSystemStorage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import JsonResponse
from io import BytesIO
from time import sleep
from PIL import Image
from rembg import remove
import requests
import uuid

def home(request):
    if request.method =='POST':
        file=request.FILES.get('file')
        image=Image.open(file)
        image=remove(image)
        bytes_io=BytesIO()
        image.save(bytes_io,format='PNG')
        content_object=ContentFile(bytes_io.getvalue(),'remvoe_background.png')
        fs=FileSystemStorage()
        fs.save('remove_background.png',content_object)
        request.session['image_url']=fs.url('remove_background.png')
    print(request.session.get('image_url'))
    return render(request,'removeBg/html/main.html')

def get_img(request):
    image_url=request.session.get('image_url')
    return JsonResponse({'image_url':image_url})

def get_url(request):
    if request.method == 'POST':
        data=json.loads(request.body)
        print(data['url'])
        downloaded_image=requests.get(data['url'])
        bytes_io_1=BytesIO(downloaded_image.content)
        downloaded_image.raise_for_status()
        image=Image.open(bytes_io_1)
        file_name=f"remove-bg_{uuid.uuid4().hex}.png"
        image=remove(image)
        bytes_io_2=BytesIO()
        image.save(bytes_io_2,format='PNG')
        content_object=ContentFile(bytes_io_2.getvalue(),file_name)
        fs=FileSystemStorage()
        fs.save(file_name,content_object)
        print(fs.url(file_name))
        request.session['image_url']=fs.url(file_name)
    return render(request,'removeBg/html/main.html')

def send_url_processd_img(request):
    image_url=request.session.get('image_url')
    print('processed image sent of url')
    return JsonResponse({'image_url':image_url})
   