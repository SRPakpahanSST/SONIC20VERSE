// ================================================================
// arpeggiator.js - Arpeggiator
// SONIC20VERSE
// ================================================================

function Arpeggiator() {
    this.audioEngine = null;
    this.isActive = false;
    this.type = 'up';
    this.rate = '1/8';
    this.octave = 1;
    this.heldNotes = [];
    this.currentIndex = 0;
    this.arpeggioInterval = null;
    this.tempo = 120;
}

Arpeggiator.prototype.init = function(audioEngine) {
    this.audioEngine = audioEngine;
    console.log('✅ Arpeggiator siap');
};

Arpeggiator.prototype.toggle = function() {
    this.isActive = !this.isActive;
    console.log('🎼 Arpeggiator: ' + (this.isActive ? 'ON' : 'OFF'));
    
    if (this.isActive && this.heldNotes.length > 0) {
        this.start();
    } else {
        this.stop();
    }
    
    return this.isActive;
};

Arpeggiator.prototype.addNote = function(noteName, freq) {
    this.heldNotes.push({ note: noteName, freq: freq });
    if (this.isActive && !this.arpeggioInterval) {
        this.start();
    }
};

Arpeggiator.prototype.removeNote = function(noteName) {
    this.heldNotes = this.heldNotes.filter(function(n) { return n.note !== noteName; });
    if (this.heldNotes.length === 0) {
        this.stop();
    }
};

Arpeggiator.prototype.start = function() {
    if (this.arpeggioInterval) return;
    
    var self = this;
    var rateMs = this.getRateMs();
    
    this.arpeggioInterval = setInterval(function() {
        self.playNextNote();
    }, rateMs);
};

Arpeggiator.prototype.stop = function() {
    if (this.arpeggioInterval) {
        clearInterval(this.arpeggioInterval);
        this.arpeggioInterval = null;
    }
};

Arpeggiator.prototype.playNextNote = function() {
    if (this.heldNotes.length === 0 || !this.audioEngine) return;
    
    var note;
    
    switch (this.type) {
        case 'up':
            note = this.heldNotes[this.currentIndex % this.heldNotes.length];
            this.currentIndex++;
            break;
        case 'down':
            note = this.heldNotes[(this.heldNotes.length - 1 - (this.currentIndex % this.heldNotes.length))];
            this.currentIndex++;
            break;
        case 'updown':
            var total = this.heldNotes.length * 2 - 2;
            var idx = this.currentIndex % total;
            if (idx >= this.heldNotes.length) {
                idx = total - idx;
            }
            note = this.heldNotes[idx];
            this.currentIndex++;
            break;
        case 'random':
            note = this.heldNotes[Math.floor(Math.random() * this.heldNotes.length)];
            break;
    }
    
    if (note) {
        this.audioEngine.playNote(note.note, note.freq, this.getRateMs() / 1000);
    }
};

Arpeggiator.prototype.getRateMs = function() {
    var beatMs = (60 / this.tempo) * 1000;
    switch (this.rate) {
        case '1/4': return beatMs;
        case '1/8': return beatMs / 2;
        case '1/16': return beatMs / 4;
        case '1/32': return beatMs / 8;
        default: return beatMs / 2;
    }
};

Arpeggiator.prototype.setType = function(type) {
    this.type = type;
    console.log('🎼 Arp type: ' + type);
};

Arpeggiator.prototype.setRate = function(rate) {
    this.rate = rate;
    if (this.arpeggioInterval) {
        this.stop();
        this.start();
    }
};

Arpeggiator.prototype.setOctave = function(oct) {
    this.octave = parseInt(oct);
};

var arpeggiator = new Arpeggiator();
window.arpeggiator = arpeggiator;
window.Arpeggiator = Arpeggiator;
console.log('✅ arpeggiator.js loaded');