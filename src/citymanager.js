import { signUp, logout, login, onAuthStateChange } from "./auth";
import { db } from "./config";
import { doc, setDoc, collection, deleteDoc, onSnapshot } from "firebase/firestore";  

//  Function to Save Song
const saveSong = async function(){
    // Capture input values
    const songname = document.getElementById("songname").value.trim();
    const artist = document.getElementById("songartist").value.trim();
    const album = document.getElementById("songalbum").value.trim();

    // Validate form fields
    if (!songname || !artist || !album) {
        console.error("All fields are required");
        alert("Please fill in all fields.");
        return;
    }

    try {
        // Create a document reference using song name and album
        const songRef = doc(db, "songs", songname.toLowerCase() + "-" + album.toLowerCase());

        // Save song data to Firestore
        await setDoc(songRef, {
            name: songname,
            artist: artist,
            album: album,
            time: new Date()
        });

        // Clear input fields after success
        console.log(" Song Successfully Added");
        document.getElementById("songname").value = "";
        document.getElementById("songartist").value = "";
        document.getElementById("songalbum").value = "";
        alert("Song added successfully!");

    } catch (error) {
        console.error(" Error saving song ", error);
        alert("Failed to save song.");
    }
}

//  Function to Delete Song
const deleteSong = async function(collection, docID) {
    if (!docID) {
        alert("Please enter a valid Song ID.");
        return;
    }

    try {
        await deleteDoc(doc(db, collection, docID));
        console.log(` Document with ID ${docID} deleted successfully`);
        alert("Song deleted successfully!");

    } catch (error) {
        console.error(" Error deleting song", error);
        alert("Failed to delete song.");
    }
}

const songCollection = collection(db, "songs")
onSnapshot(songCollection, (snapshot)=>{
    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML=""

    snapshot.forEach((doc)=>{
        const data = doc.data()
        const row = document.createElement("tr")

        row.innerHTML = `
        <td> ${doc.id}</td>
        <td> ${data.name}</td>
        <td> ${data.artist}</td>
        <td> ${data.album}</td>
        `
        tableBody.appendChild(row)
    })

})

//  Event Listener for Adding Songs
const addSongForm = document.querySelector("#addSong");
addSongForm.addEventListener("submit", event => {
    event.preventDefault();
    saveSong();
});

// Event Listener for Deleting Songs
const deleteSongForm = document.querySelector("#deleteSong");
deleteSongForm.addEventListener("submit", event => {
    event.preventDefault();
    const songID = document.getElementById("songID").value.trim();
    deleteSong("songs", songID);
});
