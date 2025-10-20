// Credenciales hardcodeadas
const USUARIOS_VALIDOS = {
  admin: "admin123",
  usuario1: "pass123",
  parque: "ecologico",
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const errorMessage = document.getElementById("errorMessage")

  // Validar credenciales
  if (USUARIOS_VALIDOS[username] && USUARIOS_VALIDOS[username] === password) {
    // Guardar usuario en sessionStorage
    sessionStorage.setItem("usuario", username)
    // Redirigir a página de compra
    window.location.href = "pages/compra.html"
  } else {
    errorMessage.textContent = "Usuario o contraseña incorrectos"
    errorMessage.classList.add("show")
  }
})
