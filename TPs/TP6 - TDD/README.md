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
├── backend/                 # Lógica de negocio y tests
│   ├── src/
│   │   ├── models/         # Clases Usuario, Entrada
│   │   ├── Compra.js       # Lógica principal de compra
│   │   └── emailService.js # Servicio de emails
│   ├── tests/              # Tests unitarios con Jest
│   └── package.json
├── frontend/               # Interfaz web (HTML/CSS/JS)
│   ├── index.html         # Login
│   ├── pages/             # Páginas de compra y confirmación
│   ├── js/                # JavaScript vanilla
│   │   └── models/        # Clases compartidas
│   └── css/               # Estilos
└── README.md
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

## 🧪 Tests

Los tests están implementados con **Jest** y cubren:
- ✅ Creación de entradas y usuarios
- ✅ Cálculo de precios por edad y tipo
- ✅ Validación de fechas y horarios
- ✅ Límites de entradas por compra
- ✅ Confirmación de compra con diferentes métodos de pago


## 🛠️ Tecnologías

- **Backend**: Node.js, Jest
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Email**: Nodemailer (Gmail)

## 👥 Grupo 9

Trabajo Práctico de Ingeniería de Software - TDD

---

**Nota**: Este proyecto es con fines educativos.

