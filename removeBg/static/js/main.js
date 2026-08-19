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
processed_img=document.getElementById('processed-img');
processed_image=document.getElementById('processed-image');
both_images=document.getElementById('both-images');
stars=document.getElementById('stars');
image_div=document.getElementById('img-div');
orignal_img_div=document.getElementById('orignal-img');
// console.log('hi hi hi hi hi hi hi')


orignal_img.addEventListener('click',()=>{
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
    processed_image.src=URL.createObjectURL(file);
    image_div.innerHTML=processed_img.innerHTML;
    console.log(processed_img.innerHTML);
    console.log('html changed');
    preview_btns.style.display='none';
    preview.style.display='block'
    form_data.style.display='none';
    both_images.style.display='flex';
    preview_btns.style.display='flex';
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
    image_div.innerHTML=orignal_img_div.innerHTML;
    preview.style.display='block';
    form_data.style.display='none';

})
processed_img.addEventListener('click',()=>{
    preview.style.display='block'
    form_data.style.display='none';
})

stars.addEventListener('click',()=>{
    image_div.innerHTML=processed_img.innerHTML;
    console.log(processed_img.innerHTML);
    console.log('html changed');
    preview_btns.style.display='none';
    preview.style.display='block'
    form_data.style.display='none';

})

function getCsrfToken(){
    csrf_token=document.cookie.split('=')[1];
    return csrf_token
}

getCsrfToken();
imageInput.addEventListener('change',
    async function upload(){
    try{
        const file=imageInput.files[0];
        formdata=new FormData();
        formdata.append('file',file);
        const response=await fetch('/remove-bg/home/',
        {
            method:'POST',
            headers:{
                'X-CSRFToken':getCsrfToken()
            },
            body:formdata


        }
        
    )
    if (!response.status){
            throw new error('cant send data.')
        }else{
        console.log(response.status);
        getData();
    }
    }catch(error){
        console.log(error);
    }
    
}
)

async function getData(){
    const response=await fetch('/remove-bg/remove/');
    let data=await response.json();
    console.log(data)
    image_div.innerHTML=`<img src="${data.image_url}" id="preview-img">`
    console.log('done');
}





