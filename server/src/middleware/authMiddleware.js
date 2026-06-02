import jwt from 'jsonwebtoken';
import config from '../config/environment.js';
import { getAuth } from '../config/firebase.js';

const JWT_SECRET = config.jwt.secret;

// Verifica un JWT propio (generado por el servidor)
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado. Token no proporcionado.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
};

// Verifica un Firebase ID token (si el cliente autentica directamente con Firebase Auth)
export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado. Token no proporcionado.',
    });
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token de Firebase inválido o expirado',
    });
  }
};

export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. Rol insuficiente.',
      });
    }
    next();
  };
};
