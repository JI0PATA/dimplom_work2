let vue = new Vue({
    el: '#my-app',
    data: {
        content: ''
    },
    methods: {
        changeData() {

        }
    },
    mounted() {
        CKEDITOR.replace('textarea1');
        CKEDITOR.instances.textarea1.on('change', _ => {
            this.content = CKEDITOR.instances.textarea1.getData();
        });
    }
});