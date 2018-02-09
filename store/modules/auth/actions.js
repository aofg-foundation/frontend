export async function signIn ({ commit, dispatch, state }, { email, password }) {
  const result = await this.app.$backend.post('/Users/login', {
    email,
    password
  })
}