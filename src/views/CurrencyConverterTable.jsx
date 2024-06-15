import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Select,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormControl,
  InputLabel
} from '@mui/material';

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

const CurrencyConverterTable = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BOB');
  const [results, setResults] = useState([]);

  const handleConvert = () => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/370f38d2a28ae6bc75bae014/latest/${fromCurrency}`;

    axios
      .get(apiUrl)
      .then(response => {
        const rates = response.data.conversion_rates;
        const newResults = [];

        currencyOptions.forEach(option => {
          const rate = rates[option.code];
          if (rate) {
            const convertedAmount = amount * rate;
            newResults.push({
              amount: amount,
              currency: option.name,
              country: option.code,
              result: convertedAmount.toFixed(2)
            });
          }
        });

        setResults(newResults);
      })
      .catch(error => {
        console.error('Error fetching the exchange rates:', error);
      });
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="from-currency-label"> Moneda </InputLabel>
            <Select
              labelId="from-currency-label"
              id="from-currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              fullWidth
            >
              {currencyOptions.map(option => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Monto"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleConvert}>
            Convert
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper} sx={{ height: 400, overflow: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Resultado</TableCell>
                  <TableCell>Moneda</TableCell>
                  <TableCell>País</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.result}</TableCell>
                    <TableCell>{result.currency}</TableCell>
                    <TableCell>{result.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CurrencyConverterTable;
