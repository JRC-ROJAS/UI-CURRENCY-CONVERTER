import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Card,
  CardContent
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Lista de opciones de monedas del continente americano
const currencyOptions = [
  { code: 'ARS', name: 'Peso Argentino' },
  { code: 'BOB', name: 'Boliviano' },
  { code: 'BRL', name: 'Real' },
  { code: 'CAD', name: 'Dólar Canadiense' },
  { code: 'CLP', name: 'Peso Chileno' },
  { code: 'COP', name: 'Peso Colombiano' },
  { code: 'CRC', name: 'Colón Costarricense' },
  { code: 'CUP', name: 'Peso Cubano' },
  { code: 'DOP', name: 'Peso Dominicano' },
  { code: 'GTQ', name: 'Quetzal Guatemalteco' },
  { code: 'GYD', name: 'Dólar Guyanés' },
  { code: 'HNL', name: 'Lempira Hondureño' },
  { code: 'JMD', name: 'Dólar Jamaiquino' },
  { code: 'MXN', name: 'Peso Mexicano' },
  { code: 'NIO', name: 'Córdoba Nicaragüense' },
  { code: 'PAB', name: 'Balboa Panameño' },
  { code: 'PYG', name: 'Guaraní Paraguayo' },
  { code: 'PEN', name: 'Sol Peruano' },
  { code: 'SRD', name: 'Dólar Surinamés' },
  { code: 'TTD', name: 'Dólar de Trinidad y Tobago' },
  { code: 'USD', name: 'Dólar Estadounidense' },
  { code: 'UYU', name: 'Peso Uruguayo' },
  { code: 'VES', name: 'Bolívar Venezolano' }
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BOB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = () => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/370f38d2a28ae6bc75bae014/latest/${fromCurrency}`;
    
    axios
      .get(apiUrl)
      .then(response => {
        const rates = response.data.conversion_rates;
        const rate = rates[toCurrency];

        if (rate) {
          const convertedAmount = amount * rate;
          setResult(convertedAmount.toFixed(2));
        } else {
          setError('No se encontró tasa de cambio para la moneda seleccionada.');
        }
      })
      .catch(error => {
        console.error('Error fetching the exchange rate:', error);
        setError('Hubo un problema al obtener la tasa de cambio. Por favor, intenta nuevamente más tarde.');
      });
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container>
      <Box mt={4}>
        <FormControl fullWidth margin="normal">
          <InputLabel>From Currency</InputLabel>
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            label="From Currency"
          >
            {currencyOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>To Currency</InputLabel>
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            label="To Currency"
          >
            {currencyOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleConvert} fullWidth>
          Convert
        </Button>

        {result && (
          <Card variant="outlined" style={{ backgroundColor: '#e8f5e9', marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h6" align="center" margin="normal">
                Result: {result} {toCurrency}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseError}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleCloseError}>
            {error}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default CurrencyConverter;
