preview_img=document.getElementById('preview-img');
preview_btns=document.getElementById('preview-btns');
url_input=document.getElementById('url-input');
imageInput=document.getElementById('image-input');
preview=document.getElementById('preview');
download_btn=document.getElementById('download-btn');
cancel_btn=document.getElementById('cancel-btn');
ring_wrapper=document.getElementById('ring-wrapper');
form_data=document.getElementById('form-data');

console.log(preview_btns);
console.log(preview_img)

preview_img.addEventListener('mouseenter',()=>{
    preview_btns.style.display='flex';
    console.log('done');
})

url_input.addEventListener('click',()=>{
    url=prompt('Paste url of image');
    const testImage=new Image(url);
    ring_wrapper.style.display='flex';
    form_data.style.display='none';
    testImage.onload=()=>{
        console.log('image loaded');
        preview_img.src=url;
        preview.style.display='block';
        ring_wrapper.style.display='none';
        form_data.style.display='block';
    }
    testImage.onerror=()=>{
        ring_wrapper.style.display='none';
        form_data.style.display='block';
        console.log('Loading Failed1');
    }
    testImage.src=url;
    
    
})

imageInput.addEventListener('change',()=>{
    try{
    ring_wrapper.style.display='flex';
    form_data.style.display='none';
    const file=imageInput.files[0];
    preview_img.src=URL.createObjectURL(file);
    console.log(preview_img.value);
    preview.style.display='block';
    ring_wrapper.style.display='none';

    console.log('done');
    }catch(error){
        ring_wrapper.style.display='none';
        form_data.style.display='block'
        console.log(error.message);
    }
})

cancel_btn.addEventListener('click',()=>{
    preview_img.src='';
    preview.style.display='none';
    form_data.style.display='block';
})



