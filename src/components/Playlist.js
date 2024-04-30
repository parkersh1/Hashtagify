import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import hamburgerMenu from '../img/whiteham.png';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../index.js";
import { v4 } from "uuid";

function SortableItem({ id, artist, title, imageUrl }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id.toString() });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="sortable-item" {...attributes} {...listeners}>
            <div className="item-content">
                <img src={imageUrl} alt={`${title} by ${artist}`} className="song-image" />
                <div className="text-content">
                    <p>{artist} - {title}</p>
                </div>
                <img src={hamburgerMenu} alt="Drag" className="hamburgerImage" />
            </div>
        </div>
    );
}


function Playlist({ uploadedSongs, setUploadedSongs, selectedSongsPlaylist, setSelectedSongsPlaylist }) {
    const navigate = useNavigate(); // Use the useNavigate hook for navigation
    const [imageUpload, setImageUpload] = useState(null);
    const [songDetails, setSongDetails] = useState({ artist: '', title: '' });
    const [uploadedItems, setUploadedItems] = useState([]);
    const fileInputRef = useRef(null);


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const sourceList = uploadedItems.some(item => item.id.toString() === active.id) ? uploadedItems : selectedSongsPlaylist;
        const targetList = uploadedItems.some(item => item.id.toString() === over.id) ? uploadedItems : selectedSongsPlaylist;

        const sourceIndex = sourceList.findIndex(item => item.id.toString() === active.id);
        const targetIndex = targetList.findIndex(item => item.id.toString() === over.id);

        if (sourceIndex === -1 || targetIndex === -1) return;

        if (sourceList === targetList) {
            const newItems = arrayMove(sourceList, sourceIndex, targetIndex);
            if (sourceList === uploadedItems) {
                setUploadedItems(newItems);
            } else {
                setSelectedSongsPlaylist(newItems);
            }
        } else {
            const itemToMove = sourceList[sourceIndex];
            const newSourceList = [...sourceList.slice(0, sourceIndex), ...sourceList.slice(sourceIndex + 1)];
            const newTargetList = [...targetList.slice(0, targetIndex), itemToMove, ...targetList.slice(targetIndex)];

            if (sourceList === uploadedItems) {
                setUploadedItems(newSourceList);
                setSelectedSongsPlaylist(newTargetList);
            } else {
                setSelectedSongsPlaylist(newSourceList);
                setUploadedItems(newTargetList);
            }
        }
    };


    const uploadFile = () => {
        if (imageUpload == null || songDetails.artist === '' || songDetails.title === '') {
            alert("Please fill in all fields and select an image before uploading.");
            return;
        }
        const imageName = `images/${songDetails.artist}-${songDetails.title}-${v4()}`;
        const imageRef = ref(storage, imageName);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const newItem = { id: Date.now(), ...songDetails, imageUrl: url };
                setUploadedItems(prev => [...prev, newItem]);
                setSongDetails({ artist: '', title: '' });
                setImageUpload(null);
            });
        });

        let uploadedSong = { artist: songDetails.artist, title: songDetails.title, image: `images/${songDetails.artist}-${songDetails.title}-${v4()}` }
        setUploadedSongs([...uploadedSongs, uploadedSong]);
    };

    return (
        <div className="table-container">
            <h2>Build Your Own Playlist</h2>
            <div className="playlist">
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={songDetails.artist}
                    onChange={(e) => setSongDetails(prev => ({ ...prev, artist: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Song Title"
                    value={songDetails.title}
                    onChange={(e) => setSongDetails(prev => ({ ...prev, title: e.target.value }))}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(event) => setImageUpload(event.target.files[0])}
                />
                <button onClick={() => fileInputRef.current.click()}>Upload Album Cover</button>
                <button onClick={uploadFile} className="upload">Upload Song</button>
                {/* Add a button for navigating to the song selection page */}
                <button onClick={() => navigate("/playlistselect")} className="select-songs">Go to Song Selection</button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={uploadedItems.map(item => item.id.toString())} strategy={verticalListSortingStrategy}>
                    {uploadedItems.map((item) => (
                        <SortableItem key={item.id} id={item.id} artist={item.artist} title={item.title} imageUrl={item.imageUrl} />
                    ))}
                </SortableContext>
                <SortableContext items={selectedSongsPlaylist.map(item => item.id ? item.id.toString() : '')} strategy={verticalListSortingStrategy}>
                    {selectedSongsPlaylist.map((item) => (
                        <SortableItem key={item.id} id={item.id} artist={item.artist} title={item.title} imageUrl={item.imageUrl} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}

export default Playlist;
