document.addEventListener('DOMContentLoaded', () => {
    const addIncomeButton = document.getElementById('add-income');
    const incomeNameInput = document.getElementById('income-name');
    const incomeAmountInput = document.getElementById('income-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const incomeItemsList = document.getElementById('income-items');
    const expenseItemsList = document.getElementById('expense-items');
    const totalAmountElement = document.getElementById('total-amount');
    const totalExpensesElement = document.getElementById('total-expenses');
    const totalIncomeElement = document.getElementById('total-income');
    const expensesChartCtx = document.getElementById('expenses-chart').getContext('2d');

    let incomes = [];
    let expenses = [];
    let chart;

    function updateTotal() {
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const total = totalIncome - totalExpenses;

        totalExpensesElement.textContent = totalExpenses.toFixed(2);
        totalIncomeElement.textContent = totalIncome.toFixed(2);
        totalAmountElement.textContent = total.toFixed(2);
    }

    function updateChart() {
        if (chart) {
            chart.destroy();
        }

        const labels = expenses.map(expense => expense.name);
        const data = expenses.map(expense => expense.amount);

        chart = new Chart(expensesChartCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gastos',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw.toFixed(2) + '€';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function renderIncomes() {
        incomeItemsList.innerHTML = '';
        incomes.forEach((income, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${income.name} - ${income.amount.toFixed(2)}€
                <button data-index="${index}" class="delete-income">Borrar</button>
            `;
            incomeItemsList.appendChild(listItem);
        });

        incomeItemsList.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                incomes.splice(index, 1);
                renderIncomes();
                updateTotal();
                updateChart();
            });
        });
    }

    function renderExpenses() {
        expenseItemsList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${expense.name} - ${expense.amount.toFixed(2)}€
                <button data-index="${index}" class="delete-expense">Borrar</button>
            `;
            expenseItemsList.appendChild(listItem);
        });

        expenseItemsList.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                expenses.splice(index, 1);
                renderExpenses();
                updateTotal();
                updateChart();
            });
        });
    }

    addIncomeButton.addEventListener('click', () => {
        const name = incomeNameInput.value.trim();
        const amount = parseFloat(incomeAmountInput.value.trim());

        if (name && !isNaN(amount) && amount > 0) {
            incomes.push({ name, amount });
            incomeNameInput.value = '';
            incomeAmountInput.value = '';
            renderIncomes();
            updateTotal();
            updateChart();
        } else {
            alert('Por favor, ingresa un nombre y una cantidad válidos.');
        }
    });

    addExpenseButton.addEventListener('click', () => {
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name && !isNaN(amount) && amount > 0) {
            expenses.push({ name, amount });
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
            renderExpenses();
            updateTotal();
            updateChart();
        } else {
            alert('Por favor, ingresa un nombre y una cantidad válidos.');
        }
    });

    // Cargar datos iniciales desde JSON
    fetch('expenses.json')
        .then(response => response.json())
        .then(data => {
            expenses = data.expenses;
            incomes = data.incomes;
            renderExpenses();
            renderIncomes();
            updateTotal();
            updateChart();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

