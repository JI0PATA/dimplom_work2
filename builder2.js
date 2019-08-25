const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

export let builder = new Vue({
    el: '#my-app',
    data: {
        board: {
            w: 4000,
            h: 4000,
            pos: {
                x: 0,
                y: 0,
            }
        },
        elements: [],
        relations: [],
        hoverElement: null,
        abstractElementObj: null,
        lastHoverElement: null,
    },
    methods: {
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
            }
        },

        move(element, callback = function () {
        }) {
            let shiftX = event.clientX - element.pos.x;
            let shiftY = event.clientY - element.pos.y;

            document.onmousemove = ev => {
                element.pos.x = ev.clientX - shiftX;
                element.pos.y = ev.clientY - shiftY;
            };

            document.onmouseup = ev => {
                document.onmousemove = null;
                callback();
            }
        },

        moveElement(element) {
            this.move(element);
        },

        showSections(element) {
            this.hoverElement = element;
        },

        hiddenSections() {
            this.hoverElement = null;
        },

        createFromSection(fromElement, fromSection) {
            if (this.relations.some(relation => relation.fromElement.id === fromElement.id && relation.fromElement.section === fromSection)) return;

            let element = this.createElement(this.getOffsetsForNewElement(fromElement, fromSection));

            this.elements.push(element);

            this.createRelation(fromElement, fromSection, element);
        },

        createRelation(fromElement, fromSection, toElement, toSection = null) {
            if (this.relations.some(relation => (relation.fromElement.id === fromElement.id && relation.fromElement.section === fromSection) ||
                (relation.toElement.id === toElement.id && relation.toElement.section === toSection))) return;

            let relation = {
                fromElement: {
                    id: fromElement.id,
                    section: fromSection,
                },
                toElement: {
                    id: toElement.id,
                    section: toSection || this.getOppositeSection(fromSection)
                }
            };

            this.relations.push(relation);

            setTimeout(_ => {
                this.animateLines();
            }, 50);
        },

        animateLines() {
            let delay = 100;

            this.$refs.lines.forEach(line => {
                if (line.classList.contains('animated')) return;

                let totalLength = line.getTotalLength();
                line.style.strokeDasharray = totalLength;
                line.style.strokeDashoffset = totalLength;
                line.style.stroke = 'black';

                setTimeout(_ => {
                    line.style.transition = `all .3s cubic-bezier(0.19, 1, 0.22, 1)`;
                    line.style.strokeDashoffset = 0;
                    line.classList.add('animated');

                    setTimeout(_ => {
                        line.style.strokeDasharray = 'initial';
                        line.style.strokeDashoffset = 'initial';
                    }, 250);
                }, 100);
            });
        },

        getOppositeSection(section) {
            switch (section) {
                case 1:
                    return 3;
                case 2:
                    return 4;
                case 3:
                    return 1;
                case 4:
                    return 2;
            }
        },

        getOffsetsForNewElement(element, section) {
            switch (section) {
                case 1:
                    return {
                        x: element.pos.x,
                        y: element.pos.y - 200,
                    };
                case 2:
                    return {
                        x: element.pos.x + 200,
                        y: element.pos.y,
                    };
                case 3:
                    return {
                        x: element.pos.x,
                        y: element.pos.y + 200,
                    };
                case 4:
                    return {
                        x: element.pos.x - 200,
                        y: element.pos.y,
                    }
            }
        },

        getPositionsForRelation(relation) {
            let element = this.getElementById(relation.id);

            switch (relation.section) {
                case 1:
                    return {
                        x: element.pos.x + 50,
                        y: element.pos.y,
                    };
                case 2:
                    return {
                        x: element.pos.x + 100,
                        y: element.pos.y + 50,
                    };
                case 3:
                    return {
                        x: element.pos.x + 50,
                        y: element.pos.y + 100,
                    };
                case 4:
                    return {
                        x: element.pos.x,
                        y: element.pos.y + 50,
                    }
            }
        },

        getElementById(id) {
            return this.elements.find(element => element.id === id);
        }


    },
    watch: {},
    created() {
        this.elements = localStorage.getItem('elements') || [this.createElement({
            x: WINDOW_WIDTH / 2 - 50,
            y: WINDOW_HEIGHT / 2 - 50,
        })];
    }
});