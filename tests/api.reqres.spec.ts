import { test, expect } from '@playwright/test';

test.describe('ReqRes API', () => {
  // Override baseURL + headers just for this file:
  test.use({
    baseURL: 'https://reqres.in/api',
    extraHTTPHeaders: {
      // use env var if set, otherwise fall back to demo key
      'x-api-key': process.env.REQRES_API_KEY ?? 'reqres-free-v1',
    },
  });

  test('GET /users?page=2 returns users', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/users`, { params: { page: 2 } });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('email');
  });

  test('POST /login succeeds with valid creds', async ({ request, baseURL }) => {
    const res = await request.post(`${baseURL}/login`, {
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    });
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
  });

  test('POST /login fails without password', async ({ request, baseURL }) => {
    const res = await request.post(`${baseURL}/login`, {
      data: { email: 'eve.holt@reqres.in' },
    });
    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body.error).toMatch(/missing password/i);
  });

  test('POST /users creates resource', async ({ request, baseURL }) => {
    const payload = { name: 'morpheus', job: 'leader' };
    const res = await request.post(`${baseURL}/users`, { data: payload });
    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});
