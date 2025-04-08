# **Hilton Reservation System**

## **Technologies Used**

### **Frontend**
- **React.js**:
  - For building a dynamic and responsive user interface.
- **Apollo Client**:
  - For interacting with the GraphQL API.
- **Axios**:
  - For making REST API calls.
- **CSS/Bootstrap**:
  - For styling the application.

### **Backend**
- **LoopBack 4**:
  - For building REST APIs with OpenAPI support.
- **TypeScript**:
  - For static typing and improved developer productivity.
- **GraphQL**:
  - For flexible and efficient data querying.
- **Apollo Server**:
  - For serving the GraphQL API.
- **Type-GraphQL**:
  - For defining GraphQL schemas using TypeScript decorators.
- **MongoDB**:
  - For storing reservation data.

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16 or later)
- npm (v8 or later)
- MongoDB

---

### **Installation**

#### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/FeiZhan/hilton.git
   cd hilton/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=4000
     MONGODB_URL=mongodb://localhost:27017/hilton
     ```

4. Start the database:
   ```bash
   mongod
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

6. Access the backend:
   - [http://localhost:4000/explorer](http://localhost:4000/explorer)

---

#### **Frontend**
1. Navigate to the `frontend` directory:
   ```bash
   cd hilton/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

4. Access the frontend:
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Testing**

### **Backend Tests**
Run the backend test suite:
```bash
cd backend
npm test
```

### **Frontend Tests**
Run the frontend test suite:
```bash
cd frontend
npm test
```

---

## **Project Structure**

### **Backend**
```
backend/
├── src/
│   ├── application.ts       # Main application setup
│   ├── index.ts             # Entry point
│   ├── controllers/         # REST API controllers
│   ├── graphql/             # GraphQL resolvers and schema
│   ├── models/              # Data models
│   ├── repositories/        # Database repositories
│   ├── sequence.ts          # Custom sequence for request handling
├── tests/                   # Unit and integration tests
├── package.json             # Project dependencies and scripts
└── README.md                # Backend documentation
```

### **Frontend**
```
frontend/
├── src/
│   ├── components/          # React components
│   ├── pages/               # Application pages
│   ├── services/            # API service integrations
│   ├── App.tsx              # Main React component
│   ├── index.tsx            # Entry point
│   └── tests/               # Unit and integration tests
├── package.json             # Project dependencies and scripts
└── README.md                # Frontend documentation
```
