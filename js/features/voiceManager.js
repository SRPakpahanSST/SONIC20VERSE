// ================================================================
// voiceManager.js - Manajemen Multi-Layer Voice
// SONIC20VERSE
// ================================================================

function VoiceManager() {
    this.audioEngine = null;
    this.currentVoice = 'piano';
    this.currentCategory = 'piano';
    this.layers = {
        layer1: 'Grand Piano',
        layer2: 'Strings',
        layer3: 'Pad'
    };
    this.layerActive = {
        layer1: true,
        layer2: false,
        layer3: false
    };
    this.splitActive = false;
    this.splitPoint = 'C4';
    this.upperLayers = { r1: true, r2: false, r3: false };
    this.lowerLayers = { l1: false, l2: false };
}

VoiceManager.prototype.voices = {
    piano: ['Grand Piano', 'Bright Piano', 'Electric Piano', 'Honky Tonk'],
    organ: ['Drawbar Organ', 'Percussive Organ', 'Rock Organ', 'Church Organ'],
    strings: ['Violin', 'Viola', 'Cello', 'Strings Ensemble'],
    brass: ['Trumpet', 'Trombone', 'French Horn', 'Brass Section'],
    synth: ['Synth Lead', 'Synth Pad', 'Synth Bass', 'Synth FX'],
    world: ['Sitar', 'Koto', 'Gamelan', 'Angklung'],
    drum: ['Standard Kit', 'Electronic Kit', 'Acoustic Kit', 'World Perc'],
    bass: ['Acoustic Bass', 'Electric Bass', 'Synth Bass', 'Fretless Bass']
};

VoiceManager.prototype.init = function(audioEngine) {
    this.audioEngine = audioEngine;
    console.log('✅ Voice Manager siap');
};

VoiceManager.prototype.setCategory = function(category) {
    if (this.voices[category]) {
        this.currentCategory = category;
        this.currentVoice = this.voices[category][0];
        console.log('🎺 Voice category: ' + category);
    }
};

VoiceManager.prototype.setVoice = function(voiceName) {
    this.currentVoice = voiceName;
    console.log('🎺 Voice: ' + voiceName);
};

VoiceManager.prototype.setLayer = function(layerNum, voiceName) {
    if (this.layers['layer' + layerNum] !== undefined) {
        this.layers['layer' + layerNum] = voiceName;
        console.log('🎺 Layer ' + layerNum + ': ' + voiceName);
        
        var el = document.getElementById('layer' + layerNum);
        if (el) el.textContent = voiceName;
    }
};

VoiceManager.prototype.toggleLayer = function(layerNum) {
    var key = 'layer' + layerNum;
    if (this.layerActive[key] !== undefined) {
        this.layerActive[key] = !this.layerActive[key];
        console.log('🎺 Layer ' + layerNum + ': ' + (this.layerActive[key] ? 'ON' : 'OFF'));
    }
};

VoiceManager.prototype.setSplit = function(active) {
    this.splitActive = active;
    console.log('🎹 Split: ' + (active ? 'ON' : 'OFF'));
};

VoiceManager.prototype.setSplitPoint = function(note) {
    this.splitPoint = note;
    var el = document.getElementById('splitPoint');
    if (el) el.textContent = note;
};

VoiceManager.prototype.toggleUpperLayer = function(layer) {
    if (this.upperLayers[layer] !== undefined) {
        this.upperLayers[layer] = !this.upperLayers[layer];
    }
};

VoiceManager.prototype.toggleLowerLayer = function(layer) {
    if (this.lowerLayers[layer] !== undefined) {
        this.lowerLayers[layer] = !this.lowerLayers[layer];
    }
};

var voiceManager = new VoiceManager();
window.voiceManager = voiceManager;
window.VoiceManager = VoiceManager;
console.log('✅ voiceManager.js loaded');