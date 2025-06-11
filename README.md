# Hotel Group Booking Enquiry Application

This is a Next.js 15 application designed to facilitate group booking enquiries for hotels. It features a multi-step form that collects contact details, booking preferences, and room requirements, with internationalization (i18n) support for English and German.

## ✨ Features

- **Multi-Step Group Booking Form**: A user-friendly, segmented form for collecting comprehensive booking details.

- **Internationalization (i18n)**: Fully localized for **English (en)** and **German (de)**, ensuring a global user experience.

  - Leverages i18n for seamless integration with Next.js 15's App Router.

  - Dynamic locale loading based on URL segments (`/en`, `/de`).

  - Middleware-based locale detection and redirection for un-prefixed routes.

- **Form Validation**: Client-side validation using `react-hook-form` ensures data integrity before submission.

- **Accordion-Style Sections**: The form is organized into collapsible sections (Accordions) for improved user flow and readability.

- **Section-Based Navigation**: "Continue" buttons within each accordion trigger validation for the current section before opening the next.

- **API Submission**: Form data is submitted asynchronously to a backend API endpoint (`/api/groupEnquiry`).

- **Responsive Design**: Built with Tailwind CSS, ensuring the form looks great on various screen sizes (mobile, tablet, desktop).

- **Robust Error Handling**: Client-side alerts provide immediate feedback on API submission success, validation errors, and network issues.

- **UnitTesting**: Set up with Jest and React Testing Library (RTL) for robust testing of components and their interactions.

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```
    git clone [your-repo-url]
    cd hotel-enquiry
    ```

2.  **Install dependencies:**

    ```
    npm install
    # or
    yarn install
    ```

3.  **Configure i18n:**

    - Make sure your locale translation files (`en/groupBookingForm.json`, `de/groupBookingForm.json`) are in `public/locales/`.

4.  **Run the development server:**

    ```
    npm run dev
    # or
    yarn dev
    ```

    Open <http://localhost:3000> (or the port specified) in your browser. You should be redirected to `http://localhost:3000/en` or `http://localhost:3000/de` based on your default locale.

5.  **Run tests:**

    ```
    npm test
    # or
    yarn test
    ```

## 🔮 Next Phase Items

Here are some ideas for future enhancements and features:

- **Backend Integration**: Implement the actual `/api/groupEnquiry` endpoint to store booking requests in a database (e.g., Firestore) and possibly send confirmation emails.

- **Custom Alert/Modal System**: Replace `window.alert()` with a more user-friendly and styled in-app modal or notification system for feedback and errors.

- **Progress Indicator**: Add a visual progress bar or stepper to show users their progress through the multi-step form.

- **Dynamic Form Fields**: Implement logic for conditionally showing/hiding form fields based on previous selections (e.g., show "Company Name" only if "Booker Type" is "business").

- **Date Pickers**: Enhance date input fields with intuitive date picker components.

- **Loading States**: Add loading indicators for form submission and other asynchronous operations.

- **Accessibility Improvements**: Conduct a thorough accessibility audit and implement ARIA attributes, keyboard navigation, and focus management improvements.

- **Automated Testing**: Expand test coverage to include more comprehensive integration and end-to-end (E2E) tests using tools like Playwright or Cypress.

- **Confirmation Page**: Instead of an alert, redirect users to a dedicated confirmation page after successful submission.

- **Admin Dashboard**: Develop an admin interface to view and manage incoming group booking requests.
