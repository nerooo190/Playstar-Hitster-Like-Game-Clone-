// Web Audio & HTML5 Audio Engine for Hitster Music Playback
// Universal Vercel.com & Localhost Compatibility with Volume & Seeking Controls

import { fetchAudioStream } from './streamExtractor.js';

class AudioEngine {
  constructor() {
    this.audioElement = document.getElementById('global-audio-player');
    this.isPlaying = false;
    this.currentTrack = null;
    this.volume = 0.8;
    this.currentTime = 0;
    this.duration = 30;
    this.listeners = [];
    this.pendingPlayPromise = null;

    if (this.audioElement) {
      this.audioElement.volume = this.volume;

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

      this.audioElement.addEventListener('timeupdate', () => {
        this.currentTime = this.audioElement.currentTime || 0;
        this.duration = this.audioElement.duration || 30;
        this.notify();
      });

      this.audioElement.addEventListener('error', async (e) => {
        console.warn("Audio load error on current URL, attempting live stream resolution...", e);
        if (this.currentTrack && !this.currentTrack.fallbackTried) {
          this.currentTrack.fallbackTried = true;
          try {
            const liveStream = await fetchAudioStream(this.currentTrack.artist, this.currentTrack.title, this.currentTrack.audioUrl);
            if (liveStream && liveStream !== this.audioElement.src) {
              this.audioElement.src = liveStream;
              this.audioElement.play().catch(err => console.warn("Live stream fallback play error", err));
            }
          } catch (err) {
            console.error("Live stream resolution failed", err);
          }
        }
      });
    }
  }

  async playTrack(track) {
    if (!this.audioElement) return;

    // Toggle play/pause for same track
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

    let targetAudioSrc = track.audioUrl;

    if (track.audioUrl && track.audioUrl.startsWith('/api/')) {
      try {
        const liveStream = await fetchAudioStream(track.artist, track.title, track.audioUrl);
        if (liveStream) {
          targetAudioSrc = liveStream;
        }
      } catch (e) {
        console.warn("API stream resolution fallback", e);
      }
    }

    this.audioElement.src = targetAudioSrc;

    this.audioElement.onloadedmetadata = () => {
      if (this.audioElement.duration > 30) {
        this.audioElement.currentTime = Math.floor(Math.random() * 15) + 10;
      } else {
        this.audioElement.currentTime = 0;
      }
      this.duration = this.audioElement.duration || 30;
      this.notify();
    };

    try {
      this.pendingPlayPromise = this.audioElement.play();
      await this.pendingPlayPromise;
      this.isPlaying = true;
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.warn("Audio initial play deferred", e);
        if (!this.currentTrack.fallbackTried) {
          this.currentTrack.fallbackTried = true;
          const liveStream = await fetchAudioStream(track.artist, track.title, track.audioUrl);
          if (liveStream) {
            this.audioElement.src = liveStream;
            this.audioElement.play().catch(err => console.warn("Retry play error", err));
          }
        }
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

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  seek(seconds) {
    if (this.audioElement && !isNaN(seconds)) {
      this.audioElement.currentTime = seconds;
      this.currentTime = seconds;
      this.notify();
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      volume: this.volume,
      currentTime: this.currentTime,
      duration: this.duration
    }));
  }
}

export const audioEngine = new AudioEngine();
