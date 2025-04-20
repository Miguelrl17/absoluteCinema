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

// Eisenhower High School colors
// Primary: Kelly Green (#4CBB17)
// Secondary: Dark Green (#2E7D32)
// Accent: Gold (#FFD700)

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4CBB17', // Kelly Green (Eisenhower HS primary color)
      light: '#6DD439',
      dark: '#2E7D32', // Dark Green (Eisenhower HS secondary color)
    },
    secondary: {
      main: '#FFD700', // Gold (Eisenhower HS accent color)
      light: '#FFDF4D',
      dark: '#DAB700',
    },
    background: {
      default: '#FFFFFF', // White
      paper: '#F5F5F5',   // Light grey for contrast
    },
    text: {
      primary: '#333333', // Dark grey for high contrast
      secondary: '#2E7D32', // Dark Green for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#2E7D32', // Dark Green
    },
    h2: {
      fontWeight: 600,
      color: '#2E7D32', // Dark Green
    },
    h3: {
      fontWeight: 600,
      color: '#2E7D32', // Dark Green
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
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#4CBB17', // Kelly Green
          '&:hover': {
            backgroundColor: '#2E7D32', // Dark Green
          },
        },
        containedSecondary: {
          backgroundColor: '#FFD700', // Gold
          color: '#2E7D32', // Dark Green text for contrast
          '&:hover': {
            backgroundColor: '#DAB700', // Darker Gold
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 16px rgba(46, 125, 50, 0.3)', // Softened Dark Green shadow
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#4CBB17', // Kelly Green
          color: '#FFFFFF',
          fontWeight: 500,
        },
      },
    },
  },
});

// Header with Eisenhower HS style
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(4),
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.dark,
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
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  borderLeft: `6px solid ${theme.palette.primary.main}`,
  overflow: 'hidden',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  maxWidth: 800,
  zIndex: 1,
}));


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
    height: '2px',
    backgroundColor: alpha(theme.palette.primary.dark, 0.3),
    marginLeft: theme.spacing(2),
  },
}));

const MovieCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.primary.dark, 0.2)}`,
}));

const RatingBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.dark,
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
}));


const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(6),
  border: `1px solid ${alpha(theme.palette.primary.dark, 0.2)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.1)}`,
}));


const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.dark, 0.3),
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.dark, 0.5),
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
}));

// Footer with Eisenhower HS styling
const Footer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(6),
  borderTop: `2px solid ${alpha(theme.palette.primary.dark, 0.2)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
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
    { title: "The Silent Path", rating: "8.5", genre: "Drama", img: "/api/placeholder/300/450" },
    { title: "Bright Horizons", rating: "9.2", genre: "Family", img: "/api/placeholder/300/450" },
    { title: "Cloud Atlas", rating: "7.8", genre: "Adventure", img: "/api/placeholder/300/450" },
    { title: "Gentle Journey", rating: "8.1", genre: "Comedy", img: "/api/placeholder/300/450" }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header>
          <Logo>
            <LocalMoviesIcon sx={{ mr: 1, fontSize: 30 }} />
            SafeCinema
          </Logo>
        </Header>

        <HeroSection>
          <HeroContent>
            <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 900 }}>
              Safe Movie Recommendations
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: theme.palette.primary.dark }}>
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
              sx={{ ml: 2, backgroundColor: alpha(theme.palette.secondary.main, 0.2), color: theme.palette.primary.dark }}
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
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
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
                <CustomTextField
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
                <CustomTextField
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
                <CustomTextField
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
                <CustomTextField
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
            <Box sx={{ 
              mt: 4, 
              p: 2, 
              backgroundColor: alpha(theme.palette.primary.main, 0.05), 
              borderRadius: 1, 
              overflow: 'auto',
              border: `1px solid ${alpha(theme.palette.primary.dark, 0.2)}`
            }}>
              <pre id="output" style={{ margin: 0, color: theme.palette.text.primary, fontFamily: 'monospace' }}>{output}</pre>
            </Box>
          )}
        </FormSection>

        <Footer>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            &copy; 2025 SafeCinema. All rights reserved.
          </Typography>
        </Footer>
      </Container>
    </ThemeProvider>
  );
}