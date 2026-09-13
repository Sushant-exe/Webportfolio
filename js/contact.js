/**
 * ============================================================================
 * CONTACT FORM VALIDATION, TOAST NOTIFICATIONS & CLIPBOARD SYSTEM
 * ============================================================================
 */

// Toast notification helper
function showToast(title, message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success' 
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">
      ${iconSvg}
    </div>
    <div class="toast-body">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 400);
  }, 4500);
}

function initContact() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');

  // Copy Email to Clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'sushant.dev.pro@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Copied to Clipboard!', `Email ${email} copied successfully.`, 'success');
      } catch (err) {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to Clipboard!', `Email ${email} copied successfully.`, 'success');
      }
    });
  }

  // Contact Form Validation
  if (form) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    function validateField(input, condition, errorMsg) {
      const errorEl = input.parentElement.querySelector('.error-message');
      if (!condition) {
        input.classList.add('error');
        if (errorEl) {
          errorEl.textContent = errorMsg;
          errorEl.classList.add('active');
        }
        return false;
      } else {
        input.classList.remove('error');
        if (errorEl) {
          errorEl.classList.remove('active');
        }
        return true;
      }
    }

    // Clear error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
      if (field) {
        field.addEventListener('input', () => {
          field.classList.remove('error');
          const err = field.parentElement.querySelector('.error-message');
          if (err) err.classList.remove('active');
        });
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const isNameValid = validateField(
        nameInput,
        nameInput.value.trim().length >= 2,
        'Please enter your name (at least 2 characters).'
      );

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = validateField(
        emailInput,
        emailRegex.test(emailInput.value.trim()),
        'Please provide a valid email address.'
      );

      const isSubjectValid = validateField(
        subjectInput,
        subjectInput.value.trim().length >= 3,
        'Please provide a subject (at least 3 characters).'
      );

      const isMessageValid = validateField(
        messageInput,
        messageInput.value.trim().length >= 10,
        'Please enter a message with at least 10 characters.'
      );

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showToast('Missing Fields', 'Please complete all required fields correctly.', 'error');
        return;
      }

      // Submit state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon" style="animation: spin 1s linear infinite;">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        <span>Sending message...</span>
      `;

      // Simulate sending delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        showToast(
          'Message Delivered!',
          'Thank you, Sushant will respond to your message shortly.',
          'success'
        );
      }, 900);
    });
  }
}

document.addEventListener('DOMContentLoaded', initContact);
