document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const usernameSpan = document.getElementById('username');
    const emailSpan = document.getElementById('email');

    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newUsername = document.getElementById('new-username').value;
        const newEmail = document.getElementById('new-email').value;

        const userData = {
            username: newUsername,
            email: newEmail
        };

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to update user profile');
            }

            const updatedUser = await response.json();
            usernameSpan.textContent = updatedUser.username;
            emailSpan.textContent = updatedUser.email;
            userForm.reset();
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    });
});
