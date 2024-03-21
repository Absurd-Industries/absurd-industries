// Globals
let mute = false; // Mute/Unmute Flag to track audio state
let typingDelay = 25; // Delay between typing sounds

// Initialize button click
$('#initialize').click(function () {
    $('.animated-background').fadeOut(function() {
        $(this).remove();
    });
    $(this).fadeOut(function() {
        $(this).remove();
    });
    playSound('ambient-soundscape-1');
});


const phrases = [
    "Oh, it's you,",
    "Back at the Terminal, are we?",
    "Seeking quantum realities,",
    "Hoping for better outcomes?",
    "Well, let the timeline roulette begin.",
];

const writer = GlitchedWriter.create('#welcome', 'neo');
writer.endless(false);
writer.queueWrite(phrases, 3000, 3000, false);
// writer.addCallback('step', playTypingSound());




function waveformVisualizer() {
    const audioContext = new window.AudioContext();

    // setup canvas
    const canvas = document.querySelector('#waveform')

    // setup audio element
    const audioElement = document.querySelector('#ambient-soundscape-2')

    // create source from html5 audio element
    const source = audioContext.createMediaElementSource(audioElement)

    // attach oscilloscope
    const scope = new Oscilloscope(source)

    // reconnect audio output to speakers
    source.connect(audioContext.destination)

    // customize drawing options
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 4
    ctx.strokeStyle = '#4AF626'

    // start default animation loop
    scope.animate(ctx);

    // play
    playSound('ambient-soundscape-1');
}


playSound('ambient-soundscape-1');




// Sandbox
// ______________________________________________________________________________________________________________________


// Description: Get Access to Player's Location
// Needs: Consent from the player to access their location information, if rejected, set unknown, and use nearest IP location
function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        yourFunction(position.coords.latitude, position.coords.longitude);
    });
}

function toggleMute() {
    mute = !mute;
    document.getElementById("mute").innerHTML = mute ? "Unmute" : "Mute";
}

async function typeMessage(type, message) {
    var element = document.createElement('div');
    element.classList.add("chat-message");

    if (type == "system") 
        element.classList.add("muted");

    document.getElementById("chat-messages").append(element);

    element.innerHTML = '';
    for (const char of message) {
      element.innerHTML += char;
      playTypingSound();
      await new Promise(resolve => setTimeout(resolve, typingDelay));
    }
  }

// Description: Mute/Unmute the speific sound file in the audio element
// Parameters: ID of the audio element (#id)
// TODO: Add comments to the code to explain what is happening
function playSound(id, volume = 1) {
    if (!mute) {
        var audio = document.getElementById(id);
        audio.muted = false;
        audio.play();
        audio.volume = volume;
    }
}

// Description: Play the typing sounds using a randomizer that picks one of the three sound files, on loop
// TODO: Add comments to the code to explain what is happening
function playTypingSound() {
    if (!mute) {
        const audioId = 'text-streaming-' + (Math.floor(Math.random() * 3) + 1);
        playSound(audioId, 0.1);
    }
}

// Description: Handles chat nessage submission, and replu backs
// TODO: Break this up into smaller functions and change naming to be more descriptive
var chatForm = document.getElementById('input-form');
chatForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    var formData = new FormData(chatForm);
    var chat_input = chatForm.elements['chat_input'].value;
    chatForm.elements['chat_input'].value = "";
    typeMessage("interloper", 'You: ' + chat_input);

    try {
        const response = await fetch('/completion', {
            method: 'POST',
            body: formData
        });
        const reader = response.body.getReader();
        let text = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            text += new TextDecoder().decode(value);
        }
        await typeMessage("terminal", 'Terminal: ' + text);
    } catch (error) {
        console.error(error);
    }
});