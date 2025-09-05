document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('job-post-form');
    const statusMessage = document.getElementById('status-message');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const jobPosting = {
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value
        };

        try {
            const response = await fetch('http://localhost:8080/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobPosting)
            });

            if (response.ok) {
                statusMessage.textContent = 'Job posted successfully!';
                statusMessage.className = 'mt-3 text-center text-success';
                form.reset();
            } else {
                const errorData = await response.json();
                statusMessage.textContent = `Error: ${errorData.message || 'Failed to post job.'}`;
                statusMessage.className = 'mt-3 text-center text-danger';
            }
        } catch (error) {
            console.error('Submission error:', error);
            statusMessage.textContent = 'Network error. Please try again.';
            statusMessage.className = 'mt-3 text-center text-danger';
        }
    });
});

