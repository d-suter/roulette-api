# 🎲 Roulette API 

An API designed to simulate roulette spins across various modes, return results, and validate them.

## 📝 Table of Contents
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Installation

1. 📥 Clone the repository:
```bash
git clone https://github.com/ceodavee/roulette-api.git
```

2. 📍 Navigate to the project directory:
```bash
cd roulette-api
```

3. 📦 Install the required dependencies:
```bash
npm install
```

## 🚀 Usage

🔥 Start the API server:

```bash
npm start
```

## 🌐 API Endpoints

### 🔄 Spin the Roulette

**Endpoint**: `/spin/<mode_or_alias>`

For mode or alias, you can use: `European`, `eu`, `europe`, `French`, `fr`, `france`, `American`, `us`, `usa`, and their respective variants.

**Method**: `GET`

**Example**: `/spin/eu`

**Response**:
```json
{
    "hash": "1a2b3c4d...",
    "number": 12,
    "color": "Red",
    "evenOdd": "even"
}
```

### 🔎 Verify Spin Result

**Endpoint**: `/verify/:hash`

**Method**: `GET`

**Example**: `/verify/1a2b3c4d...`

**Response**:
```json
{
    "mode": "European",
    "number": 12,
    "color": "Red",
    "evenOdd": "even"
}
```
or
```json
{
    "error": "Invalid hash provided"
}
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License

This project is licensed under the MIT License.