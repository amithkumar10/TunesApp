import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import FavCard from "./FavCard";

const FavouriteSongs = () => {
  const location = useLocation();
  const { email } = useParams();

  return (
    <Container style={{ marginTop: "60px" }}>
      <Row className="mb-4 justify-content-center">
        <Col md={6}>
          <h3>Favourite Songs</h3>
        </Col>
      </Row>

      <FavCard />
    </Container>
  );
};

export default FavouriteSongs;
