// ================================================================
// mixer.js - Mixer & Effects
// SONIC20VERSE
// ================================================================

function Mixer() {
    this.audioEngine = null;
    this.channels = {
        keyboard: { volume: 0.7, pan: 0, mute: false, solo: false },
        style: { volume: 0.6, pan: 0, mute: false, solo: false },
        bass: { volume: 0.7, pan: 0, mute: false, solo: false },
        drum: { volume: 0.8, pan: 0, mute: false, solo: false },
        fx: { volume: 0.5, pan: 0, mute: false, solo: false }
    };
    this.eq = { bass: 0, mid: 0, treble: 0 };
    this.mfx = { mfx1: false, mfx2: false, master: false };
}

Mixer.prototype.init = function(audioEngine) {
    this.audioEngine = audioEngine;
    console.log('✅ Mixer siap');
};

Mixer.prototype.setChannelVolume = function(channel, value) {
    if (this.channels[channel]) {
        this.channels[channel].volume = Math.max(0, Math.min(1, value));
    }
};

Mixer.prototype.setChannelPan = function(channel, value) {
    if (this.channels[channel]) {
        this.channels[channel].pan = Math.max(-1, Math.min(1, value));
    }
};

Mixer.prototype.toggleMute = function(channel) {
    if (this.channels[channel]) {
        this.channels[channel].mute = !this.channels[channel].mute;
    }
};

Mixer.prototype.toggleSolo = function(channel) {
    if (this.channels[channel]) {
        this.channels[channel].solo = !this.channels[channel].solo;
    }
};

Mixer.prototype.setEQ = function(band, value) {
    if (this.eq[band] !== undefined) {
        this.eq[band] = Math.max(-12, Math.min(12, value));
    }
};

Mixer.prototype.toggleMFX = function(fx) {
    if (this.mfx[fx] !== undefined) {
        this.mfx[fx] = !this.mfx[fx];
    }
};

var mixer = new Mixer();
window.mixer = mixer;
window.Mixer = Mixer;
console.log('✅ mixer.js loaded');