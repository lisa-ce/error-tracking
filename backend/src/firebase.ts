import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://stackr-error-tracker-default-rtdb.firebaseio.com/"
});

export const db = admin.database();