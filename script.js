let cart=JSON.parse(localStorage.getItem('cart')) || [];
let tempProdcut={};

var $btn=$('.addBtn').click(function(){
    if(this.id=='all'){
        $('.parent > div').fadeIn(450);
    }else{
        let $add=$('.'+ this.id).fadeIn(450);
        console.log($add)
        $('.parent > div').not($add).hide()
    }

    $btn.removeClass('active');
    $(this).addClass('active');
})

let $color=$('.white').fadeIn(450);
$('.inner_parent >div').not($color).hide();
$('.inner_parent1 >div').not($color).hide();
$('.inner_parent2 >div').not($color).hide();
$('.inner_parent3 >div').not($color).hide();
$('.inner_parent4 >div').not($color).hide();

function myFunction(item,item2){
        if(item2){
            let $color=$('.'+ item + '>' + '.'+item2).fadeIn(450);
            $('.' + item + ' > div').not($color).hide();
        }
        $('.'+ item + ' ' +'.btn-1' ).removeClass('move');
        $('.'+ item + ' ' + '#'+item2).addClass('move');
       
 };

function addToCart(productName,productPrice,productImg){
    tempProdcut={
        name:productName,
        price:productPrice,
        image:productImg,
    }

    $('#box').removeClass('d-none');
    $('#box').addClass('d-block');
    
}

let noti=0;
function add(){
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    let existProduct=cart.find(item=>item.name===tempProdcut.name);
    console.log(existProduct)
    if(existProduct){
        existProduct.quantity +=1;
    }else{
        let prodcut={
            id:cart.length+1,
            name:tempProdcut.name,
            price:tempProdcut.price,
            image:tempProdcut.image,
            quantity:1
        }
        cart.push(prodcut);
    }

    localStorage.setItem('cart',JSON.stringify(cart));

    noti+=1;
    $('#noti').text(noti);
    $('#noti').css('background-color','red');

    $('#box').removeClass('d-block');
    $('#box').addClass('d-none');
}

function cancel(){
    $('#box').removeClass('d-block');
    $('#box').addClass('d-none');
}

function loadData(){
    let total=0;
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    $('.prouduct_list').html('');

    if(cart.length==0){
        $('.prouduct_list').html('<h4 class="mt-4 text-danger">Your shopping cart is empty</h4>');
    }else{
        cart.forEach((item,index) => {
            $(".prouduct_list").append(`
                <div class="col-xxl-3 col-lg-4 col-sm-6 justify-content-between my-5">
                 <div style="width:100%; box-shadow:2px 2px 3px gray; border-radius:10px;">
                    <img src="./image/${item.image}" alt="" style="width: 100%; height:300px; border-top-right-radius:10px; border-top-left-radius:10px;">
                    <div class="d-flex justify-content-between my-3 mx-1">
                        <div>
                            <h4 class="m-0">${item.name}</h4>
                            <h5 class="m-0 fs-5 my-2">Price: ${item.price}$</h5>
                            <h5>Total Price: ${ item.quantity * item.price}$    </h5>
                        </div>
                        <div class="btns">
                            <button onclick="changeQuantity(${index},'decrease')" class="btn mx-2 fs-4">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index},'increase')" class="btn mx-2 fs-4">+</button>
                        </div>
                    </div>
                 </div>
                </div>
            `);

            
            total+=item.quantity * item.price;
            $('#total').text(total)
        });
    }
}

function clearAll(){
    localStorage.clear();
    loadData()
    $('#total').text('0');
}

function changeQuantity(index,action){
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    if(action=='increase'){
        cart[index].quantity +=1;
    }else if(action=='decrease'){
        cart[index].quantity -=1;
    }

    if(cart[index].quantity==0){
        cart.splice(index,1);
        $('#total').text('0');
    }


    localStorage.setItem('cart',JSON.stringify(cart));
    loadData()
}
