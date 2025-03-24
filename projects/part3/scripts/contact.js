document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  // Hide messages initially
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      to_email: 'kyle.wettlin@gmail.com'
    };

    // Validate form data
    if (!validateForm(formData)) {
      errorMessage.textContent = 'Please fill out all fields correctly.';
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      return;
    }

    try {
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      // Send email using EmailJS
      await emailjs.send(
        'service_rm3mdxh', 
        'template_t4nwd9h', 
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: formData.to_email
        }
      );
      
      // Show success message
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      
      // Reset form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
      
    } catch (error) {
      // Show error message
      errorMessage.textContent = 'Failed to send message. Please try again later.';
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      console.error('EmailJS Error:', error);
    } finally {
      // Reset button state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
    }
  });

  // Form validation function
  function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.trim() === '') {
      return false;
    }
    
    if (!data.email || !emailRegex.test(data.email)) {
      return false;
    }
    
    if (!data.subject || data.subject.trim() === '') {
      return false;
    }
    
    if (!data.message || data.message.trim() === '') {
      return false;
    }
    
    return true;
  }
}); 