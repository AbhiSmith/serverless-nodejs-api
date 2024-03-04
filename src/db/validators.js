const {z} = require("zod")

async function validateLead(postData) {
    const lead = z.object({
        email: z.string().email()
    }) 
    let hasError;
    let validData = {}
    let message;
    try {
        validData = lead.parse(postData)
        hasError = false
        message = ''
    } catch (err) {
        console.log(err)
        hasError = true
        message = "Invalid email, please try again."
    }

    return {
        data: validData,
        hasError: hasError,
        message:message
    }

}

module.exports.validateLead = validateLead








// // emailValidator.js customs email validators

// // Function to validate an email address
// function validateEmail(email) {
//     // Regular expression for email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
//     // Check if the email matches the basic format
//     if (!emailRegex.test(email)) {
//       return false;
//     }
  
//     // Check if the email is not too long
//     if (email.length > 320) {
//       return false;
//     }
  
//     // Check if the local part of the email (before '@') is not too long
//     const [localPart] = email.split('@');
//     if (localPart.length > 64) {
//       return false;
//     }
  
//     // Check if the domain part of the email (after '@') is not too long
//     const [, domainPart] = email.split('@');
//     if (domainPart.length > 255) {
//       return false;
//     }
  
//     // Check if the domain contains valid characters
//     const domainRegex = /^[a-zA-Z0-9.-]+$/;
//     if (!domainRegex.test(domainPart)) {
//       return false;
//     }
  
//     // Check if the domain doesn't start or end with a hyphen
//     if (domainPart.startsWith('-') || domainPart.endsWith('-')) {
//       return false;
//     }
  
//     // Check if the domain doesn't contain consecutive dots
//     if (domainPart.includes('..')) {
//       return false;
//     }
  
//     // Check if the domain has at least one dot
//     if (!domainPart.includes('.')) {
//       return false;
//     }
  
//     // Check if the email doesn't start or end with a dot
//     if (email.startsWith('.') || email.endsWith('.')) {
//       return false;
//     }
  
//     // If all checks pass, the email is valid
//     return true;
//   }
  
//   // Export the validateEmail function
//   module.exports = {
//     validateEmail
//   };
  