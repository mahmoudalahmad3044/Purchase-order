// script.js
const form = document.getElementById('PurchaseOrderForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const file = document.getElementById('logoUpload').files[0];
    const reader = new FileReader();

    function saveData(logoData = '') {
        const data = {
            orderNumber: document.getElementById('orderNumber').value,
            companyName: document.getElementById('companyName').value,
            contactName: document.getElementById('contactName').value,
            contactNumber: document.getElementById('contactNumber').value,
            emailID: document.getElementById('emailID').value,
            orderdBy: document.getElementById('orderdBy').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            poDate: document.getElementById('poDate').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            logo: logoData,
            itemsArray: getItemsArray(),
            currency: document.getElementById('currency').value,
            totalAmount: document.getElementById('totalAmount').textContent
        };

        localStorage.setItem('purchaseOrderData', JSON.stringify(data));
        window.open('./result.html', '_blank');
    }

    if (file) {
        reader.onload = function () {
            saveData(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveData();
    }
});


function calculateRow(row) {
    const qty = row.querySelector('.qty').value || 0;
    const price = row.querySelector('.price').value || 0;
    const subtotal = qty * price;

    row.querySelector('.subtotal').value = subtotal.toFixed(2);

    calculateTotalAmount();
}

function calculateTotalAmount() {
    let total = 0;

    document.querySelectorAll('.subtotal').forEach(input => {
        total += parseFloat(input.value) || 0;
    });

    document.getElementById('totalAmount').innerText = total.toFixed(2);
}

function addRow() {
    const tableBody = document.getElementById('tableBody');
    const rowCount = tableBody.rows.length + 1;

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
                <td>${rowCount}</td>

                <td>
                    <input type="text" class="codeNum" name="code[]">
                </td>

                <td>
                    <input type="text" class="descriptionItem" name="description[]">
                </td>

                <td>
                    <input type="number" class="qty" min="1" value="1">
                </td>

                <td>
                    <input type="text" class="unitItem" name="unit[]">
                </td>

                <td>
                    <input type="number" class="price" min="0" value="0">
                </td>

                <td>
                    <input type="text" class="subtotal" readonly value="0">
                </td>
            `;

    tableBody.appendChild(newRow);

    attachEvents();
}

function removeRow() {
    const tableBody = document.getElementById('tableBody');
    tableBody.removeChild(tableBody.lastChild)
}

function attachEvents() {
    document.querySelectorAll('#tableBody tr').forEach(row => {
        const qty = row.querySelector('.qty');
        const price = row.querySelector('.price');

        qty.oninput = () => calculateRow(row);
        price.oninput = () => calculateRow(row);
    });
}

function getItemsArray () {
    let items = []
    document.querySelectorAll('#tableBody tr').forEach(row => {
        const codeNum = row.querySelector('.codeNum').value
        const qty = row.querySelector('.qty').value
        const price = row.querySelector('.price').value
        const description = row.querySelector('.descriptionItem').value
        const unit = row.querySelector('.unitItem').value
        const subtotal = row.querySelector('.subtotal').value

        items.push({
            codeNum,
            qty,
            price,
            description,
            unit,
            subtotal
        })
    });

    return items
}

attachEvents();


