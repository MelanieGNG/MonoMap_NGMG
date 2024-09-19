import { envs } from '../../src/config/envs.plugin';

export function generateMonoCaseEmailTemplate(lat: number, lng: number, genre: string, age: number, creationDate: Date): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalles del Incidente</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f3e5f5;
                color: #4a148c;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 1px solid #d1c4e9;
            }
            .header {
                background-color: #7b1fa2;
                color: #ffffff;
                padding: 20px;
                text-align: center;
                border-bottom: 4px solid #4a148c;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                letter-spacing: 1px;
            }
            .content {
                padding: 20px;
                color: #4a148c;
            }
            .content p {
                margin: 12px 0;
                line-height: 1.5;
            }
            .content p strong {
                color: #6a1b9a;
            }
            .map-img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                margin-top: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .footer {
                background-color: #f3e5f5;
                color: #7b1fa2;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                border-top: 1px solid #d1c4e9;
            }
            .footer p {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>DETALLES DEL CASO</h1>
            </div>
            <div class="content">
                <p><strong>Género de la persona:</strong> ${genre}</p>
                <p><strong>Edad de la persona:</strong> ${age}</p>
                <p><strong>Fecha del caso:</strong> ${creationDate.toLocaleDateString('es-ES')}</p>
                <p><strong>Latitud:</strong> ${lat}</p>
                <p><strong>Longitud:</strong> ${lng}</p>
                <img src="${mapboxUrl}" class="map-img" alt="Mapa del incidente" />
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const zoom = 13; // Nivel de zoom
    const width = 800; // Ancho de la imagen
    const height = 500; // Altura de la imagen

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}
