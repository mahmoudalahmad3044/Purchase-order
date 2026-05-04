// script.js
const form = document.getElementById('PurchaseOrderForm');
const totalAmount = document.getElementById('totalAmount2')
const vat = document.getElementById('vatAmount')
const textAreaHandler = () => {
document.querySelectorAll("textarea").forEach(textarea => {
  const resize = () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  textarea.addEventListener("input", resize);
  resize();
});
}

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
            totalAmount: document.getElementById('totalAmount').textContent,
            vatAmount: document.getElementById('vatAmount').value,
            Total: document.getElementById('totalAmount2').textContent,
            amountInWords: document.getElementById('amountInWords').value,
            conditions: getConditionsArray()
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
    totalAmount.innerText = total + Number.parseFloat(vat.value||0)
    return total
}

function addRow() {
    const tableBody = document.getElementById('tableBody');
    const rowCount = tableBody.rows.length + 1;

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
                <td>${rowCount}</td>

                <td>
                    <input type="text" class="codeNum" name="code[]" />
                </td>

                <td>
                    <textarea type="text" class="descriptionItem" name="description[]"></textarea>
                </td>

                <td>
                    <input type="number" step="any" class="qty" min="1" value="1"/>
                </td>

                <td>
                    <input type="number"  class="total-weight" min="1" step="any" value="1" />
                </td>

                <td>
                    <input type="text" class="unitItem" name="unit[]" />
                </td>

                <td>
                    <input type="number" class="price" min="0" step="any" value="0" />
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
    
    if (tableBody.lastElementChild) {
        tableBody.removeChild(tableBody.lastElementChild);
    }
}

function attachEvents() {
    document.querySelectorAll('#tableBody tr').forEach(row => {
        const qty = row.querySelector('.qty');
        const price = row.querySelector('.price');

        qty.oninput = () => calculateRow(row);
        price.oninput = () => calculateRow(row);
    });

    textAreaHandler()
}

function getItemsArray () {
    let items = []
    document.querySelectorAll('#tableBody tr').forEach(row => {
        const codeNum = row.querySelector('.codeNum').value
        const qty = row.querySelector('.qty').value
        const totalWeight = row.querySelector('.total-weight').value
        const price = row.querySelector('.price').value
        const description = row.querySelector('.descriptionItem').value
        const unit = row.querySelector('.unitItem').value
        const subtotal = row.querySelector('.subtotal').value

        items.push({
            codeNum,
            qty,
            totalWeight,
            price,
            description,
            unit,
            subtotal
        })
    });

    return items
}

attachEvents();



textAreaHandler()

vat.addEventListener('input',()=> {
    totalAmount.innerText = calculateTotalAmount() + Number.parseFloat(vat.value||0)
})

function addCondition() {
    const tableBody = document.getElementById('termsBody');
    const rowCount = tableBody.rows.length + 1;

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${rowCount}</td>

        <td>
                <textarea
                  type="text"
                  class="descriptionItem"
                  name="terms[]"
                ></textarea>
        </td>
    `

    tableBody.appendChild(newRow)
    textAreaHandler()
}

function removeCondition() {
    const tableBody = document.getElementById('termsBody');
    
    if (tableBody.lastElementChild) {
        tableBody.removeChild(tableBody.lastElementChild);
    }
}

function getConditionsArray () {
     let items = []
    document.querySelectorAll('#termsBody tr').forEach(row => {
        const condition = row.querySelector('.descriptionItem').value

        items.push(condition)
    });

    return items
}
