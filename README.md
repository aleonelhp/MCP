# MCP Weather & Places Server

A simple MCP server that gives Claude the ability to fetch real-time weather data and find tourist attractions in any city.

## Features

- Get current weather information for any city
- Find tourist attractions, restaurants, cafes, and parks
- Real-time data from public APIs

## Installation

```bash
npm install
npm run build
```

## Configuration

Add to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "weather-places": {
      "command": "node",
      "args": ["/absolute/path/to/your/project/build/main.js"]
    }
  }
}
```

Restart Claude Desktop.

## Tools

### fetch-weather
Gets weather data for a city including temperature, humidity, precipitation, and wind speed.

**Parameters:**
- `city` (string): City name

### fetch-places
Finds points of interest within 5km of a city center including tourist attractions, restaurants, cafes, and parks.

**Parameters:**
- `city` (string): City name

## APIs Used

- [Open-Meteo](https://open-meteo.com/) - Weather and geocoding data
- [Overpass API](https://overpass-api.de/) - OpenStreetMap places data

## License

MIT
