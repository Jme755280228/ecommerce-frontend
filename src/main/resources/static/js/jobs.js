document.addEventListener('DOMContentLoaded', function() {
    // UI components တွေရဲ့ id ကို ရယူခြင်း
    const jobListContainer = document.getElementById('job-list-container');

    // REST API ကနေ Job Postings တွေကို ခေါ်ယူမယ့် Function
    async function fetchJobs() {
        try {
            // Backend API URL ကို ခေါ်ယူခြင်း
            // Frontend က 8081 မှာ Run ပြီး Backend က 8080 မှာ Run နေတယ်ဆိုရင် ဒီလိုခေါ်ရပါမယ်။
            const response = await fetch('http://localhost:8080/api/jobs');
            
            // HTTP response အဆင်ပြေရဲ့လားဆိုတာ စစ်ဆေးခြင်း
            if (!response.ok) {
                // HTTP error ဖြစ်ရင် error message ပြသ
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // JSON data ကို JavaScript object အဖြစ် ပြောင်းလဲခြင်း
            const jobs = await response.json();
            
            // ရရှိလာတဲ့ data တွေကို UI မှာ ပြသခြင်း
            displayJobs(jobs);

        } catch (error) {
            // Fetch error ဖြစ်ရင် console မှာ log ပြပြီး UI မှာ error message ပြသ
            console.error('Failed to fetch job postings:', error);
            jobListContainer.innerHTML = '<p class="text-center text-danger">Error loading jobs. Please try again later.</p>';
        }
    }

    // ရရှိလာတဲ့ Job တွေကို UI မှာ ဖော်ပြမယ့် Function
    function displayJobs(jobs) {
        // Job listing မရှိရင် message ပြသ
        if (jobs.length === 0) {
            jobListContainer.innerHTML = '<p class="text-center text-muted">No job listings available at the moment.</p>';
            return;
        }

        // ရှိပြီးသား content တွေကို ရှင်းလင်းခြင်း
        jobListContainer.innerHTML = '';
        
        // Job တစ်ခုချင်းစီကို loop ပတ်ပြီး card ပုံစံဖြင့် ထည့်သွင်းခြင်း
        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            // Bootstrap ရဲ့ Grid system (col) class ကို ထည့်သွင်း
            jobCard.className = 'col'; 
            
            // HTML structure ကို String template literal နဲ့ ဖန်တီးခြင်း
            jobCard.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${job.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${job.company} - ${job.location}</h6>
                        <p class="card-text">${job.description}</p>
                        <a href="#" class="btn btn-primary mt-3">View Details</a>
                    </div>
                    <div class="card-footer bg-light">
                        <small class="text-muted">Posted on: ${job.postedDate}</small>
                    </div>
                </div>
            `;
            
            // ဖန်တီးထားတဲ့ card ကို HTML container ထဲ ထည့်သွင်း
            jobListContainer.appendChild(jobCard);
        });
    }

    // Page စပြီး load လာတဲ့အခါမှာ API ကို စတင်ခေါ်ယူရန်
    fetchJobs();
});

