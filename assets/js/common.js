export function Comman(dom){

    //var dom;
    dom.create = (node) => {
        return document.createElement(node);
    };

    dom.append = (parent, node) => {
        parent.appendChild(node);
    };

    dom.text = (node, text) => {
        let element = this.create(node);
        let textNode = document.createTextNode(text);
        this.append(element, textNode);
    };

    dom.addClass = (node, className) => {
        node.setAttribute('class', className);
    };

    dom.find = (selector) => {
        return document.querySelectorAll(selector);
    };

    dom.findByClass = (className) => {
        return document.getElementsByClassName(className);
    };

    dom.findById = (id) => {
        return document.getElementById(id);
    };

    dom.getImagePath = (path) => {
        return `https://image.tmdb.org/t/p/w500${path}`
    };
    //return dom;
};