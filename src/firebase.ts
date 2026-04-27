import admin from "firebase-admin";
import serviceAccount from ".../";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://dev-error-tracker-default-rtdb.firebaseio.com"
});

export const db = admin.database();