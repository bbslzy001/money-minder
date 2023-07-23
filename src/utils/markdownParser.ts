import {marked} from 'marked';

const parseMarkdownFile = (rawMarkdown: string): string => {
    return marked.parse(rawMarkdown);
};

export {parseMarkdownFile};