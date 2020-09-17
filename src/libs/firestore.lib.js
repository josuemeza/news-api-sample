const admin = require("firebase-admin")

const getDbConnector = () => {
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS
  const serviceAccount = require(path)
  const credential = admin.credential.cert(serviceAccount)
  admin.initializeApp({ credential })
  const db = admin.firestore()
  db.settings({ timestampsInSnapshots: true })
  return db
}

exports.firestore = getDbConnector()