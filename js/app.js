// ============================================================
// app.js - Entry Point with Studio Power Management
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
    inStudio: false,
    initialized: false
};

// ============================================================
// LANDING PAGE HANDLER
// ============================================================
function setupLandingPage() {
    var landingPage = document.getElementById('landing-page');
    var splashScreen = document.getElementById('splash-screen');
    var appContainer = document.getElementById('app');
    var btnMulai = document.getElementById('btnMulai');
    var loaderBar = document.getElementById('loaderBar');
    
    if (!btnMulai) return;
    
    var newBtn = btnMulai.cloneNode(true);
    btnMulai.parentNode.replaceChild(newBtn, btnMulai);
    
    newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🚀 Tombol Mulai diklik!');
        
        // Hide landing
        if (landingPage) landingPage.classList.add('hidden');
        
        // Show splash
        setTimeout(function() {
            if (splashScreen) splashScreen.classList.add('show');
            
            // Loading bar
            if (loaderBar) {
                loaderBar.style.width = '0%';
                var progress = 0;
                var interval = setInterval(function() {
                    progress += Math.random() * 8 + 2;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        loaderBar.style.width = '100%';
                        setTimeout(function() {
                            // Hide splash, show app
                            if (splashScreen) {
                                splashScreen.classList.remove('show');
                                splashScreen.style.display = 'none';
                            }
                            if (appContainer) {
                                appContainer.classList.add('show');
                                appContainer.style.display = 'flex';
                            }
                            
                            // Initialize app
                            setTimeout(function() {
                                initApp();
                            }, 200);
                            
                            console.log('✅ Studio siap! Tekan tombol POWER di header untuk menyalakan keyboard.');
                        }, 500);
                    }
                    loaderBar.style.width = progress + '%';
                }, 120);
            } else {
                setTimeout(function() {
                    if (splashScreen) {
                        splashScreen.classList.remove('show');
                        splashScreen.style.display = 'none';
                    }
                    if (appContainer) {
                        appContainer.classList.add('show');
                        appContainer.style.display = 'flex';
                    }
                    initApp();
                }, 2500);
            }
        }, 600);
    });
    
    newBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        newBtn.click();
    }, { passive: false });
}

// ============================================================
// STUDIO POWER ON/OFF
// ============================================================
function setupStudioPower() {
    var btnPower = document.getElementById('btnPowerStudio');
    var powerLed = document.getElementById('powerLed');
    var powerLabel = document.getElementById('powerLabel');
    
    if (!btnPower) return;
    
    btnPower.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (systemState.powerOn) {
            // POWER OFF
            powerOffStudio();
        } else {
            // POWER ON
            powerOnStudio();
        }
    });
    
    // Touch support
    btnPower.addEventListener('touchstart', function(e) {
        e.preventDefault();
        btnPower.click();
    }, { passive: false });
    
    // Initially show OFF
    updatePowerIndicator(false);
}

function powerOnStudio() {
    console.log('⚡ POWER ON Studio');
    
    systemState.powerOn = true;
    updatePowerIndicator(true);
    
    // Unlock audio
    unlockAudio();
    
    // Play startup sound
    playStartupSound();
    
    // Show boot screen
    showBootScreen();
}

function powerOffStudio() {
    console.log('⏻ POWER OFF Studio');
    
    systemState.powerOn = false;
    updatePowerIndicator(false);
    
    // Stop all audio
    if (audioEngine) audioEngine.stopAll();
    if (styleEngine) styleEngine.stop();
    
    // Stop all keys active
    if (keyboardRenderer) {
        Object.keys(keyboardRenderer.activeKeys).forEach(function(noteName) {
            var key = keyboardRenderer.keyElements[noteName];
            if (key) keyboardRenderer.deactivateKey(key);
        });
    }
    
    console.log('💤 Studio OFF - Tekan tombol POWER untuk menyalakan kembali');
}

function updatePowerIndicator(isOn) {
    var btnPower = document.getElementById('btnPowerStudio');
    var powerLed = document.getElementById('powerLed');
    var powerLabel = document.getElementById('powerLabel');
    
    if (btnPower) {
        if (isOn) {
            btnPower.classList.add('on');
        } else {
            btnPower.classList.remove('on');
        }
    }
    
    if (powerLed) {
        if (isOn) {
            powerLed.classList.add('on');
        } else {
            powerLed.classList.remove('on');
        }
    }
    
    if (powerLabel) {
        powerLabel.textContent = isOn ? 'ON' : 'OFF';
        if (isOn) {
            powerLabel.classList.add('on');
        } else {
            powerLabel.classList.remove('on');
        }
    }
}

// ============================================================
// STARTUP SOUND
// ============================================================
function playStartupSound() {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        
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
        
        // Play silent tone to unlock
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
    if (!bootScreen) {
        // No boot screen, just enable
        systemState.bootComplete = true;
        return;
    }
    
    bootScreen.classList.add('show');
    
    var progressBar = document.getElementById('bootProgressBar');
    var statusEl = document.getElementById('bootStatus');
    var logEl = document.getElementById('bootLog');
    
    // Clear log
    if (logEl) logEl.innerHTML = '';
    
    var stepIndex = 0;
    
    function runBootStep() {
        if (stepIndex >= bootSteps.length) {
            setTimeout(function() {
                bootScreen.classList.remove('show');
                systemState.bootComplete = true;
                console.log('🎉 Boot complete! Keyboard ready to play.');
                
                // Update footer
                var footerStatus = document.getElementById('footerStatus');
                if (footerStatus) footerStatus.textContent = 'Status: Ready';
            }, 800);
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
// INIT APP
// ============================================================
function initApp() {
    if (systemState.initialized) return;
    
    console.log('🎹 SONIC20VERSE initializing...');
    
    try {
        // 1. Audio Engine
        audioEngine = window.audioEngine || new AudioEngine();
        audioEngine.init();
        console.log('✅ Audio Engine siap');
        
        // 2. Display Manager
        if (typeof DisplayManager !== 'undefined') {
            displayManager = new DisplayManager();
            displayManager.init();
        }
        
        // 3. Keyboard
        if (typeof KeyboardRenderer !== 'undefined') {
            keyboardRenderer = new KeyboardRenderer();
            keyboardRenderer.init(audioEngine);
            console.log('✅ Keyboard siap (E2 - A7)');
        }
        
        // 4. Style Engine
        if (typeof StyleEngine !== 'undefined') {
            styleEngine = new StyleEngine();
            styleEngine.init(audioEngine);
        }
        
        // 5. Voice Manager
        if (typeof VoiceManager !== 'undefined') {
            voiceManager = new VoiceManager();
            voiceManager.init(audioEngine);
        }
        
        // 6. Arpeggiator
        if (typeof Arpeggiator !== 'undefined') {
            arpeggiator = new Arpeggiator();
            arpeggiator.init(audioEngine);
        }
        
        // 7. Recorder
        if (typeof Recorder !== 'undefined') {
            recorder = new Recorder();
            recorder.init();
        }
        
        // 8. Mixer
        if (typeof Mixer !== 'undefined') {
            mixer = new Mixer();
            mixer.init(audioEngine);
        }
        
        // 9. AI Assistant
        if (typeof AIAssistant !== 'undefined') {
            aiAssistant = new AIAssistant();
            aiAssistant.init(audioEngine);
        }
        
        // 10. UI Controllers
        if (typeof KnobController !== 'undefined') {
            knobController = new KnobController();
            knobController.init();
        }
        
        if (typeof WheelController !== 'undefined') {
            wheelController = new WheelController();
            wheelController.init();
        }
        
        if (typeof PadController !== 'undefined') {
            padController = new PadController();
            padController.init(audioEngine);
        }
        
        // Setup Power Button
        setupStudioPower();
        
        // Setup other controls
        setupControls();
        setupTabs();
        setupTransport();
        setupStyleControls();
        setupVoiceControls();
        setupAIEvents();
        setupClock();
        
        // Register globals
        window.audioEngine = audioEngine;
        window.keyboardRenderer = keyboardRenderer;
        window.styleEngine = styleEngine;
        window.voiceManager = voiceManager;
        window.arpeggiator = arpeggiator;
        window.recorder = recorder;
        window.mixer = mixer;
        window.aiAssistant = aiAssistant;
        window.displayManager = displayManager;
        
        systemState.initialized = true;
        
        console.log('🎉 SONIC20VERSE initialized!');
        console.log('⚓ 20 Nada Menggema di Semesta');
        console.log('💡 Tekan tombol POWER di header untuk menyalakan keyboard.');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// ============================================================
// SETUP FUNCTIONS
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
            if (!systemState.powerOn) {
                console.log('⚠️ Power OFF - tekan POWER dulu');
                return;
            }
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
            if (!systemState.powerOn) return;
            if (aiAssistant) {
                var melody = aiAssistant.compose('maqam_rast', 'happy');
                aiAssistant.playMelody(melody);
            }
        });
    }
    
    var btnImprovise = document.getElementById('btnAIImprovise');
    if (btnImprovise) {
        btnImprovise.addEventListener('click', function() {
            if (!systemState.powerOn) return;
            if (aiAssistant) {
                var impro = aiAssistant.improvise('I-IV-V-I');
                aiAssistant.playMelody(impro);
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
    console.log('📄 SONIC20VERSE - Ready');
    setupLandingPage();
});

window.addEventListener('load', function() {
    if (!systemState.initialized) {
        // Fallback
    }
});

console.log('✅ app.js loaded');