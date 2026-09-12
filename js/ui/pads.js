// ================================================================
// pads.js - Drum Pads
// SONIC20VERSE
// ================================================================

function PadController() {
    this.audioEngine = null;
    this.currentKit = 'standard';
    this.pads = {
        1: { name: 'Kick', note: 'C2', freq: 65.41 },
        2: { name: 'Snare', note: 'D2', freq: 73.42 },
        3: { name: 'Hi-Hat Closed', note: 'E2', freq: 82.41 },
        4: { name: 'Hi-Hat Open', note: 'F2', freq: 87.31 },
        5: { name: 'Crash', note: 'G2', freq: 98.00 },
        6: { name: 'Tom High', note: 'A2', freq: 110.00 },
        7: { name: 'Tom Mid', note: 'B2', freq: 123.47 },
        8: { name: 'Tom Low', note: 'C3', freq: 130.81 }
    };
}

PadController.prototype.init = function(audioEngine) {
    this.audioEngine = audioEngine;
    var self = this;
    
    document.querySelectorAll('.pad-btn').forEach(function(btn) {
        var padNum = parseInt(btn.dataset.pad);
        
        btn.addEventListener('mousedown', function() {
            self.playPad(padNum);
            this.classList.add('active');
        });
        
        btn.addEventListener('mouseup', function() {
            this.classList.remove('active');
        });
        
        btn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            self.playPad(padNum);
            this.classList.add('active');
        }, { passive: false });
        
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.remove('active');
        }, { passive: false });
    });
    
    console.log('✅ Pad Controller siap');
};

PadController.prototype.playPad = function(padNum) {
    var pad = this.pads[padNum];
    if (!pad || !this.audioEngine) return;
    
    this.audioEngine.playNote(pad.note, pad.freq, 0.3);
    console.log('🥁 ' + pad.name);
};

PadController.prototype.setKit = function(kitName) {
    this.currentKit = kitName;
    console.log('🥁 Drum Kit: ' + kitName);
};

var padController = new PadController();
window.padController = padController;
window.PadController = PadController;
console.log('✅ pads.js loaded');