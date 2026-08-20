const API_URL = 'http://localhost:5001/api';

// 1. Admin Login with MongoDB authentication
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
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

// 2. Get All Tourist Places from MongoDB
export const fetchPlacesApi = async () => {
  const response = await fetch(`${API_URL}/places`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch places');
  }
  return data;
};

// 3. Create a New Place (Admin protected)
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

// 4. Update a Place (Admin protected)
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

// 5. Delete a Place (Admin protected)
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
