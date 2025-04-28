import { join } from 'node:path'
import { createFromRoot, updateProgramsVisitor } from 'codama'
import { AnchorIdl, rootNodeFromAnchor } from '@codama/nodes-from-anchor'
import { renderVisitor as renderJavaScriptVisitor } from '@codama/renderers-js'
import anchorIdl from '../target/idl/basic.json'

const rootNode = rootNodeFromAnchor(anchorIdl as AnchorIdl)
const codama = createFromRoot(rootNode)
codama.update(
  updateProgramsVisitor({
    basicProgram: { name: 'basic' },
  }),
)

// Generate the client sdks at the given path
await codama.accept(renderJavaScriptVisitor(join(__dirname, './client/js')))
console.log('Client sdk generated')
