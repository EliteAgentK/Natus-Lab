import { execFile, spawn } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const branch = 'natus-live-design'
const pollMs = 2000
let syncing = false
let stopping = false
let devServer

const runGit = async (...args) => {
  const { stdout } = await execFileAsync('git', args, { encoding: 'utf8' })
  return stdout.trim()
}

const sync = async () => {
  if (syncing || stopping) return
  syncing = true

  try {
    await runGit('fetch', 'origin', branch, '--quiet')
    const local = await runGit('rev-parse', 'HEAD')
    const remote = await runGit('rev-parse', `origin/${branch}`)

    if (local !== remote) {
      await runGit('reset', '--hard', `origin/${branch}`)
      console.log('\n[Natus Studio] New design change received — Chrome will refresh automatically.\n')
    }
  } catch (error) {
    const message = error?.stderr?.trim() || error?.message || String(error)
    console.error(`[Natus Studio] Sync issue: ${message}`)
  } finally {
    syncing = false
  }
}

try {
  const insideRepo = await runGit('rev-parse', '--is-inside-work-tree')
  if (insideRepo !== 'true') throw new Error('This folder is not connected to the Natus live-design workspace.')

  await runGit('checkout', branch)
  await sync()
} catch (error) {
  console.error('\n[Natus Studio] This workspace is not set up for live collaboration.')
  console.error('Use the Natus-Lab-Live-Studio ZIP provided in ChatGPT, then run npm install and npm run studio.\n')
  process.exit(1)
}

devServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  env: process.env,
})

const timer = setInterval(sync, pollMs)

const stop = () => {
  if (stopping) return
  stopping = true
  clearInterval(timer)
  if (devServer && !devServer.killed) devServer.kill('SIGTERM')
  setTimeout(() => process.exit(0), 150)
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)

devServer.on('exit', (code) => {
  clearInterval(timer)
  if (!stopping) process.exit(code ?? 0)
})
