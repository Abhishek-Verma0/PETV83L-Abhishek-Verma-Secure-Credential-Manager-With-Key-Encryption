<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">
<h1 align="center">🚀 Secure-Creds_GSSoC-2025 </h1>

<!--- Welcome back, Developer! 👋 Ready to continue your learning journey? -->

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=0000FF&center=true&vCenter=true&width=700&lines=Welcome+to+Open+Source+Contribution!;GirlScript+Summer+of+Code+GSSoC+2025!+🎉;Start+this+repo+now!;Fork+it+🚀;Contribute+to+it+🛠️;Commit+to+your+forked+repo+💾;Create+a+Pull+Request+without+conflicts+✅" alt="Typing SVG" />
</div>

**Your Personalized Credential Manager**

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

**📊 Project Insights**

<table align="center">
    <thead align="center">
        <tr>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Closed PRs</b></td>
            <td><b>🛠️ Languages</b></td>
            <td><b>👥 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&logo=github"/></td>
            <td><img alt="Closed PRs" src="https://img.shields.io/github/issues-pr-closed/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&color=critical&logo=github"/></td>
            <td><img alt="Languages Count" src="https://img.shields.io/github/languages/count/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&color=green&logo=github"></td>
            <td><img alt="Contributors Count" src="https://img.shields.io/github/contributors/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption?style=flat&color=blue&logo=github"/></td>
        </tr>
    </tbody>
</table>

---

<h2 align="center">🎯 Open Source Programmes ⭐</h2>

<p align="center">
  <b>This project is now OFFICIALLY accepted for:</b>
</p>

<div align="center">
  <img src="https://github.com/apu52/METAVERSE/assets/114172928/e79eb6de-81b1-4ffb-b6ed-f018bb977e88" alt="GSSOC" width="80%">
</div>

🌟 **Exciting News...**

🚀 This project is now an official part of GirlScript Summer of Code – GSSoC 2025! 💃🎉💻 We’re thrilled to welcome contributors from all over India and beyond to collaborate, build, and grow with DevElevate. Let’s make learning and career development smarter – together! 🌟👨‍💻👩‍💻

👩‍💻 GSSoC is one of India’s **largest 3-month-long open-source programs** that encourages developers of all levels to contribute to real-world projects 🌍 while learning, collaborating, and growing together. 🌱

🌈 With **mentorship, community support**, and **collaborative coding**, it's the perfect platform for developers to:

✨ Improve their skills
🤝 Contribute to impactful projects
🏆 Get recognized for their work
📜 Receive certificates and swag!

🎉 **I can’t wait to welcome new contributors** from GSSoC 2025 to this Secure-Creds project family!
Let’s build, learn, and grow together — one commit at a time. 🔥👨‍💻👩‍💻

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">


# 🔐 Secure Credential Manager
## Make sure to star the repo before working on
A **Secure Credential Manager** built using the **MERN stack (MongoDB, Express, React, Node.js)** with advanced cryptographic features to ensure maximum security. It uses `CryptoJS` and `bcrypt` for encryption and hashing, and `JWT` for session management.

---

## 🚀 Features

- 🔐 **User Authentication** using hashed passwords (`bcrypt`)
- 🔐 **JWT-based Session Management** (expires after 15 minutes)
- 🔐 **Protected Routes**: Only authenticated users can access sensitive routes
- 🔐 **Password Verification** required to perform sensitive operations (even with valid session)
- 🔐 **Credential Encryption** using a unique key .

- 🔐 **Encryption Keys are never stored** in the database or backend memory
- 🔐 **Sensitive data is cleared from memory immediately** after use
- 🔐 **Add / View / Delete credentials** securely
- ⚠️ **Mitigates session hijacking** via enforced re-verification using password


---

## 🧠 Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Encryption/Hashing**: CryptoJS, bcrypt
- **Auth & Session**: JSON Web Tokens (JWT)
- **Security Principles**: Zero knowledge encryption, protected routes, memory safety

---

## 🧰 How It Works

1. ### 🔐 User Registration & Login
 - Passwords are hashed using **bcrypt** before storing in DB.
 - On successful login, a **JWT token** is issued, valid for **15 minutes**.

2. ### 🛡️ Protected Routes
 - All sensitive backend routes require a valid **JWT token**.
 - Unauthorized users are blocked.

3. ### 🧾 Add / View / Delete Credentials
 - Each operation requires **password confirmation**, even if JWT is valid.
 - This ensures protection in case the session token is hijacked.

4. ### 🔑 Encryption Logic
 - Each credential is encrypted with a **unique key**:
   ```
   key = SHA256(salt + credentialUID + userPassword)
   ```
 - The key is never stored.
 - The encrypted data is stored, but key is derived on-the-fly during decryption.

5. ### 🧹 Memory Safety
 - Sensitive keys, raw passwords, and decrypted data are **immediately removed** from memory after use.

---




## 📸 Screenshots

### Landing Page
![Landing Page](./screenshots/landing01.png)
![Landing Page](./screenshots/landing02.png)
![Landing Page](./screenshots/landing03.png)
![Landing Page](./screenshots/landing04.png)

### 🖥️ Registration Page
![Registration Page](./screenshots/registration.png)

### 🖥️ Login Page
![Login Page](./screenshots/login.png)

### 🏠 Dashboard
![Dashboard](./screenshots/dashboard.png)

### 🔐 Add Credential
![Add Credential](./screenshots/credential01.png)
![Add Credential](./screenshots/credential02.png)
![Add Credential](./screenshots/credential03.png)
- After adding creds
![Add Credential](./screenshots/credential04.png)

### 🗂️ View Credentials
![View Credentials](./screenshots/view-creds01.png)
![View Credentials](./screenshots/view-creds02.png)

### 🧰 Delete Credentials
![Re-authenticate](./screenshots/delete-creds01.png)
- After Deleting

![Re-authenticate](./screenshots/delete-creds02.png)




## 🛠️ Setup Instructions

### ⚙️ Prerequisites

- Node.js and npm
- MongoDB and mongoose
- Git

### 📦 Installation

```bash
git clone https://github.com/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption.git

# Install backend dependencies
cd server
npm install

# Setup environment variables
# Add your MongoDB URI and JWT_SECRET in the .env file
  # Server .env
    MONGODB_URL=your mongo url
    JWT_SECRET= your jwt secret
    PORT=5000
  # client .env
   VITE_API_URL= http://localhost:5000/
   VITE_PORT=5173

# Start backend server
npm run dev

# Open new terminal for frontend
cd ../client
npm install

# Start frontend
npm start

```


## 🌟 Support & Contributions

If you like this project, please consider giving it a ⭐ on [GitHub](https://github.com/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption.git)!

### 🤝 Contributing

Contributions are welcome and appreciated!


# 🤝 Contributing to Secure Credential Manager

Thank you for considering contributing to **Secure Credential Manager**! We welcome contributions from developers of all experience levels. Follow this guide to help you get started.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Code Guidelines](#code-guidelines)
- [Git Guidelines](#git-guidelines)
- [Issue Reporting](#issue-reporting)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code of Conduct](#code-of-conduct)

---

## 🏁 Getting Started

1. **Fork the Repository**

   - Click the "Fork" button on the top right of [this repo](https://github.com/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption.git).

2. **Clone your Fork**

   ```bash
   git clone https://github.com/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption.git
   cd PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption
   ```

3. **Install Dependencies**

   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd ../client
     npm install
     ```

4. **Run the App Locally**

   - Backend:
     ```bash
     npm run dev
     ```
   - Frontend:
     ```bash
     npm start
     ```

---

## 🧑‍💻 Code Guidelines

- Write **clean, readable code**.
- Use **meaningful commit messages**.
- Add **comments** for complex logic.
- Follow the existing **folder structure** and **naming conventions**.
- **Test** your features before submitting.

---

## 🌿 Git Guidelines

- Work in a **new branch**:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- **Rebase or merge** latest changes from main before pushing.
- Push to your fork and open a **pull request**.

---

## 🐞 Issue Reporting

If you find a bug or want to request a feature:

1. Go to [Issues](https://github.com/Abhishek-Verma0/PETV83L-Abhishek-Verma-Secure-Credential-Manager-With-Key-Encryption.git).
2. Click `New Issue`.
3. Fill in the template clearly.

Please include logs, screenshots, or steps to reproduce when applicable.

---

## 📤 Submitting a Pull Request (PR)

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add: your-feature-name"
   ```
2. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Go to your fork and click `Compare & Pull Request`.
4. Provide a **clear description** of your changes.
5. Wait for review and feedback!

---

## 💬 Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct:

- Be respectful.
- No harassment or discrimination.
- Keep the community open and inclusive.

---

Thank you again for your interest in contributing! 💙

Happy coding! 🚀

