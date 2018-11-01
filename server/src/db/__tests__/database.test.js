const { getDatabase } = require('../database-manager')

test('The database should be able to connect successfully', async () => {
  const db = getDatabase()
  const successFullConnection = await db.testConnection()
  expect(successFullConnection).toBe(true)
  await db.closeConnection()
})
