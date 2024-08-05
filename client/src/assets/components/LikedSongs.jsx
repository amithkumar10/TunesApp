import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Skeleton } from "@chakra-ui/react";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          credentials: "include",
        });
        const data = await response.json();
        setLikedSongs(data.likedSongs || []);
      } catch (err) {
        console.error("Error fetching liked songs", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchLikedSongs();
  }, []);

  const handleDelete = async (index) => {
    try {
      const songToDelete = likedSongs[index];
      const response = await fetch("http://localhost:3000/deleteLikedSong", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          songId: songToDelete._id,
        }),
      });
      if (response.ok) {
        const updatedSongs = likedSongs.filter((_, i) => i !== index);
        setLikedSongs(updatedSongs);
      } else {
        console.error("Failed to delete song");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <Container style={{ marginTop: "60px" }}>
      <Row className="mb-4 justify-content-center">
        <Col md={6}>
          <h3>Liked Songs</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          {isLoading ? (
            <Skeleton height="4rem" width="100%" />
          ) : likedSongs.length > 0 ? (
            likedSongs.map((song, index) => (
              <div className="d-flex align-items-center mb-4" key={index}>
                <Card
                  className="clickable-card flex-grow-1"
                  style={{ backgroundColor: "#FFA07A", cursor: "pointer" }}
                  onClick={() => window.open(song.link, "_blank")}
                >
                  <Card.Body className="d-flex justify-content-between">
                    <Card.Title>{song.name}</Card.Title>
                  </Card.Body>
                </Card>
                <div className="d-flex flex-column ml-2">
                  <FaTrash
                    className="text-danger"
                    size={22}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>No Liked Songs</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LikedSongs;
