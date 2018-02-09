import Vue from 'vue'
import sanityClient from '@sanity/client'

export default function sanityModule ({ app }, inject) {
  app.$sanity = sanityClient({
    // default options
    projectId: 'uu4fb495',
    dataset: 'development',
    useCdn: true

    // movies test
    // projectId: 'zp7mbokg',
    // dataset: 'production',
    // useCdn: true
  })
}