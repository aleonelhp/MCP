# MCP
A simple MCP to fetch the weather information, tourist attractions and points of interest in a city.

Features

Get current weather information for any city<br>
Find tourist attractions, restaurants, cafes, and parks<br>
Real-time data from public APIs

Installation<br>
bashnpm install<br>
npm run build<br>
Configuration<br>
Add to your Claude Desktop config file:<br>
MacOS: ~/Library/Application Support/Claude/claude_desktop_config.json<br>
Windows: %APPDATA%\Claude\claude_desktop_config.json<br>
json{<br>
  "mcpServers": {<br>
    "weather-places": {<br>
      "command": "node",<br>
      "args": ["/absolute/path/to/your/project/build/main.js"]<br>
    }<br>
  }<br>
}<br>
Restart Claude Desktop.<br>
Tools<br>
fetch-weather<br>
Gets weather data for a city including temperature, humidity, precipitation, and wind speed.<br>
Parameters:

city (string): City name

fetch-places<br>
Finds points of interest within 5km of a city center including tourist attractions, restaurants, cafes, and parks.<br>
Parameters:

city (string): City name

APIs Used

Open-Meteo - Weather and geocoding data<br>
Overpass API - OpenStreetMap places data

License<br>
MIT
