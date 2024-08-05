import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Skeleton } from "@chakra-ui/react";

const SearchFavSongs = () => {
  const [userData, setUserData] = useState(null);
  const [liked, setLiked] = useState([]);
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = async (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);

    const song = userData.favouriteSongs[index];

    try {
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
        setUserData(data);

        if (data.favouriteSongs) {
          // Fetch the logged-in user's liked songs to set the initial liked state
          const userResponse = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const userData = await userResponse.json();
          const likedSongs = userData.likedSongs || [];

          const newLiked = data.favouriteSongs.map((song) =>
            likedSongs.some(
              (likedSong) =>
                likedSong.name === song.name && likedSong.link === song.link
            )
          );
          setLiked(newLiked);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
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

  if (!userData || userData.favouriteSongs.length === 0) {
    return (
      <Container>
        <Row className="mt-4 justify-content-center">
          <Col md={6}>
            <Card style={{ border: "none" }}>
              <Card.Title>
                <h3>Favourite Songs</h3>
              </Card.Title>
              <Card.Body>No Favourite Songs</Card.Body>
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
                <h3>Favourite Songs</h3>
              </Col>

              {userData.favouriteSongs.map((song, index) => (
                <div
                  className="d-flex align-items-center gap-2 mb-4"
                  key={index}
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

export default SearchFavSongs;
