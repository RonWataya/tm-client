document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("applicationForm");
    const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
    const modalBody = document.querySelector('#feedbackModal .modal-body');
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                fullname: document.getElementById("fullname").value,
                facebook_handle: document.getElementById("facebook").value,
                phone: document.getElementById("phone").value,
                gender: document.getElementById("SelectGender").value,
                district: document.getElementById("SelectDistrict").value,
                business_idea: document.getElementById("businessIdea").value
            };

            fetch('http://ec2-44-203-48-186.compute-1.amazonaws.com:2000/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                console.log('Response:', data);
                if (data.message === 'Application submitted successfully!') {
                    modalBody.textContent = "Application submitted successfully!";
                } else {
                    modalBody.textContent = data.message || "An error occurred.";
                }
                feedbackModal.show();
            })
            .catch((error) => {
                modalBody.textContent = "An error occurred while submitting the form: " + error.message;
                feedbackModal.show();
            });
        } else {
            modalBody.textContent = "Please fill all the fields.";
            feedbackModal.show();
        }
    });

    window.simulateLike = function() {
        if (validateForm()) {
            console.log("Simulated liking a Facebook page");
            document.getElementById("submitBtn").disabled = false;
            modalBody.textContent="Thank you for liking our Facebook page!";
        } else {
            modalBody.textContent="Please fill all fields before liking our Facebook page.";
            
        }
        feedbackModal.show();
    }

    function validateForm() {
        const fullname = document.getElementById("fullname").value;
        const facebook = document.getElementById("facebook").value;
        const phone = document.getElementById("phone").value;
        const gender = document.getElementById("SelectGender").value;
        const district = document.getElementById("SelectDistrict").value;
        const businessIdea = document.getElementById("businessIdea").value;
        const wordCount = businessIdea.trim().split(/\s+/).length;

        return fullname && facebook && phone && gender && district && businessIdea && wordCount >= 200;
    }
});
