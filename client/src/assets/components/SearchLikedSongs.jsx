import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Skeleton } from "@chakra-ui/react";

const SearchLikedSongs = () => {
  const [userData, setUserData] = useState(null);
  const [liked, setLiked] = useState([]);
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = async (index) => {
    const song = userData.likedSongs[index];
    const isLiked = liked[index];

    try {
      if (isLiked) {
        // Unlike the song
        await fetch("http://localhost:3000/deleteLikedSong", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songId: song._id,
          }),
        });
      } else {
        // Like the song
        await fetch("http://localhost:3000/likedSong", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            songName: song.name,
            songLink: song.link,
          }),
        });
      }

      // Update local state after the API call
      const newLiked = [...liked];
      newLiked[index] = !newLiked[index];
      setLiked(newLiked);
    } catch (err) {
      console.error("Error toggling like for song", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/searchUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ query: email }),
        });
        const data = await response.json();
        console.log("Fetched user data:", data); // Debug log

        setUserData(data);

        if (data.likedSongs) {
          const userResponse = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const userData = await userResponse.json();
          console.log("Logged-in user data:", userData); // Debug log

          const likedSongs = userData.likedSongs || [];
          const newLiked = data.likedSongs.map((song) =>
            likedSongs.some(
              (likedSong) =>
                likedSong.name === song.name && likedSong.link === song.link
            )
          );
          console.log("New liked state:", newLiked); // Debug log
          setLiked(newLiked);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  if (isLoading) {
    return (
      <Container>
        <Row className="mt-4 justify-content-center">
          <Col md={6}>
            <Skeleton height="4rem" width="100%" />
            <Skeleton height="4rem" width="100%" />
            <Skeleton height="4rem" width="100%" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (!userData || !userData.likedSongs || userData.likedSongs.length === 0) {
    return (
      <Container>
        <Row className="mt-4 justify-content-center">
          <Col md={6}>
            <Card style={{ border: "none" }}>
              <Card.Title>
                <h3>Liked Songs</h3>
              </Card.Title>
              <Card.Body>No Liked Songs</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mt-4 justify-content-center">
        <Col md={6}>
          <Card style={{ border: "none" }}>
            <Card.Body>
              <Col md={6}>
                <h3>Liked Songs</h3>
              </Col>

              {userData.likedSongs.map((song, index) => (
                <div
                  className="d-flex align-items-center gap-2 mb-4"
                  key={song._id} // Use song._id as the key
                >
                  {isLoading ? (
                    <Skeleton height="4rem" width="100%" />
                  ) : (
                    <Card
                      className="clickable-card flex-grow-1"
                      style={{
                        backgroundColor: "#D2B48C",
                        cursor: "pointer",
                      }}
                      onClick={() => window.open(song.link, "_blank")}
                    >
                      <Card.Body className="d-flex justify-content-between">
                        <Card.Title>{song.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  )}

                  <div>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => handleLike(index)}
                    >
                      {liked[index] ? (
                        <FaHeart size={25} color="seagreen" />
                      ) : (
                        <FaRegHeart size={25} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchLikedSongs;
