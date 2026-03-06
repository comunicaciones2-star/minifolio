# app-next

[![Deploy app-next to GitHub Pages](https://github.com/comunicaciones2-star/minifolio/actions/workflows/deploy-app-next-pages.yml/badge.svg)](https://github.com/comunicaciones2-star/minifolio/actions/workflows/deploy-app-next-pages.yml)

Nueva versión del sitio en Next.js + React + TypeScript + Tailwind, sin afectar la versión estática actual.

URL pública (GitHub Pages): https://comunicaciones2-star.github.io/minifolio/

Con el workflow actual, conviven ambas versiones:

- Sitio legacy (raíz): `https://comunicaciones2-star.github.io/minifolio/`
- Cotizador Next.js: `https://comunicaciones2-star.github.io/minifolio/cotizador/`

## Requisitos

- Node.js 20+
- npm 10+

## Ejecutar en local

```bash
cd app-next
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Si el entorno de desarrollo falla por cache de Next (`.next`), usa:

```bash
npm run dev:reset
```

## Build y export estático

```bash
cd app-next
npm run build
```

Con `output: 'export'`, Next genera el sitio estático en `app-next/out`.

## Base path para GitHub Pages

`next.config.ts` usa por defecto:

- `basePath: '/minifolio'`
- `assetPrefix: '/minifolio/'`

Si necesitas otro repo/path, puedes sobrescribirlo por variable de entorno:

```bash
NEXT_PUBLIC_BASE_PATH=/minifolio npm run build
```

## Probar el motor de pricing (3 ejemplos)

```bash
cd app-next
npm run test:pricing
```

## Notas de persistencia y lead

- El wizard guarda estado en `localStorage` (`minifolio:quote:v1`).
- La captura de lead se guarda en historial local (`minifolio:leads:v1`) para soportar `next export`.
- Desde el paso 5 puedes usar **Exportar CSV** para descargar todos los leads locales.
- Se incluye una ruta mock (`/api/lead`) sólo para desarrollo; en export estático no hay backend activo.

## Checklist de release

1. En local: `cd app-next && npm run build`.
2. Verificar que se genere `app-next/out` sin errores.
3. Hacer push a `main`.
4. Revisar workflow **Deploy app-next to GitHub Pages** en Actions.
5. Validar sitio publicado: https://comunicaciones2-star.github.io/minifolio/
6. Probar ruta clave: https://comunicaciones2-star.github.io/minifolio/cotizador/
