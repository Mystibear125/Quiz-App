const descInput = document.getElementById('desc-input');
const amountInput = document.getElementById('amount-input');
const typeSelect = document.getElementById('type-select');
const categoryInput = document.getElementById('category-input');
const addBtn = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');
const totalIncome = document.getElementById('total-income');
let totalExpense = document.getElementById('total-expense');
const balance = document.getElementById('balance');

let totalExpenseMoney = 0;
let totalIncomeMoney = 0;

let lastItem = [];



addBtn.addEventListener('click', () => {
    const desc = descInput.value;
    let amountValue = amountInput.value;
    let amount = parseFloat(amountValue.replace('$',''));
    const type = typeSelect.value;
    const category = categoryInput.value;

    expenseList.insertAdjacentHTML('beforeend', `
      <li class="expense-item">
        <div class="item-left">
          <span class="item-name">${desc}</span>
          <span class="item-category">${category}</span>
        </div>
        <div class="item-right">
          <span class="item-amount ${type}">${amount}</span>
          <button class="editpencil-btn">✏️</button>
          <button class="delete-btn">✕</button>
        </div>
      </li>`);

    type === 'Expense' ? totalExpenseMoney += amount : totalIncomeMoney += amount;

    lastItem = expenseList.lastElementChild;
});

function updateSummary() {
  totalIncome.textContent = `$${totalIncomeMoney.toFixed(2)}`;
  totalExpense.textContent = `$${totalExpenseMoney.toFixed(2)}`;
  balance.textContent = `$${(totalIncomeMoney - totalExpenseMoney).toFixed(2)}`;
}

expenseList.addEventListener('click', (e) => {
  const item = e.target.closest('li');

  if (e.target.classList.contains('delete-btn')) {
      item.remove();
   }

  if (e.target.classList.contains('editpencil-btn')) {
      const desc = descInput.value;
      let amountValue = amountInput.value;
      let amount = parseFloat(amountValue.replace('$',''));
      const category = categoryInput.value;
      const nameDesc = item.querySelector('.item-name');
      let amountDesc = item.querySelector('.item-amount');
      const categoryDesc = item.querySelector('.item-category');
      nameDesc.textContent = desc;
      amountDesc.textContent = amount;
      categoryDesc.textContent = category;
  }
});