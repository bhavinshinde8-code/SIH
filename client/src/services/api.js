const API_URL = 'http://localhost:5001/api';

// ==========================================
// 1. Admin Authentication API
// ==========================================
export const loginAdminApi = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/admin-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Admin login failed');
  }
  return data;
};

// Fetch real registered users from MongoDB for Admin Dashboard
export const fetchAdminUsersApi = async (token) => {
  const response = await fetch(`${API_URL}/auth/admin/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch registered users');
  }
  return data;
};

// ==========================================
// 2. User / Traveler Authentication & SMS OTP API
// ==========================================

// Send OTP to phone number via SMS
export const sendUserOtpApi = async (phone) => {
  const response = await fetch(`${API_URL}/auth/user/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to send SMS OTP');
  }
  return data;
};

// Register new User with SMS OTP
export const registerUserApi = async ({ name, email, password, phone, otp }) => {
  const response = await fetch(`${API_URL}/auth/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, phone, otp }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};

// Login user with Email / Phone & Password
export const loginUserApi = async (emailOrPhone, password) => {
  const response = await fetch(`${API_URL}/auth/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailOrPhone, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'User login failed');
  }
  return data;
};

// Login user directly via SMS OTP
export const loginUserWithOtpApi = async (phone, otp) => {
  const response = await fetch(`${API_URL}/auth/user/login-with-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, otp }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'OTP login failed');
  }
  return data;
};

// Get User Profile
export const getUserProfileApi = async (token) => {
  const response = await fetch(`${API_URL}/auth/user/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user profile');
  }
  return data;
};

// ==========================================
// 3. Places CRUD API
// ==========================================
export const fetchPlacesApi = async () => {
  const response = await fetch(`${API_URL}/places`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch places');
  }
  return data;
};

export const createPlaceApi = async (placeData, token) => {
  const response = await fetch(`${API_URL}/places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(placeData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create place');
  }
  return data;
};

export const updatePlaceApi = async (id, placeData, token) => {
  const response = await fetch(`${API_URL}/places/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(placeData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update place');
  }
  return data;
};

export const deletePlaceApi = async (id, token) => {
  const response = await fetch(`${API_URL}/places/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete place');
  }
  return data;
};
