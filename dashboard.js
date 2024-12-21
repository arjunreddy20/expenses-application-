document.addEventListener('DOMContentLoaded', async () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const buyPremiumButton = document.getElementById('buyPremium');
    const showLeaderboardButton = document.getElementById('showLeaderboard');
    const leaderboard = document.getElementById('leaderboard');
    const leaderboardList = document.getElementById('leaderboardList');
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
        return await response.json();
    };

    const userDetails = await fetchUserDetails();

    // Check if the user is a premium user
    if (userDetails.isPremiumUser) {
        buyPremiumButton.textContent = 'Using Premium';
        buyPremiumButton.addEventListener('click', () => {
            alert('You are using the premium');
        });
        showLeaderboardButton.style.display = 'block';
    } else {
        buyPremiumButton.addEventListener('click', async () => {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error);
                return;
            }

            const { orderId } = await response.json();
            localStorage.setItem('orderId', orderId); // Store orderId in localStorage

            const options = {
                key: 'rzp_test_9qr0yuIvVRsWmo',
                amount: 50000,
                currency: 'INR',
                name: 'Expense App',
                description: 'Premium Membership',
                order_id: orderId,
                handler: async function (response) {
                    const paymentId = response.razorpay_payment_id;
                    const orderId = response.razorpay_order_id;
                    const status = 'success';

                    await fetch('/api/update-order-status', {
                        method: 'POST',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ orderId, paymentId, status })
                    });

                    alert('Transaction successful');
                    window.location.reload();
                },
                prefill: {
                    name: userDetails.name,
                    email: userDetails.email
                },
                theme: {
                    color: '#F37254'
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', async function (response) {
                const paymentId = response.error.metadata.payment_id;
                const orderId = response.error.metadata.order_id;
                const status = 'failed';

                await fetch('/api/update-order-status', {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ orderId, paymentId, status })
                });

                alert('Transaction failed');
            });

            rzp1.open();
        });
        showLeaderboardButton.style.display = 'none';
    }

    // Fetch and display old expenses
    const fetchExpenses = async () => {
        const response = await fetch('/api/expenses', {
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
            const error = await response.json();
            alert(error.message);
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

        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }

        await fetchExpenses();
        expenseForm.reset();
    });

    // Handle showing leaderboard
    showLeaderboardButton.addEventListener('click', async () => {
        const response = await fetch('/api/leaderboard', {
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

        const leaderboardData = await response.json();
        leaderboardList.innerHTML = '';
        leaderboardData.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} - Total Expenses: ${user.total_expenses}`;
            leaderboardList.appendChild(li);
        });

        leaderboard.style.display = 'block';
    });
});