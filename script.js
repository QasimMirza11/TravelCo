document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('trip-form');
    const resultDiv = document.getElementById('cost-result');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        

        // Retrieve user inputs
        const destination = document.getElementById('destination').value;
        const travelDates = document.getElementById('travel-dates').value;
        const numTravelers = parseInt(document.getElementById('num-travelers').value);
        const accommodation = document.getElementById('accommodation').value;
        
        // Calculate estimated cost (dummy calculation)
        const baseCostPerPerson = accommodation === 'luxury' ? 500 : 200;
        const totalCost = baseCostPerPerson * numTravelers;
        
        // Display result
        resultDiv.innerHTML = `
            <p>Estimated Cost for ${numTravelers} travelers to ${destination} (${accommodation}): $${totalCost}</p>
        `;
        
        // Show result
        resultDiv.style.display = 'block';
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
    

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        axios.post('/send-email', { name, email, message })
            .then(response => {
                if (response.status === 200) {
                    displayMessage('Email sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    displayMessage('Error sending email. Please try again later.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                displayMessage('Error sending email. Please try again later.', 'error');
            });
    });

    function displayMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }
});