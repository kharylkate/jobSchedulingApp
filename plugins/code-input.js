import Vue from "vue";
import Prism from 'prismjs';
import codeInput from "../plugins/code-input.min.js";

codeInput.registerTemplate("syntaxt-highlighted", codeInput.templates.prism(Prism, []));
Vue.use(codeInput);