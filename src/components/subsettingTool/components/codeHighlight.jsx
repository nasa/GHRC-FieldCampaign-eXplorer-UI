import hljs from 'highlight.js/lib/core';
import React from'react';

export default class CodeHighlight extends React.Component {
    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        hljs.registerLanguage("python", require('highlight.js/lib/languages/python'));
        const nodes = this.el.querySelectorAll('pre code');

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightElement(nodes[i])
        }
    }

    setEl = (el) => {
        this.el = el;
    };

    render() {
        const {children, className} = this.props;
        return <pre ref={this.setEl}><code className={className}>{children}</code></pre>;
    }
}