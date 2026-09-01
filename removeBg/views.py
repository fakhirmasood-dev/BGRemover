from django.shortcuts import render
import json
from django.core.files.storage import FileSystemStorage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect
from io import BytesIO
from time import sleep
from PIL import Image
from rembg import remove
import requests
import uuid
from .tasks import remove_background
from celery.result import AsyncResult

def home(request):              
    if request.method =='POST':
        try:
            MAX_SIZE=5*1024*1024  #5MB
            MAX_WIDTH=4096
            MAX_HEIGHT=4096
            file=request.FILES.get('file')
            if not file:
                return JsonResponse({
                    'message':'No image file was uploaded.'
                },status=400)
            content_type=file.content_type
            if not content_type or not content_type.startswith('image/'):
                return JsonResponse({
                    'message':'Only images are allowed.'
                },status=415)
            try:
                image=Image.open(file)
                print(image.width)
                image.verify()
            except Exception as e:
                return JsonResponse({
                    'message':'The uploaded file is not a valid image.'
                },status=400)
            image=Image.open(file)
            if image.width > MAX_WIDTH or image.height > MAX_HEIGHT:
                return JsonResponse({
                    'message':'Image dimensions must not exceed 4096*4096 pixels.'
                },status=413)
            
            if file.size > MAX_SIZE:
                return JsonResponse({
                    'message':'Image size should not exceed 5MB.'
                },status=413)
            filename=f"upload_{uuid.uuid4().hex}.png"
            fs=FileSystemStorage()
            file_name=fs.save(filename,file)
            print(file_name)
            task=remove_background.delay(f'media/{file_name}')
            request.session['task_id']=task.id
            request.session['task_status']='processing'
        except Exception as e:
            print(e)
            print(image.size)
            return JsonResponse({
                'message':'Something went wrong while processing the image.'
            },status=500)
        return JsonResponse({
            'status':'ok'
        },status=200)
    return render(request,'removeBg/html/main.html')

def get_img(request):
    print('started')
    task_id=request.session.get('task_id')
    if not task_id:
        print('in task id')
        return JsonResponse({'message':''},
                            status=400)
    task=AsyncResult(task_id)
    print(task.status)
    if task.successful():
        print('in successful')
        return JsonResponse({'image_url':task.result},status=200)
    if task.failed():
        print('in failed')
        return JsonResponse({'message':'Something went wrong while processing the image.'
        },status=500)
    return JsonResponse({'message':''},status=400)

def get_url(request):
    if request.method == 'POST':
        try:
            data=json.loads(request.body)
            print(data['url'])
            url=data['url']
            if not url:
                return redirect('home')
            MAX_SIZE=5*1024*1024  #5MB
            MAX_WIDTH=4096
            MAX_HEIGHT=4096
            size=0
            bytes_io_1=BytesIO()
            downloaded_image=requests.get(url,stream=True)
            if downloaded_image.status_code == 401:
                return JsonResponse({
                    'message':'Authentication is required to perform this action.'
                },status=401)
            if downloaded_image.status_code == 403:
                #Website requires premium access.
                return JsonResponse({
                    'message':'You do not have permission to access this resource.'
                },status=403)
            if downloaded_image.status_code == 402:
                #Website needs payment for image.
                return JsonResponse({
                    'message':'The provided image URL requires a paid plan t access.'
                },status=402)
        
            for chunk in downloaded_image.iter_content(chunk_size=8192):
                size+=len(chunk)
                bytes_io_1.write(chunk)
                if size >MAX_SIZE:
                    return JsonResponse({
                        'message':'Image size should not exceed 5MB.'
                    },status=413)
            print('here byte 1')
            print(type(downloaded_image))
            print('here byte 2')
            bytes_io_1.seek(0)
            try:
                downloaded_image.raise_for_status()
            except Exception as e:
                print(e)
                return JsonResponse({
                    'message':'Unable to access the image URL.'
                },status=400)
            try:
                image=Image.open(bytes_io_1)
                extension=image.format.lower()
                if image.width > MAX_WIDTH or image.height > MAX_HEIGHT:
                    return JsonResponse({
                        'message':'Image dimensions must not exceed 4096*4096 pixels.'
                    },status=413)
                image.verify()
            except Exception as e:
                print(e)
                return JsonResponse({
                    'message':'The uploaded file is not a valid image.'
                },status=400)
            file_name=f"remove-bg_{uuid.uuid4().hex}.png"
            filename=f"upload_{uuid.uuid4().hex}.{extension}"
            fs=FileSystemStorage()
            print('here fs celery')
            bytes_io_1.seek(0)
            file_name=fs.save(filename,bytes_io_1)
            print(file_name)
            task=remove_background.delay(f'media/{file_name}')
            request.session['task_id']=task.id
            request.session['task_status']='processing'
        except Exception as e:
            print(f'in exception{e}')
            return JsonResponse({
                'message':'Something went wrong while processing the image.'
            },status=500)
    return render(request,'removeBg/html/main.html')

def send_url_processd_img(request):
    print('started')
    task_id=request.session.get('task_id')
    if not task_id:
        print('in task id')
        return JsonResponse({'message':''},
                            status=400)
    task=AsyncResult(task_id)
    print(task.status)
    if task.successful():
        print('in successful')
        return JsonResponse({'image_url':task.result},status=200)
    if task.failed():
        print('in failed')
        return JsonResponse({'message':'Something went wrong while processing the image.'
        },status=500)
    return JsonResponse({'message':''},status=400)
   