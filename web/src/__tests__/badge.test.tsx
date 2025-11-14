import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from '@/components/common/badge';

describe('Badge Component', () => {
  it('deve renderizar badge com texto', () => {
    render(<Badge>Teste</Badge>);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  it('deve aplicar variante pendente', () => {
    render(<Badge variant="pendente">Pendente</Badge>);
    const badge = screen.getByText('Pendente');
    expect(badge).toHaveClass('bg-yellow-500/20');
    expect(badge).toHaveClass('text-yellow-500');
  });

  it('deve aplicar variante aprovado', () => {
    render(<Badge variant="aprovado">Aprovado</Badge>);
    const badge = screen.getByText('Aprovado');
    expect(badge).toHaveClass('bg-green-500/20');
    expect(badge).toHaveClass('text-green-500');
  });

  it('deve aplicar variante fechado para indicações', () => {
    render(<Badge variant="fechado">Fechado</Badge>);
    const badge = screen.getByText('Fechado');
    expect(badge).toHaveClass('bg-green-500/20');
    expect(badge).toHaveClass('text-green-500');
  });

  it('deve aplicar variante admin', () => {
    render(<Badge variant="admin">Admin</Badge>);
    const badge = screen.getByText('Admin');
    expect(badge).toHaveClass('bg-accent-primary/20');
    expect(badge).toHaveClass('text-accent-primary');
  });

  it('deve aplicar uppercase ao texto', () => {
    render(<Badge>teste lowercase</Badge>);
    const badge = screen.getByText('teste lowercase');
    expect(badge).toHaveClass('uppercase');
  });

  it('deve permitir classes customizadas', () => {
    render(<Badge className="custom-class">Teste</Badge>);
    const badge = screen.getByText('Teste');
    expect(badge).toHaveClass('custom-class');
  });

  it('deve usar variante default quando não especificada', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-white/10');
    expect(badge).toHaveClass('text-white/70');
  });

  it('deve renderizar como elemento span', () => {
    render(<Badge>Teste</Badge>);
    const badge = screen.getByText('Teste');
    expect(badge.tagName).toBe('SPAN');
  });

  it('deve aplicar todas as variantes de status de intenções', () => {
    const { rerender } = render(<Badge variant="pendente">Pendente</Badge>);
    expect(screen.getByText('Pendente')).toHaveClass('bg-yellow-500/20');

    rerender(<Badge variant="aprovado">Aprovado</Badge>);
    expect(screen.getByText('Aprovado')).toHaveClass('bg-green-500/20');

    rerender(<Badge variant="recusado">Recusado</Badge>);
    expect(screen.getByText('Recusado')).toHaveClass('bg-red-500/20');
  });

  it('deve aplicar variantes de status de membros', () => {
    const { rerender } = render(<Badge variant="ativo">Ativo</Badge>);
    expect(screen.getByText('Ativo')).toHaveClass('bg-green-500/20');

    rerender(<Badge variant="inativo">Inativo</Badge>);
    expect(screen.getByText('Inativo')).toHaveClass('bg-red-500/20');

    rerender(<Badge variant="suspenso">Suspenso</Badge>);
    expect(screen.getByText('Suspenso')).toHaveClass('bg-yellow-500/20');
  });
});
