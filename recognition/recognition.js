console.log('Init');

const Recorder = {
    recognition: null,
    btn: null,
    interimResults: false,
    stop: function () {
        this.recognition.stop();
    },
    start: function (btn, el_id) {
        if (this.recognition) {
            this.recognition.stop();
        }

        if (btn !== this.btn) {
            this.btn = btn;

            let input = document.getElementById(el_id);

            if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
                this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

                let lang = document.getElementById('language').value;
                if (lang && lang !== 'default') {
                    this.recognition.lang = lang;
                }

                this.recognition.interimResults = this.interimResults;

                this.recognition.onstart = () => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-danger');
                };

                this.recognition.onend = () => {
                    btn.classList.remove('btn-danger');
                    btn.classList.add('btn-primary');
                    this.recognition = null;
                    this.btn = null;
                };

                this.recognition.onresult = (event) => {
                    if (input.tagName === 'INPUT') {
                        input.value = event.results[0][0].transcript;
                    } else {
                        input.innerText = event.results[0][0].transcript;
                    }
                };

                this.recognition.onerror = event => {
                    console.log('onerror', event);
                    alert(event.message);
                }

                this.recognition.onnomatch = event => {
                    console.log('onnomatch', event);
                }

                this.recognition.start();
            } else {
                alert("Your browser does not support the Web Speech API.")
            }
        }
    }
};
