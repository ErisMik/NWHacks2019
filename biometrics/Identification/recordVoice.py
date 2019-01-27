import sounddevice as sd
import soundfile as sf

samplerate = 16000  # Hertz
duration = 30  # seconds
filename = 'yuming.wav'

mydata = sd.rec(int(samplerate * duration), samplerate=samplerate,
                channels=1, blocking=True)
sf.write(filename, mydata, samplerate)
