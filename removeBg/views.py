from django.shortcuts import render
import json

def home(request):
    if request.method =='POST':
        file=request.FILES.get('file')
        print(file)
    return render(request,'removeBg/html/main.html')

# def get_img(request):
#     return render(request,'main/html/main.html')