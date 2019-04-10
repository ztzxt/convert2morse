const socket = io.connect('http://localhost:8080');
        socket.on('latin', function(latin){
            document.getElementById('latin').innerText = latin;
        });
        socket.on('morse', function(morse){
            document.getElementById('morse').innerText = morse;
        });
        socket.on('previous', function(previous){
            document.getElementsByClassName('input').innerText = previous;
        });


    Vue.component('Converterinterface', {
        template: '<div><h3>{{from}}:</h3><textarea class="input" v-bind:id="textareaid" v-on:input="newEntry(textareaid)" v-on:focus="newEntry(textareaid)" autofocus></textarea><div class="output" v-bind:id="to"></div></div>',
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
        props: ['from', 'textareaid', 'to']
    });

    Vue.component('Swapbutton', {
        template: "<div><a v-bind:href='route'><button v-on:click='sendPrevious(to)'>Swap</button></a></div>",
        props: ['route', 'to'],
        methods: {
            sendPrevious: function(to) {
                if (to == 'latin') {
                    sessionStorage.setItem('previousmorse', document.getElementById('morse').innerHTML);
                }
                else if (to == 'morse'){
                    sessionStorage.setItem('previouslatin', document.getElementById('latin').innerHTML);
                }
            }
        }
   });
    const vue_el = new Vue({
        el: '#app',
        data:{
           explained: "<h1>Welcome to the morse code converter.</h1><h2>Please use '/' for spaces.</h2>",
        },
    });