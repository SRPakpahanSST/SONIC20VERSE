// ============================================================
// app.js - Entry Point with Power Management
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

// System State
var systemState = {
    powerOn: false,
    bootComplete: false,
    audioUnlocked: false,
    inStudio: false
};

// ============================================================
// POWER ON
// ============================================================
function powerOn() {
    console.log('⚡ POWER ON');
    systemState.powerOn = true;
    
    var btnPower = document.getElementById('btnPowerOn');
    if (btnPower) btnPower.classList.add('on');
    
    // Play startup sound
    playStartupSound();
    
    // Wait a bit then show boot screen
    setTimeout(function() {
        showBootScreen();
    }, 500);
}

function powerOff() {
    console.log('⏻ POWER OFF');
    systemState.powerOn = false;
    systemState.bootComplete = false;
    systemState.inStudio = false;
    
    // Stop all audio
    if (audioEngine) audioEngine.stopAll();
    if (styleEngine) styleEngine.stop();
    
    // Show landing page
    showLandingPage();
}

// ============================================================
// STARTUP SOUND
// ============================================================
function playStartupSound() {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Startup chord: C-E-G-C
        var notes = [261.63, 329.63, 392.00, 523.25];
        var now = ctx.currentTime;
        
        notes.forEach(function(freq, i) {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, now + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.8);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.8);
        });
        
        setTimeout(function() { ctx.close(); }, 2000);
    } catch(e) {
        console.log('Startup sound error:', e);
    }
}

// ============================================================
// BOOT SCREEN
// ============================================================
var bootSteps = [
    { progress: 5, status: 'Initializing system...', log: '⚡ Power ON detected' },
    { progress: 15, status: 'Loading frequencies...', log: '✅ Loaded 114 notes (E2-A7)' },
    { progress: 25, status: 'Initializing audio engine...', log: '✅ Web Audio API ready' },
    { progress: 35, status: 'Loading AI modules...', log: '✅ Multi-Agent AI loaded' },
    { progress: 45, status: 'Loading style engine...', log: '✅ 9 styles loaded' },
    { progress: 55, status: 'Loading voice manager...', log: '✅ 32 voices loaded' },
    { progress: 65, status: 'Initializing keyboard...', log: '✅ 114 tuts rendered' },
    { progress: 75, status: 'Initializing effects...', log: '✅ Reverb, Delay, Chorus ready' },
    { progress: 85, status: 'Calibrating sensors...', log: '✅ Touch & MIDI ready' },
    { progress: 95, status: 'Finalizing...', log: '✅ SONIC20VERSE ready!' },
    { progress: 100, status: 'Welcome to SONIC20VERSE!', log: '🎹 20 Nada Menggema di Semesta' }
];

function showBootScreen() {
    var bootScreen = document.getElementById('boot-screen');
    if (!bootScreen) return;
    
    bootScreen.classList.add('show');
    
    var progressBar = document.getElementById('bootProgressBar');
    var statusEl = document.getElementById('bootStatus');
    var logEl = document.getElementById('bootLog');
    
    var stepIndex = 0;
    
    function runBootStep() {
        if (stepIndex >= bootSteps.length) {
            setTimeout(showHomeScreen, 800);
            return;
        }
        
        var step = bootSteps[stepIndex];
        
        if (progressBar) progressBar.style.width = step.progress + '%';
        if (statusEl) statusEl.textContent = step.status;
        
        if (logEl) {
            var logLine = document.createElement('div');
            logLine.textContent = step.log;
            logEl.appendChild(logLine);
            logEl.scrollTop = logEl.scrollHeight;
        }
        
        stepIndex++;
        
        var delay = 200 + Math.random() * 300;
        setTimeout(runBootStep, delay);
    }
    
    runBootStep();
}

// ============================================================
// HOME SCREEN
// ============================================================
function showHomeScreen() {
    systemState.bootComplete = true;
    
    var bootScreen = document.getElementById('boot-screen');
    if (bootScreen) bootScreen.classList.remove('show');
    
    var homeScreen = document.getElementById('home-screen');
    if (homeScreen) homeScreen.classList.add('show');
    
    console.log('🏠 Home screen ready');
}

// ============================================================
// ENTER STUDIO
// ============================================================
function enterStudio() {
    console.log('🎹 Entering Studio...');
    
    // Unlock audio
    unlockAudio();
    
    systemState.inStudio = true;
    
    var homeScreen = document.getElementById('home-screen');
    if (homeScreen) homeScreen.classList.remove('show');
    
    var splashScreen = document.getElementById('splash-screen');
    if (splashScreen) splashScreen.classList.add('show');
    
    // Load studio after splash
    setTimeout(function() {
        if (splashScreen) splashScreen.classList.remove('show');
        
        var app = document.getElementById('app');
        if (app) {
            app.classList.add('show');
            app.style.display = 'flex';
        }
        
        // Initialize all systems
        initApp();
        
        // Update audio status
        updateAudioStatus('unlocked');
    }, 2500);
}

// ============================================================
// UNLOCK AUDIO
// ============================================================
function unlockAudio() {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
        systemState.audioUnlocked = true;
        console.log('🔊 Audio unlocked');
        
        // Play test tone (silent)
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        gain.gain.value = 0.001;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
        
        setTimeout(function() { ctx.close(); }, 500);
    } catch(e) {
        console.log('Audio unlock error:', e);
    }
}

function updateAudioStatus(status) {
    var el = document.getElementById('audioStatus');
    if (el) {
        if (status === 'unlocked') {
            el.textContent = '✅ Unlocked';
            el.className = 'status-value ready';
        } else {
            el.textContent = '🔒 Locked (Tap to unlock)';
            el.className = 'status-value locked';
        }
    }
}

// ============================================================
// INIT APP
// ============================================================
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
        setupPowerButton();
        
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

// ============================================================
// SETUP POWER BUTTON
// ============================================================
function setupPowerButton() {
    var btnPowerOn = document.getElementById('btnPowerOn');
    var btnPowerOff = document.getElementById('btnPowerOff');
    var btnEnterStudio = document.getElementById('btnEnterStudio');
    var btnQuickStart = document.getElementById('btnQuickStart');
    
    if (btnPowerOn) {
        btnPowerOn.addEventListener('click', powerOn);
        btnPowerOn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            powerOn();
        }, { passive: false });
    }
    
    if (btnPowerOff) {
        btnPowerOff.addEventListener('click', function() {
            if (confirm('Matikan SONIC20VERSE?')) {
                powerOff();
            }
        });
    }
    
    if (btnEnterStudio) {
        btnEnterStudio.addEventListener('click', enterStudio);
    }
    
    if (btnQuickStart) {
        btnQuickStart.addEventListener('click', function() {
            unlockAudio();
            enterStudio();
        });
    }
    
    // Unlock audio on any user interaction
    document.addEventListener('click', function() {
        if (!systemState.audioUnlocked) {
            unlockAudio();
            updateAudioStatus('unlocked');
        }
    }, { once: false });
}

// ============================================================
// SHOW LANDING PAGE
// ============================================================
function showLandingPage() {
    var landingPage = document.getElementById('landing-page');
    var homeScreen = document.getElementById('home-screen');
    var bootScreen = document.getElementById('boot-screen');
    var splashScreen = document.getElementById('splash-screen');
    var app = document.getElementById('app');
    
    if (landingPage) landingPage.classList.remove('hidden');
    if (homeScreen) homeScreen.classList.remove('show');
    if (bootScreen) bootScreen.classList.remove('show');
    if (splashScreen) splashScreen.classList.remove('show');
    if (app) {
        app.classList.remove('show');
        app.style.display = 'none';
    }
    
    var btnPower = document.getElementById('btnPowerOn');
    if (btnPower) btnPower.classList.remove('on');
}

// ============================================================
// EXISTING SETUP FUNCTIONS
// ============================================================

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
        });
    });
    
    document.querySelectorAll('.menu-item').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.menu-item').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
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
        btnStop.addEventListener('click', function() {
            if (styleEngine) styleEngine.stop();
            if (audioEngine) audioEngine.stopAll();
            if (btnPlay) btnPlay.textContent = '▶️';
        });
    }
    
    var btnRecord = document.getElementById('btnRecord');
    if (btnRecord) {
        btnRecord.addEventListener('click', function() {
            if (recorder) {
                if (recorder.isRecording) {
                    recorder.stopRecording();
                } else {
                    recorder.startRecording();
                }
            }
        });
    }
}

function setupStyleControls() {
    var styleSelect = document.getElementById('styleSelect');
    if (styleSelect && styleEngine) {
        styleSelect.addEventListener('change', function() {
            styleEngine.setStyle(this.value);
        });
    }
    
    ['styleIntro', 'styleMainA', 'styleMainB', 'styleMainC', 'styleFill', 'styleEnding'].forEach(function(id) {
        var btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.style-btn').forEach(function(b) {
                    if (b.id !== 'styleIntro' && b.id !== 'styleFill' && b.id !== 'styleEnding') {
                        b.classList.remove('active');
                    }
                });
                this.classList.add('active');
                var section = id.replace('style', '').toLowerCase();
                if (styleEngine) styleEngine.setSection(section);
            });
        }
    });
}

function setupVoiceControls() {
    document.querySelectorAll('.voice-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.voice-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            var category = this.dataset.voice;
            if (voiceManager) voiceManager.setCategory(category);
        });
    });
}

function setupAIEvents() {
    var btnCompose = document.getElementById('btnAICompose');
    if (btnCompose) {
        btnCompose.addEventListener('click', function() {
            if (aiAssistant) {
                var melody = aiAssistant.compose('maqam_rast', 'happy');
                aiAssistant.playMelody(melody);
            }
        });
    }
    
    var btnImprovise = document.getElementById('btnAIImprovise');
    if (btnImprovise) {
        btnImprovise.addEventListener('click', function() {
            if (aiAssistant) {
                var impro = aiAssistant.improvise('I-IV-V-I');
                aiAssistant.playMelody(impro);
            }
        });
    }
    
    var btnSuggest = document.getElementById('btnAISuggest');
    if (btnSuggest) {
        btnSuggest.addEventListener('click', function() {
            if (aiAssistant) {
                var chord = aiAssistant.suggestChord([]);
                if (displayManager) displayManager.updateChord(chord);
            }
        });
    }
}

function setupClock() {
    function updateClock() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var mins = String(now.getMinutes()).padStart(2, '0');
        var clockEl = document.getElementById('statusClock');
        if (clockEl) clockEl.textContent = '🕐 ' + hours + ':' + mins;
    }
    updateClock();
    setInterval(updateClock, 60000);
}

// ============================================================
// STARTUP
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 SONIC20VERSE - Ready for POWER ON');
    setupPowerButton();
});

console.log('✅ app.js loaded');