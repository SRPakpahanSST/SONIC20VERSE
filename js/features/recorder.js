// ================================================================
// recorder.js - Multi-Track Recorder
// SONIC20VERSE
// ================================================================

function Recorder() {
    this.isRecording = false;
    this.isPlaying = false;
    this.currentTrack = 1;
    this.tracks = {1: [], 2: [], 3: [], 4: [], 5: []};
    this.startTime = 0;
    this.elapsedTime = 0;
    this.timerInterval = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
}

Recorder.prototype.init = function() {
    console.log('✅ Recorder siap');
};

Recorder.prototype.startRecording = function() {
    if (this.isRecording) return;
    this.isRecording = true;
    this.startTime = Date.now();
    this.tracks[this.currentTrack] = [];
    
    var self = this;
    this.timerInterval = setInterval(function() {
        self.elapsedTime = Math.floor((Date.now() - self.startTime) / 1000);
        self.updateTimerDisplay();
    }, 1000);
    
    console.log('🔴 Recording started on track ' + this.currentTrack);
    this.updateStatus('🔴 Recording...');
};

Recorder.prototype.stopRecording = function() {
    if (!this.isRecording) return;
    this.isRecording = false;
    
    if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }
    
    console.log('⏹️ Recording stopped');
    this.updateStatus('⏹️ Recording stopped');
};

Recorder.prototype.recordNote = function(noteName, freq, duration) {
    if (!this.isRecording) return;
    var elapsed = (Date.now() - this.startTime) / 1000;
    this.tracks[this.currentTrack].push({
        note: noteName,
        freq: freq,
        duration: duration,
        time: elapsed
    });
};

Recorder.prototype.updateTimerDisplay = function() {
    var mins = Math.floor(this.elapsedTime / 60);
    var secs = this.elapsedTime % 60;
    var timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    
    var el = document.getElementById('recordTime');
    if (el) el.textContent = timeStr;
};

Recorder.prototype.updateStatus = function(status) {
    var el = document.getElementById('footerStatus');
    if (el) el.textContent = 'Status: ' + status;
};

Recorder.prototype.setTrack = function(trackNum) {
    this.currentTrack = trackNum;
    console.log('🎙️ Track: ' + trackNum);
};

Recorder.prototype.save = function() {
    var data = JSON.stringify(this.tracks);
    console.log('💾 Saved: ' + data.length + ' bytes');
};

Recorder.prototype.exportWAV = function() {
    console.log('📤 Exporting WAV...');
};

var recorder = new Recorder();
window.recorder = recorder;
window.Recorder = Recorder;
console.log('✅ recorder.js loaded');