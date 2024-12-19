document.addEventListener('DOMContentLoaded', async () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const token = localStorage.getItem('token'); // Get token from localStorage

    // Fetch and display old expenses
    const fetchExpenses = async () => {
        const response = await fetch('/api/expenses', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        const expenses = await response.json();
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.amount} - ${expense.description} - ${expense.category}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await deleteExpense(expense.id);
                await fetchExpenses();
            });
            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });
    };

    const deleteExpense = async (id) => {
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert('Error deleting expense');
        }
    };

    await fetchExpenses();

    // Handle adding new expense
    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, description, category }),
        });

        if (response.ok) {
            await fetchExpenses();
            expenseForm.reset();
        } else {
            alert('Error adding expense');
        }
    });
});