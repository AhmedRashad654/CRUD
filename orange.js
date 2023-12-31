


let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let Submit=document.getElementById('submit');

let mood='create';

let  mbt;

function getproudct(){
    if(price.value !=''){
      
    let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value
    total.innerHTML=result;  
    total.style.background='green';
    }else{
        total.style.background='red';
        total.innerHTML='';
    }
}

let productf;
if(localStorage.prod !=null){
    productf=  JSON.parse(localStorage.prod)
}else{
    productf=[];
}



Submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value !=''
    &&price.value !=''
    &&category.value !=''
    &&newpro.count<100
    ){
        if(mood ==='create'){
            if(newpro.count>1){
                for(let i =0 ; i < newpro.count;i++){
                    productf.push(newpro); 
              
                }
            }else{
                productf.push(newpro);
            }
        }else{
      
            productf[mbt]=newpro;
            mood='create'
            Submit.innerHTML='create'
            count.style.display='block'
        }
        cleardata()
    }


   
     
    localStorage.setItem('prod',JSON.stringify(productf) )
 
    datashow();
    // console.log(productf)
}
// localStorage.clear()

function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}



function datashow(){


    let table='';

    for(let i=0;i<productf.length;i++){
        table +=`
        <tr>  
          
        <td>${i+1}</td>
        <td>${productf[i].title}
        <td>${productf[i].price}</td>
        <td>${productf[i].taxes}</td>
        <td>${productf[i].ads}</td>
        <td>${productf[i].discount}</td>
        <td>${productf[i].total}</td>
        <td>${productf[i].category}</td>
   
        <td> <button id="update" onclick="updatedata(${i})")">update</button></td>
         <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
      </tr>
        `
        let deleteAll=document.getElementById('deleteAll');
    }

    if(productf.length>0){
        deleteAll.innerHTML=`
        <button onclick="dol()">deleteAll(${productf.length})</button>
        `
        
    }else{
        deleteAll.innerHTML='';
    }

let tbody=document.getElementById('tbody').innerHTML=table;
}
datashow()




function deletedata(i){
  productf.splice(i,1);
  localStorage.prod=JSON.stringify(productf)
  datashow();
}

function dol(){
    localStorage.clear();
    productf.splice(0);
    datashow();
}

function updatedata(i){
    title.value=productf[i].title;
    price.value=productf[i].price;
    taxes.value=productf[i].taxes;
    ads.value=productf[i].ads;
    discount.value=productf[i].discount;
    category.value=productf[i].category;
    getproudct()
    Submit.innerHTML='update';
     mood='update'
    mbt=i;
    scroll({
        top:0,
        behavior:'smooth'
        
    })
    count.style.display='none'
}


let searchmood='title';


function getsearchmood(id){
    let search =document.getElementById('search')
    if(id== 'left'){
         searchmood='title';
        search.placeholder='search by title'
    }else{
         searchmood='category';
        search.placeholder='search by category'
    }
    search.focus();
    search.value='';
    datashow();
}

function getfsearch(value){
    let table='';
if(searchmood == 'title'){
  
    for(let i =0 ;i<productf.length;i++){
        if(productf[i].title.includes(value.toLowerCase())){
            table +=`
            <tr>  
              
            <td>${i+1}</td>
            <td>${productf[i].title}
            <td>${productf[i].price}</td>
            <td>${productf[i].taxes}</td>
            <td>${productf[i].ads}</td>
            <td>${productf[i].discount}</td>
            <td>${productf[i].total}</td>
            <td>${productf[i].category}</td>
       
            <td> <button id="update" onclick="updatedata(${i})")">update</button></td>
             <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
          </tr>
            `
            // console.log('ali')
        }
    }






}

else{
    for(let i =0; i<productf.length;i++){
        if(productf[i].category.includes(value.toLowerCase())){
            table +=`
            <tr>  
              
            <td>${i+1}</td>
            <td>${productf[ i ].title}
            <td>${productf[i].price}</td>
            <td>${productf[i].taxes}</td>
            <td>${productf[i].ads}</td>
            <td>${productf[i].discount}</td>
            <td>${productf[i].total}</td>
            <td>${productf[i].category}</td>
       
            <td> <button id="update" onclick="updatedata(${i})")">update</button></td>
             <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
          </tr>
            `
        }
    }





}
let tbody=document.getElementById('tbody').innerHTML=table;
}