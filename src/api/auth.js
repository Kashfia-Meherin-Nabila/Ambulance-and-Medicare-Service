const BASE_URL = 'http://localhost/ambulance_api';

export const registerPatient = async (formData) => {
  const res = await fetch(`${BASE_URL}/register_patient.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
};

export const registerDriver = async (formData) => {
  const res = await fetch(`${BASE_URL}/register_driver.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
};

export const loginUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
};