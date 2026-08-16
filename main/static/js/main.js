preview_img=document.getElementById('preview-img');
preview_btns=document.getElementById('preview-btns');
url_input=document.getElementById('url-input');
imageInput=document.getElementById('image-input');
preview=document.getElementById('preview');
download_btn=document.getElementById('download-btn');
cancel_btn=document.getElementById('cancel-btn');
ring_wrapper=document.getElementById('ring-wrapper');
form_data=document.getElementById('form-data');
orignal_img=document.getElementById('orignal-image');
processed_img=document.getElementById('processed-image');
both_images=document.getElementById('both-images');
processing_loader=document.getElementById('processing-loader');
img_div=document.getElementById('img-div');
loader_wrapper=document.getElementById('loader-wrapper');

console.log(processing_loader);
console.log('hi');


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
        orignal_img.src=url;
        both_images.style.display='flex';
        preview.style.display='block';
        ring_wrapper.style.display='none';
        form_data.style.display='flex';
    }
    testImage.onerror=()=>{
        ring_wrapper.style.display='none';
        form_data.style.display='flex';
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
    orignal_img.src=URL.createObjectURL(file);
    both_images.style.display='flex';
    console.log(preview_img.value);
    preview.style.display='block';
    ring_wrapper.style.display='none';

    console.log('done');
    }catch(error){
        ring_wrapper.style.display='none';
        form_data.style.display='flex'
        console.log(error.message);
    }
})

cancel_btn.addEventListener('click',()=>{
    preview_img.src='';
    preview.style.display='none';
    form_data.style.display='flex';
})

orignal_img.addEventListener('click',()=>{
    console.log('triggres');
    img_div.innerHTML=`<img src="${orignal_img.src}" id="preview-img">`
    img_div.style.width='100%';
    img_div.style.height='100%';
    img_div.style.Zindex='2';
    preview.style.display='block';
    form_data.style.display='none';

})
processed_img.addEventListener('click',()=>{
    preview_img.src=processed_img.src;
    preview.style.display='block'
    form_data.style.display='none';
})

processing_loader.addEventListener('click',()=>{
    console.log('done');
    img_div.innerHTML=loader_wrapper.innerHTML;
    img_div.style.width='99%';
    img_div.style.height='99%';
    preview.style.display='block'
    form_data.style.display='none';
})

