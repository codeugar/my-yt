import spawn from 'nano-spawn'

export function transcode(location, format) {
  console.log('trascoding video', location)
  return spawn('ffmpeg', [
    '-i',
    location,
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '28',
    '-x264-params',
    'opencl=true',
    '-vf',
    'format=yuv420p',
    '-profile:v',
    'main',
    '-movflags',
    '+faststart',
    '-c:a',
    'copy',
    location.replace(format, 'tmp.'+format)
  ])
}