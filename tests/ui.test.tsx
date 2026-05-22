import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../src/components/ui/Button';
import { Input } from '../src/components/ui/Input';
import { Card } from '../src/components/ui/Card';

describe('Atomic UI Components', () => {
  describe('Button', () => {
    it('renders with correct variant classes and accessibility', () => {
      render(<Button variant="danger">Delete</Button>);
      const btn = screen.getByRole('button');
      expect(btn.className).toContain('bg-red-600');
      expect(btn).toBeInTheDocument();
    });

    it('handles loading state and prevents interaction', () => {
      const onClick = vi.fn();
      render(<Button isLoading onClick={onClick}>Submit</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Input', () => {
    it('renders label and handles error accessibility', () => {
      render(<Input label="Username" error="Invalid input" />);
      const input = screen.getByLabelText(/username/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid input');
    });

    it('forwards refs correctly', () => {
      const ref = vi.fn();
      render(<Input label="RefTest" ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Card', () => {
    it('renders children correctly', () => {
      render(<Card className="test-class">Content</Card>);
      const card = screen.getByText('Content');
      expect(card.parentElement?.className).toContain('test-class');
    });
  });
});