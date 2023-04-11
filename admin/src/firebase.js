import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCaWhtjcNMoTAuVm0mny7PE4qicmtnrFbA",
    authDomain: "web-project-1faf3.firebaseapp.com",
    projectId: "web-project-1faf3",
    storageBucket: "web-project-1faf3.appspot.com",
    messagingSenderId: "931119824877",
    appId: "1:931119824877:web:a58d00ae492f5a4f8df1e4",
    measurementId: "G-4LHKG613P0"
};

initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);

export default storage;