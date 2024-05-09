//Terms and conditions window
var termsWindow = document.getElementById("terms-window");
var link = document.getElementById("terms-link");
var span = document.getElementsByClassName("close")[0];

link.addEventListener('click',function(event) {
    event.preventDefault();
    termsWindow.style.display = "block";
});


span.addEventListener('click',function(event) {
    event.preventDefault();
    termsWindow.style.display = "none";
});


window.onclick = function(event) {
    if (event.target == termsWindow) {
      termsWindow.style.display = "none";
    }
};

//Toggle payment form visibility
const proceedButton = document.getElementById("proceed-button");
const paymentForm = document.getElementById('payment-form');

proceedButton.addEventListener('click', () => {
    // Toggle the display property of the payment form
    paymentForm.style.display = 'block'; // Set to default display value
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    
});