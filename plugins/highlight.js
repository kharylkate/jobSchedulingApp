import Vue from 'vue';
import hljs from '@highlightjs/vue-plugin/node_modules/highlight.js/lib/core';
// import 'highlight.js/scss/atom-one-dark.scss';
// import 'highlight.js/scss/androidstudio.scss';
import javascript from '@highlightjs/vue-plugin/node_modules/highlight.js/lib/languages/javascript';
import bash from '@highlightjs/vue-plugin/node_modules/highlight.js/lib/languages/bash';
import shell from '@highlightjs/vue-plugin/node_modules/highlight.js/lib/languages/shell';
import vuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('javascript', javascript);
// vuePlugin.
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', shell);

Vue.use(vuePlugin);