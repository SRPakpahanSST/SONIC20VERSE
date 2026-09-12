// ============================================================
// app.js - Entry Point
// SONIC20VERSE
// ============================================================

var audioEngine = null;
var keyboardRenderer = null;
var styleEngine = null;
var voiceManager = null;
var arpeggiator = null;
var recorder = null;
var mixer = null;
var aiAssistant = null;
var knobController = null;
var wheelController = null;
var padController = null;
var displayManager = null;

function initApp() {
    console.log('🎹 SONIC20VERSE initializing...');
    
    try {
        // 1. Audio Engine
        audioEngine = window.audioEngine || new AudioEngine();
        audioEngine.init();
        console.log('✅ Audio Engine siap');
        
        // 2. Display Manager
        displayManager = new DisplayManager();
        displayManager.init();
        
        // 3. Keyboard
        keyboardRenderer = new KeyboardRenderer();
        keyboardRenderer.init(audioEngine);
        console.log('✅ Keyboard siap (E2 - A7)');
        
        // 4. Style Engine
        styleEngine = new StyleEngine();
        styleEngine.init(audioEngine);
        
        // 5. Voice Manager
        voiceManager = new VoiceManager();
        voiceManager.init(audioEngine);
        
        // 6. Arpeggiator
        arpeggiator = new Arpeggiator();
        arpeggiator.init(audioEngine);
        
        // 7. Recorder
        recorder = new Recorder();
        recorder.init();
        
        // 8. Mixer
        mixer = new Mixer();
        mixer.init(audioEngine);
        
        // 9. AI Assistant
        aiAssistant = new AIAssistant();
        aiAssistant.init(audioEngine);
        
        // 10. UI Controllers
        knobController = new KnobController();
        knobController.init();
        
        wheelController = new WheelController();
        wheelController.init();
        
        padController = new PadController();
        padController.init(audioEngine);
        
        // Setup events
        setupControls();
        setupTabs();
        setupTransport();
        setupStyleControls();
        setupVoiceControls();
        setupAIEvents();
        setupClock();
        
        // Register global references
        window.audioEngine = audioEngine;
        window.keyboardRenderer = keyboardRenderer;
        window.styleEngine = styleEngine;
        window.voiceManager = voiceManager;
        window.arpeggiator = arpeggiator;
        window.recorder = recorder;
        window.mixer = mixer;
        window.aiAssistant = aiAssistant;
        window.displayManager = displayManager;
        
        console.log('🎉 SONIC20VERSE initialized!');
        console.log('⚓ 20 Nada Menggema di Semesta');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

function setupControls() {
    var volume = document.getElementById('volumeControl');
    if (volume && audioEngine) {
        volume.addEventListener('input', function(e) {
            audioEngine.setVolume(parseFloat(e.target.value));
        });
    }
    
    var reverb = document.getElementById('reverbControl');
    if (reverb && audioEngine) {
        reverb.addEventListener('input', function(e) {
            audioEngine.setReverb(parseFloat(e.target.value));
        });
    }
    
    var waveform = document.getElementById('waveformSelect');
    if (waveform && audioEngine) {
        waveform.addEventListener('change', function(e) {
            audioEngine.setWaveform(e.target.value);
        });
    }
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tabId = this.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(function(b) {
                b.classList.toggle('active', b.dataset.tab === tabId);
            });
            console.log('📑 Tab: ' + tabId);
        });
    });
    
    document.querySelectorAll('.menu-item').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.menu-item').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            console.log('📋 Menu: ' + this.dataset.menu);
        });
    });
}

function setupTransport() {
    var btnPlay = document.getElementById('btnPlay');
    if (btnPlay) {
        btnPlay.addEventListener('click', function() {
            if (styleEngine) {
                if (styleEngine.isPlaying) {
                    styleEngine.stop();
                    this.textContent = '▶️';
                } else {
                    styleEngine.start();
                    this.textContent = '⏸️';
                }
            }
        });
    }
    
    var btnStop = document.getElementById('btnStop');
    if (btnStop) {
        btnStop.addEventListener('click', function()