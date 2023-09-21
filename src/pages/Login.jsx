import { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    Password: "",
  });

  const [error, setError] = useState(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, Password } = formData;

    if (!emailRegex.test(email)) {
      setError("Por favor, ingrese una dirección de correo electrónico válida.");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      ".AspNetCore.Identity.Application=CfDJ8MXnb05jMYFDkLrDzBQ0NgJAlqiyu-3NvVFbMZuQCfliS4eppkfcu2UwRiWM1sKk_cMTVCntWVZ3ix4rbQ2i5xCRvoNTd20vJsTh5UGfNK3LxuCJkczMrCWT1S9DqHR169bpfb0BOfvg2KuBnUW7WvqOW6yuhrFiYbfjGyEnjQUJWHaJQcJmZJQr335zcURxNSwrkmXw98sipUjdjpzvPOrR42k7ByeLH21MZ-Wd5EfxOlkQmlH2VCgk_ITJd_TNxi2S0XUYf2GVJD0pPfuKYcAbZLzIEipGf1xtsIZ_4qWPpGHJIl5Xao95Bc10HBXEgdPaRpSa50KuoL-WsB9HPlps4jBj2ebiHt88uNAGvJI9rxabAra3mRJgTJHb0EhaFKkp7A3KtZXrTEEb1J4fSCqCd-7XpEcdCnqG_refrC7yURgklx3_7dMi2iN5LvbJqf4yLpvkyAnQKyav9o7CBFf1zp0LBb3PjB5JmPKAgUfl06IehAr5YnJysTbiUM8a5OG0uCpudfyve9R0CDKVH18c2yQY5jqghKh0y7wh_sNfOtWJjU0vgpAg1vkM-2Eb8bFUKu_Ux23HkXWYCxwfz3t6KO9ZTszdSGnOrF846e-WoJBXynjoiy5cW1TBsKXHTQA_gsfWlL3j1UxjrUpH8gFyHV6IzuVZJ27v5rxsKCoZYQMB3oU4_a9v7rDlriRLXMrVDIcjMFW7Z_YpGkdo5zTCQ-JrLZ6S6mIWTTB2eiuhUf6YHXX60VE2OT_Lwi_MfjW5KfbX6jTi-PsnTLjH-q2S-rqgWpdtGTfRcchxcWKIHPnJqkSIHPEMKfWoGufAjP1XiFZxaPXTBClhv11rUJ_AW9q0PQxWlUwD3sd1JPky5qM_dNcr1s8G9pcqccoMlg"
    );

    var raw = JSON.stringify({
      "Email": email,
      "Password": Password
    });

    fetch(import.meta.env.VITE_REACT_APP_API_URL + "api/cuentas/login", {
      method: "POST",
      headers: myHeaders,
      body: raw
    })
      .then((response) => {
        if (!response.ok) {
          setError("Los campos son incorrectos. Por favor, inténtalo de nuevo.");
          throw new Error("Error en la solicitud");
        }
        return response.text();
      })
      .then((result) => {
        var value = JSON.parse(result);
        localStorage.setItem("token", value.token);
        localStorage.setItem("email", email);
        console.log(JSON.parse(result));
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        localStorage.setItem("role", decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
        localStorage.setItem("expiration", value.expiration);
        window.location.href = "/main"
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="login-container">
      <h1>Dirección Administrativa</h1>
      <img src="https://192.168.10.100/images/logotipo.png" alt="No carga" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Example@mail.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Contraseña:</label>
          <input
            type="Password"
            id="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            placeholder="*********"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
