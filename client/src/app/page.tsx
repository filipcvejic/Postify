"use client";

import { handleApiError, postifyApi } from "../api/postifyApi";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      await postifyApi
        .get(`/posts`)
        .then((res) => setPosts(res.data))
        .catch(handleApiError);
    };

    getPosts();
  });

  console.log(posts);

  return <Grid>HomePage</Grid>;
}
