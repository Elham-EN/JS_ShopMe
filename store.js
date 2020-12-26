if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //This variable store all diffrent buttons with this exact class
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons); 
    // i is less than number of that buttons. add 1 to i every single time. 
    //loop through all of the different buttons inside removeCartItem
    for (var i = 0; i < removeCartItemButtons.length; i++) {
       //the acutal button.which ever element is in the loop we are in.
       var button = removeCartItemButtons[i]//it add one to i.
       //this button now correspond to one of the remove button. The addEventListener
       //tell us when we click on a button do something.in this case listen to click event.
       //this eventListener always return an event object inside the function it calls.
       button.addEventListener('click', removeCartItem)
    }
   
   var quantityInputs = document.getElementsByClassName('cart-quantity-input')
      for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addtoCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild())
    }
    updateCartTotal()
}

function removeCartItem(event) {
    //The target property of the Event interface is a reference to the object that dispatched the event.
    var buttonClicked = event.target;
       buttonClicked.parentElement.parentElement.remove();
       updateCartTotal();//inside event listner
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addtoCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    //This document is going to create a new element div
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    console.log(cartItemNames)
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerHTML == title) {
            alert('This item is already added to the cart')
            return //this will exist out of the function
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
         <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE1</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    
    //going to add cartRow to very end of the cart-items. this append method will add the 
    //cart row to end of the cart items
    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    //getelementByClassName returns an array of elements and we want only one.
    //get the first element of 'cart-items' or undefined if there is no matching element.
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    //getting different car-row inside cart items container 
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    console.log(cartRows)
    for (var i = 0; i < cartRows.length; i++) {//carRows size is 2
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
} 