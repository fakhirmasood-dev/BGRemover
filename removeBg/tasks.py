from celery import shared_task
from PIL import Image
from rembg import remove
from io import BytesIO
import uuid
from django.core.files.storage import FileSystemStorage
from django.core.files.base import ContentFile
from time import sleep


@shared_task
def remove_background(file_name):
    image=Image.open(file_name)
    image=remove(image)
    bytes_io=BytesIO()
    filename=f"remove-bg_{uuid.uuid4().hex}.png"
    image.save(bytes_io,format='PNG')
    content_object=ContentFile(bytes_io.getvalue(),filename)
    fs=FileSystemStorage()
    fs.save(filename,content_object)
    image_url=fs.url(filename)
    return image_url
    