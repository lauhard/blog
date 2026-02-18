  import { describe, it, expect } from 'vitest';
  import { title, author, domain, url } from './project.config.js';

  describe('project config', () => {
      it('title is a non-empty string', () => {
          expect(typeof title).toBe('string');
          expect(title.length).toBeGreaterThan(0);
      });

      it('author is a non-empty string', () => {
          expect(typeof author).toBe('string');
          expect(author.length).toBeGreaterThan(0);
      });

      it('domain does not contain http', () => {
          expect(domain).not.toContain('http');
      });
  });