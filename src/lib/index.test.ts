import { describe, it, expect } from 'vitest';
import { markdownFiles, getPostBySlug } from './index';

//test markdownFiles function
describe('markdownFiles', () => {
    it('return an array of posts', async () => {
        const posts = await markdownFiles();
        expect(Array.isArray(posts)).toBe(true);
    });

    it('each post should have a path and metadata', async () => {
        const files = await markdownFiles();
        files.forEach(file => {
            expect(file).toHaveProperty('path');
            expect(file).toHaveProperty('metadata');
        });
    });

    it('extract slug from file path', async () => {
        const files = await markdownFiles();
        files.forEach(file => {
            expect(file.metadata).toHaveProperty('slug');
            expect(typeof file.metadata.slug).toBe('string');
            expect(file.metadata.slug.length).toBeGreaterThan(0);
        });
    });
});

describe('getPostBySlug', () => {
    it('throws when slug does not exist', async () => {
        await expect(getPostBySlug('this-slug-does-not-exist')).rejects.toThrow();
    });
});
