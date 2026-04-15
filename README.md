# 📱 Spatlas — Setup

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/lOskar96/spatlas.git
cd spatlas
```

### 2. Agregar variables de entorno

Agregar un archivo .env con la API_KEY de google para poder visualizar correctamente los mapas y las base_urls de los endpoints tanto del core como del auth

```bash
GOOGLE_MAPS_API_KEY=TU_API_KEY
AUTH_BASE_URL=https://api.spherag.com
CORE_BASE_URL=https://apicore.spherag.com
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar la aplicación

Para ejecutar la aplicación en un emulador Android (Windows)

```bash
npm run android
```

Para ejecutar la aplicación en un emulador iOS (Mac)

```bash
npm run ios
```

Para ejecutar la aplicación con Expo Go y poder lanzarla desde tu móvil (Los mapas no funcionan con Expo Go)

```bash
npm run start
```

## ⚙️ Requisitos

- Node.js >= 20
- npm || yarn || pnpm
