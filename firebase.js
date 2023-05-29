import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  onValue,
  ref as refDatabase,
  set,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { UUID } from "https://unpkg.com/uuidjs@^5";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyASgBbrfWxyPa8whweQYa6vSCIhrmkAvzw",
  authDomain: "upb-open.firebaseapp.com",
  databaseURL: "https://upb-open-default-rtdb.firebaseio.com",
  projectId: "upb-open",
  storageBucket: "upb-open.appspot.com",
  messagingSenderId: "528037670196",
  appId: "1:528037670196:web:24a04b01ad2468dc00c961",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const productosRef = refDatabase(db, "productos");
const storage = getStorage();

export const crearProducto = async (nombre, descripcion, imagen, cupos) => {
  const uuid = UUID.generate();
  const storageRef = refStorage(storage, `images/${uuid}`);

  const imagenSubida = await uploadBytes(storageRef, imagen[0]);
  const url = await imagenSubida.ref;
  const downloadURL = await getDownloadURL(url);

  const objeto = {
    nombre,
    descripcion,
    urlImagen: downloadURL,
    cupos,
  };

  set(refDatabase(db, "productos/" + uuid), objeto);
};

export const listarProductos = () => {
  onValue(productosRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
};

export { onValue, productosRef };
