import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Container } from 'reactstrap';
import { getConcerts, loadConcertsRequest } from '../../../redux/concertsRedux';



const Prices = () => {
  const dispatch = useDispatch();

  const concerts = useSelector(getConcerts);

  useEffect(() => {
    dispatch(loadConcertsRequest())
  }, [dispatch]);

  console.log('concerts prices: ', concerts);

  const priceDayOne = (concerts.find(concert => concert.day === 1)).price;
  const priceDayTwo = (concerts.find(concert => concert.day === 2)).price;
  const priceDayThree = (concerts.find(concert => concert.day === 3)).price;
  
  const workshopNameOne = (concerts.find(concert => concert.day === 1)).workshop.name;//<=============dlaczego to działa bez populate()??
  const workshopNameTwo = (concerts.find(concert => concert.day === 2)).workshop.name;
  const workshopNameThree = (concerts.find(concert => concert.day === 3)).workshop.name;
  console.log('workshopNameOne: ', workshopNameOne);
  
 

  return (

  <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
    
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>

    <h2>Day one</h2>
    <p>Price: {priceDayOne}$</p>
    <p>Workshops: {workshopNameOne}, "How to make you voice grooowl", "Make your voice stronger", "History of Rock"</p>
    <h2>Day Two</h2>
    <p>Price: {priceDayTwo}$</p>
    <p>Workshops: {workshopNameTwo}, "Find your real YOU", "Fell the music", "Jam session"</p>
    <h2>Day three</h2>
    <p>Price: {priceDayThree}$</p>
    <p>Workshops: {workshopNameThree}, "How to properly warmup before singing", "It's time for YOU!"</p>
  </Container>
  )
};

export default Prices;