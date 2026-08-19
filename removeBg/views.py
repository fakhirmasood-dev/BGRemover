from django.shortcuts import render
import json
from django.core.files.storage import FileSystemStorage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import JsonResponse

def home(request):
    if request.method =='POST':
        file=request.FILES.get('file')
        fs=FileSystemStorage()
        fs.save('image.png',file)
        request.session['image_url']=fs.url('image.png')
    return render(request,'removeBg/html/main.html')

def get_img(request):
    image_url=request.session.get('image_url')
    return JsonResponse({'image_url':image_url})
   