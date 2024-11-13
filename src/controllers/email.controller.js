import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

global.otpStorage = {};

const enviarMail = async (emailDestino) => {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "valdezadriangildardo@gmail.com",
      pass: "rchtluolueynotpq",
    },
  };

  // Generar OTP
  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const mensaje = {
    from: "valdezadriangildardo@gmail.com", // sender address
    to: emailDestino, // receiver email, passed as an argument
    subject: "Autenticación de Bibliopolis", // Subject line
    text: `Tu código OTP es: ${otp}`, // plain text body
    html: `<b>Tu código OTP es:</b> ${otp}`, // html body
  };

  // Almacenar OTP con un sello de tiempo
  otpStorage[emailDestino] = {
    otp: otp,
    timestamp: new Date().getTime(), // Almacena el momento actual en milisegundos
  };

  const transport = nodemailer.createTransport(config);

  try {
    const info = await transport.sendMail(mensaje);
    console.log("Message sent: %s", info.messageId);
    return { info, otp };
  } catch (error) {
    console.error("Error sending email: ", error);
    return error;
  }
};

const VerifiCarOTP = async (email, otp) => {
  const userData = otpStorage[email];

  if (!userData) {
    return { success: false, message: "No OTP found. Request a new one." };
  }

  const currentTime = new Date().getTime();
  const diff = (currentTime - userData.timestamp) / 1000; // Diferencia en segundos

  if (diff > 300) {
    // 300 segundos = 5 minutos
    return { success: false, message: "OTP expired. Request a new one." };
  }

  if (userData.otp === otp) {
    // Si coincide y no ha expirado, eliminar el OTP del almacenamiento
    delete otpStorage[email];
    return { success: true, message: "OTP is correct." };
  } else {
    return { success: false, message: "Incorrect OTP. Please try again." };
  }
};

export { enviarMail, VerifiCarOTP };
