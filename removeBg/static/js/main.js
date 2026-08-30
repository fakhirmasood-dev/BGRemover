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
processed_image_container=document.getElementById('processed-image-container');
processed_image=document.getElementById('processed-image');
both_images=document.getElementById('both-images');
stars=document.getElementById('stars');
image_div=document.getElementById('img-div');
orignal_image_container=document.getElementById('orignal-image-container');
processed_image_wrapper=document.getElementById('processed-image-wrapper');
image_error=document.getElementById('image-error');


orignal_img.addEventListener('click',()=>{
    preview_btns.style.display='flex';
    console.log('done');
})

url_input.addEventListener('click',()=>{
    url=prompt('Paste url of image');
    if (url === ''){
        alert('Please Enter a URL.');
    }
    const testImage=new Image(url);
    ring_wrapper.style.display='flex';
    image_error.style.display='none';
    form_data.style.display='none';
    testImage.onload=()=>{
        orignal_img.src=url;
        processed_image.src=url;
        processed_image_wrapper.style.filter='blur(10px)';
        stars.style.display='block';
        preview_btns.style.display='none';
        image_div.innerHTML=processed_image_container.innerHTML;
        both_images.style.display='flex';
        preview.style.display='block';
        ring_wrapper.style.display='none';
        form_data.style.display='flex';
        send_url_to_backend(url);
    }
    testImage.onerror=()=>{
        ring_wrapper.style.display='none';
        form_data.style.display='flex';
        console.log('Loading Failed1');
        alert('The provided image URL is not accessable.')
    }
    testImage.src=url;
    
    
})


imageInput.addEventListener('change',()=>{
    try{
    ring_wrapper.style.display='flex';
    image_error.style.display='none';
    form_data.style.display='none';
    const file=imageInput.files[0];
    preview_btns.style.display='none';
    download_btn.style.display='none';
    preview_img.src=URL.createObjectURL(file);
    orignal_img.src=URL.createObjectURL(file);
    processed_image.src=URL.createObjectURL(file);
    file_url=URL.createObjectURL(file)
    preview.style.display='block';
    stars.style.display='block';
    processed_image_wrapper.style.filter='blur(10px)';
    image_div.innerHTML=processed_image_container.innerHTML;
    console.log('html changed');
    form_data.style.display='none';
    both_images.style.display='flex';
    console.log(preview_img.value);
    ring_wrapper.style.display='none';

    }catch(error){
        ring_wrapper.style.display='none';
        form_data.style.display='flex'
        console.log(error.message);
        alert('Some error occured try again.')
    }
})

cancel_btn.addEventListener('click',()=>{
    preview_img.src='';
    preview.style.display='none';
    form_data.style.display='flex';
})

orignal_img.addEventListener('click',()=>{
    image_div.innerHTML=orignal_image_container.innerHTML;
    preview.style.display='block';
    form_data.style.display='none';
    download_btn.style.display='none';
    preview_btns.style.display='flex';

})

stars.addEventListener('click',()=>{
    image_div.innerHTML=processed_image_container.innerHTML;
    preview.style.display='block';
    preview_btns.style.display='none';
    form_data.style.display='none';

})

function getCsrfToken(){
    csrf_token=document.cookie.split('=')[1];
    return csrf_token
}


async function send_url_to_backend(url){
    try{
        const response=await fetch('/remove-bg/url-send/',{
            'method':'POST',
            'headers':{
                'content-type':'application/json',
                'X-CSRFToken':getCsrfToken()
            },
            body:JSON.stringify({
                'url':url
            })
        })
        const data=response.json();
        if(response.status === 401){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if(response.status === 403){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if(response.status === 402){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if(response.status === 413){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if(response.status === 400){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if(response.status === 500){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if (response.status === 200){
            console.log('some error occured.');
            getUrlPImage();
        }
    }catch(error){
        console.log(error);
    }
}

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
        const data=await response.json()
        if(response.status === 400){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if(response.status === 415){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if(response.status === 413){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }

        if(response.status === 500){
            image_error.textContent=data.message;
            image_error.style.display='inline-block';
            preview_btns.style.display='none';
            both_images.style.display='none';
            preview_img.src='';
            preview.style.display='none';
            form_data.style.display='flex';
            
        }
        if (response.status === 200){
            console.log(response.status);
            getPImage();
            }
        
    }catch(error){
        console.log(error);
    }
    
}
)
processed_image.addEventListener('click',
    ()=>{
        console.log('clicked');
        image_div.innerHTML=`<img src="${processed_image.src}" id="processed-image">`
        download_btn.style.display='flex';    
        preview.style.display='block'
        form_data.style.display='none'; 
        preview_btns.style.display='flex'; 

        
    }
)
async function getUrlPImage() {
    const response=await fetch('/remove-bg/get_url_processed_image/');
    const data=await response.json();
     if(response.status === 500){
        image_error.textContent=data.message;
        image_error.style.display='inline-block';
        preview_btns.style.display='none';
        both_images.style.display='none';
        preview_img.src='';
        preview.style.display='none';
        form_data.style.display='flex';
        
    }
    stars.style.display='none';
    preview_btns.style.display='flex';
    preview_btns.style.display='flex';
    preview.style.display='block';
    download_btn.href=data.image_url;
    download_btn.style.display='flex';
    processed_image.src=data.image_url;
    image_div.innerHTML=`<img src='${data.image_url}' id=preview-img>`;
    processed_image_wrapper.style.filter='blur(0px)';
    console.log('done');
    
}

async function getPImage(){
    const response=await fetch('/remove-bg/remove/');
    const data=await response.json();
     if(response.status === 500){
        image_error.textContent=data.message;
        image_error.style.display='inline-block';
        preview_btns.style.display='none';
        both_images.style.display='none';
        preview_img.src='';
        preview.style.display='none';
        form_data.style.display='flex';
        
    }
    console.log(data)
    console.log(data.image_url)
    stars.style.display='none';
    preview_btns.style.display='flex';
    preview_btns.style.display='flex';
    preview.style.display='block';
    download_btn.href=data.image_url;
    download_btn.style.display='flex';
    processed_image.src=data.image_url;
    image_div.innerHTML=`<img src='${data.image_url}' id=preview-img>`;
    processed_image_wrapper.style.filter='blur(0px)';
    console.log('done');
}





