document.addEventListener('DOMContentLoaded', function() {
    // HTML Element များကို ရယူခြင်း
    const form = document.getElementById('application-form');
    const statusMessage = document.getElementById('status-message');

    // Form submit event ကို နားထောင်ခြင်း
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Default Form submission ကို တားဆီးခြင်း

        // Form Fields တွေက Data များကို JavaScript Object အဖြစ် စုစည်းခြင်း
        const applicant = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            resumeUrl: document.getElementById('resumeUrl').value
        };

        try {
            // Backend API သို့ POST Request ပို့ခြင်း
            const response = await fetch('http://localhost:8080/api/applicants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicant) // JSON Data ကို String အဖြစ်ပြောင်းပြီး ပို့ခြင်း
            });

            if (response.ok) {
                // Request အောင်မြင်ရင် Success Message ပြသပြီး Form ကို ရှင်းလင်းခြင်း
                statusMessage.textContent = 'Application submitted successfully!';
                statusMessage.className = 'mt-3 text-center text-success';
                form.reset();
            } else {
                // Server Side မှာ Error ရှိရင် Error Message ကို ဖော်ပြခြင်း
                const errorData = await response.json();
                statusMessage.textContent = `Error: ${errorData.message || 'Failed to submit application.'}`;
                statusMessage.className = 'mt-3 text-center text-danger';
            }
        } catch (error) {
            // Network Error များကို ကိုင်တွယ်ခြင်း
            console.error('Submission error:', error);
            statusMessage.textContent = 'Network error. Please try again.';
            statusMessage.className = 'mt-3 text-center text-danger';
        }
    });
});

