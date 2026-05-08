// result.js
const data = JSON.parse(localStorage.getItem('purchaseOrderData'));

if (data) {
  let totalWeightOrder = 0
  document.getElementById('order_Number').textContent = data.orderNumber;
  document.getElementById('poNumber').textContent = data.orderNumber;
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
  const itemsTableBody =  document.getElementById('ItemsTableBody')
  const items = data.itemsArray || []
  items.forEach((element,index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
                <td>${index+1}</td>

                <td>${element.codeNum}</td>

                <td>${element.description}</td>

                <td>${element.qty}</td>

                <td>${element.totalWeight}</td>
                
                <td>${element.unit}</td>

                <td>${data.currency} ${element.price}</td>

                <td>${data.currency} ${element.subtotal}</td>
            `;

            itemsTableBody.appendChild(newRow)

            totalWeightOrder = totalWeightOrder +  Number.parseFloat(element.totalWeight)

  });

  const newRow5 = document.createElement('tr');
    newRow5.innerHTML = `
    <td class="stars" colspan="8">************************************************************************************</td>
`;
itemsTableBody.appendChild(newRow5);


  const newRow4 = document.createElement('tr');
    newRow4.innerHTML = `
    <td class="weight-col-1" colspan="4"></td>
    <td class="weight-col-2">${Number.parseFloat(totalWeightOrder).toFixed(3) || 0}</td>
    <td class="weight-col-3" colspan="3"></td>
`;
itemsTableBody.appendChild(newRow4);

  const newRow1 = document.createElement('tr');
newRow1.innerHTML = `
    <td class="words-title" rowspan="3" colspan="2">Amount in words (${data.currency})</td>
    <td class="words-value" rowspan="3" colspan="3">${data.amountInWords}</td>
    <td class="td-amount" colspan="2">Amount</td>
    <td class="td-amount-val">
      ${data.currency } ${Number.parseFloat(data.totalAmount).toFixed(3) || 0}
    </td>
`;
itemsTableBody.appendChild(newRow1);

const newRow2 = document.createElement('tr');
newRow2.innerHTML = `
    <td class="td-amount" colspan="2">VAT 5%</td>
    <td class="td-amount-val">${data.currency } ${Number.parseFloat(data.vatAmount).toFixed(3) || 0}</td>
`;
itemsTableBody.appendChild(newRow2);

const newRow3 = document.createElement('tr');
newRow3.innerHTML = `
    <td class="td-amount" colspan="2">Total amount</td>
    <td class="td-amount-val">${data.currency } ${(Number(data.totalAmount) + Number(data.vatAmount)).toFixed(3)}</td>
`;
itemsTableBody.appendChild(newRow3);

const listConditions = document.getElementById('listConditions');

data.conditions.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    listConditions.appendChild(li);
});
}
