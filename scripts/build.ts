import process from 'node:process'
import { execa } from 'execa'
import minimist from 'minimist'

const needPubPkgs = ["@momei-x/create"]
const argvs = minimist(process.argv.slice(2))
const { release } = argvs
export async function build() {
  await execa('pnpm', ['-C', 'packages/create', 'build'], { stdio: 'inherit' })

  if (release) {
    await execa('changeset', ['add'], { stdio: 'inherit' })
    await execa('changeset', ['version'], { stdio: 'inherit' })
    await execa('changeset', ['publish', '--filter', needPubPkgs.join(" ")], { stdio: 'inherit' })
  }
}

build()
