Frontend for Job Management System

This is the frontend of a job management system built using React, designed to handle user registration, job postings, applications, and management for both companies and job seekers. The frontend interacts with the backend API to retrieve and display job-related data.
Table of Contents

    Technologies Used
    Installation
    Environment Variables
    Folder Structure
    Main Components
        Authentication
        Profile Pages
        Advertisements
        Applications
    Routing
    State Management
    API Communication
    Running Tests

Technologies Used

    React: Frontend JavaScript library for building user interfaces
    React Router: For handling client-side routing
    Axios: For HTTP requests
    Bootstrap/CSS: For responsive styling (optional if using CSS frameworks)
    dotenv: For managing environment variables

Installation

    Clone the repository:

    bash

git clone git@github.com:EpitechMscProPromo2027/T-WEB-501-PAR_49.git
cd your-repo/client

Install the dependencies:

bash

npm install

Start the development server:

bash

    npm start

    This will start the frontend server on http://localhost:3000.

Environment Variables

Make sure to create a .env file in the root directory to store environment variables, such as the API URL for the backend:


REACT_APP_API_URL=http://localhost:5000

This allows your frontend to communicate with the backend via axios.
Folder Structure


Main Components
Authentication

Authentication is handled using JWT tokens. Upon login, a token is retrieved from the backend and stored in localStorage. It is used for authenticated requests.

    Login Component: (src/Components/home/FormLogin.js)
        Provides a login form for companies and applicants.
        Uses axios to send login requests to /company/login or /people/login.
    SignUp Component: (src/Components/home/FormSignInPeople.js and src/Components/home/FormSignInCompany.js)
        Handles the user registration for applicants and companies.
        Sends data to the respective backend endpoints for sign-up.

Profile Pages

Two types of profiles exist: company profiles and people profiles.

    ProfileCompany Component: (src/Pages/ProfileCompany.js)
        Displays company information and allows companies to add, update, or delete job advertisements.
        Uses axios to interact with the backend API to retrieve and manage job listings.
    ProfilePeople Component: (src/Pages/ProfilePeople.js)
        Displays the applicant's profile and lists all their job applications.
        Allows applicants to view and manage their applications.

Advertisements

Advertisements (or job offers) are managed through the FormRegisterAd, FormUpdateAd, and TableAds components.

    FormRegisterAd Component: (src/Components/profiles/company/FormRegisterAd.js)
        Allows companies to create new job offers.
    TableAds Component: (src/Components/profiles/company/TableAds.js)
        Lists all job advertisements for a specific company, with options to update or delete each ad.
    FormUpdateAd Component: (src/Components/profiles/company/FormUpdateAd.js)
        Allows companies to update job offers.

Applications

Applications are handled by the FormApplyJob and TableApplications components.

    FormApplyJob Component: (src/Components/ads/FormApplyJob.js)
        Allows applicants to apply for jobs.
    TableApplications Component: (src/Components/profiles/people/TableApplications.js)
        Displays the list of job applications for the user.

Routing

React Router is used for handling client-side routing. Key routes are:

js

<Route path="/profile/company/:id" element={<ProfileCompany />} />  // Company profile page

<Route path="/profile/people/:id" element={<ProfilePeople />} />   // Applicant profile page

<Route path="/ad/:id" element={<Ad />} />                         // Job ad details

<Route path="/" element={<Home />} />                             // Home page

<Route path="*" element={<ErrorPage />} />                        // Error 404 page  ---- cute asf 

Each route corresponds to a specific page in the application. The :id parameter is used to dynamically load content for specific users or job offers.

State Management :

For state management, the project uses React's built-in hooks (useState, useEffect).

    useState: Manages component-level states like form inputs, loading states, and messages.
    useEffect: Handles side-effects like fetching data from the backend on component mount (e.g., fetching company info or job ads).

Example:

js

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ad/get-ads`)
    .then(res => {
    setAds(res.data);
    setLoading(false);
    })
    .catch(err => console.error("Error fetching ads:", err));
    }, []);

API Communication

Axios is used for making HTTP requests to the backend API. The base URL is configured in the .env file.
Example:

js

    axios.get(`${process.env.REACT_APP_API_URL}/ad/get-ads/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
    setAds(response.data);
    })
    .catch(error => {
    console.error("Error fetching job ads:", error);
    });

Authentication Header: Helper function authHeader() is used to retrieve and attach the JWT token to authenticated requests.

js

    export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
    }
    return {};
    };

Deployment

The project is built using npm run build, which creates an optimized production build in the build folder.

To deploy the application:

    Run the following command to create the production build:

    bash

    npm run build --production

Deploy the build folder to your preferred hosting provider (e.g., Netlify, Vercel, AWS S3)