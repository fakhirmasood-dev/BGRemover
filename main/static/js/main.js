preview_img=document.getElementById('preview-img');
preview_btns=document.getElementById('preview-btns');
url_input=document.getElementById('url-input');
imageInput=document.getElementById('image-input');
preview=document.getElementById('preview');
console.log(preview_btns);
console.log(preview_img)

preview_img.addEventListener('mouseenter',()=>{
    preview_btns.style.display='flex';
    console.log('done');
})

url_input.addEventListener('click',()=>{
    url=prompt('Paste url of image');
    console.log(url);
    
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

