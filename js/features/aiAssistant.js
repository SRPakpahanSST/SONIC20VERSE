// ================================================================
// aiAssistant.js - AI Assistant
// SONIC20VERSE
// ================================================================

function AIAssistant() {
    this.audioEngine = null;
    this.isGenerating = false;
}

AIAssistant.prototype.init = function(audioEngine) {
    this.audioEngine = audioEngine;
    console.log('✅ AI Assistant siap');
};

AIAssistant.prototype.compose = function(style, mood) {
    console.log('🎵 AI Compose: ' + style + ', mood: ' + mood);
    var melody = [];
    var scale = [0, 2, 4, 5, 7, 9, 11, 12];
    
    for (var i = 0; i < 16; i++) {
        var noteIdx = scale[Math.floor(Math.random() * scale.length)];
        var noteName = window.getNoteName ? window.getNoteName(noteIdx) : 'E';
        var octave = 4 + Math.floor(Math.random() * 2);
        var fullName = noteName + octave;
        var freq = window.getFrequencyFromNote ? window.getFrequencyFromNote(fullName) : 0;
        melody.push({ note: fullName, freq: freq, duration: 0.3 + Math.random() * 0.3 });
    }
    
    return melody;
};

AIAssistant.prototype.harmonize = function(melody) {
    console.log('🎶 AI Harmonize');
    var harmony = melody.map(function(note) {
        var idx = window.getNoteIndex ? window.getNoteIndex(note.note.replace(/[0-9]/g, '')) : 0;
        var harmonyIdx = (idx + 4) % 20;
        var harmName = window.getNoteName ? window.getNoteName(harmonyIdx) : 'E';
        var octMatch = note.note.match(/\d+/);
        var octave = octMatch ? octMatch[0] : '4';
        var fullName = harmName + octave;
        return {
            note: fullName,
            freq: window.getFrequencyFromNote ? window.getFrequencyFromNote(fullName) : 0,
            duration: note.duration
        };
    });
    return harmony;
};

AIAssistant.prototype.improvise = function(chordProgression) {
    console.log('🎷 AI Improvise');
    var scale = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 18, 19];
    var improvisation = [];
    
    for (var i = 0; i < 24; i++) {
        var noteIdx = scale[Math.floor(Math.random() * scale.length)];
        var noteName = window.getNoteName ? window.getNoteName(noteIdx) : 'E';
        var octave = 4 + Math.floor(Math.random() * 3);
        var fullName = noteName + octave;
        var freq = window.getFrequencyFromNote ? window.getFrequencyFromNote(fullName) : 0;
        improvisation.push({ note: fullName, freq: freq, duration: 0.2 + Math.random() * 0.4 });
    }
    
    return improvisation;
};

AIAssistant.prototype.suggestChord = function(currentNotes) {
    console.log('💡 AI Suggest Chord');
    var suggestions = ['C', 'Am', 'F', 'G', 'Em', 'Dm', 'G7'];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
};

AIAssistant.prototype.playMelody = function(melody) {
    if (!this.audioEngine || !melody) return;
    
    var self = this;
    var delay = 0;
    melody.forEach(function(note) {
        setTimeout(function() {
            self.audioEngine.playNote(note.note, note.freq, note.duration);
        }, delay);
        delay += note.duration * 1000 + 50;
    });
};

var aiAssistant = new AIAssistant();
window.aiAssistant = aiAssistant;
window.AIAssistant = AIAssistant;
console.log('✅ aiAssistant.js loaded');