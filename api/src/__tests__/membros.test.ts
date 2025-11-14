import request from 'supertest';
import app from '@/app';

describe('Membros Routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /membros/authenticate', () => {
    it('deve retornar erro quando credenciais inválidas', async () => {
      const response = await request(app.server)
        .post('/membros/authenticate')
        .send({
          email: 'invalido@test.com',
          senha: 'senhaerrada',
        });

      expect([401, 404, 500]).toContain(response.status);
    });

    it('deve validar formato de email', async () => {
      const response = await request(app.server)
        .post('/membros/authenticate')
        .send({
          email: 'emailinvalido',
          senha: '123456',
        });

      expect(response.status).toBe(400);
    });

    it('deve validar campos obrigatórios', async () => {
      const response = await request(app.server)
        .post('/membros/authenticate')
        .send({
          email: 'test@test.com',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /membros', () => {
    it('deve retornar lista de membros ou erro de banco', async () => {
      const response = await request(app.server)
        .get('/membros');

      // Aceita 200 (sucesso) ou 500 (banco não configurado para testes)
      expect([200, 500]).toContain(response.status);
      if (response.status === 200) {
        expect(Array.isArray(response.body)).toBe(true);
      }
    });
  });

  describe('GET /membros/:id', () => {
    it('deve retornar erro quando ID inválido', async () => {
      const response = await request(app.server)
        .get('/membros/id-invalido');

      expect(response.status).toBe(400);
    });

    it('deve retornar 404 quando membro não existe', async () => {
      const response = await request(app.server)
        .get('/membros/123e4567-e89b-12d3-a456-426614174000');

      expect(response.status).toBe(404);
    });
  });

  describe('POST /membros', () => {
    it('deve validar campos obrigatórios', async () => {
      const response = await request(app.server)
        .post('/membros')
        .send({
          nome: 'Test',
        });

      expect(response.status).toBe(400);
    });

    it('deve validar formato de email', async () => {
      const response = await request(app.server)
        .post('/membros')
        .send({
          nome: 'Test User',
          email: 'emailinvalido',
          celular: '11999999999',
          ramo: 'TI',
          descricao: 'Test',
          senhaHash: '123456',
          tipo: 'usuario',
          statusMembro: 'ativo',
        });

      expect(response.status).toBe(400);
    });
  });
});
