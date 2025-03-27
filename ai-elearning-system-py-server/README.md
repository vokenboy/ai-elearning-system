# FastAPI Project Setup and Usage

## Prerequisites

Ensure you have the following installed on your system:

-   Python 3.8+
-   pip (Python package manager)
-   virtualenv (optional but recommended)

## Installation

### 1. Create a Virtual Environment (Optional but Recommended)

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

## Running the FastAPI Application

### 1. Start the Server

Run the following command:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

-   `main` refers to the Python file containing the FastAPI instance (`app = FastAPI()`).
-   `--reload` enables auto-reloading during development.

### 2. Access the API

Once the server is running, you can access:

-   Interactive API Docs (Swagger UI): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
-   Alternative API Docs (ReDoc): [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Environment Variables

Create a `.env` file to store sensitive configurations:

```env
GOOGLE_API_KEY=your_secret_key_here
```
