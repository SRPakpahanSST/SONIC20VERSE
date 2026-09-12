// ================================================================
// styleEngine.js - Engine untuk Style & Rhythm
// SONIC20VERSE
// ================================================================

function StyleEngine() {
    this.audioEngine = null;
    this.currentStyle = 'maqam_rast';
    this.currentSection = 'mainA';
    this.isPlaying = false;
    this.tempo = 120;
    this.timeSignature = '4/4';
    this.currentBeat = 0;
    this.styleInterval = null;
    this.patternIndex = 0;
    this.styleVolume = 0.7;
}

StyleEngine.prototype.styles = {
    maqam_rast: {
        name: 'Maqam Rast',
        tempo: 100,
        patterns: {
            intro: [0, 3, 5, 7],
            mainA: [0, 3, 5, 7, 10, 7, 5, 3],
            mainB: [0, 5, 7, 10, 12, 10, 7, 5],
            mainC: [0, 7, 10, 12, 15, 12, 10, 7],
            fill: [12, 10, 7, 5, 3, 0],
            ending: [0, 3, 5, 7, 5, 3, 0]
        },
        chordProgression: ['I', 'IV', 'V', 'I']
    },
    maqam_bayati: {
        name: 'Maqam Bayati',
        tempo: 95,
        patterns: {
            intro: [0, 2, 4, 6],
            mainA: [0, 2, 4, 6, 8, 6, 4, 2],
            mainB: [0, 4, 6, 8, 11, 8, 6, 4],
            mainC: [0, 6, 8, 11, 13, 11, 8, 6],
            fill: [11, 8, 6, 4, 2, 0],
            ending: [0, 2, 4, 6, 4, 2, 0]
        },
        chordProgression: ['I', 'V', 'IV', 'I']
    },
    maqam_hijaz: {
        name: 'Maqam Hijaz',
        tempo: 90,
        patterns: {
            intro: [0, 1, 4, 5],
            mainA: [0, 1, 4, 5, 7, 5, 4, 1],
            mainB: [0, 4, 5, 7, 8, 7, 5, 4],
            mainC: [0, 5, 7, 8, 11, 8, 7, 5],
            fill: [8, 7, 5, 4, 1, 0],
            ending: [0, 1, 4, 5, 4, 1, 0]
        },
        chordProgression: ['I', 'IV', 'V', 'I']
    },
    pop_ballad: {
        name: 'Pop Ballad',
        tempo: 80,
        patterns: {
            intro: [0, 4, 7, 12],
            mainA: [0, 4, 7, 9, 7, 4, 0],
            mainB: [0, 7, 9, 12, 9, 7, 0],
            mainC: [0, 9, 12, 16, 12, 9, 0],
            fill: [12, 9, 7, 4, 0],
            ending: [0, 4, 7, 4, 0]
        },
        chordProgression: ['I', 'V', 'vi', 'IV']
    },
    rock_beat: {
        name: 'Rock Beat',
        tempo: 120,
        patterns: {
            intro: [0, 0, 3, 5],
            mainA: [0, 3, 5, 7, 5, 3, 0, 3],
            mainB: [0, 5, 7, 10, 7, 5, 0, 5],
            mainC: [0, 7, 10, 12, 10, 7, 0, 7],
            fill: [12, 10, 7, 5, 3, 0],
            ending: [0, 3, 5, 3, 0]
        },
        chordProgression: ['I', 'IV', 'V', 'I']
    },
    jazz_swing: {
        name: 'Jazz Swing',
        tempo: 140,
        patterns: {
            intro: [0, 4, 7, 11],
            mainA: [0, 4, 7, 9, 11, 9, 7, 4],
            mainB: [0, 7, 9, 12, 14, 12, 9, 7],
            mainC: [0, 9, 12, 14, 16, 14, 12, 9],
            fill: [16, 14, 12, 9, 7, 4],
            ending: [0, 4, 7, 4, 0]
        },
        chordProgression: ['ii', 'V', 'I', 'vi']
    },
    bossanova: {
        name: 'Bossa Nova',
        tempo: 100,
        patterns: {
            intro: [0, 3, 5, 8],
            mainA: [0, 3, 5, 7, 8, 7, 5, 3],
            mainB: [0, 5, 7, 10, 12, 10, 7, 5],
            mainC: [0, 7, 8, 12, 15, 12, 8, 7],
            fill: [12, 10, 8, 5, 3, 0],
            ending: [0, 3, 5, 3, 0]
        },
        chordProgression: ['I', 'vi', 'ii', 'V']
    },
    dangdut: {
        name: 'Dangdut',
        tempo: 115,
        patterns: {
            intro: [0, 3, 5, 7],
            mainA: [0, 3, 5, 7, 5, 3, 0, 3],
            mainB: [0, 5, 7, 10, 7, 5, 0, 5],
            mainC: [0, 7, 10, 12, 10, 7, 0, 7],
            fill: [12, 10, 7, 5, 3, 0],
            ending: [0, 3, 5, 3, 0]
        },
        chordProgression: ['I', 'IV', 'V', 'I']
    },
    keroncong: {
        name: 'Keroncong',
        tempo: 85,
        patterns: {
            intro: [0, 4, 7, 9],
            mainA: [0, 4, 7, 9, 7, 4, 0],
            mainB: [0, 7, 9, 12, 9, 7, 0],
            mainC: [0, 9, 12, 16, 12, 9, 0],
            fill: [12, 9, 7, 4, 0],
            ending: [0, 4, 7, 4, 0]
        },
        chordProgression: ['I', 'IV', 'V', 'I']
    }
};

StyleEngine.prototype.init = function(audioEngine) {
    this.audioEngine = audioEngine;
    console.log('✅ Style Engine siap');
};

StyleEngine.prototype.setStyle = function(styleName) {
    if (this.styles[styleName]) {
        this.currentStyle = styleName;
        this.tempo = this.styles[styleName].tempo;
        console.log('🎼 Style: ' + this.styles[styleName].name);
        
        if (window.displayManager) {
            window.displayManager.updateStyle(this.styles[styleName].name, this.tempo);
        }
    }
};

StyleEngine.prototype.setSection = function(section) {
    this.currentSection = section;
    console.log('🎼 Section: ' + section);
};

StyleEngine.prototype.start = function() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentBeat = 0;
    this.patternIndex = 0;
    
    var self = this;
    var beatInterval = (60 / this.tempo) * 1000;
    
    this.styleInterval = setInterval(function() {
        self.playBeat();
    }, beatInterval);
    
    console.log('▶️ Style playing: ' + this.currentSection);
};

StyleEngine.prototype.stop = function() {
    this.isPlaying = false;
    if (this.styleInterval) {
        clearInterval(this.styleInterval);
        this.styleInterval = null;
    }
    if (this.audioEngine) {
        this.audioEngine.stopAll();
    }
    console.log('⏹️ Style stopped');
};

StyleEngine.prototype.playBeat = function() {
    if (!this.isPlaying || !this.audioEngine) return;
    
    this.currentBeat = (this.currentBeat + 1) % 4;
    
    var style = this.styles[this.currentStyle];
    var pattern = style.patterns[this.currentSection] || style.patterns.mainA;
    
    var noteIndex = pattern[this.patternIndex % pattern.length];
    var noteName = window.getNoteName ? window.getNoteName(noteIndex) : 'E';
    var fullName = noteName + '3';
    var freq = window.getFrequencyFromNote ? window.getFrequencyFromNote(fullName) : 0;
    
    if (freq > 0) {
        this.audioEngine.playNote(fullName, freq, 0.15);
    }
    
    this.patternIndex++;
    
    if (window.displayManager) {
        window.displayManager.updateBeat(this.currentBeat);
    }
};

StyleEngine.prototype.setTempo = function(bpm) {
    this.tempo = Math.max(40, Math.min(240, bpm));
    if (this.isPlaying) {
        this.stop();
        this.start();
    }
};

StyleEngine.prototype.setVolume = function(value) {
    this.styleVolume = Math.max(0, Math.min(1, value));
};

var styleEngine = new StyleEngine();
window.styleEngine = styleEngine;
window.StyleEngine = StyleEngine;
console.log('✅ styleEngine.js loaded');