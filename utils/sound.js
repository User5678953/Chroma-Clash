// File: utils/sound.js

class SoundPlayer {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
    }

    playFrequency(frequency, duration = 1) {
        let oscillator = this.context.createOscillator();
        let gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0, this.context.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01); // Quick fade in
        gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + duration); // Fade out

        oscillator.start();
        oscillator.stop(this.context.currentTime + duration);
    }

    playSound(type) {
        const frequencyMap = {
            success: 520,
            fail: 110,
            win: 590
        };
        this.playFrequency(frequencyMap[type] || 440, 1); // Default frequency 440Hz if type not found
    }
}

const soundPlayer = new SoundPlayer();
