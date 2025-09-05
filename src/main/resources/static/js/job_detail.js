document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    const loadingElement = document.getElementById('loading');
    const jobContentElement = document.getElementById('job-content');
    const errorElement = document.getElementById('error-message');
    const jobTitleElement = document.getElementById('job-title');
    const jobCompanyElement = document.getElementById('job-company');
    const jobDescriptionElement = document.getElementById('job-description');
    const jobLocationElement = document.getElementById('job-location');
    const jobPostedDateElement = document.getElementById('job-posted-date');

    if (!jobId) {
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        return;
    }

    async function fetchJobDetails() {
        try {
            const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const job = await response.json();
            displayJobDetails(job);
        } catch (error) {
            console.error('Failed to fetch job details:', error);
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
        }
    }

    function displayJobDetails(job) {
        jobTitleElement.textContent = job.title;
        jobCompanyElement.textContent = `${job.company} - ${job.location}`;
        jobDescriptionElement.textContent = job.description;
        jobLocationElement.textContent = `Location: ${job.location}`;
        jobPostedDateElement.textContent = `Posted on: ${job.postedDate}`;

        loadingElement.style.display = 'none';
        jobContentElement.style.display = 'block';
    }

    fetchJobDetails();
});

