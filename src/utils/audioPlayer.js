// Web Audio & HTML5 Audio Engine for Hitster Music Playback
// Handles clean single-click play promises without AbortErrors

class AudioEngine {
  constructor() {
    this.audioElement = document.getElementById('global-audio-player');
    this.isPlaying = false;
    this.currentTrack = null;
    this.listeners = [];
    this.pendingPlayPromise = null;

    if (this.audioElement) {
      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('error', (e) => {
        console.warn("Audio load error on main URL, trying fallback stream if available...", e);
        if (this.currentTrack && this.currentTrack.fallbackUrl && !this.currentTrack.fallbackTried) {
          this.currentTrack.fallbackTried = true;
          this.audioElement.src = this.currentTrack.fallbackUrl;
          this.audioElement.play().catch(err => console.warn("Fallback audio play error", err));
        }
      });
    }
  }

  async playTrack(track) {
    if (!this.audioElement) return;

    // If clicking same track, toggle play/pause
    if (this.currentTrack && this.currentTrack.id === track.id) {
      if (this.isPlaying) {
        this.audioElement.pause();
        this.isPlaying = false;
      } else {
        try {
          this.pendingPlayPromise = this.audioElement.play();
          await this.pendingPlayPromise;
          this.isPlaying = true;
        } catch (e) {
          if (e.name !== 'AbortError') {
            console.warn("Play error", e);
          }
        }
      }
      this.notify();
      return;
    }

    // New track selected
    this.currentTrack = track;
    this.currentTrack.fallbackTried = false;
    
    // Assign audio source
    this.audioElement.src = track.audioUrl;

    // Set seek offset when metadata is ready
    this.audioElement.onloadedmetadata = () => {
      if (this.audioElement.duration > 30) {
        this.audioElement.currentTime = Math.floor(Math.random() * 15) + 10;
      } else {
        this.audioElement.currentTime = 0;
      }
    };

    // Execute single play promise safely
    try {
      this.pendingPlayPromise = this.audioElement.play();
      await this.pendingPlayPromise;
      this.isPlaying = true;
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.warn("Audio initial play deferred", e);
      }
    }
    this.notify();
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.isPlaying = false;
      this.currentTrack = null;
      this.notify();
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(fn => fn({ isPlaying: this.isPlaying, currentTrack: this.currentTrack }));
  }
}

export const audioEngine = new AudioEngine();
