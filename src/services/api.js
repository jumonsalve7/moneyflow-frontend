const API_URL = 'http://localhost:5000/api';

// Obtener el token del localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Headers para peticiones autenticadas
const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// ==================== TRANSACTIONS ====================

// Obtener todas las transacciones del usuario
export const getTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch transactions');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error in getTransactions:', error);
    throw error;
  }
};

// Obtener una transacción por ID
export const getTransaction = async (id) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch transaction');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error in getTransaction:', error);
    throw error;
  }
};

// Crear nueva transacción
export const createTransaction = async (transaction) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(transaction)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create transaction');
    }
    
    const data = await response.json();
    console.log('📦 Transaction created:', data.data);
    return data.data; // ✅ Devuelve el objeto con _id de MongoDB
  } catch (error) {
    console.error('Error in createTransaction:', error);
    throw error;
  }
};

// Actualizar transacción existente
export const updateTransaction = async (id, transaction) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(transaction)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update transaction');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error in updateTransaction:', error);
    throw error;
  }
};

// Eliminar transacción
export const deleteTransaction = async (id) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete transaction');
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error in deleteTransaction:', error);
    throw error;
  }
};

// ==================== AUTH ====================

// Registrar nuevo usuario
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};

// Iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Error in loginUser:', error);
    throw error;
  }
};

// Obtener información del usuario autenticado
export const getMe = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get user info');
    }
    
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error in getMe:', error);
    throw error;
  }
};

// Cerrar sesión (eliminar token local)
export const logout = () => {
  localStorage.removeItem('token');
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// ==================== HEALTH CHECK ====================

// Verificar estado del backend
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return { status: 'ERROR', message: 'Backend not reachable' };
  }
};