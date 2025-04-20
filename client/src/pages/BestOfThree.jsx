import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  CircularProgress 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Movie-themed background
const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
  },
}));

const MovieCard = ({ movie }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="300"
        image={movie.poster}
        alt={`${movie.title} Poster`}
        style={{backgroundColor: "red"}}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography gutterBottom variant="h5" component="div" color="text.primary">
          {movie.title}
        </Typography>
        <Box className = "bg-gray">
          <Typography variant="body2" color="text.secondary">
            Director: {movie.director}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {movie.year}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ mt: 1, fontWeight: 'medium' }}>
            Rating: {movie.rating}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default function BestOfThree() {
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.response) {
      const responseString = location.state.response;
      const cleanString = responseString.substring(responseString.indexOf('['), responseString.lastIndexOf(']') + 1);

      try {
        const parsedData = JSON.parse(cleanString);
        setReceivedData(parsedData);
        console.log('Parsed data in BestOfThree:', parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setReceivedData([]);
      }
    } else {
      setReceivedData([]);
    }
  }, [location.state]);

  return (
    <BackgroundContainer>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" color="common.white" gutterBottom sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Top Movies
        </Typography>
        {receivedData === null ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress sx={{ color: 'common.white' }} />
          </Box>
        ) : Array.isArray(receivedData) && receivedData.length > 0 ? (
          <Grid container spacing={4}>
            {receivedData.map((movie, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center" color="common.white">
            No movie data received or data is empty.
          </Typography>
        )}
      </Container>
    </BackgroundContainer>
  );
}