import fs from 'fs'
import { URL } from 'url'

export default function apiHandler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`)

  if (url.pathname === '/main.css') 
    return fileHandler('client/main.css', 'text/css')(req, res)
  if (url.pathname === '/normalize.css') 
    return fileHandler('client/normalize.css', 'text/css')(req, res)
  if (url.pathname === '/main.js') 
    return fileHandler('client/main.js', 'application/javascript')(req, res)
  if (url.pathname === '/lib/store.js') 
    return fileHandler('client/lib/store.js', 'application/javascript')(req, res)
  if (url.pathname === '/lib/router.js') 
    return fileHandler('client/lib/router.js', 'application/javascript')(req, res)
  if (url.pathname === '/lib/utils.js') 
    return fileHandler('client/lib/utils.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/video-element.js') 
    return fileHandler('client/components/video-element.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/add-channel-form.js') 
    return fileHandler('client/components/add-channel-form.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/manage-channels-form.js') 
    return fileHandler('client/components/manage-channels-form.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/video-quality-form.js') 
    return fileHandler('client/components/video-quality-form.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/manage-disk-space-form.js') 
    return fileHandler('client/components/manage-disk-space-form.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/transcode-videos-form.js') 
    return fileHandler('client/components/transcode-videos-form.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/search-videos.js') 
    return fileHandler('client/components/search-videos.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/channels-list.js') 
    return fileHandler('client/components/channels-list.js', 'application/javascript')(req, res)
  if (url.pathname === '/components/empty-state.js') 
    return fileHandler('client/components/empty-state.js', 'application/javascript')(req, res)

  return fileHandler('client/index.html', 'text/html')(req, res)
}

function fileHandler (filePath, contentType) {
  return (req, res) => {
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(fs.readFileSync(filePath, 'utf8'))
  }
}