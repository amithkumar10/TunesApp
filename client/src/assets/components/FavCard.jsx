import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";

const FavCard = () => {
  const [songs, setSongs] = useState([]);
  const [newSongName, setNewSongName] = useState("");
  const [newLink, setNewLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { email } = useParams();
  const isSearchPage = location.pathname === `/${email}/search`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          credentials: "include",
        });
        const data = await response.json();
        setSongs(data.favouriteSongs);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchUserData();
  }, []);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/addFavouriteSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          songName: newSongName,
          songLink: newLink,
        }),
      });
      if (response.ok) {
        const newSong = { name: newSongName, link: newLink };
        setSongs([...songs, newSong]);
        setShowModal(false);
      } else {
        console.error("Failed to update song details");
      }
    } catch (error) {
      console.error("Error updating song details:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const songToDelete = songs[index];
      const response = await fetch(
        "http://localhost:3000/deleteFavouriteSong",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songId: songToDelete._id, // Ensure that `songId` is used here
          }),
        }
      );
      if (response.ok) {
        const updatedSongs = songs.filter((_, i) => i !== index);
        setSongs(updatedSongs);
      } else {
        console.error("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Row className="mb-2 justify-content-center">
        <Col md={6}>
          {!isSearchPage && (
            <>
              <Button variant="primary" onClick={handleAdd}>
                Add Songs
              </Button>
            </>
          )}
          {isSearchPage && songs.length === 0 && (
            <>
              <Button style={{ backgroundColor: "lightgray", color: "black" }}>
                No Songs
              </Button>
            </>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Song Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Song Name</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={newSongName}
                onChange={(e) => setNewSongName(e.target.value)}
              />
              <Form.Label>Song Link</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="justify-content-center">
        <Col md={6}>
          {songs.map((song, index) => (
            <div className="d-flex align-items-center mb-4" key={index}>
              {isLoading ? (
                <Skeleton height="4rem" width="full" />
              ) : (
                <Card
                  className="clickable-card flex-grow-1"
                  style={{ backgroundColor: " #D2B48C ", cursor: "pointer" }}
                  onClick={() => window.open(song.link, "_blank")}
                >
                  <Card.Body className="d-flex justify-content-between">
                    <Card.Title>{song.name}</Card.Title>
                  </Card.Body>
                </Card>
              )}
              {!isSearchPage && (
                <>
                  <div className="d-flex flex-column ml-2">
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash className="text-danger" size={22} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default FavCard;
