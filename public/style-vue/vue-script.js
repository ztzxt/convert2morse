const socket = io.connect('http://localhost:8080');
        socket.on('latin', function(latin){
            document.getElementById("l2m").value = latin;
        });
        socket.on('morse', function(morse){
            document.getElementById("m2l").value = morse;
        });

    Vue.component('Converterinterface', {
        template: '<div v-bind:class="side"><h3>{{from}}:</h3><textarea class="input" v-bind:id="textareaid" v-on:input="newEntry(textareaid)"></textarea></div>',
        methods: {
            newEntry: function(converterid)  {
                if (converterid === 'm2l') {
                    socket.emit('morse', document.getElementById('m2l').value);
                }
                else if (converterid === 'l2m') {
                    socket.emit('latin', document.getElementById('l2m').value);
                }  
            }
        },
        props: ['from', 'textareaid', 'side']
    });

    const vue_el = new Vue({
        el: '#app',
        data:{
           explained: "<h1>Welcome to the morse code converter.</h1>" +
                "<h2>Please use '/' for spaces.</h2>",
        },
    });