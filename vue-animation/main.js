let app = new Vue({
    el: "#app",
    data: {
        page: 'screen-1',
        animations: {},
        direction: 'left'
    },
    computed: {

    },
    methods: {
        changeScreen(screenName) {

            

        },

        doAnimation(name, duration) {

        },
        startAnimation(name) {
            this.$set(this.animations, name, true);
        },
        stopAnimation(name) {
            this.animations[name] = false;
        },
        animation(name) {
            return this.animations[name] ? `animation animation-${name}` : '';
        },

        // beforeEnter(el) {
        //     console.log('beforeenter', el);
        //     // el.style.transform = 'translateX(50px)';
        //     // el.style.opacity = 0;
        //     // el.animate([
        //     //     { opacity: 0, transform: 'translateX(-50px)'  },
        //     //     { opacity: 1, transform: 'translateX(0px)' },
        //     // ], { duration: 1000 });
            
        // },
        // afterLeave(el) {
        //     console.log('afterleave', el);
            
        //     // el.style.transform = 'translateX(-50px)';
        //     let map = {
        //         'right': 'translateX(-50px)',
        //         'left': 'translateX(50px)'
        //     }

        //     el.animate([
        //         { opacity: 0, transform: map[this.animate]  },
        //         { opacity: 1, transform: 'translateX(0px)' },
        //     ], { duration: 1000 });
        // },
        // enter(el, done) {

        //     console.log('enter', el);
          
        //     let map = {
        //         'right': 'translateX(-50px)',
        //         'left': 'translateX(50px)'
        //     }

        //     el.animate([
        //         { opacity: 0, transform: map[this.animate]  },
        //         { opacity: 1, transform: 'translateX(0px)' },
        //     ], { duration: 1000 });

        //     done();
        // },
        // afterEnter(el) {
        //     console.log('afterenter', el);
        // },
        // beforeLeave(el) {
        //     console.log('beforeleave', el);

        //     let map = {
        //         'right': 'translateX(-50px)',
        //         'left': 'translateX(50px)'
        //     }

        //     el.animate([
        //         { opacity: 1, transform: 'translateX(0px)' },
        //         { opacity: 0, transform: map[this.animate]  },
        //     ], { duration: 1000 });
        // },
        // leave(el, done) {
        // }
    }
});