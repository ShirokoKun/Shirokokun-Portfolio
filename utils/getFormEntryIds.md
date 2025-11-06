# How to Get Google Forms Entry IDs

To get the correct entry IDs for your Google Form:

1. Open your Google Form in edit mode
2. Right-click on the form and select "Inspect" or press F12
3. In the browser console, run this JavaScript:
   ```javascript
   // Get all input fields
   const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
   inputs.forEach((input, index) => {
     console.log(`Field ${index + 1}: ${input.name}`);
   });
   ```
4. The `name` attribute will contain the entry ID (e.g., `entry.1234567890`)
5. Update the entry IDs in `components/Contact.tsx` in the order: Name, Email, Subject, Message

Alternatively, you can:
- View the page source (Ctrl+U) and search for "entry."
- The entry IDs will be in the format: `entry.XXXXXXXXXX`

