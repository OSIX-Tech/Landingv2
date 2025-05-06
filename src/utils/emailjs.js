// EmailJS configuration utility
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initEmailJS = () => {
  // Replace 'YOUR_USER_ID' with your actual EmailJS User ID
  emailjs.init('vhZy2LlRMx7BHGfwF');
};

// Send an email using EmailJS
export const sendEmail = (templateParams) => {
  // Replace these with your actual EmailJS Service ID and Template ID
  const serviceId = 'service_x9314cb';
  const templateId = 'template_qjx00y9';
  
  return emailjs.send(serviceId, templateId, templateParams);
};
