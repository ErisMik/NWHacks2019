import sounddevice as sd
import soundfile as sf

samplerate = 44100  # Hertz
duration = 3  # seconds
filename = 'output.wav'

mydata = sd.rec(int(samplerate * duration), samplerate=samplerate,
                channels=2, blocking=True)
sf.write(filename, mydata, samplerate)
