import { handleApiError, postifyApi } from "@/api/postifyApi";
import { IPostDto } from "@/dtos/IPostDto";
import {
  BookmarkBorder,
  Comment,
  FavoriteBorder,
  FavoriteBorderOutlined,
  MoreHoriz,
  SmsOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

function PostsList() {
  const [posts, setPosts] = useState<IPostDto[]>([]);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getPosts = async () => {
      await postifyApi
        .get(`/posts`)
        .then((res) => setPosts(res.data))
        .catch(handleApiError);
    };

    getPosts();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async () => {
    if (!fileInputRef.current?.files?.length && !description.trim()) return;

    const formData = new FormData();

    const file = fileInputRef.current?.files?.[0];

    if (file) formData.append("image", file);

    formData.append("description", description);

    await postifyApi
      .post("/posts ", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch(handleApiError);
  };

  const handleAddComment = async (postId: string, parentId?: string) => {
    if (!comment.trim()) return;

    await postifyApi.post("/comments", {
      postId,
      parentId,
      text: comment,
    });
  };

  const handleLikePost = async (postId: string) => {
    await postifyApi.post(`/posts/${postId}/like`);
  };

  const handleLikeComment = async (commenId: string) => {
    await postifyApi.post(`/comments/${commenId}/like`);
  };

  return (
    <>
      {/* <Stack
        flexDirection={`column`}
        alignItems={`center`}
        justifyContent={`center`}
      >
        <Stack>
          <Grid2 container spacing={2} p={2} alignItems={`center`}>
            <Grid2>Slika</Grid2>
            <Grid2>
              <TextField
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                size={`small`}
                sx={{
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                }}
              />
            </Grid2>
          </Grid2>
          <input
            ref={fileInputRef}
            accept="image/*"
            hidden
            type="file"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInputRef.current?.click()}
            //   startIcon={<AddAPhotoIcon />}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Add photo
          </Button>
          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {selectedImage ? (
              <Card
                sx={{
                  width: 300,
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  image={selectedImage.toString()}
                  alt="Preview"
                />
              </Card>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No image selected
              </Typography>
            )}
          </Box>
        </Stack>
        <Button onClick={handleAddPost}>Add post</Button>
      </Stack> */}{" "}
    </>
  );
}

export default PostsList;
