preview_img=document.getElementById('preview-img');
preview_btns=document.getElementById('preview-btns');
url_input=document.getElementById('url-input');
image=document.getElementById('image');
console.log(preview_btns);
console.log(preview_img)

preview_img.addEventListener('mouseenter',()=>{
    preview_btns.style.display='flex';
    console.log('done');
})

url_input.addEventListener('click',()=>{
    try{url=prompt('Paste url of image');
    console.log(url);
    }catch(error){
        console.log(error.message);
    }
    
})

image.addEventListener('change',()=>{
    image=this.File[0];
    preview_img.src=URL.createObjectURL(image);
    preview_img.style.display='block';
})

