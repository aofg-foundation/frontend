import ethers from 'ethers'

export async function setNode ({ commit, state }, node) {
  if (typeof node === 'undefined') {
    node = 0
  }
  if (typeof node === 'number') {
    node = state.nodes[node]
  }

  if (typeof node !== 'object' || typeof node.endpoint !== 'string') {
    throw new Error(`Invalid node configuration: [${JSON.stringify(node)}]`)
  }

  commit('setNode', node)

  return node
}
export async function connect ({ commit, dispatch, state }, node) {
  if (typeof node !== 'undefined' || !state.selectedNode) {
    await dispatch('setNode', node)
  }

  if (state.provider && typeof state.provider.removeAllListeners === 'function') {
    state.provider.removeAllListeners('block')
  }
  
  const provider = new ethers.providers.JsonRpcProvider(state.selectedNode.endpoint, state.selectedNode.network)

  provider.on('block', async height => {
    const block = await provider.getBlock(height)
    commit('addBlock', block)

    if (block.transactions && block.transactions.length > 0) {
      const results = await Promise.all(block.transactions.map(hash => provider.getTransaction(hash)))
      commit('setTransactionResults', { block: block.hash, results })
      
      const receipts = await Promise.all(block.transactions.map(hash => provider.getTransactionReceipt (hash)))
      commit('setTransactionReceipts', { block: block.hash, receipts })
    }
  })

  commit('setProvider', provider)



  return provider
}