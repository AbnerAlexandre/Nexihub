import { loginSchema } from '@/lib/validations/login';

describe('Login Validation', () => {
  it('deve validar email e senha corretos', () => {
    const data = {
      email: 'test@test.com',
      senha: '123456',
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('deve rejeitar email inválido', () => {
    const data = {
      email: 'emailinvalido',
      senha: '123456',
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email inválido');
    }
  });

  it('deve rejeitar senha muito curta', () => {
    const data = {
      email: 'test@test.com',
      senha: '123',
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Senha deve ter no mínimo 6 caracteres');
    }
  });

  it('deve rejeitar email vazio', () => {
    const data = {
      email: '',
      senha: '123456',
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Email é obrigatório');
    }
  });

  it('deve rejeitar senha vazia', () => {
    const data = {
      email: 'test@test.com',
      senha: '',
    };

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Senha é obrigatória');
    }
  });

  it('deve rejeitar quando campos estão ausentes', () => {
    const data = {};

    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
