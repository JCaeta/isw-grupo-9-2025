# EcoHarmony Park - Sistema de Compra de Entradas

Sistema web para la compra de entradas al parque EcoHarmony, desarrollado con TDD (Test-Driven Development).

## 🌳 Descripción

EcoHarmony Park es un sistema que permite a los usuarios:
- Iniciar sesión en el sistema
- Seleccionar fecha, hora y cantidad de entradas
- Calcular precios automáticamente según edad y tipo de pase
- Elegir método de pago (efectivo o Mercado Pago)
- Recibir confirmación de compra

## 📂 Estructura del Proyecto
```
TP6 - TDD/
├── backend/                    # Lógica de negocio y tests
│   ├── src/
│   │   ├── models/            # Clases de modelos
│   │   │   ├── Entrada.js     # Modelo de entrada
│   │   │   └── Usuario.js     # Modelo de usuario
│   │   ├── Compra.js          # Lógica principal de compra
│   │   └── emailService.js    # Servicio de emails
│   ├── tests/
│   │   ├── mocks/            # Data de prueba
│   │   │   └── mockData.js   # Datos mock para tests
│   │   └── compra.test.js    # Tests unitarios con Jest
│   └── package.json          # Dependencias y scripts
├── frontend/                  # Interfaz web (HTML/CSS/JS)
│   ├── app-ecoharmony/       # Aplicación principal
│   ├── index.html            # Página de login
│   ├── javascript/           # Scripts JS
│   │   ├── models/          # Modelos compartidos
│   │   │   ├── Compra.js
│   │   │   ├── Entrada.js
│   │   │   └── Usuario.js
│   │   ├── compra.js        # Lógica de compra
│   │   ├── confirmacion.js  # Lógica de confirmación
│   │   └── login.js         # Lógica de login
│   ├── pages/               # Páginas HTML
│   │   ├── compra.html      # Página de compra
│   │   └── confirmacion.html # Página de confirmación
│   ├── styles/              # Estilos CSS
│   │   └── main.css         # Estilos principales
│   └── logo.png             # Logo del proyecto
└── README.md                 # Documentación principal
```

## Documento de Estilo de código utilizado

[Airbnb](https://github.com/airbnb/javascript?tab=readme-ov-file)


## 🎫 Reglas de Negocio

### Precios
- **Regular**: $5,000 (adultos) | $2,500 (niños de 3-10 años/mayores de 60+ años)
- **VIP**: $10,000 (adultos) | $5,000 (niños de 3-10 años/mayores de 60+ años)
- **Gratis**: Menores de 3 años

### Restricciones
- ❌ Parque cerrado todos los **Lunes**
- ❌ Parque cerrado los días **25/12** y **1/1**
- ⏰ Horario: **9:00 AM - 7:00 PM**
- 🎟️ Máximo **10 entradas** por compra
- 👤 Usuario debe estar **registrado** para realizar compra

## 🚀 Instalación y Uso

### Backend (Tests)
```bash
cd backend
npm install
npm test
```

### Frontend

[Paleta de colores solicitada]( https://coolors.co/134611-3e8914-3da35d-96e072-e8fccf)

Simplemente abrir `frontend/index.html` en tu navegador.

**Usuarios de prueba:**
- Usuario: `admin` | Contraseña: `admin123`
- Usuario: `usuario1` | Contraseña: `pass123`
- Usuario: `parque` | Contraseña: `ecologico`

## 📋 Prerrequisitos

- Node.js >= 14.0.0
- npm >= 6.14.0
- Navegador moderno (Chrome, Firefox, Edge)
- Cuenta Gmail para servicio de emails

## 🧪 Tests

### Casos Testeados
#### Tests de Entrada
- ✅ Creación de objetos Entrada con edad y tipo de pase
- ✅ Cálculo correcto de precios:
  - Regular adulto: $5,000
  - VIP adulto: $10,000
  - Regular niño (8 años): $2,500
  - VIP niño: $5,000
  - Menor 3 años: Gratis
  - Adulto mayor: 50% descuento

#### Tests de Compra
- ✅ Validación de usuario registrado
- ✅ Límite máximo de 10 entradas por compra
- ✅ Validación de horarios (9:00-19:00)
- ✅ Validación de días:
  - ❌ Lunes: cerrado
  - ❌ Festivos (25/12, 1/1): cerrado
- ✅ Confirmación de pago:
  - Efectivo: mensaje de boletería
  - Tarjeta: redirección a Mercado Pago
- ✅ Envío de email de confirmación

### Ejecutar Tests
```bash
cd backend
npm test                 # Ejecutar tests
```


## 🛠️ Tecnologías

- **Backend**: Node.js, Jest
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Email**: Nodemailer (Gmail)

## 👥 Grupo 9

Trabajo Práctico de Ingeniería de Software - TDD

---

**Nota**: Este proyecto es con fines educativos.

