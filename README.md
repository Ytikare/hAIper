# hAIper - Your Digital Task Assistant

## What is this app?
hAIper a friendly web application that helps you create and manage digital forms and workflows. Think of it like a smart form builder that can do more than just collect information - it can also process it and take actions based on what you submit.

## What can you do with it?
- Create custom forms with different types of fields (text, numbers, dates, file uploads, etc.)
- Fill out forms step by step
- Track your progress as you complete forms
- Submit information and get responses back
- Switch between light and dark modes for comfortable viewing

## For Regular Users

### How to use the app:
1. Go to the main page
2. You'll see a list of available workflows (forms)
3. Click on the workflow you want to use
4. Fill in the information requested
5. Submit your form
6. Track the progress of your submission

### Types of fields you can use:
- Text boxes for writing
- Number fields
- Date pickers
- Dropdown menus for selecting options
- File upload areas
- Email fields
- Large text areas for longer responses

## For Administrators
You can:
- Create new workflows
- Set up form validation rules
- Configure what happens after form submission
- Manage existing workflows

## For Developers

#### Note
- Workflow data is assumed to come from a external api or server
- If its going to be used with a different URL for workflow information from the one used in this repo, it is adviced to change URL and endpoints in src\services\workflow-service.ts to work properly
- If you want the app to work on another port, you can change it at the package.json @ scripts: start

### Requirements:
- Node.js
- npm (comes with Node.js)

### How to set up:
1. Get the code:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   cd [project-folder]
   npm install
   ```

3. Build the app:
   ```bash
   npm run build
   ```

4. Start the app:
   ```bash
   npm start
   ```

5. Open your web browser and go to: `http://localhost:7777`

## Changelog

### Version 0.2.0 (2024-03-11)
#### Enhancements
- Improved form layout and spacing for better user experience
- Enhanced file input styling with modern appearance
- Added better content interaction with selectable text and interactive elements
- Optimized workflow execution layout with flexbox
- Improved responsive design for workflow cards
- Updated landing page with benefit-focused messaging
- Enhanced container widths and margins for better content display
- Added fullscreen support for PDF viewers
- Improved button styling and positioning
- Enhanced form field grouping and validation feedback

## Need Help?
If you're having trouble:
- Ask your administrator for help
- Check with your IT support team
- Report any technical issues to the development team

## Features Coming Soon
- More field types
- Better file handling
- Enhanced validation options
- Improved response handling

---
Made with ❤️ to make form handling easier for everyone
