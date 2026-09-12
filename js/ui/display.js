// ================================================================
// display.js - Display Manager (LCD Monitor)
// SONIC20VERSE
// ================================================================

function DisplayManager() {
    this.nowPlayingNote = null;
    this.nowPlayingFreq = null;
    this.currentStyle = 'Maqam Rast';
    this.currentTempo = 120;
    this.currentBeat = 0;
}

DisplayManager.prototype.init = function() {
    console.log('✅ Display Manager siap');
};

DisplayManager.prototype.updateNowPlaying = function(noteName, freq) {
    this.nowPlayingNote = noteName;
    this.nowPlayingFreq = freq;
    
    var noteEl = document.getElementById('nowPlayingNote');
    var freqEl = document.getElementById('nowPlayingFreq');
    
    if (noteEl) noteEl.textContent = noteName || '-';
    if (freqEl) freqEl.textContent = freq ? freq.toFixed(3) + ' Hz' : '- Hz';
};

DisplayManager.prototype.updateStyle = function(styleName, tempo) {
    this.currentStyle = styleName;
    this.currentTempo = tempo;
    
    var styleEl = document.getElementById('currentStyle');
    var tempoEl = document.getElementById('currentTempo');
    var tempoDisp = document.getElementById('tempoDisplay');
    
    if (styleEl) styleEl.textContent = styleName;
    if (tempoEl) tempoEl.textContent = '♩ = ' + tempo + ' BPM';
    if (tempoDisp) tempoDisp.textContent = tempo;
};

DisplayManager.prototype.updateBeat = function(beatNum) {
    this.currentBeat = beatNum;
    var beats = document.querySelectorAll('.beat-indicator .beat');
    beats.forEach(function(beat, idx) {
        beat.classList.toggle('active', idx === beatNum);
    });
};

DisplayManager.prototype.updateChord = function(chordName) {
    var el = document.getElementById('currentChord');
    if (el) el.textContent = chordName;
};

DisplayManager.prototype.updateScale = function(scaleName) {
    var el = document.getElementById('currentScale');
    if (el) el.textContent = scaleName;
};

DisplayManager.prototype.updateStatus = function(status) {
    var el = document.getElementById('footerStatus');
    if (el) el.textContent = 'Status: ' + status;
};

DisplayManager.prototype.updateCPU = function(percent) {
    var el = document.getElementById('footerCPU');
    if (el) el.textContent = 'CPU: ' + percent + '%';
};

DisplayManager.prototype.updateLatency = function(ms) {
    var el = document.getElementById('footerLatency');
    if (el) el.textContent = 'Latency: ' + ms + 'ms';
};

var displayManager = new DisplayManager();
window.displayManager = displayManager;
window.DisplayManager = DisplayManager;
console.log('✅ display.js loaded');