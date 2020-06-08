// isolate this provider to be able to import apollo client in services
import { createProvider } from './vue-apollo'
import cache from './vue-apollo-cache'
const provider = createProvider({cache})
export default provider
