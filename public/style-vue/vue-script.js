const socket = io();
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
        template: '<div><textarea placeholder="Type here.." class="input" v-bind:id="textareaid" v-on:input="newEntry(textareaid)" v-on:focus="newEntry(textareaid)" autofocus></textarea><textarea readonly class="output" v-bind:id="to"></textarea></div>',
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

    Vue.component('Areatags', {
        template: "<div><textarea  readonly id='inputtab' class='tab'>{{from}}</textarea><textarea  readonly id='outputtab' class='tab'>{{to}}</textarea></div>",
        props: ['from', 'to']
    })
    Vue.component('Swapbutton', {
        template: "<div><button v-on:click='sendPrevious(to)'><a v-bind:href='route'>Click here to swap between morse and latin</a></button></div>",
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
            explainedLatin: "<h1>Welcome to the morse code converter.</h1><h2>You are converting from <i>latin</i> to <i>morse</i>.</h2>",
            explainedMorse: "<h1>Welcome to the morse code converter.</h1><h2>You are converting from <i>morse</i> to <i>latin</i>. Please use '/' for spaces.</h2>",
        },
    });