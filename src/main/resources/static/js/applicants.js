document.addEventListener('DOMContentLoaded', function() {
    const applicantsListContainer = document.getElementById('applicants-list-container');
    const statusMessage = document.getElementById('status-message');

    async function fetchApplicants() {
        try {
            const response = await fetch('http://localhost:8080/api/applicants');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const applicants = await response.json();
            displayApplicants(applicants);
        } catch (error) {
            console.error('Failed to fetch applicants:', error);
            statusMessage.textContent = 'Error loading applicants. Please try again later.';
            statusMessage.className = 'text-danger';
        }
    }

    function displayApplicants(applicants) {
        if (applicants.length === 0) {
            applicantsListContainer.innerHTML = '<p class="text-muted text-center">No applicants found.</p>';
            return;
        }

        applicants.forEach(applicant => {
            const applicantItem = document.createElement('div');
            applicantItem.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center';
            applicantItem.innerHTML = `
                <div>
                    <h5>${applicant.name}</h5>
                    <p class="mb-1 text-muted">${applicant.email} | ${applicant.phone}</p>
                    <small>Resume: <a href="${applicant.resumeUrl}" target="_blank">${applicant.resumeUrl}</a></small>
                </div>
            `;
            applicantsListContainer.appendChild(applicantItem);
        });
    }

    fetchApplicants();
});

