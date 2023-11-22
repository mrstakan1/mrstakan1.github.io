function addToCartFromCatalogue(button) {
    let jsonItems = localStorage.getItem("cart");
    console.log(`addToCartFromCatalogue() cart: ${jsonItems}`);
    let items = (jsonItems)? JSON.parse(jsonItems) : [];

    let toyCard = button.parentNode;
    let toyName = toyCard.querySelector('.toy-name').innerHTML;
    let toyPrice = Number(toyCard.querySelector('.price').innerHTML);
    let toyImage = toyCard.querySelector('img').getAttribute("src");

    let item = {
        name: toyName,
        price: toyPrice,
        image: toyImage,
        amount: 1
    }

    let itemAlreadyInCart = false;

    for (let i of items) {
        if (i.name === item.name) {
            i.amount += 1;
            itemAlreadyInCart = true;
            break;
        }
    }

    if (!itemAlreadyInCart) {
        items.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(items));
    console.log(`Added to cart: ${toyName} ${toyPrice}`);
    console.log(items);

    
    var notification = document.getElementById('notification');
    if (notification.style.display === 'none' || notification.style.display === '') {
        notification.style.display = 'block';
        setTimeout(function(){
        notification.style.display = 'none';
        }, 3000); // Уведомление исчезает спустя 3 секунды
    }
}

function addToCart(button) {
    let jsonItems = localStorage.getItem("cart");
    console.log(`addToCart() cart: ${jsonItems}`);
    let items = (jsonItems)? JSON.parse(jsonItems) : [];

    let toyContainer = button.parentNode.parentNode;
    let toyName = toyContainer.querySelector('.toy-name').innerHTML;
    let toyPrice = Number(toyContainer.querySelector('.price').innerHTML);
    let toyImage = toyContainer.querySelector('img').getAttribute("src");

    let item = {
        name: toyName,
        price: toyPrice,
        image: toyImage,
        amount: 1
    }

    let itemAlreadyInCart = false;

    for (let i of items) {
        if (i.name === item.name) {
            i.amount += 1;
            itemAlreadyInCart = true;
            break;
        }
    }

    if (!itemAlreadyInCart) {
        items.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(items));
    console.log(`Added to cart: ${toyName} ${toyPrice}`);
    console.log(items);

    var notification = document.getElementById('notification');
    if (notification.style.display === 'none' || notification.style.display === '') {
        notification.style.display = 'block';
        setTimeout(function(){
        notification.style.display = 'none';
        }, 3000); // Уведомление исчезает спустя 3 секунды
    }
}

function drawCart() {
    let jsonItems = localStorage.getItem("cart");
    console.log(`addToCart() cart: ${jsonItems}`);
    let items = (jsonItems)? JSON.parse(jsonItems) : [];

    if (items.length === 0) {
        document.querySelector('main').innerHTML = `<p class="nothing-in-cart">В корзине ничего нет</p>`;
        return;
    }

    console.log("inserting");
    document.querySelector('main').innerHTML = `
    <h1>Корзина</h1>
    <div class="cart">
        <div class="cart-items-wrapper">
        </div>
        <div class="checkout">
            <p>Итого:</p>
            <p class="total-amount"></p>
            <form action="">
                <label for="address">Адрес </label>
                <input type="text" id="address" required>
                <label for="tel">Телефон</label>
                <input type="tel" id="tel" required>
                <p>Тип оплаты</p>
                <div class="payment-radio-wrap">
                    <div class="payment-radio">
                        <label for="card">Карта</label>
                        <input type="radio" name="payment" id="card" value="card" checked>
                    </div>
                    <div class="payment-radio">
                        <label for="cash">Наличные</label>
                        <input type="radio" name="payment" id="cash" value="cash">
                    </div>
                    
                </div>
                <input type="submit" value="Оформить" class="purchase-button">
            </form>
        </div>
    </div>`;

    let cartItemsEl = document.querySelector('.cart-items-wrapper');
    let totalAmount = 0;

    for (let item of items) {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = 
        `<img src="${item.image}" alt="">
            <div class="cart-item-info">
                <p class="toy-name">${item.name}</p>
                <p class="toy-price">${item.price}₽ x ${item.amount}</p>
                <p class="total-price">${item.price * item.amount}₽</p>
            </div>
            <div class="remove-cart-item">
                <button class="fa-solid fa-trash" onclick="removeItemFromCart(this)"></button>
            </div>`;

        cartItemsEl.append(cartItem);

        totalAmount += item.price * item.amount;
    }

    document.querySelector('.total-amount').innerHTML = totalAmount + '₽'
}

function removeItemFromCart(button) {
    let jsonItems = localStorage.getItem("cart");
    console.log(`addToCart() cart: ${jsonItems}`);
    let items = (jsonItems)? JSON.parse(jsonItems) : [];
    console.log(items);

    let itemContainer = button.parentNode.parentNode.querySelector('.cart-item-info');
    let toyName = itemContainer.querySelector('.toy-name').innerHTML;

    for (let i = 0; i < items.length; i++) {
        if (items[i].name === toyName) {
            items.splice(i, 1);
        }
    }

    itemContainer.parentNode.remove();
    localStorage.setItem("cart", JSON.stringify(items));

    drawCart();
}