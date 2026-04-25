// result.js
const data = JSON.parse(localStorage.getItem('purchaseOrderData'));

if (data) {
  document.getElementById('order_Number').textContent = data.orderNumber;
  document.getElementById('companyName').textContent = data.companyName;
  document.getElementById('contactName').textContent = data.contactName;
  document.getElementById('contactNumber').textContent = data.contactNumber;
  document.getElementById('emailID').textContent = data.emailID;
  document.getElementById('orderdBy').textContent = data.orderdBy;
  document.getElementById('phone').textContent = data.phone;
  document.getElementById('email').textContent = data.email;
  document.getElementById('poDate').textContent = data.poDate;
  document.getElementById('deliveryDate').textContent = data.deliveryDate;
  document.getElementById('displayLogo').src = data.logo;
  document.getElementById('currencyType').textContent = data.currency
  document.getElementById('total_amount').textContent = data.totalAmount || 0
  const itemsTableBody =  document.getElementById('ItemsTableBody')
  const items = data.itemsArray || []
  items.forEach((element,index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
                <td>${index+1}</td>

                <td>${element.codeNum}</td>

                <td>${element.description}</td>

                <td>${element.qty}</td>
                
                <td>${element.unit}</td>

                <td>${element.price}</td>

                <td>${element.subtotal}</td>
            `;

            itemsTableBody.appendChild(newRow)

  });
}
