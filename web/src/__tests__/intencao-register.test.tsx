import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { registerSchema } from '@/lib/validations/register';

describe('Intenção de Participação - Validação de Registro', () => {
  describe('Schema de Validação', () => {
    it('deve validar dados corretos de registro', () => {
      const data = {
        nome: 'João Silva',
        email: 'joao@test.com',
        celular: '(11) 99999-9999',
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar nome muito curto', () => {
      const data = {
        nome: 'Jo',
        email: 'joao@test.com',
        celular: '11999999999',
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Nome deve ter no mínimo 3 caracteres');
      }
    });

    it('deve rejeitar email inválido', () => {
      const data = {
        nome: 'João Silva',
        email: 'emailinvalido',
        celular: '11999999999',
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido');
      }
    });

    it('deve rejeitar celular com menos de 10 dígitos', () => {
      const data = {
        nome: 'João Silva',
        email: 'joao@test.com',
        celular: '119999999', // apenas 9 dígitos
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Celular deve ter no mínimo 10 dígitos');
      }
    });

    it('deve aceitar celular formatado', () => {
      const data = {
        nome: 'João Silva',
        email: 'joao@test.com',
        celular: '(11) 99999-9999',
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('deve aceitar celular sem formatação', () => {
      const data = {
        nome: 'João Silva',
        email: 'joao@test.com',
        celular: '11999999999',
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar quando todos os campos estão vazios', () => {
      const data = {
        nome: '',
        email: '',
        celular: '',
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    it('deve remover caracteres especiais do celular na validação', () => {
      const data = {
        nome: 'João Silva',
        email: 'joao@test.com',
        celular: '(11) 9-9999-9999',
      };

      const result = registerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
