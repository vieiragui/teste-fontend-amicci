import express, { Request, Response } from 'express';
import axios from 'axios';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

// Configuração do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Geocoding API Example',
            version: '1.0.0',
            description: 'API para obter coordenadas de endereços usando Geocoding API do Google',
        },
    },
    apis: ['src/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   - name: Geocoding
 *     description: Operações relacionadas a Geocoding
 */

/**
 * @swagger
 * /geocode:
 *   get:
 *     summary: Obter coordenadas de um endereço
 *     tags:
 *       - Geocoding
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         description: Endereço para geocodificar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coordenadas de latitude e longitude
 *         content:
 *           application/json:
 *             example: { "latitude": 37.4224764, "longitude": -122.0842499 }
 *       400:
 *         description: Erro ao processar a solicitação
 *         content:
 *           application/json:
 *             example: { "error": "Endereço não fornecido" }
 */
app.get('/geocode', (req: Request, res: Response) => {
    const address = req.query.address as string;

    if (!address) {
        return res.status(400).json({ error: 'Endereço não fornecido' });
    }

    const apiKey = process.env.GOOGLE_API_KEY as string;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    axios.get(apiUrl)
        .then(response => {
            const location = response.data.results[0].geometry.location;
            res.status(200).json({ latitude: location.lat, longitude: location.lng });
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).json({ error: 'Erro ao obter dados de geocoding' });
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});