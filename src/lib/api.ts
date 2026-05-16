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

  // Handle empty or non-JSON responses
  const contentType = res.headers.get('content-type');
  let data: any;

  if (contentType && contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch (e) {
      throw new Error('Ошибка обработки ответа сервера (Invalid JSON)');
    }
  } else {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || `Ошибка сервера: ${res.status}`);
    }
    data = text ? { data: text } : {};
  }

  if (!res.ok) {
    throw new Error(data.error || data.message || 'Ошибка запроса');
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

// ─── Withdraw ───
export const withdrawAPI = {
  create: (kgsAmount: number, address?: string, branchId?: string) =>
    request<{ success: boolean; data: any }>('/withdraw', {
      method: 'POST',
      body: JSON.stringify({ kgsAmount, address, branchId }),
    }),
  
  getAll: () =>
    request<{ success: boolean; data: any[] }>('/withdraw'),
};

// ─── Savings ───
export const savingsAPI = {
  create: (name: string, targetGoldG: number, deadline?: string) =>
    request<{ success: boolean; data: any }>('/savings', {
      method: 'POST',
      body: JSON.stringify({ name, targetGoldG, deadline }),
    }),
  
  getAll: () =>
    request<{ success: boolean; data: any[] }>('/savings'),
  
  contribute: (id: string, kgsAmount: number) =>
    request<{ success: boolean; data: any }>(`/savings/${id}/contribute`, {
      method: 'POST',
      body: JSON.stringify({ kgsAmount }),
    }),
};

// ─── DCA ───
export const dcaAPI = {
  create: (amountKGS: number, frequency: string) =>
    request<{ success: boolean; data: any }>('/dca', {
      method: 'POST',
      body: JSON.stringify({ amountKGS, frequency }),
    }),
  
  getAll: () =>
    request<{ success: boolean; data: any[] }>('/dca'),
  
  toggle: (id: string) =>
    request<{ success: boolean; data: any }>(`/dca/${id}/toggle`, {
      method: 'POST',
    }),
};

// ─── Support ───
export const supportAPI = {
  create: (subject: string, message: string, category: string) =>
    request<{ success: boolean; data: any }>('/support', {
      method: 'POST',
      body: JSON.stringify({ subject, message, category }),
    }),
  
  getAll: () =>
    request<{ success: boolean; data: any[] }>('/support'),
  
  getOne: (id: string) =>
    request<{ success: boolean; data: any }>(`/support/${id}`),
  
  reply: (id: string, message: string) =>
    request<{ success: boolean; data: any }>(`/support/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};

// ─── AI ───
export const aiAPI = {
  chat: (message: string) =>
    request<{ success: boolean; data: { message: string; actions?: any[] } }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  
  getForecast: () =>
    request<{ success: boolean; data: any }>('/ai/forecast'),
  
  getSentiment: () =>
    request<{ success: boolean; data: any }>('/ai/sentiment'),
  
  getInsights: () =>
    request<{ success: boolean; data: any[] }>('/ai/insights'),
};

