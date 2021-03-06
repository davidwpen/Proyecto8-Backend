"use strict";

const sendgrid = require("@sendgrid/mail");

async function mandarEmailDeRegistro(nombre, email, codigoVerificacion) {
  const { HTTP_SERVER_DOMAIN, SENDGRID_KEY, SENDGRID_MAIL_FORM } = process.env;

  const linkActivacion = `${HTTP_SERVER_DOMAIN}/api/v1/proyecto8/usuarios/activacion?codigo_verificacion=${codigoVerificacion}`;
  //   console.log("linkActivation", linkActivacion);
  sendgrid.setApiKey(SENDGRID_KEY);
  const contenidoEmail = {
    from: SENDGRID_MAIL_FORM,
    to: email,
    subject: "Bienvenido a Proyecto8",
    text: `Hola ${nombre}.\nBienvenido a Proyecto8, la plataforma numero 1 en compra-venta de tecnologia retro.\nPara continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}`,
    html: `<h1>Hola ${nombre}.</h1><p>Bienvenido a Proyecto8, la plataforma número 1 en compra-venta de tecnologia retro.</p><p>Para continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}</p>`,
  };

  await sendgrid
    .send(contenidoEmail)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

async function mandarEmailDeValidacionCorrecta(nombre, email, text, html) {
  const { HTTP_SERVER_DOMAIN, SENDGRID_KEY, SENDGRID_MAIL_FORM } = process.env;

  sendgrid.setApiKey(SENDGRID_KEY);
  const contentEmail = {
    from: SENDGRID_MAIL_FORM,
    to: email,
    subject: "Tu cuenta se ha activado correctamente",
    text: `Hola ${nombre}.\n¡Tu cuenta se ha activado correctamente!`,
    html: `<h1>Hola ${nombre}.</h1><p>¡Tu cuenta se ha activado correctamente!</p>`,
  };

  //   await sendgrid.send(contentEmail);
}

module.exports = { mandarEmailDeRegistro, mandarEmailDeValidacionCorrecta };
