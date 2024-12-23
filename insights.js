document.addEventListener('DOMContentLoaded', async () => {
    const monthlyTableBody = document.querySelector('#monthlyTable tbody');
    const yearlyTableBody = document.querySelector('#yearlyTable tbody');
    const notesTableBody = document.querySelector('#notesTable tbody');
    const downloadButton = document.getElementById('downloadButton');
    const token = localStorage.getItem('token'); // Get token from localStorage

    // Fetch user details
    const fetchUserDetails = async () => {
        const response = await fetch('/api/user-details', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }

        return await response.json();
    };

    const userDetails = await fetchUserDetails();

    // Enable download button for premium users
    if (userDetails.isPremiumUser) {
        downloadButton.disabled = false;
    }

    // Fetch monthly expenses from localStorage
    const monthlyExpensesData = JSON.parse(localStorage.getItem('monthlyExpenses'));
    if (!monthlyExpensesData || !monthlyExpensesData.expenses) {
        alert('No monthly expenses data found');
        return;
    }

    const monthlyExpenses = monthlyExpensesData.expenses;
    const totalMonthlyExpense = monthlyExpensesData.totalExpenses;
    let totalIncome = 0;
    let totalExpense = 0;

    monthlyExpenses.forEach(expense => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(expense.date).toLocaleDateString()}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
        `;
        if (expense.category.toLowerCase() === 'salary') {
            tr.classList.add('salary-row');
            totalIncome += expense.amount;
        } else {
            totalExpense += expense.amount;
        }
        monthlyTableBody.appendChild(tr);
    });

    const monthlyExpense = totalMonthlyExpense-totalIncome;

    document.getElementById('totalIncome').textContent = totalIncome;
    document.getElementById('totalExpense').textContent = monthlyExpense
    document.getElementById('totalSavings').textContent = totalIncome - monthlyExpense;

    // Fetch yearly expenses
    const fetchYearlyExpenses = async () => {
        const response = await fetch('/api/expenses/yearly', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }

        return await response.json();
    };

    const yearlyExpenses = await fetchYearlyExpenses();
    let yearlyTotalIncome = 0;
    let yearlyTotalExpense = 0;

    yearlyExpenses.forEach(expense => {
        const savings = expense.total_income - expense.total_expense;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${expense.month}</td>
            <td>${expense.total_income}</td>
            <td>${expense.total_expense}</td>
            <td style="color: green;">${savings}</td>
        `;
        yearlyTableBody.appendChild(tr);

        yearlyTotalIncome += expense.total_income;
        yearlyTotalExpense += expense.total_expense;
    });

    document.getElementById('yearlyTotalIncome').textContent = yearlyTotalIncome;
    document.getElementById('yearlyTotalExpense').textContent = yearlyTotalExpense;
    document.getElementById('yearlyTotalSavings').textContent = yearlyTotalIncome - yearlyTotalExpense;

    // Fetch notes
    const fetchNotes = async () => {
        const response = await fetch('/api/notes', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }

        return await response.json();
    };

    const notes = await fetchNotes();

    notes.forEach(note => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(note.date).toLocaleDateString()}</td>
            <td>${note.note}</td>
        `;
        notesTableBody.appendChild(tr);
    });

    // Handle download button click
    downloadButton.addEventListener('click', async () => {
        const response = await fetch('/api/expenses/download', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'expenses.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    });
});