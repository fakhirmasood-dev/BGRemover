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
   