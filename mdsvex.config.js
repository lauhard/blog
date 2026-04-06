import { escapeSvelte } from 'mdsvex';
import readingTime from "mdsvex-reading-time";
import { highlightCode } from './shiki.config.js';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
export const mdsvexConfig = {
    extensions: ['.svx', '.md'],
    layout: {
        //  blog: './src/routes/blog/[sl8g].svelte',
    },
    smartypants: {
        dashes: 'inverted',
        quotes: true,
        ellipses: true,
        backticks: true,
    },
    highlight: {
        highlighter: async (code, lang) => {
            let html = await highlightCode(code, lang);
            return escapeSvelte(html);
        },
    },
    remarkPlugins: [readingTime],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
            behavior: 'prepend',
            content: { type: 'text', value: '#' },
            properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 }
        }],, rehypeUnwrapImages],
}