import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha,
  InputAdornment,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import StarIcon from '@mui/icons-material/Star';

// Create a custom theme inspired by Netflix/IMDb
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E50914', // Netflix red
    },
    secondary: {
      main: '#F5C518', // IMDb yellow
    },
    background: {
      default: '#141414', // Netflix background
      paper: '#1F1F1F',  // Slightly lighter for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#141414',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("assets/film-texture.png")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#E50914',
          '&:hover': {
            backgroundColor: '#C70812',
          },
        },
        containedSecondary: {
          backgroundColor: '#F5C518',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#E5B617',
          },
        },
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1F1F1F',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#E50914', 0.2),
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },
    },
  },
});

// Netflix-style header
const NetflixHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(4),
}));

const NetflixLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '2rem',
}));

// Hero section with background
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '50vh',
  minHeight: 400,
  marginBottom: theme.spacing(6),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url("assets/cinema-hero.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  maxWidth: 800,
  zIndex: 1,
}));

// Section titles with IMDb style
const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& h2': {
    marginRight: theme.spacing(1),
  },
  '&::after': {
    content: '""',
    flexGrow: 1,
    height: '1px',
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    marginLeft: theme.spacing(2),
  },
}));

// Netflix-style cards
const MovieCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
}));

const RatingBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: theme.palette.secondary.main,
  color: '#000000',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
}));

// Form section with Netflix styling
const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: alpha('#000000', 0.7),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(6),
}));

// Custom styled TextField with Netflix feel
const NetflixTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: alpha('#000000', 0.5),
    '& fieldset': {
      borderColor: alpha('#FFFFFF', 0.3),
    },
    '&:hover fieldset': {
      borderColor: alpha('#FFFFFF', 0.5),
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// Netflix-style footer
const NetflixFooter = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(6),
  borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}));

export default function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    genre: '',
    rating: '',
    triggers: '',
  });

  const [output, setOutput] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Process the trigger list into an array
    const triggerList = formData.triggers.split(',').map(trigger => trigger.trim());

    const dataToSave = {
      age: formData.age,
      genre: formData.genre,
      rating: formData.rating,
      trigger_list: triggerList,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/movieRecs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });
      if (!response.ok) {
        throw new Error(`Failed to send preferences: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Server response:', result);
      
      setOutput(JSON.stringify(result, null, 2));
      navigate('/bestOfThree', { state: result });
  
    } catch (error) {
      console.error('Error sending preferences:', error);
      setOutput(`Error: ${error.message}`);
    }
  };

  // Sample featured movies (placeholders)
  const featuredMovies = [
    { title: "The Silent Path", rating: "8.5", genre: "Drama", img: "../assets/silentPath.jpg" },
    { title: "Bright Horizons", rating: "9.2", genre: "Family", img: "/api/placeholder/300/450" },
    { title: "Cloud Atlas", rating: "7.8", genre: "Adventure", img: "/api/placeholder/300/450" },
    { title: "Gentle Journey", rating: "8.1", genre: "Comedy", img: "/api/placeholder/300/450" }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <NetflixHeader>
          <NetflixLogo>
            <LocalMoviesIcon sx={{ mr: 1, fontSize: 30 }} />
            SafeCinema
          </NetflixLogo>
        </NetflixHeader>

        <HeroSection>
          <HeroContent>
            <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 900 }}>
              Safe Movie Recommendations
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: '#B3B3B3' }}>
              Discover movies curated for sensitive viewers — free from violence, abuse, and other triggering content.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              onClick={() => document.getElementById('preferences-form').scrollIntoView({ behavior: 'smooth' })}
            >
              Find Your Movies
            </Button>
          </HeroContent>
        </HeroSection>

        <Box sx={{ mb: 8 }}>
          <SectionTitle>
            <Typography variant="h2" component="h2">
              Featured Movies
            </Typography>
            <Chip 
              label="Safe Watching" 
              size="small" 
              sx={{ ml: 2, backgroundColor: alpha(theme.palette.secondary.main, 0.2), color: theme.palette.secondary.main }}
            />
          </SectionTitle>
          
          <Grid container spacing={3}>
            {featuredMovies.map((movie, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MovieCard>
                  <Box sx={{ position: 'relative' }}>
                    <img src={movie.img} alt={movie.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <RatingBadge>
                      <StarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      {movie.rating}
                    </RatingBadge>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {movie.genre}
                    </Typography>
                  </CardContent>
                </MovieCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <FormSection id="preferences-form">
          <SectionTitle>
            <Typography variant="h2" component="h2">
              Find Safe Movies
            </Typography>
          </SectionTitle>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <NetflixTextField
                  fullWidth
                  label="Age"
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: theme.palette.text.secondary }}>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NetflixTextField
                  fullWidth
                  label="Genre"
                  id="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="e.g., Drama, Comedy"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: theme.palette.text.secondary }}>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NetflixTextField
                  fullWidth
                  label="Rating"
                  id="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="e.g., PG, PG-13"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: theme.palette.text.secondary }}>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NetflixTextField
                  fullWidth
                  label="Triggers to Avoid (comma separated)"
                  id="triggers"
                  value={formData.triggers}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="e.g., violence, abuse"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: theme.palette.text.secondary }}>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ 
                    px: 6, 
                    py: 1.5, 
                    fontSize: '1.1rem',
                    borderRadius: '4px',
                    minWidth: 200
                  }}
                >
                  Get Recommendations
                </Button>
              </Grid>
            </Grid>
          </form>
          
          {output && (
            <Box sx={{ mt: 4, p: 2, backgroundColor: alpha('#000000', 0.5), borderRadius: 1, overflow: 'auto' }}>
              <pre id="output" style={{ margin: 0, color: '#FFFFFF', fontFamily: 'monospace' }}>{output}</pre>
            </Box>
          )}
        </FormSection>

        <NetflixFooter>
          <Typography variant="body2" color="textSecondary">
            &copy; 2025 SafeCinema. All rights reserved.
          </Typography>
        </NetflixFooter>
      </Container>
    </ThemeProvider>
  );
}