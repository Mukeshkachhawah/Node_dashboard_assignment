import React, { useState, useEffect } from "react";
import API from "./../api";
import List from "./List";

const Taskboard = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const fetchLists = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await API.get(`/lists/${userId}`);
      setLists(data);
    } catch (err) {
      console.log("Error fetching lists:", err);
    }
  };

  const addNewList = async () => {
    const userId = localStorage.getItem("userId");
    if (!newListName) return;

    try {
      const { data } = await API.post("/lists/create", {
        name: newListName,
        userId,
      });
      setLists((prevLists) => [...prevLists, data]);
      setNewListName("");
      setShowInput(false);
    } catch (err) {
      console.log("Error creating list:", err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      <div style={{ margin: "10px", padding: "10px" }}>
        {showInput ? (
          <div>
            <input
              type="text"
              placeholder="New List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={addNewList}>+ Add List</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            style={{ fontSize: "20px", cursor: "pointer" }}
          >
            + Add List
          </button>
        )}
      </div>

      <div style={{ display: "flex", overflowX: "auto" }}>
        {lists.map((list) => (
          <List key={list._id} list={list} fetchLists={fetchLists} />
        ))}
      </div>
    </div>
  );
};

export default Taskboard;
