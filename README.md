# HealthVault: Secure Health Information Management and Predictive Analytics

## Project Overview

HealthVault is a comprehensive application designed to securely store user health information, generate detailed health reports, and leverage advanced predictive analytics using synthetic datasets. The project aims to provide a secure vault for health records, generate comprehensive PDF reports, and utilize generative AI for health insights and predictions.

## Features

1. **Secure Vault for Health Records:**
   - Securely store user health records with encryption and access controls.
   - User authentication and authorization.

2. **PDF Generation:**
   - Generate neatly formatted PDF reports containing user health information.
   - Provide users with the option to download their health reports.

3. **Generative AI for Health Insights:**
   - Analyze user-uploaded content using generative AI APIs.
   - Provide health insights, summaries, areas of concern, drug information, and side effects.

4. **Advanced Predictive Analytics:**
   - Preprocess real-world medical records into a format compatible with the PyHealth library.
   - Perform predictive tasks such as mortality prediction, drug recommendation, sequential drug recommendation, and diagnosis prediction using synthetic datasets like MIMIC-III.

## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces. React is used to create a responsive and interactive frontend for the application.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs. Tailwind CSS is used to style the frontend components and ensure a consistent and modern look and feel.

### Backend

- **Flask:** A lightweight WSGI web application framework in Python. Flask is used to build the backend API for handling user authentication, health record storage, and PDF generation.
- **SQLAlchemy:** An SQL toolkit and Object-Relational Mapping (ORM) library for Python. SQLAlchemy is used to interact with the database and manage health records.

### Database

- **Firebase:** A platform developed by Google for creating mobile and web applications. Firebase is used for user authentication and real-time database storage.

### AI and Machine Learning

- **PyHealth:** A Python library for healthcare predictive modeling and analysis. PyHealth is used to preprocess medical records and perform predictive tasks using synthetic datasets like MIMIC-III.
- **Generative AI APIs:** APIs for analyzing user-uploaded content and providing health insights. These APIs are integrated into the backend to enhance the application's functionality.

## Project Structure

- **Frontend:** The frontend is built using React and styled with Tailwind CSS. It provides a user-friendly interface for uploading health records, viewing health information, and downloading PDF reports.
- **Backend:** The backend is built using Flask and SQLAlchemy. It handles user authentication, health record storage, PDF generation, and integration with generative AI APIs.
- **Database:** Firebase is used for user authentication and real-time database storage. It ensures secure and efficient management of user data.
- **AI and Machine Learning:** PyHealth is used for preprocessing medical records and performing predictive tasks. Generative AI APIs are integrated into the backend to provide health insights.

## Contributing

We welcome contributions to the HealthVault project. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## Acknowledgements

We would like to thank the developers of React, Tailwind CSS, Flask, SQLAlchemy, Firebase, PyHealth, and generative AI APIs for their amazing tools and libraries that made this project possible.
