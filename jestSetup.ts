/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

/* We define this here (outside of beforeAll) to ensure the Core SDK is able to load our extensions before the test suites run */
Object.defineProperty(window, 'MediaStream', {
  writable: true,
  value: jest.fn(),
});

beforeAll(() => {
  const audioTracks = [
    {
      id: 'audio-track-1',
      applyConstraints: jest.fn(),
      getCapabilities: jest.fn().mockReturnValue({
        deviceId: 'audio-1',
        sampleRate: 44100,
        sampleSize: 16,
        channelCount: 1,
      }),
      getSettings: jest.fn().mockReturnValue({
        sampleRate: 44100,
        sampleSize: 16,
        channelCount: 1,
      }),
      stop: jest.fn(),
    },
    {
      id: 'audio-track-2',
      applyConstraints: jest.fn(),
      getCapabilities: jest.fn().mockReturnValue({
        deviceId: 'audio-2',
        sampleRate: 48000,
        sampleSize: 32,
        channelCount: 2,
      }),
      getSettings: jest.fn().mockReturnValue({
        sampleRate: 48000,
        sampleSize: 32,
        channelCount: 2,
      }),
      stop: jest.fn(),
    },
  ];

  const videoTracks = [
    {
      id: 'video-track-1',
      applyConstraints: jest.fn(),
      getCapabilities: jest.fn().mockReturnValue({
        deviceId: 'video-1',
        frameRate: 30,
        height: 720,
        width: 1280,
      }),
      getSettings: jest.fn().mockReturnValue({
        frameRate: 30,
        height: 720,
        width: 1280,
      }),
      stop: jest.fn(),
    },
    {
      id: 'video-track-2',
      applyConstraints: jest.fn(),
      getCapabilities: jest.fn().mockReturnValue({
        deviceId: 'video-2',
        frameRate: 60,
        height: 1080,
        width: 1920,
      }),
      getSettings: jest.fn().mockReturnValue({
        frameRate: 60,
        height: 1080,
        width: 1920,
      }),
      stop: jest.fn(),
    },
  ];

  Object.defineProperty(window.navigator, 'mediaDevices', {
    writable: true,
    value: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      enumerateDevices: jest.fn().mockResolvedValue([
        {
          deviceId: 'audio-1',
          kind: 'audioinput',
        },
        {
          deviceId: 'audio-2',
          kind: 'audioinput',
        },
        {
          deviceId: 'video-1',
          kind: 'videoinput',
        },
        {
          deviceId: 'video-2',
          kind: 'videoinput',
        },
        {
          deviceId: 'audio-output-1',
          kind: 'audiooutput',
        },
        {
          deviceId: 'audio-output-2',
          kind: 'audiooutput',
        },
      ]),
      getUserMedia: jest.fn().mockResolvedValue({
        get getTrackById() {
          return jest
            .fn()
            .mockImplementation((id) =>
              this.getTracks().find((track: MediaStreamTrack) => id === track.id)
            );
        },
        getTracks: jest.fn().mockReturnValue([...audioTracks, ...videoTracks]),
        getAudioTracks: jest.fn().mockReturnValue([...audioTracks]),
        getVideoTracks: jest.fn().mockReturnValue([...videoTracks]),
      }),
    },
  });

  Object.defineProperty(window, 'MediaRecorder', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      mimeType: 'video/webm;codecs=vp9,opus',
      start: jest.fn(),
      stop: jest.fn(),
      state: 'inactive',
      isTypeSupported: jest.fn().mockReturnValue(true),
    })),
  });

  MediaRecorder.isTypeSupported = jest.fn().mockReturnValue(true);

  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();
});
