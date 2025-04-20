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
  CircularProgress,
  Rating,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Movie-themed background with darker gradient for better readability
const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url('/api/placeholder/1920/1080')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

// Enhanced card with Netflix-like appearance but better
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  backgroundColor: 'rgba(20, 20, 20, 0.9)',
  color: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 14px 45px rgba(0,0,0,0.4)',
  },
}));

// Styled headers with IMDB-inspired golden accent
const PageTitle = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  position: 'relative',
  display: 'inline-block',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #f5c518, #ff9b39)',
    transform: 'translateX(-50%)',
    borderRadius: '2px',
  }
}));

const MovieCard = ({ movie }) => {
  const [posterUrl, setPosterUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        // Fetch poster URL from endpoint
        const response = await fetch('http://127.0.0.1:5000/poster', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "movie_name": movie.title, "movie_year":movie.year}), // Assuming movie.id exists, adjust as needed
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch poster: ${response.status}`);
        }

        const result = await response.json();
        setPosterUrl(result.posterUrl); // Use the poster URL from the response
      } catch (error) {
        console.error('Error fetching poster:', error);
        // Use a fallback image if the poster fetch fails
        setPosterUrl('/api/placeholder/500/750');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoster();
  }, [movie]);

  // Calculate normalized rating for the 5-star display
  const normalizedRating = movie.rating ? (movie.rating / 2) : 0;
  
  return (
    <StyledCard>
      <Box sx={{ position: 'relative', paddingTop: '150%' }}>
        {isLoading ? (
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)' 
          }}>
            <CircularProgress sx={{ color: '#f5c518' }} />
          </Box>
        ) : (
          <CardMedia
            component="img"
            image={posterUrl || '/api/placeholder/500/750'}
            alt={`${movie.title} Poster`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          backgroundImage: 'linear-gradient(transparent 60%, rgba(0,0,0,0.8) 100%)',
          height: '100%'
        }} />
        <Chip 
          label={movie.year}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#fff',
            fontWeight: 'bold'
          }}
        />
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#141414',
        padding: 2
      }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ 
          fontWeight: 700,
          color: '#fff',
          mb: 1
        }}>
          {movie.title}
        </Typography>
        
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Rating 
            value={normalizedRating} 
            precision={0.5} 
            readOnly 
            sx={{ 
              color: '#f5c518',
              mr: 1
            }} 
          />
          <Typography variant="body2" sx={{ color: '#f5c518', fontWeight: 'bold' }}>
            {movie.rating}/10
          </Typography>
        </Box>
        
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="body2" sx={{ color: '#ccc', display: 'flex', justifyContent: 'space-between' }}>
            <span>Director:</span> <span style={{ color: '#fff' }}>{movie.director}</span>
          </Typography>
          
          {movie.genre && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {movie.genre.split(',').map((g, i) => (
                <Chip 
                  key={i} 
                  label={g.trim()} 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    color: '#ccc',
                    fontSize: '0.7rem'
                  }} 
                />
              ))}
            </Box>
          )}
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
        <PageTitle variant="h3" align="center" gutterBottom>
          Top Movie Recommendations
        </PageTitle>
        
        {receivedData === null ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress sx={{ color: '#f5c518' }} />
          </Box>
        ) : Array.isArray(receivedData) && receivedData.length > 0 ? (
          <Grid container spacing={4}>
            {receivedData.map((movie, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center" color="common.white">
            No movie recommendations available. Try adjusting your preferences.
          </Typography>
        )}
      </Container>
    </BackgroundContainer>
  );
}