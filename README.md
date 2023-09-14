# Roulette API

An API designed to simulate roulette spins, return results, and validate them.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ceodavee/roulette-api.git
```

2. Navigate to the project directory:
```bash
cd roulette-api
```

3. Install the required dependencies:
```bash
npm install
```

## Usage

Start the API server:

```bash
npm start
```

## API Endpoints

### Spin the Roulette

**Endpoint**: `/spin`

**Method**: `GET`

**Response**:
```json
{
    "id": 1,
    "number": 12,
    "color": "Red",
    "hash": "1a2b3c4d..."
}
```

### Verify Spin Result

**Endpoint**: `/verify/:hash`

**Method**: `GET`

**Response**:
```json
{
    "id": 1,
    "number": 12,
    "color": "Red",
    "hash": "1a2b3c4d..."
}
```
or
```json
{
    "error": "Invalid hash provided"
}
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

