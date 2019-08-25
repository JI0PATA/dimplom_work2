const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

export let builder = new Vue({
    el: '#my-app',
    data: {
        elements: [],
        relations: [],
        board: {
            w: 4000,
            h: 4000,
            pos: {
                x: 0,
                y: 0,
            }
        },
        hoverElement: null,
        abstractElementObj: null
    },
    methods: {
        move(element, callback = function() {}) {
            let shiftX = event.clientX - element.pos.x;
            let shiftY = event.clientY - element.pos.y;
            let downEvent = event;

            document.onmousemove = ev => {
                element.pos.x = ev.clientX - shiftX;
                element.pos.y = ev.clientY - shiftY;
            };

            document.onmouseup = ev => {
                document.onmousemove = null;
                callback(downEvent, ev);
            }
        },

        moveElement(element, callback = function() {}) {
            this.move(element, callback);
        },

        showSections(element) {
            if (this.hoverElement === 'all') return;

            this.hoverElement = element;
        },

        hiddenSections(element) {
            if (this.hoverElement === 'all') return;

            this.hoverElement = null;
        },

        createElement({x, y}) {
            return {
                id: this.elements[this.elements.length - 1] ? this.elements[this.elements.length - 1].id + 1 : 1,
                content: {
                    title: '',
                    description: '',
                },
                pos: {
                    x: x,
                    y: y,
                }
            };
        },

        createElementFromSection(fromElement, section) {
            if (event.shiftKey) return;

            if (this.relations.some(relation => relation.fromElement.id === fromElement.id && relation.fromElement.section === section)) return;

            let element = this.createElement(this.getOffsetsForSection(fromElement.pos, section));

            this.elements.push(element);

            this.createRelation(fromElement, section, element);
        },

        abstractElement(element, section) {
            this.hoverElement = 'all';

            this.abstractElementObj = {
                section: section,
                element: element,
                pos: {
                    x: event.clientX,
                    y: event.clientY,
                }
            };

            this.move(this.abstractElementObj, _ => {
                this.abstractElementObj = null;
                this.hoverElement = null;
            });
        },

        createRelation(fromElement, fromSection, toElement, toSection = null) {
            let relationObj = {
                fromElement: {
                    id: fromElement.id,
                    section: fromSection,
                },
                toElement: {
                    id: toElement.id,
                    section: toSection || this.getOppositeSection(fromSection)
                }
            };

            if (this.relations.some(relation => (relation.fromElement.id === fromElement.id && relation.fromElement.section === fromSection) ||
                (relation.toElement.id === toElement.id && relation.toElement.section === toSection))) return;

            this.relations.push(relationObj);
        },

        createRelationFromAbstractElement(toElement, toSection) {
            if (!this.abstractElementObj) return;

            this.createRelation(this.abstractElementObj.element, this.abstractElementObj.section, toElement, toSection);
            this.abstractElementObj = null;
            this.hoverElement = null;
        },

        getOppositeSection(section) {
            switch(section) {
                case 1: return 3;
                case 2: return 4;
                case 3: return 1;
                case 4: return 2;
            }
        },

        getOffsetForRelation(relation) {
            let element = this.getElementById(relation.id);

            switch(relation.section) {
                case 1: return {
                    x: element.pos.x + 50,
                    y: element.pos.y,
                };
                case 2: return {
                    x: element.pos.x + 100,
                    y: element.pos.y + 50,
                };
                case 3: return {
                    x: element.pos.x + 50,
                    y: element.pos.y + 100
                };
                case 4: return {
                    x: element.pos.x,
                    y: element.pos.y + 50
                }
            }
        },

        getElementById(id) {
            return this.elements.find(element => element.id === id);
        },

        getOffsetsForSection(fromPos, section) {
            switch(section) {
                case 1: {
                    return {
                        x: fromPos.x,
                        y: fromPos.y - 200,
                    };
                }
                case 2: {
                    return {
                        x: fromPos.x + 200,
                        y: fromPos.y,
                    }
                }
                case 3: {
                    return {
                        x: fromPos.x,
                        y: fromPos.y + 200,
                    }
                }
                case 4: {
                    return {
                        x: fromPos.x - 200,
                        y: fromPos.y,
                    }
                }
            }
        }
    },
    created() {
        this.elements = localStorage.getItem('elements') || [this.createElement({
            x: WINDOW_WIDTH / 2 - 50,
            y: WINDOW_HEIGHT / 2 - 50
        })];
    },
    watch: {},
});