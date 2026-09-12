// ================================================================
// frequencies.js - Data Frekuensi E2 s/d A7
// SONIC20VERSE - 20 Nada Menggema di Semesta
// ================================================================

const NOTES_20 = ['E','E#','F','F#','G','G#','H','H#','I','J','J#','K','K#','A','A#','B','B#','C','C#','D'];
const WHITE_KEYS = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'A', 'B', 'C', 'D'];
const BLACK_KEYS = ['E#', 'F#', 'G#', 'H#', 'J#', 'K#', 'A#', 'B#', 'C#'];

function isWhiteKey(noteName) {
    var note = noteName.replace(/[0-9]/g, '');
    return WHITE_KEYS.indexOf(note) !== -1;
}

function isBlackKey(noteName) {
    var note = noteName.replace(/[0-9]/g, '');
    return BLACK_KEYS.indexOf(note) !== -1;
}

function calculateFrequency(index, octave) {
    var A4_INDEX = 13;
    var A4_OCTAVE = 4;
    var midiNumber = (octave * 20) + index;
    var midiA4 = (A4_OCTAVE * 20) + A4_INDEX;
    var n = midiNumber - midiA4;
    return 440 * Math.pow(3, n / 20);
}

const FREQ_MAP = {};

function generateFreqMap() {
    for (var oct = 2; oct <= 7; oct++) {
        var maxIndex = (oct === 7) ? 14 : 20;
        for (var i = 0; i < maxIndex; i++) {
            var noteName = NOTES_20[i] + oct;
            var freq = calculateFrequency(i, oct);
            FREQ_MAP[noteName] = parseFloat(freq.toFixed(5));
        }
    }
    FREQ_MAP['A4'] = 440.00000;
}

generateFreqMap();

const NOTE_TO_INDEX = {};
NOTES_20.forEach(function(note, index) {
    NOTE_TO_INDEX[note] = index;
});

function getNoteIndex(noteName) {
    return NOTE_TO_INDEX[noteName] !== undefined ? NOTE_TO_INDEX[noteName] : 0;
}

function getNoteName(index) {
    return NOTES_20[index % 20] || 'E';
}

function getFrequencyFromNote(noteName) {
    return FREQ_MAP[noteName] || 0;
}

function getAllNotes() {
    var allNotes = [];
    for (var oct = 2; oct <= 7; oct++) {
        var maxIndex = (oct === 7) ? 14 : 20;
        for (var i = 0; i < maxIndex; i++) {
            var fullName = NOTES_20[i] + oct;
            if (FREQ_MAP[fullName] !== undefined) {
                allNotes.push(fullName);
            }
        }
    }
    return allNotes;
}

function formatFrequency(freq) {
    return freq.toFixed(5);
}

window.FREQ_MAP = FREQ_MAP;
window.NOTES_20 = NOTES_20;
window.NOTE_TO_INDEX = NOTE_TO_INDEX;
window.WHITE_KEYS = WHITE_KEYS;
window.BLACK_KEYS = BLACK_KEYS;
window.isWhiteKey = isWhiteKey;
window.isBlackKey = isBlackKey;
window.getNoteIndex = getNoteIndex;
window.getNoteName = getNoteName;
window.getFrequencyFromNote = getFrequencyFromNote;
window.getAllNotes = getAllNotes;
window.formatFrequency = formatFrequency;
window.calculateFrequency = calculateFrequency;

console.log('✅ frequencies.js loaded · ' + getAllNotes().length + ' notes');