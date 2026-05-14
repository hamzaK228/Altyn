// API Client — connects React frontend to Express backend

const API_BASE = '/api';

// Token management
let authToken: string | null = localStorage.getItem('altyn_token');

export function setToken(token: string) {
  authToken = token;
  localStorage.setItem('altyn_token', token);
}

export function clearToken() {
  authToken = null;
  localStorage.removeItem('altyn_token');
}

export function getToken(): string | null {
  return authToken;
}

// Generic fetch wrapper
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// ─── Auth ───
export const authAPI = {
  register: (email: string, password: string, name: string) =>
    request<{ success: boolean; token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    request<{ success: boolean; token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () =>
    request<{ success: boolean; data: any }>('/auth/me'),
};

// ─── Gold ───
export const goldAPI = {
  getPrice: () =>
    request<{ success: boolean; data: { price: number; currency: string; changePercent: string; priceUSD: number } }>('/gold/price'),

  getHistory: () =>
    request<{ success: boolean; data: Array<{ price: number; timestamp: string }> }>('/gold/history'),

  getStats: () =>
    request<{ success: boolean; data: any }>('/gold/stats'),
};

// ─── Portfolio ───
export const portfolioAPI = {
  get: () =>
    request<{ success: boolean; data: { balanceKGS: number; goldWeightG: number; goldValueKGS: number; totalValueKGS: number; currentGoldPrice: number } }>('/portfolio'),

  buy: (kgsAmount: number) =>
    request<{ success: boolean; data: any }>('/portfolio/buy', {
      method: 'POST',
      body: JSON.stringify({ kgsAmount }),
    }),

  sell: (goldAmountG: number) =>
    request<{ success: boolean; data: any }>('/portfolio/sell', {
      method: 'POST',
      body: JSON.stringify({ goldAmountG }),
    }),

  getTransactions: () =>
    request<{ success: boolean; data: Array<any> }>('/portfolio/transactions'),
};
