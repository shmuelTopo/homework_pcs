(async function() {
    'use strict';

    class Item {
        constructor(name, price, quantity) {
            this._name = name;
            this._price = price;
            this._quantity = quantity;
        }

        getName() {
            return this._name;
        }

        getPrice() {
            return this._price;
        }

        getQuantity() {
            return this._quantity;
        }

    }

    class Order {
        constructor(customerName, custormerAddress, items = []) {
            this._customerName = customerName;
            this._custormerAddress = custormerAddress;
            this._items = items;
        }

        getCustomerName() {
            return this._customerName;
        }

        getCustomerAddress() {
            return this._custormerAddress;
        }

        getItems() {
            return this._items;
        }

        getTotal() {
            let total = 0;
            this._items.forEach(item => {
                total += item.getPrice() * item.getQuantity();
            });
            return total;
        }

        static async getOrders(ordersJson) {
            let response = await fetch(ordersJson);
            let data = await response.json();
            let orders = [];
    
            data.forEach(order => {
                orders.push(
                    new Order(
                        order.customer,
                        order.address,
                        order.items.map(getItemClassFromOjbet)
                    )
                );
            });
    
            return orders;
        }
    }

    function getItemClassFromOjbet(item){
        return new Item(item.item, item.total/item.quantity, item.quantity);
    }

    const ordersContainer = document.getElementById('ordersContainer');
    const orders = await Order.getOrders('sampelOrders.json');

    console.log(ordersTemplate(orders));
    ordersContainer.innerHTML = ordersTemplate(orders);

    function ordersTemplate(orders){
        let orderDivContent = '';
        orders.forEach(order => {

            orderDivContent += `
                <hr>
                <p>Customer: ${order.getCustomerName()}</p>
                <p>Address: ${order.getCustomerAddress()}</p>
                <p>Total: ${order.getTotal()}</p>
                <br>
                Items:
                ${itemsTemplate(order.getItems())}
            `;
            
        });
        return orderDivContent;
    }

    function itemsTemplate(items){
        let content = '';
        items.forEach(item => {
            content += `
                <p>Item: ${item.getName()}</p>
                <p>Quantity: ${item.getQuantity()}</p>
                <p>Price: ${item.getPrice()}</p>
                <br>`;
        });

        content = content.slice(0, -5);
        return content;
    }

    console.log('orders', orders);

})();