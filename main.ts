import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod'; 

//Crear servidor
const server  = new McpServer({
    name: 'Demo',
    version: '1.0.0'
});

//Herramientas
server.tool(
    'fetch-weather',
    'Tool to fetch the weather of a city',
    {
        city: z.string().describe('City name'),
    },
    async ({city}) => {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
        const data = await response.json()
        
        if (data.lenght === 0) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `No se encontró información para la icudad ${city}`
                    }
                ]
            }
        }

        const { latitude, longitude } = data.results[0]

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,uv_index_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,wind_speed_10m&timezone=auto`)
        const weatherData = await weatherResponse.json()

        
        return {
        content:[
            {
                type:'text',
                text: JSON.stringify(weatherData, null, 2)
            }
         ]
        };
    }
);

server.tool(
    'fetch-places',
    'Tool to fetch tourist attractions and points of interest in a city using Overpass API (OpenStreetMap)',
    {
        city: z.string().describe('City name'),
    },
    async ({city}) => {
        try {
            // Obtener coordenadas de la ciudad
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
            const geoData = await geoResponse.json()
            
            if (!geoData.results || geoData.results.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `No se encontró información para la ciudad ${city}`
                        }
                    ]
                }
            }

            const { latitude, longitude } = geoData.results[0]
            
            // Query de Overpass para lugares turísticos
            const overpassQuery = `
                [out:json];
                (
                    node["tourism"](around:5000,${latitude},${longitude});
                    node["amenity"="restaurant"](around:5000,${latitude},${longitude});
                    node["amenity"="cafe"](around:5000,${latitude},${longitude});
                    node["leisure"="park"](around:5000,${latitude},${longitude});
                );
                out body 100;
            `;

            const placesResponse = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: overpassQuery
            });
            
            const placesData = await placesResponse.json();
            
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(placesData, null, 2)
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error al buscar lugares: ${error}`
                    }
                ]
            }
        }
    }
);

//conexiones
const transport = new StdioServerTransport();
await server.connect(transport);