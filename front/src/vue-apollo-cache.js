import { InMemoryCache } from 'apollo-cache-inmemory'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from '@common/graphql/fragmentTypes.json'


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })

// console.log('cache', cache)

export default cache
