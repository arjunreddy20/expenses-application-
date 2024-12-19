document.addEventListener('DOMContentLoaded', async () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after login

    console.log('User ID:', userId); // Log the user ID to ensure it's correct

    // Fetch and display old expenses
    const fetchExpenses = async () => {
        const response = await fetch(`/api/expenses?userId=${userId}`);
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, amount, description, category }),
        });

        if (response.ok) {
            await fetchExpenses();
            expenseForm.reset();
        } else {
            alert('Error adding expense');
        }
    });
});