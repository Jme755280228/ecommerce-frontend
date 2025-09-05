document.addEventListener('DOMContentLoaded', function() {
    const jobListContainer = document.getElementById('job-list-container');
    const statusMessage = document.getElementById('status-message');

    async function fetchJobs() {
        try {
            const response = await fetch('http://localhost:8080/api/jobs');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jobs = await response.json();
            displayJobs(jobs);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            statusMessage.textContent = 'Error loading jobs. Please try again later.';
            statusMessage.className = 'text-danger';
        }
    }

    function displayJobs(jobs) {
        if (jobs.length === 0) {
            jobListContainer.innerHTML = '<p class="text-muted text-center">No job postings found.</p>';
            return;
        }

        jobs.forEach(job => {
            const jobItem = document.createElement('div');
            jobItem.className = 'col';
            jobItem.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary">${job.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
                        <p class="card-text flex-grow-1">${job.description.substring(0, 100)}...</p>
                        <small class="text-muted mt-auto">${job.location}</small>
                    </div>
                    <div class="card-footer bg-transparent border-0 d-flex justify-content-end">
                        <a href="/job-detail?id=${job.id}" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            `;
            jobListContainer.appendChild(jobItem);
        });
    }

    fetchJobs();
});

