preview_img=document.getElementById('preview-img');
preview_btns=document.getElementById('preview-btns');
url_input=document.getElementById('url-input');
imageInput=document.getElementById('image-input');
preview=document.getElementById('preview');
download_btn=document.getElementById('download-btn');
cancel_btn=document.getElementById('cancel-btn');
console.log(preview_btns);
console.log(preview_img)

preview_img.addEventListener('mouseenter',()=>{
    preview_btns.style.display='flex';
    console.log('done');
})

url_input.addEventListener('click',()=>{
    url=prompt('Paste url of image');
    const testImage=new Image(url);
    testImage.onload=()=>{
        console.log('image loaded');
        preview_img.src=url;
        preview.style.display='block';
    }
    testImage.onerror=()=>{
        console.log('Loading Failed1');
    }
    testImage.src=url;
    
    
})

imageInput.addEventListener('change',()=>{
    try{
    const file=imageInput.files[0];
    console.log(file);
    preview_img.src=URL.createObjectURL(file);
    console.log(preview_img.value);
    preview.style.display='block';
    console.log('done');
    }catch(error){
        console.log(error.message);
    }
})

cancel_btn.addEventListener('click',()=>{
    preview_img.src='';
    preview.style.display='none';
})

