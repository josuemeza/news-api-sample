const admin = require("firebase-admin")
const basepath = "../../"

const initFirestore = () => {
  const path = `${basepath}${process.env.CGP_DB_CREDENTIALS}`
  const serviceAccount = require(path)
  const credential = admin.credential.cert(serviceAccount)
  admin.initializeApp({ credential })
  const db = admin.firestore()
  db.settings({ timestampsInSnapshots: true })
  return db
}

exports.initFirestore = initFirestore