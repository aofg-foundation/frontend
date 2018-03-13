export function setNode (state, node) {
  state.selectedNode = node
}

export function setProvider (state, provider) {
  state.provider = provider
}

export function addBlock (state, block) {
  state.blocks[block.hash] = block
}

export function setTransactionResults (state, { hash, results }) {
  if (state.blocks[hash]) {
    state.blocks[hash].results = results.reduce((acc, result) => {
      acc[results.hash] = result
      return acc
    }, {})
  }
}

export function setTransactionReceipts (state, { hash, receipts }) {
  if (state.blocks[hash]) {
    state.blocks[hash].receipts = receipts.reduce((acc, receipt) => {
      acc[receipt.transactionHash] = receipt
      return acc
    }, {})
  }
}