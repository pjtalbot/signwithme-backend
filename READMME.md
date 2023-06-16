# SignWithMe-backend

SignWithMe is a web application that allows users to search and save sign language GIFs from sign language creators using the Giphy API. The repo for the frontend is https://github.com/pjtalbot/signwithme-frontend

## Features

- Search for sign language GIFs using keywords or phrases.
- Save favorite GIFs to your personal collection.
- Organize GIFs into folders or categories.
- Accessibility features for an inclusive experience.

## Technologies Used

- Express.js
- PostgresQL
- Jest testing library

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pjtalbot/signwithme-backend.git
```
2.

```bash
cd signwithme-backend
```
3. Install dependencies
```bash
npm install
```

4. Globally install PSQL Command Line Interface


5. create databases
    ```bash
createdb signwithme
createdb signwithme_test
```

6. Create create tables

    ```bash
psql signwithme > schema.sql
psql signwithme_test > schema-test.sql
```

7. start developement server
```bash
npm run devStart
```



